"use client";

import React from "react";
import { Input } from "../ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type FieldInputProps<TFieldValues extends FieldValues> = {
    control: Control<TFieldValues>; // kept for future react-hook-form integration
    label: string;
    type?: string;
    name: Path<TFieldValues>;
    placeholder?: string;
    helperText?: string;
    disabled?: boolean;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;

    /** Custom classes */
    className?: string; // wrapper <FormItem />
    inputClassName?: string; // <Input />
    labelClassName?: string; // <FormLabel />
};

const FieldInput = <TFieldValues extends FieldValues>({
    label,
    type = "text",
    name,
    placeholder,
    helperText,
    disabled,
    inputProps,
    control,
    className,
    inputClassName,
    labelClassName,
}: FieldInputProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                const hasError = !!fieldState.error;
                return (
                    <FormItem className={cn(className)}>
                        <FormLabel
                            className={cn(
                                "text-sm font-medium",
                                hasError && "text-destructive",
                                labelClassName
                            )}
                        >
                            {label}
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type={type}
                                placeholder={placeholder}
                                disabled={disabled}
                                className={cn(
                                    `
                                   bg-dark-night
                                   h-10
                                   border-none
                                   rounded-md
                                   border border-neutral-700/60
                                   px-3
                                   text-sm text-neutral-200
                                   shadow-sm

                                   focus-visible:outline-none
                                   focus-visible:ring-1 
                                   focus-visible:ring-platinum/40
                                   focus-visible:border-platinum/60
                                   transition-all
                                `,
                                    inputClassName
                                )}
                                {...inputProps}
                            />
                        </FormControl>
                        {helperText && !hasError && (
                            <FormDescription>{helperText}</FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export default FieldInput;
