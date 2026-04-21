import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/auth/callback')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#A8B88C]/20 border-t-[#A8B88C]" />
      <p className="text-base font-medium">로그인 처리 중입니다...</p>
      <p className="text-sm text-gray-500">잠시만 기다려 주세요</p>
    </div>
  );
}
