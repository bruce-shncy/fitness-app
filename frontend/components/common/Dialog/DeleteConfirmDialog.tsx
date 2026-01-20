"use client";

import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";

type DeleteConfirmDialogProps = {
  itemName: string;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
};

export const DeleteConfirmDialog = ({
  itemName,
  onCancel,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  isLoading = false,
}: DeleteConfirmDialogProps) => {
  const resolvedTitle = title ?? `Delete ${itemName}?`;
  const resolvedDescription =
    description ??
    "This action cannot be undone. This will permanently remove the record.";

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AiOutlineDelete className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">
            {resolvedTitle}
          </h2>
          <p className="text-sm text-muted-foreground">
            {resolvedDescription}
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
};
