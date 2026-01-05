"use client";
import FieldInput from "@/components/common/FieldInput";
import React from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useOrganization from "@/services/swr/organization.swr";
import { organization } from "@/services/organization.service";

const formSchema = z.object({
    name: z.string().min(1, { message: "Organization name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
});

type OrganizationFormType = z.infer<typeof formSchema>;

export const CreateOrganizationForm = () => {
    const { mutate} = useOrganization();
    const form = useForm<OrganizationFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
        },
    });

    const onSubmit = async (data: OrganizationFormType) => {
        console.log("submitted data", data);

        try {
            const response = await organization.create(data);
            console.log(response)
            mutate()
        } catch (e) {
            
        }
    };

    return (
        <div className='rounded-xl bg-mid-night/90 px-6 py-7 border border-mid-night/60 shadow-sm'>
            <h3 className='text-sm font-semibold tracking-tight'>
                Create organization
            </h3>
            <p className='mt-1 text-xs text-carbon-gray tracking-tight'>
                Add a new organization to your admin panel.
            </p>

            <Form {...form}>
                <form
                    className='mt-5 space-y-4'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FieldInput<OrganizationFormType>
                        name='name'
                        label='Name'
                        placeholder='DeciFit Gym HQ'
                        control={form.control}
                        labelClassName='text-[11px] font-medium text-carbon-gray uppercase tracking-[0.2em]'
                        inputClassName='bg-dark-night border-mid-night/60'
                    />
                    <FieldInput<OrganizationFormType>
                        name='address'
                        label='Address'
                        placeholder='123 Fitness Street, London'
                        control={form.control}
                        labelClassName='text-[11px] font-medium text-carbon-gray uppercase tracking-[0.2em]'
                        inputClassName='bg-dark-night border-mid-night/60'
                    />
                    <Button
                        type='submit'
                        className='mt-2 cursor-pointer inline-flex items-center justify-center rounded-md bg-platinum px-4 py-2 text-xs font-semibold uppercase tracking-wide text-night hover:bg-platinum/90 transition-colors'
                    >
                        Create
                    </Button>
                </form>
            </Form>
        </div>
    );
};
