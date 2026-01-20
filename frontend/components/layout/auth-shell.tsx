import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { adminNav } from "../config/admin/nav";

export const AuthShellLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='min-h-screen bg-dark-night w-full flex'>
            <Sidebar navListItems={adminNav} />
            {children}
        </div>
    );
};
