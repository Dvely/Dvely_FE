import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

function HeaderContainer() {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 8) {
        setIsVisible(true)
        lastScrollY.current = currentScrollY
        return
      }

      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-20 border-b border-slate-200 backdrop-blur transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="mx-auto flex items-center justify-between py-3.5 px-40 w-[1440px]">
        <Link to="/" className="text-sm font-bold tracking-[0.08em] text-slate-900">
          DVELY
        </Link>
        <nav className="flex items-center gap-0.5 text-[#64748B]">
          <Button
            variant={"ghost"}
            size={"sm"}
          >
            프로그램
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
          >
            고민
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
          >
            추천
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
          >
            기능
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
          >
            혜택
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
          >
            진행 과정
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
          >
            결과물
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
          >
            후기
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
          >
            요금
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
          >
            FAQ
          </Button>
        </nav>
        <nav className="flex items-center gap-2">
          <Button
            variant={"outline"}
          >
            도입 문의
          </Button>
          <Button
          >
            무료로 시작
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default HeaderContainer
