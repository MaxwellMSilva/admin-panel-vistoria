'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CadastroPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nome_completo: '',
    telefone: '',
    cpf_cnpj: '',
    c_tipo_usuario_id: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('http://145.223.121.165:3010/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      alert('Cadastro realizado com sucesso!')
      setFormData({
        email: '',
        password: '',
        nome_completo: '',
        telefone: '',
        cpf_cnpj: '',
        c_tipo_usuario_id: '',
      })
    } else {
      alert('Erro ao cadastrar usuário.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Cadastro</h2>

        <input type="text" name="nome_completo" placeholder="Nome completo" value={formData.nome_completo} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="cpf_cnpj" placeholder="CPF ou CNPJ" value={formData.cpf_cnpj} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="c_tipo_usuario_id" placeholder="Tipo de Usuário (ID)" value={formData.c_tipo_usuario_id} onChange={handleChange} className="w-full p-2 border rounded" />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Cadastrar
        </button>

        <button type="button" onClick={() => router.push('/users/login')} className="w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300">
          Já tenho conta - Login
        </button>
      </form>
    </div>
  )
}
