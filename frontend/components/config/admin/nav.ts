export type AdminNavItem = {
    name: string;
    href: string;
    icon?: any
}

export type AdminNavSection = {
    title: string; 
    items: AdminNavItem[]
}

export const adminNav: AdminNavSection[] = [
    {
        title: "Overview", 
        items: [
            {
              name: "Dashboard",
              href: "/admin/dashboard",
              icon: "test"
            }
        ]
    },
    {
        title: "People",
        items: [
            {
                name: "Organizations",
                href: "/admin/coaches"
            },
            {
                name: "Coaches",
                href: "/admin/coaches"
            },
            {
                name: "Clients",
                href: "/admin/coaches"
            }
        
        ]
    }
]