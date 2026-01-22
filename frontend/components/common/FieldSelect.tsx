"use client";

import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type SelectOption = {
    value: string;
    label: string;
};

type FieldSelectProps<TFieldValues extends FieldValues> = {
    control: Control<TFieldValues>;
    label: string;
    name: Path<TFieldValues>;
    options: SelectOption[];
    placeholder?: string;
    helperText?: string;
    disabled?: boolean;

    /** Custom classes */
    className?: string;
    selectClassName?: string;
    labelClassName?: string;
};

const FieldSelect = <TFieldValues extends FieldValues>({
    label,
    name,
    options,
    placeholder = "Select an option",
    helperText,
    disabled,
    control,
    className,
    selectClassName,
    labelClassName,
}: FieldSelectProps<TFieldValues>) => {
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
                            <select
                                {...field}
                                disabled={disabled}
                                className={cn(
                                    `
                                    w-full
                                    bg-dark-night
                                    h-10
                                    border-none
                                    rounded-md
                                    border border-neutral-700/60
                                    px-3
                                    text-sm text-neutral-200
                                    shadow-sm
                                    appearance-none
                                    cursor-pointer

                                    focus-visible:outline-none
                                    focus-visible:ring-1
                                    focus-visible:ring-platinum/40
                                    focus-visible:border-platinum/60
                                    transition-all

                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                    `,
                                    selectClassName
                                )}
                            >
                                <option value="" className="bg-dark-night text-carbon-gray">
                                    {placeholder}
                                </option>
                                {options.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                        className="bg-dark-night text-platinum"
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
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

export default FieldSelect;
