"""Render subtle, seamless hero cinemagraphs from the approved stills.

Only four areas move: sky, trees, pool water and the heat-pump fan.  The
architecture and camera stay locked so the exported clips remain usable under
the existing responsive hero content.
"""

from __future__ import annotations

import math
import shutil
import subprocess
from dataclasses import dataclass
from pathlib import Path

import cv2
import numpy as np


# PowerShell's legacy argument encoding can mangle the Turkish workspace name
# in ``__file__``. The renderer is intentionally run from the project root, so
# the Unicode-safe process working directory is the reliable source of truth.
ROOT = Path.cwd()
PUBLIC = ROOT / "public"
FPS = 24
DURATION_SECONDS = 5
FRAME_COUNT = FPS * DURATION_SECONDS


@dataclass(frozen=True)
class Variant:
    source: str
    output: str
    sky_polygon: tuple[tuple[float, float], ...]
    tree_polygons: tuple[tuple[tuple[float, float], ...], ...]
    pool_polygon: tuple[tuple[float, float], ...]
    fan: tuple[float, float, float]


VARIANTS = (
    Variant(
        source="hero-cinematic-desktop-v3.webp",
        output="hero-cinemagraph-desktop-v1.mp4",
        sky_polygon=(
            (0.00, 0.00),
            (1.00, 0.00),
            (1.00, 0.055),
            (0.86, 0.145),
            (0.72, 0.245),
            (0.56, 0.365),
            (0.42, 0.495),
            (0.30, 0.625),
            (0.00, 0.650),
        ),
        tree_polygons=(
            ((0.00, 0.27), (0.095, 0.31), (0.16, 0.63), (0.09, 0.79), (0.00, 0.82)),
            ((0.255, 0.55), (0.395, 0.55), (0.425, 0.79), (0.245, 0.80)),
        ),
        pool_polygon=(
            (0.175, 0.750),
            (0.300, 0.710),
            (0.565, 0.720),
            (0.625, 0.765),
            (0.555, 0.835),
            (0.310, 0.845),
            (0.185, 0.805),
        ),
        fan=(0.791, 0.654, 0.0395),
    ),
    Variant(
        source="hero-cinematic-mobile-v3.webp",
        output="hero-cinemagraph-mobile-v1.mp4",
        sky_polygon=(
            (0.00, 0.00),
            (1.00, 0.00),
            (1.00, 0.155),
            (0.66, 0.285),
            (0.24, 0.470),
            (0.00, 0.545),
        ),
        tree_polygons=(
            ((0.00, 0.34), (0.17, 0.38), (0.27, 0.65), (0.16, 0.72), (0.00, 0.72)),
            ((0.00, 0.54), (0.28, 0.54), (0.30, 0.71), (0.00, 0.72)),
        ),
        pool_polygon=(
            (0.00, 0.640),
            (0.17, 0.625),
            (0.51, 0.635),
            (0.55, 0.680),
            (0.24, 0.710),
            (0.00, 0.690),
        ),
        fan=(0.650, 0.608, 0.0575),
    ),
)


def polygon_mask(height: int, width: int, points: tuple[tuple[float, float], ...]) -> np.ndarray:
    mask = np.zeros((height, width), dtype=np.uint8)
    pixels = np.array(
        [[round(x * (width - 1)), round(y * (height - 1))] for x, y in points],
        dtype=np.int32,
    )
    cv2.fillPoly(mask, [pixels], 255)
    return mask


def soft_mask(mask: np.ndarray, radius: int) -> np.ndarray:
    kernel = radius * 2 + 1
    return cv2.GaussianBlur(mask, (kernel, kernel), 0).astype(np.float32) / 255.0


