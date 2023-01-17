import { useRouter } from "next/router";

function NavLink({ name, icon, href, activeIndex, setActiveIndex, index }) {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };
  const isActive = index === activeIndex;

  return (
    <li
      className={`flex items-center ${
        router.asPath === href ? "text-[#0b7a66] bg-[#e2fae7]" : "text-gray-600"
      } mx-4 mb-1 rounded`}
    >
      <a
        href={href}
        onClick={handleClick}
        className="relative px-3 py-2 items-center cursor-pointer w-full flex gap-2"
      >
        {isActive ? (
          <span className="cover bg-[#eaeaea] absolute inset-0 -z-10 rounded-sm" />
        ) : null}
        <span>{icon}</span>
        <span>{name}</span>
      </a>
    </li>
  );
}

export default NavLink;
