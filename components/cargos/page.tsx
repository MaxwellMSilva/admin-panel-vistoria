"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Cookies from "js-cookie"
import { Loader2 } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

type NovoCargoFormProps = {
  onSuccess: () => void
  onCancel: () => void
  cargo?: FormValues
}

type FormValues = {
  id?: string
  nome: string
  descricao: string
  permissoes: string[]
}

type Permissao = {
  id: string
  nome: string
  descricao: string
}

export function NovoCargoForm({ onSuccess, onCancel, cargo }: NovoCargoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: {
      permissoes: []
    }
  })

  const [permissoes, setPermissoes] = useState<Permissao[]>([
    { id: "dashboard", nome: "Dashboard", descricao: "Acesso ao painel principal" },
    { id: "cadastros", nome: "Cadastros", descricao: "Gerenciar cadastros básicos" },
    { id: "clientes", nome: "Clientes", descricao: "Gerenciar clientes" },
    { id: "veiculos", nome: "Veículos", descricao: "Gerenciar veículos" },
    { id: "usuarios", nome: "Usuários", descricao: "Gerenciar usuários" },
    { id: "cargos", nome: "Cargos", descricao: "Gerenciar cargos e permissões" },
  ])
  const [carregandoPermissoes, setCarregandoPermissoes] = useState(false)

  useEffect(() => {
    if (cargo) {
      reset({
        nome: cargo.nome,
        descricao: cargo.descricao,
        permissoes: cargo.permissoes || [],
      })
    }
  }, [cargo, reset])

  const onSubmit = async (data: FormValues) => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const url = cargo
        ? `${process.env.NEXT_PUBLIC_API_URL}api/v1/cargos/${cargo.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}api/v1/cargos`

      const method = cargo ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error || "Falha ao salvar cargo")
      }

      toast.success(cargo ? "Cargo atualizado com sucesso" : "Cargo criado com sucesso", { duration: 2000 })
      onSuccess()
      reset()
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar cargo", { duration: 2000 })
    }
  }

  const carregarPermissoes = async () => {
    try {
      setCarregandoPermissoes(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/permissoes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar permissões")

      const data = await response.json()
      const todasPermissoes = Array.isArray(data.data.items) ? data.data.items : []
      
      if (todasPermissoes.length > 0) {
        setPermissoes(todasPermissoes)
      }
    } catch (error) {
      console.error("Erro ao carregar permissões:", error)
      // Mantém as permissões padrão em caso de erro
    } finally {
      setCarregandoPermissoes(false)
    }
  }

  useEffect(() => {
    carregarPermissoes()
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      {/* Nome do Cargo */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="nome" className="font-bold mb-2">
          Nome do Cargo:
        </Label>
        <Input
          id="nome"
          {...register("nome", { required: "Nome do cargo é obrigatório" })}
          placeholder="Digite o nome do cargo..."
        />
        {errors.nome && <span className="text-sm text-red-500">{errors.nome.message}</span>}
      </div>

      {/* Descrição */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="descricao" className="font-bold mb-2">
          Descrição:
        </Label>
        <Textarea
          id="descricao"
          {...register("descricao", { required: "Descrição é obrigatória" })}
          placeholder="Descreva as responsabilidades deste cargo..."
          rows={3}
        />
        {errors.descricao && <span className="text-sm text-red-500">{errors.descricao.message}</span>}
      </div>

      {/* Permissões */}
      <div className="flex flex-col gap-1 mb-4">
        <Label className="font-bold mb-2">
          Permissões:
        </Label>
        
        {carregandoPermissoes ? (
          <div className="flex items-center justify-center p-4 border rounded-md">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <span>Carregando permissões...</span>
          </div>
        ) : (
          <div className="space-y-2 border rounded-md p-4 bg-gray-50">
            <Controller
              name="permissoes"
              control={control}
              rules={{ required: "Selecione pelo menos uma permissão" }}
              render={({ field }) => (
                <>
                  {permissoes.map((permissao) => (
                    <div key={permissao.id} className="flex items-start space-x-2 py-2 border-b last:border-0">
                      <Checkbox
                        id={`permissao-${permissao.id}`}
                        checked={field.value?.includes(permissao.id)}
                        onCheckedChange={(checked) => {
                          const currentPermissoes = [...(field.value || [])];
                          if (checked) {
                            if (!currentPermissoes.includes(permissao.id)) {
                              setValue('permissoes', [...currentPermissoes, permissao.id]);
                            }
                          } else {
                            setValue('permissoes', currentPermissoes.filter(id => id !== permissao.id));
                          }
                        }}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label 
                          htmlFor={`permissao-${permissao.id}`}
                          className="font-medium text-sm"
                        >
                          {permissao.nome}
                        </Label>
                        <p className="text-xs text-gray-500">{permissao.descricao}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            />
          </div>
        )}
        {errors.permissoes && <span className="text-sm text-red-500">{errors.permissoes.message}</span>}
      </div>

      {/* Botões */}
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
        <Button type="submit" disabled={isSubmitting} className="bg-red-500 hover:bg-red-600 text-white">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {cargo ? "Atualizando..." : "Salvando..."}
            </>
          ) : (
            cargo ? "Atualizar" : "Salvar"
          )}
        </Button>
      </div>
    </form>
  )
}
