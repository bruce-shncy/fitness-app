"use client";
import React from "react";
import useOrganization from "@/services/organization.service";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

export const DisplayOrganiztion: React.FC = () => {
    const { organizations, error, isLoading } = useOrganization();
    console.log("allOrganizations", organizations);
    if (isLoading) {
        return (
            <div className='rounded-xl bg-mid-night/90 px-6 py-7 border border-mid-night/60 shadow-sm'>
                <h3 className='text-sm font-semibold tracking-tight'>
                    All organizations
                </h3>
                <p className='mt-4 text-xs text-carbon-gray'>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='rounded-xl bg-mid-night/90 px-6 py-7 border border-red-500/60 shadow-sm'>
                <h3 className='text-sm font-semibold tracking-tight'>
                    All organizations
                </h3>
                <p className='mt-4 text-xs text-red-400'>
                    Failed to load organizations.
                </p>
            </div>
        );
    }

    const allOrganizations = organizations?.data ?? [];

    return (
        <div className='rounded-xl bg-mid-night/90 px-6 py-7 border border-mid-night/60 shadow-sm'>
            <h3 className='text-sm font-semibold tracking-tight'>
                All organizations
            </h3>

            <ul className='mt-5 space-y-4'>
                {[1, 2].map((id) => (
                    <li
                        key={id}
                        className='flex flex-col gap-3 rounded-lg border border-mid-night/60 px-4 py-3 md:flex-row md:items-center md:justify-between hover:bg-dark-night/80 transition-colors'
                    >
                        <div>
                            <p className='text-sm font-medium'>
                                DeciFit Gym HQ
                            </p>
                            <p className='text-xs text-carbon-gray tracking-tight'>
                                123 Fitness Street, London
                            </p>
                        </div>
                        <div className='flex items-center justify-between gap-3 text-xs text-carbon-gray md:justify-end'>
                            <span>Created 11/01/2025</span>
                            <div className='flex items-center gap-3'>
                                <button
                                    type='button'
                                    className='inline-flex cursor-pointer items-center gap-1 text-carbon-gray hover:text-platinum transition-colors'
                                >
                                    <AiOutlineEdit className='h-3 w-3' />
                                    <span>Edit</span>
                                </button>
                                <button
                                    type='button'
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
