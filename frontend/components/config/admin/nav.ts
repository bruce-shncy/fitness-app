export type AdminNavItem = {
    name: string;
    href: string;
    icon?: string; // simple emoji/icon string for now
};

export type AdminNavSection = {
    title: string;
    items: AdminNavItem[];
};

export const adminNav: AdminNavSection[] = [
    {
        title: "Overview",
        items: [
            {
                name: "Dashboard",
                href: "/admin/dashboard",
                icon: "🏠",
            },
        ],
    },
    {
        title: "People",
        items: [
            {
                name: "Organizations",
                href: "/admin/organizations",
                icon: "🏢",
            },
            {
                name: "Coaches",
                href: "/admin/coaches",
                icon: "🏋️",
            },
            {
                name: "Clients",
                href: "/admin/clients",
                icon: "👥",
            },
        ],
    },
];
