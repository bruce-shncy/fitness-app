import { Organization } from "@/app/types/organization.type"
import { RowAction } from "@/components/Actions/row-actions.type"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { useDialog } from "@/providers/dialogs/AppDialogProvider";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';


export const useOrganizationAction = () =>{

    const {openDialog, closeDialog} = useDialog();
    
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);

    const handleEdit = (organization: Organization) => {
        setSelectedOrganization(organization);
    };

    const handleDelete = (organization: Organization) => {
        openDialog(
        <div className="space-y-3">
            <p>Delete {organization.name}?</p>
            <div className="flex gap-2">
            <Button variant="outline" onClick={closeDialog}>
                Cancel
            </Button>
            <Button
                onClick={() => {
                // delete API call here
                closeDialog();
                if (selectedOrganization?.id === organization.id) {
                    setSelectedOrganization(null);
                }
                }}
            >
                Confirm
            </Button>
            </div>
        </div>
        );
    };

    const baseActionClass =
        "inline-flex cursor-pointer items-center gap-1 text-carbon-gray hover:text-platinum transition-colors";

    const dangerClass =
        "inline-flex cursor-pointer items-center gap-1 text-red-400 hover:text-red-300 transition-colors";
    
    const rowActions = (organization: Organization): RowAction<Organization>[] => [
        {
            key: "edit",
            label: "Edit",
            className: (organization) => cn(baseActionClass, organization.id === selectedOrganization?.id),
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