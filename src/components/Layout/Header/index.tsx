import { cn } from '@/utils/cn.ts'

type HeaderProps = React.HTMLAttributes<HTMLDivElement>

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn('h-[80px] border-b', className)}>
      <ul className="h-full flex items-center justify-between px-[20px] py-[10px]">
        <li>
          <h1 className="text-2xl font-semibold tracking-tight">Persona Creator</h1>
        </li>
      </ul>
    </header>
  )
}
