"use client";
import React from "react";
import useOrganization from "@/services/swr/organization.swr";
import { Organization } from "@/app/types/organization.type";
import Loading from "@/components/Organizations/Loading";
import Error from "@/components/Organizations/Error";
import { cn } from "@/lib/utils";
import { RowAction } from "@/components/Actions/row-actions.type";
import RowActions from "@/components/Actions/row-actions";

interface IDisplayOrganiztion {
  selectedOrgId?: number;
  rowActions: (org: Organization) => RowAction<Organization>[];
}

export const DisplayOrganiztion: React.FC<IDisplayOrganiztion> = ({
    selectedOrgId,
    rowActions,
}) => {
    const { organizations, error, isLoading } = useOrganization();

    
    if (isLoading) return <Loading loadingText="All Organizations"/>
    if (error ) return <Error />

    return (
        <div className='rounded-xl bg-mid-night/90 px-6 py-7 border border-mid-night/60 shadow-sm'>
            <h3 className='text-sm font-semibold tracking-tight'>
                All organizations
            </h3>

            <ul className='mt-5 space-y-4'>
                {organizations.map((organization: Organization) => (
                    <li
                        key={organization.id}
                        className={
                            cn('flex flex-col gap-3 rounded-lg border border-mid-night/60 px-4 py-3 md:flex-row md:items-center md:justify-between hover:bg-dark-night/80 hover:pointer transition-colors',
                                selectedOrgId === organization.id && "bg-dark-night/80"
                            )
                        }
                    >
                        <div>
                            <p className='text-sm font-medium capitalize'>
                                {organization.name}
                            </p>
                            <p className='text-xs text-carbon-gray tracking-tight capitalize'>
                                {organization.address}
                            </p>
                        </div>
                        <div className='flex items-center justify-between gap-3 text-xs text-carbon-gray md:justify-end'>
                            <span>Created 11/01/2025</span>
                            <RowActions
                                row={organization}
                                actions={rowActions}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
