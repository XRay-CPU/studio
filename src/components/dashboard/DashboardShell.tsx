
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
import { Logo } from "@/components/shared/Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ThemeToggle } from "../shared/ThemeToggle";
import { UserAvatar } from '../shared/UserAvatar';
import { TokenBalance } from '../shared/TokenBalance';
import { LogoutButton } from '../shared/LogoutButton';

const standardMenuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/quests", label: "Quests", icon: Spade },
  { href: "/dashboard/map", label: "Eco-Map", icon: Map },
  { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/leaderboard", label: "Bayani's Leaderboard", icon: Users },
];

const moderatorMenuItems = [
    { href: "/dashboard/moderator/quests", label: "Quest Management", icon: PlusCircle },
    { href: "/dashboard/verify", label: "Verification", icon: ShieldCheck },
    { href: "/dashboard/moderator/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/dashboard/moderator/governance", label: "Governance", icon: Gavel },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isModerator, setIsModerator] = React.useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('isModerator');
      return stored ? JSON.parse(stored) : false;
    }
    return false;
  });
  const [account, setAccount] = React.useState<string | null>(null);

  React.useEffect(() => {
    const checkAccount = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAccount(accounts[0] || null);

        // Listen for account changes
        window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
          setAccount(newAccounts[0] || null);
        });
      }
    };

    checkAccount();
  }, []);

  React.useEffect(() => {
    // Only update moderator status if user accesses moderator routes for the first time
    if ((pathname.includes('/dashboard/moderator') || pathname.includes('/dashboard/verify')) && !isModerator) {
      setIsModerator(true);
      localStorage.setItem('isModerator', 'true');
    }
  }, [pathname, isModerator]);
  
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
              <li key={item.href} data-sidebar="menu-item" className="group/menu-item relative">
                <Link
                  href={item.href}
                  title={item.label}
                  className={
                    [
                      "inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium w-full justify-start px-2 py-2 transition-colors",
                      pathname === item.href
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    ].join(' ')
                  }
                  data-active={pathname === item.href}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </Link>
              </li>
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
            <Button asChild variant="ghost" className="font-bold">
              <Link href="/dashboard/wallet">
                <Coins className="h-5 w-5 text-yellow-500 mr-2" />
                <TokenBalance address={account} />
              </Link>
            </Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <UserAvatar name={userName} className="h-9 w-9" />
                    {isModerator && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <ShieldCheck className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" className="w-56">
                    <DropdownMenuLabel>
                      <p className="font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground font-normal">
                        {isModerator ? 'Moderator' : 'Mangrove Defender'}
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/profile" className="w-full">
                          <UserIcon className="mr-2 h-4 w-4" />Profile
                        </Link>
                    </DropdownMenuItem>
                    {isModerator && (
                      <DropdownMenuItem
                        onClick={() => {
                          setIsModerator(false);
                          localStorage.removeItem('isModerator');
                        }}
                        className="text-yellow-600 dark:text-yellow-400"
                      >
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Exit Moderator Mode
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <LogoutButton />
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
