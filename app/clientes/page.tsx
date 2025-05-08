"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/authContext"
import { useRouter } from "next/navigation"

import { ClientesContent } from "@/components/clientes-content"

export default function ClientesPage() {
  const { token } = useAuth()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (!token) {
      router.push("/login") // Redireciona para a página de login caso não haja token
    } else {
      setIsAuthenticated(true) // Caso haja token, o usuário está autenticado
    }
  }, [token, router])

  if (!isAuthenticated) {
    return <div>Loading...</div> // Exibe uma mensagem de carregamento até que o usuário seja autenticado
  }

  return <ClientesContent />
}
