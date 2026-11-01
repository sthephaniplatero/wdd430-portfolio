import Link from "next/link";
import HeaderLink from "./HeaderLink";
import ProfileBadge from "./ProfileBadge";

export default function Header() {
  return (
    <header className="bg-night">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" aria-label="Sthephani Platero - Home">
          <ProfileBadge />
        </Link>
        <nav>
          <ul className="flex gap-8 text-sm font-medium">
            <li><HeaderLink href="/">Home</HeaderLink></li>
            <li><HeaderLink href="/about">About</HeaderLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
