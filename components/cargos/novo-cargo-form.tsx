"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import Cookies from "js-cookie"
import { Loader2, Shield, Edit3, Users, Lock } from "lucide-react"

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
      permissoes: [],
    },
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

  // Função para obter nomes das permissões
  const getNomesPermissoes = (permissoesIds: string[]) => {
    return permissoesIds
      .map((id) => {
        const permissao = permissoes.find((p) => p.id === id)
        return permissao?.nome || id
      })
      .join(", ")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      {/* Indicador de modo de edição */}
      {cargo ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-blue-900">Editando Cargo</h3>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                  <Shield className="w-3 h-3 mr-1" />
                  ID: {cargo.id}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-blue-700 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Nome:
                  </span>
                  <p className="text-blue-900 font-medium">{cargo.nome}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-700 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Permissões:
                  </span>
                  <p className="text-blue-900 text-xs">
                    {cargo.permissoes && cargo.permissoes.length > 0
                      ? `${cargo.permissoes.length} permissão(ões)`
                      : "Nenhuma permissão"}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-medium text-blue-700">Descrição:</span>
                  <p className="text-blue-900 text-sm">{cargo.descricao}</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded-md">
                <p className="text-xs text-blue-700">
                  💡 <strong>Dica:</strong> Você está editando o cargo "{cargo.nome}". Todos os campos serão atualizados
                  com as novas informações.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">Novo Cargo</h3>
              <p className="text-sm text-green-700">Preencha os dados abaixo para criar um novo cargo no sistema.</p>
            </div>
          </div>
        </div>
      )}

      {/* Seção: Informações Básicas */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Informações Básicas
        </h4>
        <div className="space-y-4">
          {/* Nome do Cargo */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="nome" className="font-bold mb-2">
              Nome do Cargo:
            </Label>
            <Input
              id="nome"
              {...register("nome", {
                required: "Nome do cargo é obrigatório",
                minLength: {
                  value: 2,
                  message: "Nome deve ter pelo menos 2 caracteres",
                },
              })}
              placeholder="Digite o nome do cargo..."
            />
            {errors.nome && <span className="text-sm text-red-500">{errors.nome.message}</span>}
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="descricao" className="font-bold mb-2">
              Descrição:
            </Label>
            <Textarea
              id="descricao"
              {...register("descricao", {
                required: "Descrição é obrigatória",
                minLength: {
                  value: 10,
                  message: "Descrição deve ter pelo menos 10 caracteres",
                },
              })}
              placeholder="Descreva as responsabilidades deste cargo..."
              rows={3}
            />
            {errors.descricao && <span className="text-sm text-red-500">{errors.descricao.message}</span>}
          </div>
        </div>
      </div>

      {/* Seção: Permissões */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Permissões de Acesso
        </h4>
        <div className="flex flex-col gap-1">
          <Label className="font-bold mb-2">Selecione as permissões:</Label>

          {carregandoPermissoes ? (
            <div className="flex items-center justify-center p-4 border rounded-md">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span>Carregando permissões...</span>
            </div>
          ) : (
            <div className="space-y-2 border rounded-md p-4 bg-white">
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
                            const currentPermissoes = [...(field.value || [])]
                            if (checked) {
                              if (!currentPermissoes.includes(permissao.id)) {
                                setValue("permissoes", [...currentPermissoes, permissao.id])
                              }
                            } else {
                              setValue(
                                "permissoes",
                                currentPermissoes.filter((id) => id !== permissao.id),
                              )
                            }
                          }}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor={`permissao-${permissao.id}`} className="font-medium text-sm cursor-pointer">
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
              {cargo ? "Atualizando..." : "Salvando..."}
            </>
          ) : cargo ? (
            "Atualizar Cargo"
          ) : (
            "Criar Cargo"
          )}
        </Button>
      </div>
    </form>
  )
}
