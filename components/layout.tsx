"use client"

import { useState } from "react"
import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LayoutProps {
  children: React.ReactNode
  currentPage?: string
  onNavigate?: (page: string) => void
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="flex min-h-screen bg-background dark:bg-gray-950">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Conteúdo principal com margem à esquerda para acomodar o sidebar fixo */}
      <div className="flex-1 flex flex-col md:ml-64 lg:ml-72 w-full">
        {/* Botão de menu mobile sem o header */}
        <div className="md:hidden sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 backdrop-blur-md px-4 dark:bg-gray-950/95 dark:border-gray-800">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent dark:hover:bg-gray-800 dark:text-gray-200"
            onClick={toggleMobileMenu}
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Área de conteúdo scrollável */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 pt-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
