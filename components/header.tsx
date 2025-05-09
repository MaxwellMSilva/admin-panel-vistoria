"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")

    router.push("/users/login")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-md px-4 sm:static lg:h-[60px] lg:px-6 dark:bg-[#0f172a]/95 dark:border-[#334155]/50">

      <div className="flex items-center gap-2 md:hidden">
        <Button variant="ghost" size="icon" className="dark:hover:bg-[#1e293b]/70 dark:text-gray-200">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative dark:hover:bg-[#1e293b]/70 dark:text-gray-200">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-primary"></span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full dark:hover:bg-[#1e293b]/70 dark:text-gray-200">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>VS</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-[#0f172a] dark:border-[#334155]/50">
            <DropdownMenuLabel className="dark:text-gray-200">Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-[#334155]/50" />
            <DropdownMenuItem className="dark:text-gray-200 dark:focus:bg-[#1e293b]">Perfil</DropdownMenuItem>
            <DropdownMenuItem className="dark:text-gray-200 dark:focus:bg-[#1e293b]">Configurações</DropdownMenuItem>
            <DropdownMenuSeparator className="dark:bg-[#334155]/50" />
            <DropdownMenuItem
              className="dark:text-gray-200 dark:focus:bg-[#1e293b]"
              onClick={handleLogout}
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
