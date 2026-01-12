"use client";

import React from "react";

interface ILoadingProps  {
    loadingText: string
}

const Loading: React.FC<ILoadingProps> = ({
    loadingText
}) => {
    return (
        <div className='rounded-xl bg-mid-night/90 px-6 py-7 border border-mid-night/60 shadow-sm'>
            <h3 className='text-sm font-semibold tracking-tight'>
                {loadingText}
            </h3>
            <p className='mt-4 text-xs text-carbon-gray'>Loading...</p>
        </div>
    )
 }


export default Loading