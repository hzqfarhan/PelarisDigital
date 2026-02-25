import { generateCaption } from "@/lib/ai/service";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function CaptionsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: pastCaptions } = await supabase
        .from("captions")
        .select("*")
        .eq("user_id", user?.id || "")
        .order("created_at", { ascending: false })
        .limit(10);

    async function handleGenerateCaption(formData: FormData) {
        "use server";

        const productName = formData.get("productName") as string;
        const usp = formData.get("usp") as string;
        const platform = formData.get("platform") as string;
        const tone = formData.get("tone") as string;

        if (!productName || !usp || !platform) return;

        const sb = createClient();
        const { data: { user } } = await sb.auth.getUser();

        if (!user) return;

        // Call AI Service
        const generated_text = await generateCaption({ productName, usp, platform, tone });

        // Save to DB
        await sb.from("captions").insert({
            user_id: user.id,
            product_name: productName,
            usp,
            platform,
            generated_text,
            tone: tone || "Casual"
        });

        revalidatePath("/dashboard/captions");
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">AI Caption Studio</h1>
                <p className="text-muted-foreground">Write highly engaging localized captions for any social platform.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
                <div className="md:col-span-5 space-y-6">
                    <form action={handleGenerateCaption} className="glass-card p-6 rounded-2xl flex flex-col gap-4 sticky top-6">
                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium mb-1">Product Name</label>
                            <input
                                id="productName"
                                name="productName"
                                type="text"
                                placeholder="e.g., Kopi Kurus Aliff Syukri"
                                className="w-full flex h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="usp" className="block text-sm font-medium mb-1">Unique Selling Proposition / Offer</label>
                            <textarea
                                id="usp"
                                name="usp"
                                placeholder="e.g., Buy 1 free 1, only for today. COD available."
                                className="w-full h-24 flex rounded-md border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Platform</label>
                                <select name="platform" className="w-full flex h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required>
                                    <option value="TikTok">TikTok</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="WhatsApp Broadcast">WhatsApp Broadcast</option>
                                    <option value="Shopee">Shopee Feed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Tone</label>
                                <select name="tone" className="w-full flex h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required>
                                    <option value="Casual & Friendly">Casual & Friendly</option>
                                    <option value="Hard Sell / Aggressive">Hard Sell</option>
                                    <option value="Educational / Trustworthy">Educational</option>
                                    <option value="Gen Z / Trendy Malay">Gen Z Slang</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-accent text-background hover:opacity-90 h-10 px-4 py-2 w-full mt-4"
                        >
                            Generate Magic Caption
                        </button>
                    </form>
                </div>

                <div className="md:col-span-7 space-y-4">
                    <h3 className="font-semibold text-lg flex items-center justify-between">
                        Recent Captions
                    </h3>

                    {pastCaptions && pastCaptions.length > 0 ? (
                        <div className="grid gap-4">
                            {pastCaptions.map((c) => (
                                <div key={c.id} className="glass-card p-5 rounded-xl border border-border/50 flex flex-col gap-3 transition-all hover:border-indigo-500/50 relative overflow-hidden group">
                                    <div className="flex items-center gap-2 justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center rounded-full border border-border bg-foreground/5 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md text-indigo-400">
                                                {c.platform}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{c.tone}</span>
                                        </div>
                                        <button className="text-xs bg-foreground/10 hover:bg-foreground/20 px-3 py-1.5 rounded-md font-medium backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">Copy</button>
                                    </div>
                                    <p className="text-sm whitespace-pre-wrap">{c.generated_text}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-12 glass-card rounded-2xl border border-dashed border-border/50 text-center text-muted-foreground">
                            <span className="text-4xl mb-3">✍️</span>
                            <p className="font-medium">No captions generated yet.</p>
                            <p className="text-sm">Start by entering your product details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
