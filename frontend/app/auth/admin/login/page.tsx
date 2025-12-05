"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";

import { loginAsAdmin } from "@/services/auth.service";
import { setToken } from "@/lib/api";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});


type LoginFormValues = z.infer<typeof loginSchema>;

export const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        try {
            const response = await loginAsAdmin(data);
            const token =
                response &&
                typeof response === "object" &&
                "accessToken" in response
                    ? (response as { accessToken: string }).accessToken
                    : null;

            if (token) {
                setToken(token);
            }

            toast.success("Welcome back");
            router.push("/admin/organizations");
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full max-w-s mx-auto text-platinum'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldSet>
                    <div className='text-center space-y-2'>
                        <h1 className='text-3xl font-bold tracking-tight'>
                            DeciFit
                        </h1>
                        <p className='text-sm text-carbon-gray font-medium uppercase tracking-wider'>
                            Admin Login
                        </p>
                    </div>
                    <FieldGroup className='space-y-2'>
                        <Field>
                            <FieldLabel className='text-sm font-medium text-platinum/80'>
                                Email
                            </FieldLabel>
                            <Input
                                id='email'
                                type='email'
                                placeholder='Enter your email'
                                className={`bg-mid-night border-carbon-gray/30 text-platinum placeholder:text-carbon-gray focus:border-platinum/50 focus:ring-platinum/50 transition-all h-11 ${
                                    errors.email
                                        ? "border-red-500 focus:border-red-500"
                                        : ""
                                }`}
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className='text-xs text-red-500 mt-1'>
                                    {errors.email.message}
                                </p>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel className='text-sm font-medium text-platinum/80'>
                                Password
                            </FieldLabel>
                            <Input
                                id='password'
                                type='password'
                                placeholder='Enter your password'
                                className={`bg-mid-night border-carbon-gray/30 text-platinum placeholder:text-carbon-gray focus:border-platinum/50 focus:ring-platinum/50 transition-all h-11 ${
                                    errors.password
                                        ? "border-red-500 focus:border-red-500"
                                        : ""
                                }`}
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className='text-xs text-red-500 mt-1'>
                                    {errors.password.message}
                                </p>
                            )}
                            <div className='flex justify-end'>
                                <Link
                                    href={"/auth/admin/forgot-password"}
                                    className='text-xs text-carbon-gray hover:text-platinum transition-colors'
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </Field>
                    </FieldGroup>
                    <div className='w-full pt-2'>
                        <Button
                            type='submit'
                            disabled={isLoading}
                            className='w-full bg-platinum text-night hover:bg-white py-3 font-medium text-base transition-transform active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                </FieldSet>
            </form>
        </div>
    );
};

export default Login;
