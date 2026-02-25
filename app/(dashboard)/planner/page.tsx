import { generateCalendar } from "@/lib/ai/service";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function PlannerPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: profile } = await supabase
        .from("business_profile")
        .select("niche, primary_goal")
        .eq("user_id", user?.id || "")
        .single();

    const { data: calendarData } = await supabase
        .from("calendar_posts")
        .select("*")
        .eq("user_id", user?.id || "")
        .order("post_date", { ascending: true });

    const hasCalendar = calendarData && calendarData.length > 0;

    async function handleGenerateCalendar() {
        "use server";

        const sb = createClient();
        const { data: { user } } = await sb.auth.getUser();

        if (!user) return;

        const { data: profileOptions } = await sb
            .from("business_profile")
            .select("niche, primary_goal")
            .eq("user_id", user.id)
            .single();

        if (!profileOptions) return;

        // Call AI Service
        const generated = await generateCalendar({
            niche: profileOptions.niche,
            goal: profileOptions.primary_goal
        });

        if (!generated || generated.length === 0) return;

        // Clear old calendar
        await sb.from("calendar_posts").delete().eq("user_id", user.id);

        // Save to DB
        const today = new Date();
        const rowsToInsert = generated.map((dayObj: any) => {
            const postDate = new Date(today);
            postDate.setDate(today.getDate() + (dayObj.day - 1));

            return {
                user_id: user.id,
                post_date: postDate.toISOString().split('T')[0],
                content_type: dayObj.contentType,
                hook: dayObj.hook,
                caption_idea: dayObj.captionIdea,
                platform: dayObj.platform,
            };
        });

        if (rowsToInsert.length > 0) {
            await sb.from("calendar_posts").insert(rowsToInsert);
        }

        revalidatePath("/dashboard/planner");
    }

    return (
        <div className="space-y-8 min-h-[calc(100vh-8rem)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">30-Day Content Planner</h1>
                    <p className="text-muted-foreground">AI-generated content strategy tailored to {profile?.niche || "your niche"}.</p>
                </div>

                <form action={handleGenerateCalendar}>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-white text-black hover:bg-gray-200 h-10 px-6 py-2"
                    >
                        {hasCalendar ? "Regenerate Calendar" : "Generate 30-Day Plan"}
                    </button>
                </form>
            </div>

            {!hasCalendar ? (
                <div className="flex flex-col items-center justify-center h-96 glass-card rounded-2xl border border-dashed border-border text-center text-muted-foreground">
                    <span className="text-5xl mb-4">📅</span>
                    <p className="font-medium text-lg text-foreground mb-2">Your calendar is empty</p>
                    <p className="text-sm max-w-sm mb-6">Let AI analyze your business profile and create a complete 30-day posting schedule optimized for your goals.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {calendarData.map((post) => (
                        <div key={post.id} className="glass-card rounded-xl border border-border p-4 flex flex-col gap-3 group relative hover:border-border transition-colors">
                            <div className="flex items-center justify-between text-xs text-muted-foreground pb-2 border-b border-border">
                                <span className="font-medium text-foreground">{new Date(post.post_date).toLocaleDateString('en-MY', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                <span className="bg-foreground/5 px-2 py-1 rounded text-[10px] font-semibold text-blue-400">{post.platform}</span>
                            </div>

                            <div>
                                <span className="text-[10px] uppercase font-bold text-foreground/60 tracking-wider">Format</span>
                                <p className="text-sm font-medium text-pink-400">{post.content_type}</p>
                            </div>

                            <div>
                                <span className="text-[10px] uppercase font-bold text-foreground/60 tracking-wider">Hook</span>
                                <p className="text-sm font-medium leading-snug line-clamp-3">{post.hook}</p>
                            </div>

                            <div className="flex-1">
                                <span className="text-[10px] uppercase font-bold text-foreground/60 tracking-wider">Caption Idea</span>
                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">{post.caption_idea}</p>
                            </div>

                            <div className="pt-2 flex gap-2">
                                <button className="flex-1 bg-foreground/5 hover:bg-foreground/10 text-xs py-1.5 rounded transition-colors text-center border border-border">Write Caption</button>
                                <button className="flex-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-xs py-1.5 rounded transition-colors text-center border border-blue-500/20">Schedule</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
