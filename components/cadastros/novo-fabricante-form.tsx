"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Fabricante = {
  onSuccess: () => void
  onCancel: () => void
  fabricante?: {
    id: string
    descricao: string
  }
}

type FormValues = {
  descricao: string
}

export function NovoFabricanteForm({ onSuccess, onCancel, fabricante }: Fabricante) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    const formDataToSend = new FormData()

    // Campos de texto
    if (data.descricao) {
      formDataToSend.append("v_fabricante[descricao]", data.descricao.toUpperCase())
    }

    try {
      function getCookie(name: string): string | null {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
        return match ? decodeURIComponent(match[2]) : null
      }

      const token = getCookie("access_token")

      const url = fabricante
        ? `${process.env.NEXT_PUBLIC_API_URL}api/v1/v_fabricantes/${fabricante.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}api/v1/v_fabricantes`

      const method = fabricante ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error || "Falha ao processar fabricante")
      }

      toast.success(fabricante ? "Fabricante atualizado com sucesso" : "Fabricante criado com sucesso", {
        duration: 2000,
      })
      onSuccess()
      reset()
    } catch (error: any) {
      toast.error(error.message || "Erro ao processar fabricante", { duration: 2000 })
    }
  }

  useEffect(() => {
    if (fabricante) {
      reset({
        descricao: fabricante.descricao,
      })
    }
  }, [fabricante, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
        <Label htmlFor="descricao" className="text-left font-bold">
          Descrição:
        </Label>
        <Input
          id="descricao"
          {...register("descricao", { required: true })}
          placeholder="Digite o fabricante..."
          className="col-span-3 w-full"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset()
            onCancel()
          }}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : fabricante ? "Atualizar" : "Salvar"}
        </Button>
      </div>
    </form>
  )
}
