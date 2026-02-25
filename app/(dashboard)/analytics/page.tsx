"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpRight, CopyCheck, Type, Target } from 'lucide-react';

const engagementData = [
    { name: 'Mon', tiktok: 4000, ig: 2400, shopee: 2400 },
    { name: 'Tue', tiktok: 3000, ig: 1398, shopee: 2210 },
    { name: 'Wed', tiktok: 2000, ig: 9800, shopee: 2290 },
    { name: 'Thu', tiktok: 2780, ig: 3908, shopee: 2000 },
    { name: 'Fri', tiktok: 1890, ig: 4800, shopee: 2181 },
    { name: 'Sat', tiktok: 2390, ig: 3800, shopee: 2500 },
    { name: 'Sun', tiktok: 3490, ig: 4300, shopee: 2100 },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
                <p className="text-muted-foreground">Track engagement, discover patterns, and measure AI tool ROI.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* AI ROI Insights */}
                <div className="glass-card rounded-xl p-6 border-l-4 border-l-blue-500">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <CopyCheck className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> +12%
                        </span>
                    </div>
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Hook Adoption Rate</h4>
                    <div className="text-2xl font-bold">84%</div>
                    <p className="text-xs text-muted-foreground mt-2">of generated hooks resulted in higher engagement.</p>
                </div>

                <div className="glass-card rounded-xl p-6 border-l-4 border-l-purple-500">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                            <Type className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> +5%
                        </span>
                    </div>
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Caption Gen Z Tone</h4>
                    <div className="text-2xl font-bold">Top Performer</div>
                    <p className="text-xs text-muted-foreground mt-2">Averages 210 likes per post.</p>
                </div>

                <div className="glass-card rounded-xl p-6 border-l-4 border-l-pink-500 lg:col-span-2">
                    <div className="flex items-start gap-4 h-full">
                        <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 flex-shrink-0">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-background mb-2">AI Suggestion ✨</h4>
                            <p className="text-sm text-pink-100/80 leading-relaxed">
                                Your TikTok engagement peaks consistently between <strong>8 PM and 10 PM</strong> on weekdays. We recommend scheduling your Educational hooks and Gen-Z captions during this window for maximum reach.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Engagement Chart */}
                <div className="glass-card rounded-2xl p-6 border border-border">
                    <h3 className="font-semibold mb-6">Cross-Platform Engagement (Weekly)</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={engagementData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="name" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="tiktok" stroke="#ec4899" activeDot={{ r: 8 }} name="TikTok Views" />
                                <Line type="monotone" dataKey="ig" stroke="#a855f7" name="IG Reach" />
                                <Line type="monotone" dataKey="shopee" stroke="#ef4444" name="Shopee Store Visits" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Usage Chart */}
                <div className="glass-card rounded-2xl p-6 border border-border">
                    <h3 className="font-semibold mb-6">AI Generation Usage History</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={engagementData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="name" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Legend />
                                <Bar dataKey="ig" fill="#3b82f6" name="Hooks Generated" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="shopee" fill="#10b981" name="Captions Generated" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
