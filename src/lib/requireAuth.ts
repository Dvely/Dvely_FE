import { redirect } from '@tanstack/react-router';
import { SERVICE_SUSPENDED } from '@/constants/serviceStatus';
import { openServiceSuspendedNotice } from '@/lib/serviceSuspendedNotice';

export function requireAuth() {
  /*
    일시 중단 중에는 로그인해 둔 사람도 들여보내지 않는다. 토큰은 남아 있어도 받아 줄
    서버가 없어서, 들어가면 화면마다 불러오기 실패만 쌓인다. 토큰은 지우지 않는다 —
    서버가 같은 키로 다시 뜨면 그대로 이어 쓸 수 있다.
  */
  if (SERVICE_SUSPENDED) {
    openServiceSuspendedNotice();
    throw redirect({ to: '/' });
  }

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw redirect({ to: '/' });
  }
}
