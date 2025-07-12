
"use client";

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart2,
  Coins,
  Gavel,
  LayoutDashboard,
  LogOut,
  Map,
  PlusCircle,
  Settings,
  ShieldCheck,
  Spade,
  User as UserIcon,
  Users,
  Wallet,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Logo } from "@/components/shared/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ThemeToggle } from "../shared/ThemeToggle";
import { Label } from '../ui/label';
import { UserAvatar } from '../shared/UserAvatar';

const standardMenuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/quests", label: "Quests", icon: Spade },
  { href: "/dashboard/map", label: "Eco-Map", icon: Map },
  { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/profile", label: "Profile", icon: UserIcon },
];

const moderatorMenuItems = [
    { href: "/dashboard/moderator/quests", label: "Quest Management", icon: PlusCircle },
    { href: "/dashboard/verify", label: "Verification", icon: ShieldCheck },
    { href: "/dashboard/moderator/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/dashboard/moderator/governance", label: "Governance", icon: Gavel },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isModerator, setIsModerator] = React.useState(false);
  
  const menuItems = isModerator ? [...standardMenuItems, ...moderatorMenuItems] : standardMenuItems;
  const userName = "Juan dela Cruz";

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="font-headline text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              Likas Bayani
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
             {menuItems.map((item) => (
              <SidebarMenuItem key={item.href} asChild>
                 <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                  
                  data-active={pathname === item.href}
                >
                  <Link href={item.href} title={item.label}>
                    <item.icon className="mr-2 h-4 w-4" />
                     <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </Link>
                </Button>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:items-center">
           <div className="group-data-[collapsible=icon]:hidden w-full flex items-center justify-end gap-2 p-2">
                <ThemeToggle />
           </div>
           
           <div className="hidden group-data-[collapsible=icon]:flex flex-col gap-2 items-center p-2">
            <ThemeToggle />
           </div>

        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="hidden md:flex" />
            <h1 className="text-lg font-semibold md:text-xl">
                {menuItems.find(item => pathname.startsWith(item.href))?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center space-x-2">
              <Label htmlFor="role-switcher" className='text-sm font-medium'>{isModerator ? 'Moderator' : 'Standard'}</Label>
              <Switch
                id="role-switcher"
                checked={isModerator}
                onCheckedChange={setIsModerator}
                aria-label="Toggle moderator mode"
              />
            </div>

            <Button asChild variant="ghost" className="font-bold">
              <Link href="/dashboard/wallet">
                <Coins className="h-5 w-5 text-yellow-500 mr-2" />
                <span>1,250 Moral</span>
              </Link>
            </Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <UserAvatar name={userName} className="h-9 w-9" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" className="w-56">
                    <DropdownMenuLabel>
                      <p className="font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground font-normal">Mangrove Defender</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/profile"><UserIcon className="mr-2 h-4 w-4" />Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/auth"><Users className="mr-2 h-4 w-4" />Switch Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/"><LogOut className="mr-2 h-4 w-4" />Log out</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <SidebarTrigger className="md:hidden" />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background/95">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
