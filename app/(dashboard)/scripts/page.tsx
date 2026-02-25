import { generateSalesScript } from "@/lib/ai/service";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function ScriptsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: scripts } = await supabase
        .from("sales_scripts")
        .select("*")
        .eq("user_id", user?.id || "")
        .order("created_at", { ascending: false });

    async function handleGenerateScript(formData: FormData) {
        "use server";

        const objection = formData.get("objection") as string;
        if (!objection) return;

        const sb = createClient();
        const { data: { user } } = await sb.auth.getUser();

        if (!user) return;

        const response_text = await generateSalesScript({ objection });

        await sb.from("sales_scripts").insert({
            user_id: user.id,
            objection,
            response_text,
        });

        revalidatePath("/dashboard/scripts");
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Sales Funnel Scripts</h1>
                <p className="text-muted-foreground">Generate persuasive WhatsApp replies to handle common customer objections.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    <form action={handleGenerateScript} className="glass-card p-6 rounded-2xl flex flex-col gap-4 sticky top-6">
                        <div>
                            <label htmlFor="objection" className="block text-sm font-medium mb-1">Customer Objection</label>
                            <input
                                id="objection"
                                name="objection"
                                type="text"
                                placeholder="e.g., 'Mahal sangat la bang'"
                                className="w-full flex h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-green-600 text-background hover:bg-green-700 h-10 px-4 py-2 w-full mt-2"
                        >
                            Generate Smart Reply
                        </button>
                    </form>

                    {/* Preset common objections for quick generation */}
                    <div className="glass-card p-6 rounded-2xl border border-border/50">
                        <h3 className="font-semibold text-sm mb-3">Quick Generate:</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Mahal sangat", "Nanti saya bincang dengan suami", "Saya fikir dulu", "Nak tengok feedback", "Ada COD tak?"].map(preset => (
                                <form action={handleGenerateScript} key={preset}>
                                    <input type="hidden" name="objection" value={preset} />
                                    <button type="submit" className="text-xs border border-border bg-foreground/5 hover:bg-foreground/10 px-3 py-1.5 rounded-full transition-colors">
                                        "{preset}"
                                    </button>
                                </form>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center justify-between border-b border-border pb-2">
                        Your Scripts Library
                    </h3>

                    <div className="flex flex-col gap-4">
                        {scripts && scripts.length > 0 ? (
                            scripts.map((s) => (
                                <div key={s.id} className="glass-card p-5 rounded-xl border border-border/50 flex flex-col gap-3 group relative">
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-foreground/10 hover:bg-foreground/20 rounded-md text-xs backdrop-blur-sm">Copy</button>
                                    </div>

                                    <div className="pr-10">
                                        <span className="text-[10px] uppercase font-bold text-foreground/70 tracking-wider">Customer Objection</span>
                                        <p className="text-sm font-medium bg-red-500/10 text-red-400 p-2 rounded inline-block mt-1">"{s.objection}"</p>
                                    </div>

                                    <div>
                                        <span className="text-[10px] uppercase font-bold text-foreground/70 tracking-wider">AI Reply</span>
                                        <p className="text-sm whitespace-pre-wrap mt-1 text-green-50/90 leading-relaxed bg-green-500/5 p-3 rounded border border-green-500/10">
                                            {s.response_text}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                                <p>No scripts generated yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
