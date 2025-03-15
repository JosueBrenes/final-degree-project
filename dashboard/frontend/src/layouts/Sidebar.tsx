import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  FileText,
  User,
  Warehouse,
  ClipboardList,
  BarChart2,
  Smile,
  Umbrella,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { sidebarConfig } from "@/config/sidebarConfig";
import { useUser } from "@/hooks/use-user";

const icons = {
  Home,
  FileText,
  User,
  Warehouse,
  ClipboardList,
  BarChart2,
  Smile,
  Umbrella,
  DollarSign,
};

export function DashboardSidebar() {
  const { role } = useUser();
  const menuItems = sidebarConfig[role as keyof typeof sidebarConfig] || [];

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex items-center gap-2">
                <Image
                  src="/img/logo_2.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  priority
                />
                <span className="font-semibold">Arce & Vargas</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(({ path, label, icon }) => {
                const IconComponent = icons[icon];
                return (
                  <SidebarMenuItem key={path}>
                    <SidebarMenuButton asChild>
                      <Link href={path}>
                        <IconComponent className="mr-2 h-4 w-4" />
                        {label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard/profile">
              <SidebarMenuButton size="lg" asChild>
                <span className="text-sm font-medium">John Doe</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
