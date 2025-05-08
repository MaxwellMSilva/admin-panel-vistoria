"use client";

import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    nome_completo: "",
    telefone: "",
    cpf_cnpj: "",
    c_tipo_usuario_id: "1", // Exemplo de tipo de usuário
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://145.223.121.165:3010/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        // Redirecionar ou fazer o que for necessário após o sucesso
      } else {
        alert(data.error || "Erro ao cadastrar o usuário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao tentar se conectar ao servidor.");
    }
  };
  

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nome_completo"
          placeholder="Nome Completo"
          value={form.nome_completo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cpf_cnpj"
          placeholder="CPF ou CNPJ"
          value={form.cpf_cnpj}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
