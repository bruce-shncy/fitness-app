import { AuthShellLayout } from "@/components/layout/auth-shell"
import React from "react"

const AdminLayout = ({children}: Readonly<{
    children: React.ReactNode
}>) =>{
    return (
        <AuthShellLayout>
            {children}
        </AuthShellLayout>
    )
}

export default AdminLayout