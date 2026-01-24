// app/cache-demo/loading.tsx
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center mt-20">
      {/* แสดง Spinner ตรงกลางหน้าจอเพื่อให้ User รู้ว่าระบบกำลังทำงาน */}
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-8 text-purple-500" />
        <p className="text-slate-500 animate-pulse">กำลังจัดเตรียมหน้าเพจ...</p>
      </div>
    </div>
  );
}