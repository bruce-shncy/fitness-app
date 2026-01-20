import { Organization } from "@/app/types/organization.type"
import { RowAction } from "@/components/Actions/row-actions.type"
import { DeleteConfirmDialog } from "@/components/common/Dialog/DeleteConfirmDialog";
import { cn } from "@/lib/utils"
import { useDialog } from "@/providers/dialogs/AppDialogProvider";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { organization as organizationRequest} from '@/services/organization.service';
import useOrganization from "@/services/swr/organization.swr";


export const useOrganizationAction = () =>{

    const {openDialog, closeDialog} = useDialog();

    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);

    const { mutate } = useOrganization()

    const handleEdit = (organization: Organization) => {
        setSelectedOrganization(organization);
    };

    const handleDelete =  (organization: Organization) => {
        openDialog(
            <DeleteConfirmDialog
                itemName={organization.name}
                onCancel={closeDialog}
                onConfirm={async () => {
                    // delete API call here
                
                    const response = await organizationRequest.delete(organization.id)

                    if (response.status === 200) {
                        mutate()
                        closeDialog();
                    }
            
                    if (selectedOrganization?.id === organization.id) {
                        setSelectedOrganization(null);
                    }
                }}
            />
        );
    };

    const baseActionClass =
        "inline-flex cursor-pointer items-center gap-1 text-carbon-gray hover:text-platinum transition-colors";

    const dangerClass =
        "inline-flex cursor-pointer items-center gap-1 text-red-400 hover:text-red-300 transition-colors";
    
    const rowActions = (): RowAction<Organization>[] => [
        {
            key: "edit",
            label: "Edit",
            className: (row) => cn(baseActionClass, row.id === selectedOrganization?.id),
            onClick: handleEdit,
            icon: <AiOutlineEdit className="h-3 w-3" />
        },
        {
            key: "delete",
            label: "Delete",
            icon: <AiOutlineDelete className="h-3 w-3" />,
            onClick: handleDelete,
            className: dangerClass,
        },
    ]

    return {
        rowActions,
        selectedOrganization,
        setSelectedOrganization,
    }
}