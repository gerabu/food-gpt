import { NotebookPen } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { auth } from "@/server/auth";

const links = [
  {
    name: "Planner",
    url: "/dashboard/planner",
    icon: <NotebookPen />,
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((link) => (
                  <SidebarMenuItem key={link.name}>
                    <SidebarMenuButton asChild>
                      <Link href={link.url}>
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>{session?.user.name}</SidebarFooter>
      </Sidebar>
      <SidebarInset className="p-4">{children}</SidebarInset>
    </SidebarProvider>
  );
}
