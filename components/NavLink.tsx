import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavLink {
  name: string;
  href: string;
  icon: string;
}

export default function NavLink({ name, href, icon }: NavLink) {
  const router = useRouter();
console.log(router.pathname.includes(href))
  return (
    <Link href={href} passHref>
      <a
        className={classNames("menu-item", {
          "current-route": (href === '/' && router.pathname === '/') || (href !== '/' && router.pathname.includes(href)),
        })}
        aria-label={name}
      >
        <span className="sr-only">{name}</span>
        <i className={icon} />
      </a>
    </Link>
  );
}
