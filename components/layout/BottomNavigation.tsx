import Image from "next/image";
import Link from "next/link";
import NavLink from "../NavLink";
import ProfileButton from "../ProfileButton";

export default function BottomNavigation() {
  return (
    <footer className="app-bottomnavigation flex justify-center lg:hidden fixed bottom-0 left-0 right-0 z-50 ">
      <nav className="app-bottomnavigation-menu grid grid-cols-2 items-center justify-center gap-4 py-2">
        <NavLink name="Activities" href="/" icon="ri-line-chart-line" />
        <NavLink
          name="Mail Settings"
          href="/mail"
          icon="ri-send-plane-2-line"
        />
      </nav>
    </footer>
  );
}
