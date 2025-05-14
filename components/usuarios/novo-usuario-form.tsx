"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Cookies from "js-cookie"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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

  // Atualizar o formulário para usar os nomes de campos corretos
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      {/* Nome Completo */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="nome_completo" className="font-bold mb-2">
          Nome Completo:
        </Label>
        <Input
          id="nome_completo"
          {...register("nome_completo", { required: "Nome completo é obrigatório" })}
          placeholder="Digite o nome completo do usuário..."
        />
        {errors.nome_completo && <span className="text-sm text-red-500">{errors.nome_completo.message}</span>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1 mb-4">
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
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="password" className="font-bold mb-2">
          Senha:{" "}
          {usuario && <span className="text-sm font-normal text-gray-500">(Deixe em branco para manter a atual)</span>}
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
      </div>

      {/* Telefone */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="telefone" className="font-bold mb-2">
          Telefone:
        </Label>
        <Input
          id="telefone"
          {...register("telefone", { required: "Telefone é obrigatório" })}
          placeholder="Digite o telefone do usuário..."
        />
        {errors.telefone && <span className="text-sm text-red-500">{errors.telefone.message}</span>}
      </div>

      {/* CPF/CNPJ */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="cpf_cnpj" className="font-bold mb-2">
          CPF/CNPJ:
        </Label>
        <Input
          id="cpf_cnpj"
          {...register("cpf_cnpj", { required: "CPF/CNPJ é obrigatório" })}
          placeholder="Digite o CPF ou CNPJ do usuário..."
        />
        {errors.cpf_cnpj && <span className="text-sm text-red-500">{errors.cpf_cnpj.message}</span>}
      </div>

      {/* Campo oculto para c_tipo_usuario_id */}
      <input type="hidden" {...register("c_tipo_usuario_id")} />

      {/* Cargo */}
      <div className="flex flex-col gap-1 mb-4">
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
                          {cargo.nome}
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
      <div className="flex flex-col gap-1 mb-4">
        <Label className="font-bold mb-2">Status:</Label>
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status é obrigatório" }}
          render={({ field }) => (
            <RadioGroup value={field.value} onValueChange={field.onChange} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ativo" id="status-ativo" />
                <Label htmlFor="status-ativo" className="font-normal">
                  Ativo
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inativo" id="status-inativo" />
                <Label htmlFor="status-inativo" className="font-normal">
                  Inativo
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.status && <span className="text-sm text-red-500">{errors.status.message}</span>}
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
              {usuario ? "Atualizando..." : "Salvando..."}
            </>
          ) : usuario ? (
            "Atualizar"
          ) : (
            "Salvar"
          )}
        </Button>
      </div>
    </form>
  )
}
