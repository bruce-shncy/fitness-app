"use client";

import React from "react";
import NoDataAvailable from "@/components/common/PlaceHolder/NoDataAvailable";

export const DisplayCoaches: React.FC = () => {
    // TODO: Implement coaches list with useCoaches SWR hook
    return (
        <div className="rounded-xl bg-mid-night/90 px-6 py-7 border border-mid-night/60 shadow-sm">
            <h3 className="text-sm font-semibold tracking-tight">
                All Coaches
            </h3>
            <NoDataAvailable message="Coaches list coming soon" />
        </div>
    );
};
