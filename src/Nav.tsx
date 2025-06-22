import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Clusters", path: "/clusters" },
];

export function Nav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map(({ label, path }) => (
          <NavigationMenuItem key={path}>
            <NavigationMenuLink asChild>
              <Link to={path}>{label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
