import {   Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar } from '@/components/ui/sidebar'

    export default function Home() {
        return (
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader>
                {/* Your header content */}
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      Menu Item 1
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {/* More menu items */}
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              {/* Your main content */}
            </SidebarInset>
          </SidebarProvider>
        )
      }