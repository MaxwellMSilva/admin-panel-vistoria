"use client"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Cliente = {
  onSuccess: () => void
  onCancel: () => void
}

type FormValues = {
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
  g_cidade_id: string
  anexo_cpf?: FileList
  anexo_rg?: FileList
  anexo_comprovante_residencia?: FileList
}

export function NovoClienteForm({ onSuccess, onCancel }: Cliente) {
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/c_clientes`, {
        method: "POST",
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

  console.log(watch())
  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      {[{ id: "nome_completo", label: "Nome" },
        { id: "cpf_cnpj", label: "CPF/CNPJ" },
        { id: "rg", label: "RG" },
        { id: "telefone", label: "Telefone" },
        { id: "email", label: "Email" },
        { id: "cep", label: "CEP" },
        { id: "rua", label: "Rua" },
        { id: "numero_residencial", label: "Número Residencial" },
        { id: "bairro", label: "Bairro" },
        { id: "complemento", label: "Complemento" },
        { id: "g_cidade_id", label: "Cidade" },
      ].map(({ id, label }) => (
        <div key={id} className="flex flex-col gap-1 mb-4">
          <Label htmlFor={id} className="font-bold mb-2">{label}:</Label>
          <Input id={id} {...register(id as keyof FormValues, { required: true })} placeholder={`Digite o ${label.toUpperCase()} do cliente...`} />
        </div>
      ))}

      {/* Arquivos */}
      {[{ id: "anexo_cpf", label: "Anexo CPF" },
        { id: "anexo_rg", label: "Anexo RG" },
        { id: "anexo_comprovante_residencia", label: "Comprovante de Residência" },
      ].map(({ id, label }) => (
        <div key={id} className="flex flex-col gap-1 mb-4">
          <Label htmlFor={id} className="font-bold mb-2">{label}:</Label>
          <Input id={id} type="file" {...register(id as keyof FormValues)} />
        </div>
      ))}

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={() => { reset(); onCancel(); }}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}
