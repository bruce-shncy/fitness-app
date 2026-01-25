"use client";
import { usePathname } from "next/navigation";
import { AdminNavSection, AdminNavItem } from "../config/admin/nav";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarProps {
    navListItems: AdminNavSection[];
}

export const Sidebar: React.FC<SidebarProps> = ({ navListItems }) => {
    const pathname = usePathname()
    return (
        <aside className='sticky top-0 h-screen w-64 flex flex-col bg-mid-night text-platinum border-r border-r-mid-night/50 py-8 px-6'>
            <div className='flex gap-3 items-center mb-6 cursor-pointer hover:bg-platinum/5 rounded-md p-1 transition-colors'>
                <div className='flex items-center justify-center h-8 w-8 bg-platinum/10 rounded-lg text-xs font-medium'>
                    DF
                </div>
                <div>
                    <h4 className='text-lg font-bold tracking-tight'>
                        DefiFit
                    </h4>
                    <p className='text-slate-400 uppercase text-xs tracking-widest'>
                        Admin
                    </p>
                </div>
            </div>
            <nav className='flex flex-col overflow-y-auto'>
                <ul className='space-y-6 flex-1'>
                    {navListItems.map((navItem) => {
                        
                        return (
                            <li key={navItem.title}>
                                <p className='text-slate-500 tracking-widest uppercase font-semibold text-xs'>
                                    {navItem.title}
                                </p>
                                <ul className='flex flex-col gap-2 mt-2'>
                                    {navItem.items.map((item) => {
                                        const isActive = pathname === item.href || pathname.startsWith(item.href)
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-2 text-slate-200 pl-3 cursor-pointer hover:text-white hover:bg-platinum/5 rounded-md text-sm py-1.5 pr-3 tracking-wider transition-colors",
                                                     isActive && "bg-platinum text-night"
                                                )}        
                                            >
                                                {item.icon && (
                                                    <span className='text-xs opacity-80'>
                                                        {item.icon}
                                                    </span>
                                                )}
                                                <span>{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};
