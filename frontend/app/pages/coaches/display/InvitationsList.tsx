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

    if (isLoading) return <Loading loadingText="Invitations" />;
    if (error) return <Error />;

    return (
        <div className="rounded-xl bg-mid-night/90 px-6 py-7 border border-mid-night/60 shadow-sm">
            <h3 className="text-sm font-semibold tracking-tight">
                Sent Invitations
            </h3>

            {invitations.length ? (
                <ul className="mt-5 space-y-4">
                    {invitations.map((inv: Invitation) => (
                        <li
                            key={inv.id}
                            className="flex flex-col gap-3 rounded-lg border border-mid-night/60 px-4 py-3 md:flex-row md:items-center md:justify-between hover:bg-dark-night/80 transition-colors"
                        >
                            <div className="flex-1">
                                <p className="text-sm font-medium">
                                    {inv.user_invited?.email ?? "Unknown"}
                                </p>
                                <p className="text-xs text-carbon-gray tracking-tight">
                                    {inv.user_invited?.name}
                                    {inv.organization && ` • ${inv.organization.name}`}
                                </p>
                            </div>
                            <div className="flex items-center justify-between gap-3 text-xs text-carbon-gray md:justify-end">
                                <span
                                    className={cn(
                                        "px-2 py-1 rounded-md text-xs font-medium",
                                        statusStyles[inv.status]
                                    )}
                                >
                                    {inv.status}
                                </span>
                                <span>
                                    {new Date(inv.invited_at).toLocaleDateString()}
                                </span>
                                <RowActions row={inv} actions={rowActions} />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <NoDataAvailable message="No invitations sent yet" />
            )}
        </div>
    );
};
