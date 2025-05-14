"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Users,
  LayoutDashboard,
  PlusIcon,
  Car,
  Settings,
  ChevronRight,
  LogOut,
  UserCog,
  BadgeCheck,
  ClipboardCheck,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Cookies from "js-cookie"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SidebarProps {
  currentPage?: string
  onNavigate?: (page: string) => void
  isMobileMenuOpen?: boolean
  setIsMobileMenuOpen?: (open: boolean) => void
}

export function Sidebar({ currentPage, onNavigate, isMobileMenuOpen = false, setIsMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }, [pathname, setIsMobileMenuOpen])

  return (
    <>
      <div className="hidden md:flex md:flex-col border-r bg-gradient-to-b from-white to-gray-50 shadow-sm md:w-64 lg:w-72 dark:from-gray-900 dark:to-gray-950 dark:border-gray-800 transition-all duration-300 h-screen fixed">
        <SidebarContent currentPage={currentPage} onNavigate={onNavigate} />
      </div>

      <Sheet
        open={isMobileMenuOpen}
        onOpenChange={(open) => {
          if (setIsMobileMenuOpen) {
            setIsMobileMenuOpen(open)
          }
        }}
      >
        <SheetContent
          side="left"
          className="w-72 p-0 border-r bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 dark:border-gray-800"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Menu de navegação</SheetTitle>
          </SheetHeader>
          <SidebarContent
            currentPage={currentPage}
            onNavigate={(page) => {
              if (onNavigate) onNavigate(page)
              if (setIsMobileMenuOpen) setIsMobileMenuOpen(false)
            }}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}

function SidebarContent({ currentPage, onNavigate }: { currentPage?: string; onNavigate?: (page: string) => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    router.push("/users/login")
  }

  const navItems = [
    {
      label: "Dashboard",
      href: "/",
      value: "dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Cadastros",
      href: "/cadastros",
      value: "cadastros",
      icon: PlusIcon,
    },
    {
      label: "Clientes",
      href: "/clientes",
      value: "clientes",
      icon: Users,
    },
    {
      label: "Veículos",
      href: "/veiculos",
      value: "veiculos",
      icon: Car,
    },
    {
      label: "Vistorias",
      href: "/vistorias",
      value: "vistorias",
      icon: ClipboardCheck,
    },
  ]

  // Novo menu de Pessoal
  const pessoalItems = [
    {
      label: "Usuários",
      href: "/usuarios",
      value: "usuarios",
      icon: UserCog,
    },
    {
      label: "Cargos",
      href: "/cargos",
      value: "cargos",
      icon: BadgeCheck,
    },
  ]

  const handleNavigation = (value: string) => {
    if (onNavigate) {
      onNavigate(value)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Cabeçalho */}
      <div className="flex h-14 items-center justify-between border-b px-4 dark:border-gray-800 bg-gradient-to-r from-red-500 to-red-600 shadow-sm">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 backdrop-blur-sm shadow-inner">
            <LayoutDashboard className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold text-white">AutoVistoria</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Menu de navegação - agora vem logo após o cabeçalho */}
      <div className="px-2 py-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 px-2 dark:text-gray-400">
          Menu Principal
        </div>
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            // Determina se o item está ativo com base no currentPage ou no pathname
            const isActive =
              currentPage === item.value ||
              (!currentPage && pathname === item.href) ||
              (pathname && pathname.startsWith(item.href) && item.href !== "/")

            return (
              <Link href={item.href} key={item.href} onClick={() => handleNavigation(item.value)}>
                <div
                  className={cn(
                    "group relative",
                    isActive &&
                      "after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-6 after:w-1 after:bg-red-500 after:rounded-r-full",
                  )}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2 text-sm h-9 rounded-lg transition-all duration-200",
                      isActive
                        ? "font-medium bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                        : "font-normal text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center h-5 w-5 rounded-md transition-all duration-200",
                        isActive
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span>{item.label}</span>
                    {isActive && <ChevronRight className="h-3 w-3 ml-auto text-red-500 dark:text-red-400" />}
                  </Button>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Menu de Pessoal - Nova seção */}
      <div className="px-2 py-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 px-2 dark:text-gray-400">
          Pessoal
        </div>
        <nav className="space-y-0.5">
          {pessoalItems.map((item) => {
            // Determina se o item está ativo com base no currentPage ou no pathname
            const isActive =
              currentPage === item.value ||
              (!currentPage && pathname === item.href) ||
              (pathname && pathname.startsWith(item.href) && item.href !== "/")

            return (
              <Link href={item.href} key={item.href} onClick={() => handleNavigation(item.value)}>
                <div
                  className={cn(
                    "group relative",
                    isActive &&
                      "after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-6 after:w-1 after:bg-red-500 after:rounded-r-full",
                  )}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2 text-sm h-9 rounded-lg transition-all duration-200",
                      isActive
                        ? "font-medium bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                        : "font-normal text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center h-5 w-5 rounded-md transition-all duration-200",
                        isActive
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span>{item.label}</span>
                    {isActive && <ChevronRight className="h-3 w-3 ml-auto text-red-500 dark:text-red-400" />}
                  </Button>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Espaço flexível para empurrar o rodapé para baixo */}
      <div className="flex-grow"></div>

      {/* Configurações e perfil - agora no rodapé */}
      <div className="p-2 border-t dark:border-gray-800 mt-auto">
        <Link href="/configuracoes">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sm h-9 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <div className="flex items-center justify-center h-5 w-5 rounded-md text-gray-500 dark:text-gray-400">
              <Settings className="h-4 w-4" />
            </div>
            <span>Configurações</span>
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="mt-2 px-3 py-2 bg-gray-50 rounded-lg dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-medium text-xs">
                  VS
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium dark:text-gray-200">Usuário</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Administrador</span>
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 dark:bg-gray-900 dark:border-gray-700">
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2 dark:text-gray-200 dark:focus:bg-gray-800"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
