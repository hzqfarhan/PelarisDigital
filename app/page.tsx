import Link from "next/link";
import { ArrowRight, BarChart3, Bot, Calendar, Image as ImageIcon, MessageSquare } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center overflow-x-hidden selection:bg-accent/20">
            {/* Header (Acctual Style Pill) */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
                <header className="glass-card rounded-full px-6 py-4 flex justify-between items-center border-border/50">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Pelaris Digital" className="h-10 w-auto object-contain" />
                    </div>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
                        <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
                        <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                        <Link href="/login" className="hover:text-foreground transition-colors">Login</Link>
                    </nav>
                    <Link href="/login" className="bg-foreground text-background px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-foreground/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                        Get Started
                    </Link>
                </header>
            </div>

            {/* Hero Section */}
            <main className="flex-1 w-full flex flex-col items-center justify-center text-center px-4 pt-48 pb-20 z-10 relative">

                {/* Decorative floating dots/blobs mimicking Acctual's floating coins/paperclips */}
                <div className="absolute top-40 left-[10%] w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-20 right-[15%] w-40 h-40 bg-destructive/10 rounded-full blur-3xl -z-10" />

                <div className="inline-flex items-center rounded-full border border-border bg-card shadow-sm px-4 py-1.5 text-sm font-semibold mb-8 text-foreground/80">
                    <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
                    Now with Gemini AI Integration
                </div>

                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter max-w-5xl mb-8 leading-[1.1] text-foreground text-balance">
                    The AI Marketing Assistant for <br className="hidden md:block" />
                    <span className="relative inline-block pb-2">
                        Malaysian SMEs
                        {/* Acctual style hand-drawn underline using an SVG or simple border */}
                        <svg className="absolute w-full h-4 -bottom-2 left-0 text-accent opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                        </svg>
                    </span>
                </h1>

                <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mb-12 font-medium leading-relaxed">
                    Supercharge your TikTok, WhatsApp, and Shopee sales with automated captions, hooks, daily planners, and smart graphics—built entirely for the local market.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <Link href="/login" className="bg-foreground text-background px-8 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl flex items-center gap-2">
                        Start Free Trial <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link href="/login" className="bg-card text-foreground border border-border px-8 py-5 rounded-full font-bold text-lg hover:bg-muted transition-all shadow-sm">
                        View Live Demo
                    </Link>
                </div>

                {/* Feature Grid */}
                <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-40 text-left relative">
                    <div className="col-span-1 md:col-span-3 text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Everything you need to scale.</h2>
                        <p className="text-xl text-muted-foreground font-medium">Euros, Dollars, Ringgit... just kidding. We do content and we do it fast.</p>
                    </div>

                    <div className="glass-card p-8 rounded-[2rem] flex flex-col gap-4 group hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                            <Bot className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">AI Caption & Hook Gen</h3>
                        <p className="text-muted-foreground font-medium flex-1">Generate tailored, high-converting copy in English and localized Malay slang for any platform.</p>
                    </div>

                    <div className="glass-card p-8 rounded-[2rem] flex flex-col gap-4 group hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive group-hover:scale-110 transition-transform">
                            <ImageIcon className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">Smart Image Studio</h3>
                        <p className="text-muted-foreground font-medium flex-1">Auto-remove backgrounds and generate aesthetic product shots sized perfectly for social feeds.</p>
                    </div>

                    <div className="glass-card p-8 rounded-[2rem] flex flex-col gap-4 group hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <Calendar className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">30-Day Content Planner</h3>
                        <p className="text-muted-foreground font-medium flex-1">Fill your calendar with AI-suggested content ideas, hooks, and drafts in one click.</p>
                    </div>

                    <div className="glass-card p-8 rounded-[2rem] flex flex-col gap-4 shadow-sm group hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">Sales Funnel Scripts</h3>
                        <p className="text-muted-foreground font-medium flex-1">Auto-reply scripts for WhatsApp. Handle objections like "Mahal sangat" professionally.</p>
                    </div>

                    <div className="glass-card p-8 rounded-[2rem] flex flex-col gap-4 md:col-span-2 group hover:-translate-y-1 transition-transform bg-foreground text-background">
                        <div className="w-14 h-14 rounded-2xl bg-background/20 flex items-center justify-center text-background group-hover:scale-110 transition-transform">
                            <BarChart3 className="w-7 h-7" />
                        </div>
                        <h3 className="text-3xl font-bold tracking-tight text-background">Performance Analytics & Multi-Platform Scheduler</h3>
                        <p className="text-background/80 font-medium text-lg leading-relaxed flex-1">Track your engagement across platforms, discover the best times to post based on history, and auto-schedule your AI-generated content in a centralized dashboard.</p>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-12 text-center text-sm font-medium border-t border-border mt-20 bg-card">
                <p>© 2026 Pelaris Digital. All rights reserved.</p>
            </footer>
        </div>
    );
}
