"use client";
import { AppDialog } from "@/components/common/Dialog/AppDialog";
import React, {createContext, ReactNode, useContext, useState } from "react";

type DialogCtx = {
    openDialog: (content: ReactNode) => void;
    closeDialog: () => void
}

const DialogContext = createContext<DialogCtx | null>(null)

export const AppDialogProvider = ({
    children
} : { children: React.ReactNode}) => {

    const [content, setContent] = useState<ReactNode | null>(null)
    const [open, setOpen] = useState<boolean>(false)

    const openDialog = (c: ReactNode) => {
         setContent(c); 
         setOpen(true); 
    };

    const closeDialog = () => { 
        setOpen(false); 
        setContent(null); 
    };

    return (
        <DialogContext.Provider  value={{ openDialog, closeDialog}} >
            {children}
            <AppDialog open={open} onOpenChange={setOpen}>
                {content}
            </AppDialog>
        </DialogContext.Provider>
    )
}

export const useDialog = () => {
    const ctx = useContext(DialogContext)

    if (!ctx) throw new Error("useDialig must be used within DialogProvider")

    return ctx;
}