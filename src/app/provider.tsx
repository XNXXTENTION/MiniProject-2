'use client' // ต้องเป็น Client Component เพราะมีการใช้ Context API ของ React
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // สร้าง Instance ของสมองกลาง

export default function AppQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    // ส่งผ่าน queryClient ไปให้ลูกๆ ทั้งหมด
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}