"use client"

import { ApiError } from "@/services/swr/organization.swr"

interface IError {
    error: ApiError | undefined
}

export const Error: React.FC<IError> = ({
    error
}) => {
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
        )
    }
}

export default Error