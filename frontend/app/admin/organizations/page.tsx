"use client"

import { useOrganizationAction } from "@/app/pages/organizations/actions/useOrganizations";
import { DisplayOrganization } from "@/app/pages/organizations/display/page";
import { CreateOrganizationForm } from "@/app/pages/organizations/forms/create";
import { useAdminSettings } from "@/providers/settings/AdminSettingsProvider";
import { useEffect } from "react";

const OrganizationsPage = () => {
    
    const {selectedOrganization, setSelectedOrganization, rowActions} = useOrganizationAction();
    const {settings, setSettings} = useAdminSettings();

    useEffect(() => {
        setSettings({
            header: 'Organizations',
            subHeader: '  Manage gyms, clubs, or companies in your fitness work.'
        })
    }, [])

    return (
        <>
            <section className='grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]'>
                <CreateOrganizationForm 
                    selectedOrganization={selectedOrganization}
                    clearSelection={() => setSelectedOrganization(null)}
                />
                <DisplayOrganization 
                    selectedOrgId={selectedOrganization?.id}
                    rowActions={rowActions}
                />
            </section>
        </>
    );
};

export default OrganizationsPage;
