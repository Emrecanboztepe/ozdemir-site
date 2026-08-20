"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

/**
 * Yatay şeritleri fareyle SÜRÜKLEYEREK kaydırma.
 *
 * `overflow-x-auto` kapları dokunmatikte zaten kaydırılır ama masaüstünde fare
 * kullanan biri için görünür bir yol yoktur (yatay tekerlek herkeste olmaz).
 * Bu hook basılı tutup sürüklemeyi ekler; imleç de "tutulabilir" görünür.
 *
 * Bağlantı ve butonlara tıklamayı bozmamak için: sürükleme birkaç pikseli
 * geçtiyse takip eden `click` olayı yutulur.
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  const state = useRef({ down: false, startX: 0, startLeft: 0, moved: 0 });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el || e.pointerType === "touch") return; // dokunmatikte tarayıcı hallediyor
      state.current = {
        down: true,
        startX: e.clientX,
        startLeft: el.scrollLeft,
        moved: 0,
      };
      el.setPointerCapture?.(e.pointerId);
    },
    [ref],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      const s = state.current;
      if (!el || !s.down) return;
      const dx = e.clientX - s.startX;
      s.moved = Math.max(s.moved, Math.abs(dx));
      el.scrollLeft = s.startLeft - dx;
    },
    [ref],
  );

  const endDrag = useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      state.current.down = false;
      el.releasePointerCapture?.(e.pointerId);
    },
    [ref],
  );

  // Sürüklemeden sonra gelen tıklamayı yut
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      if (state.current.moved > 5) {
        e.preventDefault();
        e.stopPropagation();
        state.current.moved = 0;
      }
    };
    el.addEventListener("click", onClick, true);
    return () => el.removeEventListener("click", onClick, true);
  }, [ref]);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    className: "cursor-grab active:cursor-grabbing select-none",
  };
}
