"use client";
import { useAdminSettings } from "@/providers/settings/AdminSettingsProvider";

export const Header = () => {
    const { settings } = useAdminSettings();

    return (
        <header>
            <h2 className='text-2xl font-semibold tracking-tight'>
                {settings.header}
            </h2>
            <p className='mt-1 text-sm text-carbon-gray tracking-tight'>
                {settings.subHeader}
            </p>
         </header>
    )
}