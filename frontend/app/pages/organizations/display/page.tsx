"use client";
import React from "react";
import useOrganization from "@/services/swr/organization.swr";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { Organization } from "@/app/types/organization.type";
import Loading from "@/components/Organizations/Loading";
import Error from "@/components/Organizations/Error";
import { cn } from "@/lib/utils";
import { useDialog } from "@/providers/dialogs/AppDialogProvider";
import { Button } from "@/components/ui/button";

interface IDisplayOrganiztion {
    handleEdit: (organization: Organization) => void
    selectedOrgId?: number
}

export const DisplayOrganiztion: React.FC<IDisplayOrganiztion> = ({
    handleEdit,
    selectedOrgId
}) => {
    const { organizations, error, isLoading } = useOrganization();
    const {openDialog, closeDialog} = useDialog();

    <>
        <Loading isLoading={isLoading }/>
        <Error error={error} />
    </>

    const deleteOrg = () => {
        openDialog(
            <div className="space-y-3">
                <p>Delete this item?</p>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        onClick={closeDialog}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={() => { closeDialog(); }}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        )
    }

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
                            <div className='flex items-center gap-3'>
                                <button
                                    type='button'
                                    onClick={() => handleEdit(organization)}
                                    className={
                                        cn('inline-flex cursor-pointer items-center gap-1 text-carbon-gray hover:text-platinum transition-colors',
                                            selectedOrgId === organization.id && "text-blue-500"
                                        )
                                    }
                                >
                                    <AiOutlineEdit className='h-3 w-3' />
                                    <span>Edit</span>
                                </button>
                                <button
                                    type='button'
                                    onClick={deleteOrg}
                                    className='inline-flex cursor-pointer items-center gap-1 text-red-400 hover:text-red-300 transition-colors'
                                >
                                    <AiOutlineDelete className='h-3 w-3' />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
