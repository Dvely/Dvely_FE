import { formatInSeoul } from '@/lib/seoulTime';
/** 활동 발생 시각. 서버는 ISO 8601로 준다 */
export function formatActivityTime(iso: string): string {
  if (!iso) return '';

  // 읽을 수 없으면 원문을 그대로 돌려주던 동작을 유지한다
  return (
    formatInSeoul(iso, {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) || iso
  );
}
