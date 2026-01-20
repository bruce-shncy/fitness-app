"use client";
import React, { createContext, useContext, useState } from "react";

type AdminSettings = {
    header: string 
    subHeader: string
}

type AdminCtx = {
    settings: AdminSettings
    setSettings: React.Dispatch<React.SetStateAction<AdminSettings>>
}

const AdminSettingsContext = createContext<AdminCtx |  null>(null);

export const AdminSettingsProvider = ({
    children
} : {children: React.ReactNode}) => {

    const [settings, setSettings] = useState<AdminSettings>({
        header: 'Header Here',
        subHeader: 'Subheader Here'
    }); 

    return (
        <AdminSettingsContext.Provider
            value={{ 
                settings,
                setSettings
             }}
        >
            { children }
        </AdminSettingsContext.Provider>
    )
}

export const useAdminSettings = () => {
    const ctx = useContext(AdminSettingsContext);

    if (!ctx) throw new Error("useAdminSettings must be used within AdminSettingsProvider")

    return ctx;
}