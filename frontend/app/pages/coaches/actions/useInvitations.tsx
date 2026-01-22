import { Invitation } from "@/app/types/invitation.type";
import { RowAction } from "@/components/Actions/row-actions.type";
import { InviteCoachDialog } from "@/components/common/Dialog/InviteCoachDialog";
import { useDialog } from "@/providers/dialogs/AppDialogProvider";
import useInvitation from "@/services/swr/invitation.swr";
import { AiOutlineReload } from "react-icons/ai";
import { toast } from "sonner";

export const useInvitationActions = () => {
    const { openDialog, closeDialog } = useDialog();
    const { mutate } = useInvitation();

    const handleInviteCoach = () => {
        openDialog(
            <InviteCoachDialog
                onCancel={closeDialog}
                onSuccess={() => mutate()}
            />
        );
    };

    const handleResend = async (_inv: Invitation) => {
        // TODO: Implement resend API endpoint on backend
        toast.info("Resend functionality coming soon");
    };

    const baseActionClass =
        "inline-flex cursor-pointer items-center gap-1 text-carbon-gray hover:text-platinum transition-colors";

    const rowActions = (): RowAction<Invitation>[] => [
        {
            key: "resend",
            label: "Resend",
            icon: <AiOutlineReload className="h-3 w-3" />,
            onClick: handleResend,
            className: baseActionClass,
            hidden: (row) => row.status !== "PENDING",
        },
    ];

    return {
        handleInviteCoach,
        rowActions,
    };
};
