import { Button } from "../ui/button"
import { Input } from "../ui/input"

function MainPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-40 w-[1300px] mx-auto">
      <section className="flex justify-between w-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-[62px] font-bold">자유로운 커스텀<br />맞춤형 웹 페이지 제작</h1>
          <p className="text-[20px] font-regular text-[#807E7E]">한 문장으로 콘셉트를 입력하면, 보기 좋은 랜딩 페이지를 자동 생성합니다.<br />
            버튼/섹션/레이아웃을 조정해서 원하는 톤으로 바로 맞춰보세요.
          </p>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <Input />
              <Button>생성하기</Button>
            </div>
            <p className="text-[13px] font-regular text-[#807E7E]">프롬프트를 입력해주세요</p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="p-2 rounded-full bg-[#D9D9D9] text-[#807E7E] text-[17px]">
              <p><span className="font-bold">3분</span> 안에 초안</p>
            </div>
            <div className="p-2 rounded-full bg-[#D9D9D9] text-[#807E7E] text-[17px]">
              <p><span className="font-bold">반응형</span> 기본 제공</p>
            </div>
            <div className="p-2 rounded-full bg-[#D9D9D9] text-[#807E7E] text-[17px]">
              <p><span className="font-bold">UI 톤</span>UI 톤 커스터마이즈</p>
            </div>
          </div>
        </div>
        <svg width="634" height="404" viewBox="0 0 634 404" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_25_320)">
            <rect width="634" height="404" rx="4" fill="white" />
            <path d="M633.5 0.5V403.5H0.5V0.5H633.5Z" stroke="black" />
          </g>
          <rect x="0.5" y="0.5" width="633" height="403" rx="3.5" stroke="black" />
          <defs>
            <clipPath id="clip0_25_320">
              <rect width="634" height="404" rx="4" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </section>

      <section className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-[62px] font-bold text-center">자유로운 커스텀 맞춤형 웹 페이지 제작</h1>
        <div className="flex justify-between items-center w-full">
          <svg width="634" height="404" viewBox="0 0 634 404" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_25_320)">
              <rect width="634" height="404" rx="4" fill="white" />
              <path d="M633.5 0.5V403.5H0.5V0.5H633.5Z" stroke="black" />
            </g>
            <rect x="0.5" y="0.5" width="633" height="403" rx="3.5" stroke="black" />
            <defs>
              <clipPath id="clip0_25_320">
                <rect width="634" height="404" rx="4" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <svg width="634" height="615" viewBox="0 0 634 615" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="634" height="615" rx="25" fill="#D9D9D9" />
          </svg>
        </div>
      </section>


      <section className="flex flex-col items-center justify-center gap-6 w-full">
        <h1 className="text-[62px] font-bold w-full text-left">다양한 템플릿 무료제공</h1>
        <div className="flex gap-2 p-2 rounded-full bg-[#D9D9D9] text-[25px] font-bold w-full">
          <p className="px-5 py-2 rounded-full bg-[#FEFEFE]">랜딩 페이지</p>
          <p className="px-5 py-2">기업소개 페이지</p>
          <p className="px-5 py-2">쇼핑물 페이지</p>
          <p className="px-5 py-2">포트폴리오</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <svg width="404" height="385" viewBox="0 0 404 385" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 25C2 11.1929 13.1929 0 27 0H377C390.807 0 402 11.1929 402 25V206H2V25Z" fill="#D9D9D9" />
            <g filter="url(#filter0_d_24_9418)">
              <path d="M2 206H402V356C402 369.807 390.807 381 377 381H27C13.1929 381 2 369.807 2 356V206Z" fill="white" />
              <path d="M401.5 206.5V356C401.5 369.531 390.531 380.5 377 380.5H27C13.469 380.5 2.5 369.531 2.5 356V206.5H401.5Z" stroke="#B6B6B6" />
            </g>
            <defs>
              <filter id="filter0_d_24_9418" x="0" y="206" width="404" height="179" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_24_9418" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_24_9418" result="shape" />
              </filter>
            </defs>
          </svg>
          <svg width="404" height="385" viewBox="0 0 404 385" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 25C2 11.1929 13.1929 0 27 0H377C390.807 0 402 11.1929 402 25V206H2V25Z" fill="#D9D9D9" />
            <g filter="url(#filter0_d_24_9418)">
              <path d="M2 206H402V356C402 369.807 390.807 381 377 381H27C13.1929 381 2 369.807 2 356V206Z" fill="white" />
              <path d="M401.5 206.5V356C401.5 369.531 390.531 380.5 377 380.5H27C13.469 380.5 2.5 369.531 2.5 356V206.5H401.5Z" stroke="#B6B6B6" />
            </g>
            <defs>
              <filter id="filter0_d_24_9418" x="0" y="206" width="404" height="179" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_24_9418" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_24_9418" result="shape" />
              </filter>
            </defs>
          </svg>
          <svg width="404" height="385" viewBox="0 0 404 385" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 25C2 11.1929 13.1929 0 27 0H377C390.807 0 402 11.1929 402 25V206H2V25Z" fill="#D9D9D9" />
            <g filter="url(#filter0_d_24_9418)">
              <path d="M2 206H402V356C402 369.807 390.807 381 377 381H27C13.1929 381 2 369.807 2 356V206Z" fill="white" />
              <path d="M401.5 206.5V356C401.5 369.531 390.531 380.5 377 380.5H27C13.469 380.5 2.5 369.531 2.5 356V206.5H401.5Z" stroke="#B6B6B6" />
            </g>
            <defs>
              <filter id="filter0_d_24_9418" x="0" y="206" width="404" height="179" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_24_9418" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_24_9418" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </section>
    </main>
  )
}

export default MainPage
