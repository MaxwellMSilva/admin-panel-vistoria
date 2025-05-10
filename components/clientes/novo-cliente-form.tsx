"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


type NovoClienteFormProps = {
  onSuccess: () => void
  onCancel: () => void
  cliente?: FormValues // <- Novo
}

type FormValues = {
  id: number
  nome_completo: string
  cpf_cnpj: string
  rg: string
  telefone: string
  email: string
  cep: string
  rua: string
  numero_residencial: string
  bairro: string
  complemento: string
  g_cidade_id: string | number
  anexo_cpf?: FileList
  anexo_rg?: FileList
  anexo_comprovante_residencia?: FileList
}

export function NovoClienteForm({ onSuccess, onCancel, cliente }: NovoClienteFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    const formDataToSend = new FormData()

    // Campos de texto
    Object.entries(data).forEach(([key, value]) => {
      if (key.startsWith("anexo_") === false && typeof value === "string") {
        formDataToSend.append(`c_cliente[${key}]`, value.toUpperCase())
      }
    })

    // Arquivos
    if (data.anexo_cpf?.[0]) {
      formDataToSend.append("c_cliente[anexo_cpf]", data.anexo_cpf[0])
    }
    if (data.anexo_rg?.[0]) {
      formDataToSend.append("c_cliente[anexo_rg]", data.anexo_rg[0])
    }
    if (data.anexo_comprovante_residencia?.[0]) {
      formDataToSend.append("c_cliente[anexo_comprovante_residencia]", data.anexo_comprovante_residencia[0])
    }

    try {
      function getCookie(name: string): string | null {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
        return match ? decodeURIComponent(match[2]) : null
      }

      const token = getCookie("access_token")


      const url = cliente
        ? `${process.env.NEXT_PUBLIC_API_URL}api/v1/c_clientes/${cliente.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}api/v1/c_clientes`

      const method = cliente ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error || "Falha ao criar cliente")
      }

      toast.success("Cliente criado com sucesso", { duration: 2000 })
      onSuccess()
      reset()
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar cliente", { duration: 2000 })
    }
  }

  useEffect(() => {
    console.log(cliente); // Verifique se o cliente está sendo recebido corretamente
    if (cliente) {
      reset({
        nome_completo: cliente.nome_completo,
        cpf_cnpj: cliente.cpf_cnpj,
        rg: cliente.rg,
        telefone: cliente.telefone,
        email: cliente.email,
        cep: cliente.cep,
        rua: cliente.rua,
        numero_residencial: cliente.numero_residencial,
        bairro: cliente.bairro,
        complemento: cliente.complemento,
        g_cidade_id: cliente.g_cidade_id,
      })
    }
  }, [cliente, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      
      {/* Nome Completo */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="nome_completo" className="font-bold mb-2">Nome:</Label>
        <Input id="nome_completo" {...register("nome_completo", { required: true })} placeholder="Digite o nome completo do cliente..." />
      </div>

      {/* CPF/CNPJ */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="cpf_cnpj" className="font-bold mb-2">CPF/CNPJ:</Label>
        <Input id="cpf_cnpj" {...register("cpf_cnpj", { required: true })} placeholder="Digite o CPF ou CNPJ do cliente..." />
      </div>

      {/* RG */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="rg" className="font-bold mb-2">RG:</Label>
        <Input id="rg" {...register("rg", { required: true })} placeholder="Digite o RG do cliente..." />
      </div>

      {/* Telefone */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="telefone" className="font-bold mb-2">Telefone:</Label>
        <Input id="telefone" {...register("telefone", { required: true })} placeholder="Digite o telefone do cliente..." />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="email" className="font-bold mb-2">Email:</Label>
        <Input id="email" {...register("email", { required: true })} placeholder="Digite o email do cliente..." />
      </div>

      {/* CEP */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="cep" className="font-bold mb-2">CEP:</Label>
        <Input id="cep" {...register("cep", { required: true })} placeholder="Digite o CEP do cliente..." />
      </div>

      {/* Rua */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="rua" className="font-bold mb-2">Rua:</Label>
        <Input id="rua" {...register("rua", { required: true })} placeholder="Digite a rua do cliente..." />
      </div>

      {/* Número Residencial */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="numero_residencial" className="font-bold mb-2">Número Residencial:</Label>
        <Input id="numero_residencial" {...register("numero_residencial", { required: true })} placeholder="Digite o número residencial..." />
      </div>

      {/* Bairro */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="bairro" className="font-bold mb-2">Bairro:</Label>
        <Input id="bairro" {...register("bairro", { required: true })} placeholder="Digite o bairro do cliente..." />
      </div>

      {/* Complemento */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="complemento" className="font-bold mb-2">Complemento:</Label>
        <Input id="complemento" {...register("complemento", { required: true })} placeholder="Digite o complemento do endereço..." />
      </div>

      {/* Cidade */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="g_cidade_id" className="font-bold mb-2">Cidade:</Label>
        <Input id="g_cidade_id" {...register("g_cidade_id", { required: true })} placeholder="Digite a cidade do cliente..." />
      </div>

      {/* Arquivos */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="anexo_cpf" className="font-bold mb-2">Anexo CPF:</Label>
        <Input id="anexo_cpf" type="file" {...register("anexo_cpf")} />
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="anexo_rg" className="font-bold mb-2">Anexo RG:</Label>
        <Input id="anexo_rg" type="file" {...register("anexo_rg")} />
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="anexo_comprovante_residencia" className="font-bold mb-2">Comprovante de Residência:</Label>
        <Input id="anexo_comprovante_residencia" type="file" {...register("anexo_comprovante_residencia")} />
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={() => { reset(); onCancel(); }}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : cliente ? "Atualizar" : "Salvar"}
        </Button>
      </div>
    </form>
  )
}
