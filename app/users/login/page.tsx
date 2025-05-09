'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      const data = await res.json()

      // Salva os tokens em cookies
      Cookies.set('access_token', data.access_token, { expires: 1 }) // 1 dia
      Cookies.set('refresh_token', data.refresh_token, { expires: 7 }) // 7 dias

      alert('Login realizado com sucesso!')
      router.push('/') // Redireciona para a página inicial
    } else {
      const errorData = await res.json()
      setError(errorData?.message || 'Email ou senha incorretos.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </button>

        <button
          type="button"
          onClick={() => router.push('/users/register')}
          className="w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300"
        >
          Não tenho conta - Cadastrar
        </button>
      </form>
    </div>
  )
}
