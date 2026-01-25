"use client";

import React from "react";
import useInvitation from "@/services/swr/invitation.swr";
import { Invitation, InvitationStatus } from "@/app/types/invitation.type";
import Loading from "@/components/Organizations/Loading";
import Error from "@/components/Organizations/Error";
import { cn } from "@/lib/utils";
import { RowAction } from "@/components/Actions/row-actions.type";
import RowActions from "@/components/Actions/row-actions";
import NoDataAvailable from "@/components/common/PlaceHolder/NoDataAvailable";
import DataTable from "@/app/admin/coaches/data-table";
import { columns } from "@/app/admin/coaches/column";

interface IDisplayInvitations {
    rowActions: (inv: Invitation) => RowAction<Invitation>[];
}

const statusStyles: Record<InvitationStatus, string> = {
    PENDING: "bg-yellow-500/20 text-yellow-400",
    ACCEPTED: "bg-green-500/20 text-green-400",
    DECLINED: "bg-red-500/20 text-red-400",
    EXPIRED: "bg-gray-500/20 text-gray-400",
    REVOKED: "bg-gray-500/20 text-gray-400",
};

export const DisplayInvitations: React.FC<IDisplayInvitations> = ({
    rowActions,
}) => {
    const { invitations, error, isLoading } = useInvitation();

    if (isLoading) return <Loading loadingText='Invitations' />;
    if (error) return <Error />;

    return (
        <div className='rounded-xl bg-mid-night/90 px-6 py-7 border border-mid-night/60 shadow-sm'>
            <h3 className='text-sm font-semibold tracking-tight'>
                Sent Invitations
            </h3>

            <DataTable columns={columns} data={invitations} />
        </div>
    );
};
