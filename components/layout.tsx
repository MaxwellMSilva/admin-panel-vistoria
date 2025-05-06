import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

interface LayoutProps {
  children: React.ReactNode
  currentPage: string
  onNavigate: (page: string) => void
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 md:p-8 pt-6">{children}</main>
      </div>
    </div>
  )
}
