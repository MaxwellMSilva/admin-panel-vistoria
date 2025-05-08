import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

import { AuthProvider } from "./authContext"

export const metadata = {
  title: "AutoVistoria - Sistema de Gestão",
  description: "Sistema de gestão para vistorias de veículos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
