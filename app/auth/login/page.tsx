"use client"

import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Criando o FormData para enviar no formato correto
    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)

    try {
      // Exemplo de chamada de API de login com FormData
      const response = await fetch("http://145.223.121.165:3010/login", {
        method: "POST",
        body: formData, // Enviando o FormData
      })

      if (!response.ok) {
        throw new Error("Erro ao fazer login")
      }

      const data = await response.json()
      console.log("Login bem-sucedido", data)
      
      // Armazene o token ou outras informações de sessão aqui
      // Exemplo: localStorage.setItem("access_token", data.access_token)
    } catch (err) {
      setError("Erro desconhecido")
      console.error("Erro no login:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  )
}
