import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10 justify-center items-center text-center py-32">
      <div className="flex flex-col gap-4 items-center">
        <p className="text-gray-600">
          페이지를 찾을 수 없습니다.
        </p>
        <Button onClick={() => navigate({ to: "/" })}>홈으로 돌아가기기</Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
