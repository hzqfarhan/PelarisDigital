import { generateHooks } from "@/lib/ai/service";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function HooksPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch past hooks to display
    const { data: pastHooks } = await supabase
        .from("hooks")
        .select("*")
        .eq("user_id", user?.id || "")
        .order("created_at", { ascending: false })
        .limit(10);

    async function handleGenerateHook(formData: FormData) {
        "use server";

        const topic = formData.get("topic") as string;
        if (!topic) return;

        const sb = createClient();
        const { data: { user } } = await sb.auth.getUser();

        if (!user) return;

        // Call AI Service
        const generated = await generateHooks({ topic });

        // Save to DB
        const rowsToInsert = generated.map((h: any) => ({
            user_id: user.id,
            category: h.category,
            content: h.hookText
        }));

        if (rowsToInsert.length > 0) {
            await sb.from("hooks").insert(rowsToInsert);
        }

        revalidatePath("/dashboard/hooks");
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Auto Hook Generator</h1>
                <p className="text-muted-foreground">Generate 5 distinct hook angles instantly for your next video.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
                <div className="md:col-span-5 space-y-6">
                    <form action={handleGenerateHook} className="glass-card p-6 rounded-2xl flex flex-col gap-4 sticky top-6">
                        <div>
                            <label htmlFor="topic" className="block text-sm font-medium mb-1">What is your video about?</label>
                            <textarea
                                id="topic"
                                name="topic"
                                placeholder="e.g., 3 common mistakes when cooking Sambal Nyet..."
                                className="w-full h-32 flex rounded-md border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-foreground text-background hover:opacity-90 h-10 px-4 py-2 w-full mt-2"
                        >
                            Generate 5 Hooks
                        </button>
                        <p className="text-xs text-center text-muted-foreground">Costs 1 AI Generation limit.</p>
                    </form>
                </div>

                <div className="md:col-span-7 space-y-4">
                    <h3 className="font-semibold text-lg flex items-center justify-between">
                        Recent Hook Generations
                    </h3>

                    {pastHooks && pastHooks.length > 0 ? (
                        <div className="grid gap-4">
                            {pastHooks.map((h) => (
                                <div key={h.id} className="glass-card p-5 rounded-xl border border-border/50 flex flex-col gap-2 transition-all hover:border-primary/50 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-xs bg-foreground/10 hover:bg-foreground/20 px-3 py-1.5 rounded-md font-medium backdrop-blur-sm">Copy</button>
                                    </div>
                                    <div className="inline-flex max-w-max items-center rounded-full border border-border bg-foreground/5 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md text-purple-400">
                                        {h.category}
                                    </div>
                                    <p className="text-sm font-medium leading-relaxed pr-12">{h.content}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-12 glass-card rounded-2xl border border-dashed border-border/50 text-center text-muted-foreground">
                            <span className="text-4xl mb-3">⚡</span>
                            <p className="font-medium">No hooks generated yet.</p>
                            <p className="text-sm">Use the form to generate your first batch of viral hooks!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
