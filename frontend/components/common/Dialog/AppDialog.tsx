"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import React, { ReactNode } from "react";

interface IAppDialog {
    open: boolean
    onOpenChange: (open: boolean) => void; 
    title?: string
    description?: string 
    footer?: ReactNode
    children: ReactNode
}
export const AppDialog: React.FC<IAppDialog> = ({
    open, 
    onOpenChange,
    title,
    description,
    footer,
    children
}) => {
    const resolvedTitle = title ?? "Dialog";
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    {title ? (
                        <DialogTitle>{title}</DialogTitle>
                    ) : (
                        <span className='sr-only'>
                            <DialogTitle>{resolvedTitle}</DialogTitle>
                        </span>
                    )}
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                {children}
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    )
}