import Image from "next/image";
import Link from "next/link";
import NavLink from "../NavLink";
import ProfileButton from "../ProfileButton";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex app-sidebar z-20">
      <Link href="/">
        <a className="logo logo-sm">
          <Image
            src="/images/logo.svg"
            alt="PocketBase logo"
            width="40"
            height="40"
          />
        </a>
      </Link>

      <nav className="main-menu">
        <NavLink name="Activities" href="/" icon="ri-line-chart-line" />
        <NavLink name="Mail Settings" href="/mail" icon="ri-send-plane-2-line" />
      </nav>

      <ProfileButton />
      {/* <figure className="rounded-full thumb thumb-circle link-hint closable">
        <Image
          src="/images/avatar0.svg"
          layout="fill"
          alt="Avatar"
          className="rounded-full"
        />
      </figure> */}
    </aside>
  );
}
