export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
       <div className="min-h-screen w-full bg-dark-night flex items-center justify-center">
        <div className="max-w-[420px] w-full bg-night border border-mid-night/50 rounded-2xl p-8 sm:p-10">
            {children}
        </div>
       </div>
    );
};

export default AuthLayout;
