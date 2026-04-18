import { Button } from "../ui/button"

function MainPage() {
  return (
    <div className="flex flex-col gap-10 items-center">
      <Button variant="default">default</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="outline">outline</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="link">link</Button>
    </div>
  )
}

export default MainPage
