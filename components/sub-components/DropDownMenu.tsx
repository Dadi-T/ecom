import Link from "next/link";

export default function DropDownMenu({
  menu,
  categories,
}: {
  menu: { name: string; url: string }[];
  categories: { name: string }[];
}) {
  return (
    <div className="flex flex-col items-end">
      {menu.map((item) => {
        const number = Math.floor(Math.random() * (menu.length - 1));
        const chosenNumber = number >= 4 ? 3 : number;
        return (
          <Link
            key={item.name}
            passHref
            href={
              item.url === "/shop"
                ? `/shop/${categories[chosenNumber].name}`
                : item.url
            }
          >
            <button className="focus:text-main  py-2">{item.name}</button>
          </Link>
        );
      })}
      <Link passHref href={"/settings"}>
        <button className="focus:text-main  py-2">Profile Settings</button>
      </Link>
    </div>
  );
}
