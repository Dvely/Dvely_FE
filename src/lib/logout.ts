import { logout } from '@/api/auth';
import { clearAppLocalStorage } from '@/lib/clearAppStorage';
import { queryClient } from '@/lib/queryClient';

/**
 * 로그아웃. 서버에 알리고, 이 브라우저에 남은 그 사람의 흔적을 지운다.
 *
 * **캐시도 같이 비운다.** 저장소만 지우면 React Query 가 들고 있던 응답이 그대로 남아,
 * 같은 브라우저에서 다른 계정으로 들어온 사람이 **앞사람의 프로젝트·설정 화면을 한 프레임
 * 본다.** 새로 받아오기 전까지 그려지는 것이 앞사람의 데이터다.
 */
export async function logoutSession() {
  try {
    await logout();
  } finally {
    clearAppLocalStorage();
    queryClient.clear();
  }
}
