import Link from "next/link";

export default function DropDownMenu({
  menu,
}: {
  menu: { name: string; url: string }[];
}) {
  return (
    <div className="flex flex-col items-end">
      {menu.map((item) => {
        return (
          <Link href={item.url === "/shop" ? "/shop/shirts" : item.url}>
            <button className="focus:text-main  py-2">{item.name}</button>
          </Link>
        );
      })}
      <Link href={"/settings"}>
        <button className="focus:text-main  py-2">Profile Settings</button>
      </Link>
    </div>
  );
}
