"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Users, LayoutDashboard, PlusIcon, Menu, Car } from "lucide-react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <div className="hidden md:flex md:flex-col border-r bg-card/50 backdrop-blur-sm md:w-64 lg:w-72 dark:bg-[#0f172a]/95 dark:border-[#334155]/50">
        <SidebarContent />
      </div>

      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent onItemClick={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname()

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Cadastros", href: "/cadastros", icon: PlusIcon },
    { label: "Clientes", href: "/clientes", icon: Users },
    { label: "Veículos", href: "/veiculos", icon: Car },
  ]

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6 dark:border-[#334155]/50">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold dark:text-gray-100">AutoVistoria</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} onClick={onItemClick}>
            <Button
              variant={pathname.startsWith(item.href) ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 text-base h-12",
                pathname.startsWith(item.href)
                  ? "font-medium bg-primary text-white"
                  : "font-normal",
                "dark:hover:bg-[#1e293b]/70 dark:text-gray-200"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  )
}
