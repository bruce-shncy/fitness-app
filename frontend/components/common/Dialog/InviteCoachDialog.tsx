"use client";

import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FieldInput from "@/components/common/FieldInput";
import FieldSelect from "@/components/common/FieldSelect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { invitation } from "@/services/invitation.service";
import useInvitation from "@/services/swr/invitation.swr";
import useOrganization from "@/services/swr/organization.swr";
import { toast } from "sonner";

const inviteFormSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    name: z.string().min(1, { message: "Name is required" }),
    organization_id: z.string().optional(),
});

type InviteFormType = z.infer<typeof inviteFormSchema>;

type InviteCoachDialogProps = {
    onCancel: () => void;
    onSuccess?: () => void;
};

export const InviteCoachDialog = ({
    onCancel,
    onSuccess,
}: InviteCoachDialogProps) => {
    const { mutate } = useInvitation();
    const { organizations } = useOrganization();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<InviteFormType>({
        resolver: zodResolver(inviteFormSchema),
        defaultValues: {
            email: "",
            name: "",
            organization_id: "",
        },
    });

    const organizationOptions = organizations.map((org) => ({
        value: String(org.id),
        label: org.name,
    }));

    const onSubmit = async (data: InviteFormType) => {
        setIsSubmitting(true);
        try {
            await invitation.create({
                email: data.email,
                name: data.name,
                organization_id: data.organization_id ? parseInt(data.organization_id, 10) : null,
            });
            mutate();
            toast.success("Invitation sent successfully");
            onSuccess?.();
            onCancel();
        } catch (error: unknown) {
            const err = error as { message?: string };
            toast.error(err?.message ?? "Failed to send invitation");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-platinum/10 text-platinum">
                    <AiOutlineMail className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-foreground">
                        Invite Coach
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Send an invitation email to a new coach.
                    </p>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FieldInput<InviteFormType>
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="coach@example.com"
                        control={form.control}
                        labelClassName="text-[11px] font-medium text-carbon-gray uppercase tracking-[0.2em]"
                        inputClassName="bg-dark-night border-mid-night/60"
                    />
                    <FieldInput<InviteFormType>
                        name="name"
                        label="Name"
                        placeholder="John Doe"
                        control={form.control}
                        labelClassName="text-[11px] font-medium text-carbon-gray uppercase tracking-[0.2em]"
                        inputClassName="bg-dark-night border-mid-night/60"
                    />
                    <FieldSelect<InviteFormType>
                        name="organization_id"
                        label="Organization"
                        placeholder="Select organization (optional)"
                        options={organizationOptions}
                        control={form.control}
                        labelClassName="text-[11px] font-medium text-carbon-gray uppercase tracking-[0.2em]"
                        selectClassName="bg-dark-night border-mid-night/60"
                    />

                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-platinum text-night hover:bg-platinum/90"
                        >
                            {isSubmitting ? "Sending..." : "Send Invitation"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
