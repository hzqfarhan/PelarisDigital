import { createClient } from "@/lib/supabase/server";
import { BarChart3, TrendingUp, Users, CalendarDays } from "lucide-react";

export default async function DashboardOverviewPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch some summary stats
    const { count: captionsCount } = await supabase
        .from("captions")
        .select("*", { count: 'exact', head: true })
        .eq("user_id", user?.id || "");

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                <p className="text-muted-foreground">Monitor your AI marketing performance.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
                {/* Stat Cards */}
                <div className="glass-card rounded-xl p-6 border-l-4 border-l-primary flex flex-col gap-2">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-sm font-medium">Captions Generated</span>
                        <PenToolIcon className="w-4 h-4" />
                    </div>
                    <div className="text-3xl font-bold">{captionsCount || 0}</div>
                </div>

                <div className="glass-card rounded-xl p-6 border-l-4 border-l-pink-500 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-sm font-medium">Active Hooks</span>
                        <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="text-3xl font-bold">0</div>
                </div>

                <div className="glass-card rounded-xl p-6 border-l-4 border-l-blue-500 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-sm font-medium">Scheduled Posts</span>
                        <CalendarDays className="w-4 h-4" />
                    </div>
                    <div className="text-3xl font-bold">0</div>
                </div>

                <div className="glass-card rounded-xl p-6 border-l-4 border-l-green-500 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-sm font-medium">Engagement Rate</span>
                        <BarChart3 className="w-4 h-4" />
                    </div>
                    <div className="text-3xl font-bold">0%</div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="glass-card rounded-xl border border-border p-6 lg:col-span-4">
                    <h3 className="font-semibold mb-4">Engagement Overview</h3>
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm border border-dashed border-border rounded-lg">
                        No analytics data available yet. Start posting to see trends!
                    </div>
                </div>

                <div className="glass-card rounded-xl border border-border p-6 lg:col-span-3">
                    <h3 className="font-semibold mb-4">Recent AI Generations</h3>
                    <div className="space-y-4">
                        <div className="text-sm text-center text-muted-foreground py-8">
                            You haven't generated any content yet. <br /><br />
                            <a href="/dashboard/captions" className="text-primary hover:underline">Go to Caption Studio</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PenToolIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="2" />
        </svg>
    )
}
