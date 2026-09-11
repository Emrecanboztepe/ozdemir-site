import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import EvselFooter from "@/components/EvselFooter";
import StickyContactBar from "@/components/ui/StickyContactBar";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <><Navbar /><main id="ana-icerik">{children}</main><EvselFooter /><StickyContactBar /></>;
}