def build_masks(image: np.ndarray, variant: Variant) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    height, width = image.shape[:2]
    blue, green, red = cv2.split(image.astype(np.int16))
    luma = (0.114 * blue + 0.587 * green + 0.299 * red).astype(np.float32)

    sky_shape = polygon_mask(height, width, variant.sky_polygon)
    blue_sky = ((blue - red > 12) & (blue - green > 5) & (luma > 46)).astype(np.uint8) * 255
    sky = soft_mask(cv2.bitwise_and(sky_shape, blue_sky), max(7, round(width * 0.006)))

    trees = np.zeros((height, width), dtype=np.uint8)
    for polygon in variant.tree_polygons:
        trees = cv2.max(trees, polygon_mask(height, width, polygon))
    foliage = ((luma < 92) & ((green - red > -8) | (blue - red < 22))).astype(np.uint8) * 255
    trees = soft_mask(cv2.bitwise_and(trees, foliage), max(3, round(width * 0.0025)))

    pool_shape = polygon_mask(height, width, variant.pool_polygon)
    water = ((blue - red > 5) & (luma > 38)).astype(np.uint8) * 255
    pool = soft_mask(cv2.bitwise_and(pool_shape, water), max(5, round(width * 0.004)))

    return sky, trees, pool


def smoothstep(edge0: float, edge1: float, value: np.ndarray) -> np.ndarray:
    t = np.clip((value - edge0) / (edge1 - edge0), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def build_star_field(height: int, width: int, sky: np.ndarray, seed: int) -> np.ndarray:
    """Create a deterministic, sparse star matte inside the safe sky mask."""
    rng = np.random.default_rng(seed)
    valid = np.argwhere(sky > 0.86)
    stars = np.zeros((height, width), dtype=np.float32)
    if len(valid) == 0:
        return stars

    count = min(len(valid), max(64, round(width * height / 16500)))
    chosen = valid[rng.choice(len(valid), size=count, replace=False)]
    base_radius = max(1, round(width / 1100))

    for y, x in chosen:
        radius = base_radius + int(rng.random() > 0.78)
        intensity = float(rng.uniform(0.48, 1.0))
        cv2.circle(stars, (int(x), int(y)), radius, intensity, -1, lineType=cv2.LINE_AA)

    glow = cv2.GaussianBlur(stars, (0, 0), sigmaX=max(0.8, width / 1300))
    return np.clip((stars * 0.72 + glow * 0.52) * sky, 0.0, 1.0)


def add_fan_motion(
    frame: np.ndarray,
    fan: tuple[float, float, float],
    phase: float,
) -> np.ndarray:
    height, width = frame.shape[:2]
    center_x = fan[0] * width
    center_y = fan[1] * height
    radius = fan[2] * width

    pad = math.ceil(radius * 1.05)
    left = max(0, round(center_x) - pad)
    right = min(width, round(center_x) + pad + 1)
    top = max(0, round(center_y) - pad)
    bottom = min(height, round(center_y) + pad + 1)

    yy, xx = np.mgrid[top:bottom, left:right].astype(np.float32)
    dx = xx - center_x
    dy = yy - center_y
    rho = np.sqrt(dx * dx + dy * dy) / radius
    theta = np.arctan2(dy, dx)

    # Five curved, translucent blades. The original grille stays visible and
    # therefore reads as a fixed safety grille over the turning fan.
    sector = 2.0 * math.pi / 5.0
    rotation = phase * 8.0
    curved_angle = np.mod(theta - rotation - rho * 0.92, sector) / sector
    blade = np.exp(-np.power((curved_angle - 0.47) / 0.205, 4.0))
    radial = smoothstep(0.22, 0.40, rho) * (1.0 - smoothstep(0.78, 0.97, rho))
    alpha = (0.165 * blade * radial)[..., None]

    crop = frame[top:bottom, left:right]
    crop *= 1.0 - alpha
    return frame


def render_frame(
    base: np.ndarray,
    masks: tuple[np.ndarray, np.ndarray, np.ndarray],
    variant: Variant,
    index: int,
    map_x: np.ndarray,
    map_y: np.ndarray,
    stars: np.ndarray,
) -> np.ndarray:
    height, width = base.shape[:2]
    sky, trees, pool = masks
    phase = 2.0 * math.pi * index / FRAME_COUNT
    loop = math.sin(phase)
    sky_loop = math.sin(phase * 2.0)
    night = 0.5 - 0.5 * math.cos(phase)

    yy, xx = np.mgrid[0:height, 0:width].astype(np.float32)
    sky_dx = sky_loop * (8.2 + 1.8 * np.sin(yy * 0.018))
    sky_dy = sky_loop * (1.5 + 0.55 * np.cos(xx * 0.012))

    tree_height_bias = np.clip(1.0 - yy / max(height * 0.82, 1.0), 0.12, 1.0)
    tree_sway = 0.82 * loop + 0.18 * math.sin(phase * 2.0)
    tree_dx = tree_sway * 4.1 * tree_height_bias * (0.72 + 0.28 * np.cos(yy * 0.075))
    tree_dy = tree_sway * 0.9 * np.sin(xx * 0.065)

    pool_dx = loop * 2.25 * np.sin(yy * 0.19)
    pool_dy = loop * 1.35 * np.sin(xx * 0.135)

    displacement_x = sky * sky_dx + trees * tree_dx + pool * pool_dx
    displacement_y = sky * sky_dy + trees * tree_dy + pool * pool_dy
    cv2.add(map_x, displacement_x.astype(np.float32), dst=map_x)
    cv2.add(map_y, displacement_y.astype(np.float32), dst=map_y)

    warped = cv2.remap(base, map_x, map_y, cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT_101)
    movement_mask = np.maximum(np.maximum(sky, trees), pool)[..., None]
    frame = base * (1.0 - movement_mask) + warped * movement_mask

    # Blue hour eases into a short, deeper-night beat and returns to the exact
    # opening grade. Only the sky changes; the villa and camera stay locked.
    night_sky = frame * np.array([0.54, 0.43, 0.36], dtype=np.float32)
    night_sky += np.array([0.014, 0.004, 0.008], dtype=np.float32)
    night_weight = (sky * night * 0.78)[..., None]
    frame = frame * (1.0 - night_weight) + night_sky * night_weight

    twinkle = 0.86 + 0.14 * math.sin(phase * 6.0)
    star_alpha = (stars * (night**1.45) * twinkle)[..., None]
    star_color = np.array([1.0, 0.95, 0.88], dtype=np.float32)
    frame = frame * (1.0 - star_alpha) + star_color * star_alpha

    # A restrained moving specular line helps the shallow pool read as water.
    shimmer = (0.013 * loop * np.sin(xx * 0.11 + yy * 0.07))[..., None]
    frame += shimmer * pool[..., None]
    frame = add_fan_motion(frame, variant.fan, phase)

    np.copyto(map_x, xx)
    np.copyto(map_y, yy)
    return np.clip(frame * 255.0, 0, 255).astype(np.uint8)


def encode_variant(variant: Variant) -> None:
    source = PUBLIC / variant.source
    output = PUBLIC / variant.output
    # ``cv2.imread`` still uses a narrow Windows path in some builds. Reading
    # bytes first keeps Turkish characters in the workspace path intact.
    encoded = np.fromfile(source, dtype=np.uint8)
    image = cv2.imdecode(encoded, cv2.IMREAD_COLOR)
    if image is None:
        raise FileNotFoundError(source)

    # H.264 4:2:0 requires even dimensions. The mobile still is 941px wide;
    # removing its final edge pixel is visually lossless and keeps the same crop.
    if image.shape[1] % 2:
        image = image[:, :-1]
    if image.shape[0] % 2:
        image = image[:-1, :]

    height, width = image.shape[:2]
    base = image.astype(np.float32) / 255.0
    masks = build_masks(image, variant)
    stars = build_star_field(height, width, masks[0], seed=width * 31 + height)
    yy, xx = np.mgrid[0:height, 0:width].astype(np.float32)
    map_x = xx.copy()
    map_y = yy.copy()

    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise RuntimeError("ffmpeg is required to encode the cinemagraph")

    command = [
        ffmpeg,
        "-y",
        "-loglevel",
        "warning",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "bgr24",
        "-s",
        f"{width}x{height}",
        "-r",
        str(FPS),
        "-i",
        "-",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "slow",
        "-crf",
        "20",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-g",
        str(FPS * 2),
        "-keyint_min",
        str(FPS * 2),
        "-sc_threshold",
        "0",
        str(output),
    ]

    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    try:
        for index in range(FRAME_COUNT):
            frame = render_frame(base, masks, variant, index, map_x, map_y, stars)
            process.stdin.write(frame.tobytes())
    finally:
        process.stdin.close()

    exit_code = process.wait()
    if exit_code:
        raise RuntimeError(f"ffmpeg exited with status {exit_code}")
    print(f"Rendered {output.relative_to(ROOT)} ({width}x{height}, {DURATION_SECONDS}s)")


def main() -> None:
    for variant in VARIANTS:
        encode_variant(variant)


if __name__ == "__main__":
    main()
