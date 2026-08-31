import { permanentRedirect } from "next/navigation";

/** Eski evsel adresini tek, kanonik ana sayfaya taşır. */
export default function LegacyEvselPage() {
  permanentRedirect("/");
}
