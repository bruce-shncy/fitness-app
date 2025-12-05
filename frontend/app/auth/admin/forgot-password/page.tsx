import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ForgotPassword() {
    return (
        <div className='text-platinum w-full max-w-xs mx-auto'>
            <FieldSet className='space-y-6'>
                <div className='text-center space-y-2'>
                    <h1 className='text-2xl font-bold tracking-tight text-platinum'>
                        Recovery
                    </h1>
                    <p className='text-sm text-carbon-gray font-medium'>
                        Enter your email to reset your password
                    </p>
                </div>
                <FieldGroup className='space-y-4'>
                    <Field>
                        <FieldLabel
                            htmlFor='email'
                            className='text-sm font-medium text-platinum/80'
                        >
                            Email
                        </FieldLabel>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            autoComplete='email'
                            placeholder='refero.john.doe@gmail.com'
                            className='bg-mid-night border-carbon-gray/30 text-platinum placeholder:text-carbon-gray focus:border-platinum/50 focus:ring-platinum/50 transition-all h-11'
                        />
                    </Field>
                </FieldGroup>
                <div className='w-full pt-2 space-y-4'>
                    <Button className='w-full bg-platinum text-night hover:bg-white h-11 font-medium text-base transition-transform active:scale-[0.98]'>
                        Send Reset Link
                    </Button>
                    <div className='text-center'>
                        <Link
                            href='/auth/admin/login'
                            className='text-xs text-carbon-gray hover:text-platinum transition-colors'
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </FieldSet>
        </div>
    );
}
