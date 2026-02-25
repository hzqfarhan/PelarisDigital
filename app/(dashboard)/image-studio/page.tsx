import { createClient } from "@/lib/supabase/server";
import { UploadCloud, Image as ImageIcon, Download } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function ImageStudioPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Mock function for Image Generation pipeline for demo purposes.
    // In a real app, this would use an API like Photoroom, Cloudinary, or DALL-E.
    async function handleGenerateImage(formData: FormData) {
        "use server";

        // Simulating delay for image processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        const sb = createClient();
        const { data: { user } } = await sb.auth.getUser();

        if (!user) return;

        // We would upload the transformed image to Supabase Storage here.
        // We will just simulate a success message for now.

        revalidatePath("/dashboard/image-studio");
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Smart Image Studio</h1>
                    <p className="text-muted-foreground">Remove backgrounds, add typography, and auto-resize your product shots.</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                {/* Workspace */}
                <div className="glass-card flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-primary/50 text-center min-h-[400px]">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <UploadCloud className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Drag & drop your product image</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mb-6">
                        Upload a raw product image. Our AI will automatically remove the background and apply your brand colors.
                    </p>

                    <form action={handleGenerateImage} className="w-full max-w-xs space-y-4">
                        <div>
                            <input type="file" className="w-full text-sm text-muted-foreground
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary/20 file:text-primary
                    hover:file:bg-primary/30
                  "/>
                        </div>

                        <div className="pt-2 text-left">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Target Dimensions</label>
                            <div className="grid grid-cols-3 gap-2">
                                <label className="border border-border rounded p-2 text-center cursor-pointer hover:border-primary transition-colors text-xs font-medium bg-background text-muted-foreground">
                                    <input type="radio" name="format" value="1x1" className="sr-only peer" defaultChecked />
                                    <div className="peer-checked:text-primary">1:1<br />Instagram</div>
                                </label>
                                <label className="border border-border rounded p-2 text-center cursor-pointer hover:border-primary transition-colors text-xs font-medium bg-background text-muted-foreground">
                                    <input type="radio" name="format" value="9x16" className="sr-only peer" />
                                    <div className="peer-checked:text-primary">9:16<br />TikTok</div>
                                </label>
                                <label className="border border-border rounded p-2 text-center cursor-pointer hover:border-primary transition-colors text-xs font-medium bg-background text-muted-foreground">
                                    <input type="radio" name="format" value="4x5" className="sr-only peer" />
                                    <div className="peer-checked:text-primary">4:5<br />Facebook</div>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-foreground text-background font-medium py-2 rounded-md transition-opacity hover:opacity-90">
                            Process Image
                        </button>
                    </form>
                </div>

                {/* Gallery */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Your Rendered Assets</h3>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Example rendered assets block */}
                        <div className="glass-card rounded-xl border border-border overflow-hidden group">
                            <div className="aspect-square bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center relative">
                                <ImageIcon className="w-10 h-10 text-background/50" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm gap-2">
                                    <button className="bg-foreground/20 hover:bg-foreground/30 p-2 rounded-full text-background backdrop-blur-md">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3 text-sm flex justify-between items-center">
                                <span className="truncate">Promo_IG_1.png</span>
                                <span className="text-xs text-muted-foreground bg-foreground/5 px-2 py-0.5 rounded">1:1</span>
                            </div>
                        </div>

                        <div className="glass-card rounded-xl border border-border overflow-hidden group">
                            <div className="aspect-[9/16] bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center relative">
                                <ImageIcon className="w-10 h-10 text-background/50" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm gap-2">
                                    <button className="bg-foreground/20 hover:bg-foreground/30 p-2 rounded-full text-background backdrop-blur-md">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3 text-sm flex justify-between items-center">
                                <span className="truncate">TikTok_Sale.png</span>
                                <span className="text-xs text-muted-foreground bg-foreground/5 px-2 py-0.5 rounded">9:16</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
