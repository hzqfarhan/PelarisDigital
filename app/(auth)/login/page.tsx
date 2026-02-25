import { loginWithEmail, signupWithEmail } from "@/app/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage({
    searchParams,
}: {
    searchParams: { error?: string }
}) {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="absolute top-8 left-8">
                <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>

            <div className="w-full max-w-md p-8 glass-card rounded-2xl relative z-10">
                <div className="mb-8 text-center">
                    <img src="/logo.png" alt="Pelaris Digital Logo" className="h-16 w-auto object-contain mx-auto mb-4" />
                    <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-muted-foreground mt-2 text-sm">Enter your credentials to access your workspace</p>
                </div>

                {searchParams?.error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-md mb-6 text-center">
                        {searchParams.error}
                    </div>
                )}

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@company.com"
                            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            formAction={loginWithEmail}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                        >
                            Sign In
                        </button>

                        <div className="relative my-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>

                        <button
                            formAction={signupWithEmail}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>

            {/* Decorative background blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        </div>
    );
}
