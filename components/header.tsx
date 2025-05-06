import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu, Search, Plus } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 sm:static lg:h-[60px] lg:px-6 dark:bg-[#0f172a]/95 dark:border-[#334155]/50">
      <Button
        variant="outline"
        size="icon"
        className="md:hidden dark:bg-[#1e293b]/50 dark:border-[#334155]/50 dark:text-gray-200"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="w-full flex-1">
        <form className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar veículo, cliente ou vistoria..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3 dark:bg-[#1e293b]/50 dark:border-[#334155]/50 dark:text-gray-200 dark:placeholder:text-gray-400"
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="default" size="sm" className="gap-1 btn-primary">
          <Plus className="h-4 w-4" />
          <span>Nova Vistoria</span>
        </Button>
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
            <DropdownMenuItem className="dark:text-gray-200 dark:focus:bg-[#1e293b]">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
