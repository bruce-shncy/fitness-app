import { AuthShellLayout } from "@/components/layout/auth-shell"
import { Header } from "@/components/layout/header"
import { useAdminSettings } from "@/providers/settings/AdminSettingsProvider"
import React from "react"

const AdminLayout = ({children}: Readonly<{
    children: React.ReactNode
}>) =>{
 
    return (
        <AuthShellLayout>
            <main className='w-full min-h-screen bg-dark-night text-platinum px-6 py-8 md:px-10 md:py-12'>
                <div className='max-w-6xl mx-auto space-y-8'>  
                    <Header />
                    {children}
                </div>
            </main>
            
        </AuthShellLayout>
    )
}

export default AdminLayout