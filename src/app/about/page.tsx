import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">เกี่ยวกับเรา</h1>

                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>ภารกิจของเรา</CardTitle>
                            <CardDescription>
                                เรามุ่งมั่นที่จะสร้างเว็บแอปพลิเคชันที่มีประสิทธิภาพสูง สวยงาม และใช้งานง่าย
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-slate-600 leading-relaxed">
                                เราเชื่อว่าเว็บแอปพลิเคชันที่ดีต้องมีทั้งประสิทธิภาพและการออกแบบที่ยอดเยี่ยม
                                ด้วยการใช้ Next.jsเราสร้างสรรค์ประสบการณ์การใช้งานที่ราบรื่นและน่าประทับใจสำหรับผู้ใช้ของเรา
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                การใช้ Tailwind CSS และ shadcn/ui ช่วยให้เราสามารถพัฒนา UI ที่สวยงามและตอบสนองได้อย่างรวดเร็ว
                                เรามุ่งเน้นการสร้างสรรค์ส่วนประกอบที่สามารถนำกลับมาใช้ใหม่ได้และปรับแต่งได้ง่าย
                            </p>
                        </CardContent>
                    </Card>

                    <div className="gird grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>เทคโนโลยีที่ใช้</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-500">▣</span>
                                        <span className="text-slate-700">Next.js 16</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-500">▣</span>
                                        <span className="text-slate-700">React Server Components</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-500">▣</span>
                                        <span className="text-slate-700">Tailwind CSS</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-500">▣</span>
                                        <span className="text-slate-700">shadcn/ui</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-500">▣</span>
                                        <span className="text-slate-700">TypeScript</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>จุดเด่น</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span className="text-slate-700">ประสิทธิภาพ</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span className="text-slate-700">SEO-friendly</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span className="text-slate-700">Responsive Design</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span className="text-slate-700">Accessibility</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span className="text-slate-700">Type Safety</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </main>
    )
}