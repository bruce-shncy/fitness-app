import { AdminNavSection, AdminNavItem } from "../config/admin/nav"
import React from "react";

interface SidebarProps {
    navListItems: AdminNavSection[]
}

export const Sidebar: React.FC<SidebarProps> = ({ navListItems }) => {
    return (
       <aside className="h-screen w-[260px] bg-mid-night flex flex-col border-r border-mid-night/60 text-platinum py-8 px-6">
            <div className="flex items-center gap-3 mb-6 cursor-pointer hover:bg-platinum/5 rounded p-1 transition-colors">
                <div className="bg-platinum/10 flex items-center rounded-md p-2 text-xs">
                    DF
                </div>
                <div>
                    <h2 className="font-medium text-lg tracking-tight">
                        DeciFit
                    </h2>
                     <p className="text-slate-400 tracking-[0.25em] text-xs uppercase">
                        Admin
                    </p>
                </div>
            </div>
            <ul className="space-y-6 overflow-y-auto6">
                {navListItems.map((navItem) => {
                    return (
                        <li key={navItem.title}>
                            <p className="uppercase text-slate-500 text-xs tracking-widest">
                                 {navItem.title}
                            </p>
                            <ul className="mt-1">
                                {navItem.items.map((item) => {
                                    return (
                                        <li className="pl-3 text-slate-200 hover:text-white hover:bg-platinum/5 rounded cursor-pointer py-2 px-3 text-sm font-medium tracking-tight transition-colors">
                                            {item.name}
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
       </aside>
    )
}