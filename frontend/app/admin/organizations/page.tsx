"use client"

import { useOrganizationAction } from "@/app/pages/organizations/actions/useOrganizations";
import { DisplayOrganization } from "@/app/pages/organizations/display/page";
import { CreateOrganizationForm } from "@/app/pages/organizations/forms/create";

const OrganizationsPage = () => {
    
    const {selectedOrganization, setSelectedOrganization, rowActions} = useOrganizationAction();

    return (
        <main className='w-full min-h-screen bg-dark-night text-platinum px-6 py-8 md:px-10 md:py-12'>
            <div className='max-w-6xl mx-auto space-y-8'>
                <header>
                    <h2 className='text-2xl font-semibold tracking-tight'>
                        Organizations
                    </h2>
                    <p className='mt-1 text-sm text-carbon-gray tracking-tight'>
                        Manage gyms, clubs, or companies in your fitness work.
                    </p>
                </header>

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
            </div>
        </main>
    );
};

export default OrganizationsPage;
