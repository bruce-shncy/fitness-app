"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <main className='min-h-screen w-full bg-dark-night text-platinum flex items-center justify-center px-6'>
            <div className='max-w-md w-full text-center space-y-6'>
                <p className='text-xs font-semibold tracking-[0.35em] text-carbon-gray uppercase'>
                    Error 404
                </p>
                <h1 className='text-3xl font-semibold tracking-tight'>
                    Page not found
                </h1>
                <p className='text-sm text-carbon-gray'>
                    The page you are looking for doesn&apos;t exist or may have
                    been moved. Check the URL, or go back to your dashboard.
                </p>
                <div className='flex items-center justify-center gap-3 pt-2'>
                    <Link
                        href='/admin/dashboard'
                        className='inline-flex items-center justify-center rounded-md bg-platinum px-4 py-2 text-xs font-semibold uppercase tracking-wide text-night hover:bg-platinum/90 transition-colors'
                    >
                        Go to dashboard
                    </Link>
                    <Link
                        href='/'
                        className='text-xs text-carbon-gray hover:text-platinum transition-colors'
                    >
                        Back to home
                    </Link>
                </div>
            </div>
        </main>
    );
}
