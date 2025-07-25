"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Car, Edit3, Loader2 } from "lucide-react"

type Modelo = {
  onSuccess: () => void
  onCancel: () => void
  modelo?: {
    id: string
    descricao: string
  }
}

type FormValues = {
  descricao: string
}

export function NovoModeloForm({ onSuccess, onCancel, modelo }: Modelo) {
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
      formDataToSend.append("v_modelo[descricao]", data.descricao.toUpperCase())
    }

    try {
      function getCookie(name: string): string | null {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
        return match ? decodeURIComponent(match[2]) : null
      }

      const token = getCookie("access_token")
      const url = modelo
        ? `${process.env.NEXT_PUBLIC_API_URL}api/v1/v_modelos/${modelo.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}api/v1/v_modelos`
      const method = modelo ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error || "Falha ao processar modelo")
      }

      toast.success(modelo ? "Modelo atualizado com sucesso" : "Modelo criado com sucesso", { duration: 2000 })
      onSuccess()
      reset()
    } catch (error: any) {
      toast.error(error.message || "Erro ao processar modelo", { duration: 2000 })
    }
  }

  useEffect(() => {
    if (modelo) {
      reset({
        descricao: modelo.descricao,
      })
    }
  }, [modelo, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      {/* Indicador de modo de edição */}
      {modelo ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-blue-900">Editando Modelo</h3>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                  <Car className="w-3 h-3 mr-1" />
                  ID: {modelo.id}
                </Badge>
              </div>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span className="font-medium text-blue-700 flex items-center gap-1">
                    <Car className="w-3 h-3" />
                    Descrição Atual:
                  </span>
                  <p className="text-blue-900 font-medium">{modelo.descricao}</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded-md">
                <p className="text-xs text-blue-700">
                  💡 <strong>Dica:</strong> Você está editando o modelo "{modelo.descricao}". A nova descrição
                  substituirá a atual.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Car className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">Novo Modelo</h3>
              <p className="text-sm text-green-700">
                Preencha a descrição abaixo para criar um novo modelo no sistema.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Seção: Dados do Modelo */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Car className="w-4 h-4" />
          Dados do Modelo
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
          <Label htmlFor="descricao" className="text-left font-bold flex items-center gap-2">
            <Car className="w-4 h-4" />
            Descrição:
          </Label>
          <div className="col-span-3 w-full">
            <Input
              id="descricao"
              {...register("descricao", {
                required: "Descrição é obrigatória",
                minLength: {
                  value: 2,
                  message: "Descrição deve ter pelo menos 2 caracteres",
                },
              })}
              placeholder="Digite o nome do modelo..."
              className="w-full"
            />
            {errors.descricao && <span className="text-sm text-red-500 mt-1 block">{errors.descricao.message}</span>}
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-2 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset()
            onCancel()
          }}
          className="px-6"
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-red-500 hover:bg-red-600 text-white px-6">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : modelo ? (
            "Atualizar Modelo"
          ) : (
            "Criar Modelo"
          )}
        </Button>
      </div>
    </form>
  )
}
