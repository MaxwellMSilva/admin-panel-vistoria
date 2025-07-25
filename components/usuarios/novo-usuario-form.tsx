"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Cookies from "js-cookie"
import { Loader2, User, Edit3 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

type NovoUsuarioFormProps = {
  onSuccess: () => void
  onCancel: () => void
  usuario?: FormValues
}

// Atualizar o tipo FormValues para incluir os campos corretos
type FormValues = {
  id?: string
  nome_completo: string
  email: string
  password?: string
  telefone: string
  cpf_cnpj: string
  c_tipo_usuario_id: string
  status: string
}

type Cargo = {
  id: string
  nome: string
  descricao: string
}

export function NovoUsuarioForm({ onSuccess, onCancel, usuario }: NovoUsuarioFormProps) {
  // Atualizar o defaultValues no useForm para incluir c_tipo_usuario_id com valor padrão 2
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: {
      status: "ativo",
      c_tipo_usuario_id: "2",
    },
  })

  const [cargos, setCargos] = useState<Cargo[]>([])
  const [carregandoCargos, setCarregandoCargos] = useState(false)

  // API base URL
  const API_BASE_URL = "http://145.223.121.165:3010"

  // Atualizar o useEffect para reset com os campos corretos
  useEffect(() => {
    if (usuario) {
      reset({
        nome_completo: usuario.nome_completo,
        email: usuario.email,
        telefone: usuario.telefone,
        cpf_cnpj: usuario.cpf_cnpj,
        c_tipo_usuario_id: usuario.c_tipo_usuario_id || "2",
        status: usuario.status,
      })
    }
  }, [usuario, reset])

  // Atualizar a função onSubmit para usar os nomes de campos corretos
  const onSubmit = async (data: FormValues) => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      // Preparar os dados para envio
      const dadosParaEnviar = {
        ...data,
        // Se for edição e não tiver senha, não enviar o campo senha
        ...(usuario && !data.password && { password: undefined }),
      }

      // Garantir que c_tipo_usuario_id seja enviado como "2" se não estiver definido
      if (!dadosParaEnviar.c_tipo_usuario_id) {
        dadosParaEnviar.c_tipo_usuario_id = "2"
      }

      const url = usuario ? `${API_BASE_URL}/api/v1/usuarios/${usuario.id}` : `${API_BASE_URL}/register`
      const method = usuario ? "PUT" : "POST"

      console.log("Enviando dados para:", url)
      console.log("Método:", method)
      console.log("Dados:", dadosParaEnviar)

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(usuario && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(dadosParaEnviar),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        console.error("Erro na resposta da API:", errorData)
        throw new Error(errorData?.error || `Falha ao salvar usuário (${response.status})`)
      }

      toast.success(usuario ? "Usuário atualizado com sucesso" : "Usuário criado com sucesso", { duration: 2000 })
      onSuccess()
      reset()
    } catch (error: any) {
      console.error("Erro ao salvar usuário:", error)
      toast.error(error.message || "Erro ao salvar usuário", { duration: 2000 })
    }
  }

  const carregarCargos = async () => {
    try {
      setCarregandoCargos(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${API_BASE_URL}/api/v1/cargos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar cargos")

      const data = await response.json()
      console.log("Resposta da API de cargos:", data)

      const todosCargos = Array.isArray(data.data.items) ? data.data.items : []
      setCargos(todosCargos)

      // Se não houver cargos, usar dados simulados
      if (todosCargos.length === 0) {
        const cargosMock = [
          { id: "1", nome: "Administrador", descricao: "Acesso total ao sistema" },
          { id: "2", nome: "Operador", descricao: "Acesso operacional" },
          { id: "3", nome: "Gerente", descricao: "Acesso gerencial" },
          { id: "4", nome: "Atendente", descricao: "Acesso ao atendimento" },
        ]
        setCargos(cargosMock)
      }
    } catch (error) {
      console.error("Erro ao carregar cargos:", error)
      toast.error("Não foi possível carregar a lista de cargos", { duration: 2000 })
      // Usar dados simulados em caso de erro
      const cargosMock = [
        { id: "1", nome: "Administrador", descricao: "Acesso total ao sistema" },
        { id: "2", nome: "Operador", descricao: "Acesso operacional" },
        { id: "3", nome: "Gerente", descricao: "Acesso gerencial" },
        { id: "4", nome: "Atendente", descricao: "Acesso ao atendimento" },
      ]
      setCargos(cargosMock)
    } finally {
      setCarregandoCargos(false)
    }
  }

  useEffect(() => {
    carregarCargos()
  }, [])

  // Função para obter o nome do cargo
  const getNomeCargo = (cargoId: string) => {
    const cargo = cargos.find((c) => c.id === cargoId)
    return cargo?.nome || "Cargo não encontrado"
  }

  // Atualizar o formulário para usar os nomes de campos corretos
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      {/* Indicador de modo de edição */}
      {usuario ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-blue-900">Editando Usuário</h3>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                  <User className="w-3 h-3 mr-1" />
                  ID: {usuario.id}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-blue-700">Nome:</span>
                  <p className="text-blue-900 truncate">{usuario.nome_completo}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Email:</span>
                  <p className="text-blue-900 truncate">{usuario.email}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Status:</span>
                  <Badge
                    variant="outline"
                    className={`ml-2 ${
                      usuario.status === "ativo"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-red-100 text-red-800 border-red-300"
                    }`}
                  >
                    {usuario.status === "ativo" ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium text-blue-700">CPF/CNPJ:</span>
                  <p className="text-blue-900">{usuario.cpf_cnpj}</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded-md">
                <p className="text-xs text-blue-700">
                  💡 <strong>Dica:</strong> Deixe o campo senha em branco para manter a senha atual do usuário.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">Novo Usuário</h3>
              <p className="text-sm text-green-700">Preencha os dados abaixo para criar um novo usuário no sistema.</p>
            </div>
          </div>
        </div>
      )}

      {/* Seção: Dados Pessoais */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <User className="w-4 h-4" />
          Dados Pessoais
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {/* Nome Completo */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="nome_completo" className="font-bold mb-2">
              Nome Completo:
            </Label>
            <Input
              id="nome_completo"
              {...register("nome_completo", {
                required: "Nome completo é obrigatório",
                minLength: {
                  value: 2,
                  message: "Nome deve ter pelo menos 2 caracteres",
                },
              })}
              placeholder="Digite o nome completo do usuário..."
            />
            {errors.nome_completo && (
              <span className="text-sm text-red-500">{errors.nome_completo.message}</span>
            )}
          </div>

          {/* CPF/CNPJ */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="cpf_cnpj" className="font-bold mb-2">
              CPF/CNPJ:
            </Label>
            <Input
              id="cpf_cnpj"
              {...register("cpf_cnpj", {
                required: "CPF/CNPJ é obrigatório",
                minLength: {
                  value: 11,
                  message: "CPF/CNPJ deve ter pelo menos 11 caracteres",
                },
              })}
              placeholder="Digite o CPF ou CNPJ do usuário..."
            />
            {errors.cpf_cnpj && (
              <span className="text-sm text-red-500">{errors.cpf_cnpj.message}</span>
            )}
          </div>

          {/* Telefone */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="telefone" className="font-bold mb-2">
              Telefone:
            </Label>
            <Input
              id="telefone"
              {...register("telefone", {
                required: "Telefone é obrigatório",
                minLength: {
                  value: 10,
                  message: "Telefone deve ter pelo menos 10 caracteres",
                },
              })}
              placeholder="Digite o telefone do usuário..."
            />
            {errors.telefone && (
              <span className="text-sm text-red-500">{errors.telefone.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Seção: Credenciais de Acesso */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          Credenciais de Acesso
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="font-bold mb-2">
              Email:
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              placeholder="Digite o email do usuário..."
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="password" className="font-bold mb-2">
              Senha:
              {usuario && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (Deixe em branco para manter a atual)
                </span>
              )}
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: usuario ? false : "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres",
                },
              })}
              placeholder={usuario ? "••••••••" : "Digite a senha do usuário..."}
            />
            {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
            {usuario && (
              <p className="text-xs text-gray-500 mt-1">
                ℹ️ A senha atual será mantida se este campo ficar em branco
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Seção: Configurações */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Configurações
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {/* Campo oculto para c_tipo_usuario_id */}
          <input type="hidden" {...register("c_tipo_usuario_id")} />

          {/* Cargo */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="cargo_id" className="font-bold mb-2">
              Cargo:
            </Label>
            <Controller
              name="cargo_id"
              control={control}
              rules={{ required: "Cargo é obrigatório" }}
              render={({ field }) => (
                <div className="relative">
                  {carregandoCargos ? (
                    <div className="flex items-center justify-center p-4 border rounded-md">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span>Carregando cargos...</span>
                    </div>
                  ) : (
                    <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        {cargos.length > 0 ? (
                          cargos.map((cargo) => (
                            <SelectItem key={cargo.id} value={cargo.id.toString()}>
                              <div className="flex flex-col">
                                <span className="font-medium">{cargo.nome}</span>
                                <span className="text-xs text-gray-500">{cargo.descricao}</span>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-center text-gray-500">Nenhum cargo encontrado</div>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}
            />
            {errors.cargo_id && <span className="text-sm text-red-500">{errors.cargo_id.message}</span>}
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <Label className="font-bold mb-2">Status:</Label>
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status é obrigatório" }}
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ativo" id="status-ativo" />
                    <Label htmlFor="status-ativo" className="font-normal flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Ativo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inativo" id="status-inativo" />
                    <Label htmlFor="status-inativo" className="font-normal flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Inativo
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.status && <span className="text-sm text-red-500">{errors.status.message}</span>}
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
              {usuario ? "Atualizando..." : "Salvando..."}
            </>
          ) : usuario ? (
            "Atualizar Usuário"
          ) : (
            "Criar Usuário"
          )}
        </Button>
      </div>
    </form>
  )
}
