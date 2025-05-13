"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Cookies from "js-cookie"
import { Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type NovoUsuarioFormProps = {
  onSuccess: () => void
  onCancel: () => void
  usuario?: FormValues
}

type FormValues = {
  id?: string
  nome: string
  email: string
  senha?: string
  cargo_id: string
  status: string
}

type Cargo = {
  id: string
  nome: string
  descricao: string
}

export function NovoUsuarioForm({ onSuccess, onCancel, usuario }: NovoUsuarioFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: {
      status: "ativo"
    }
  })

  const [cargos, setCargos] = useState<Cargo[]>([])
  const [carregandoCargos, setCarregandoCargos] = useState(false)

  useEffect(() => {
    if (usuario) {
      reset({
        nome: usuario.nome,
        email: usuario.email,
        cargo_id: usuario.cargo_id,
        status: usuario.status,
      })
    }
  }, [usuario, reset])

  const onSubmit = async (data: FormValues) => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      // Preparar os dados para envio
      const dadosParaEnviar = {
        ...data,
        // Se for edição e não tiver senha, não enviar o campo senha
        ...(usuario && !data.senha && { senha: undefined })
      }

      const url = usuario
        ? `${process.env.NEXT_PUBLIC_API_URL}api/v1/usuarios/${usuario.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}api/v1/usuarios`

      const method = usuario ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dadosParaEnviar),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error || "Falha ao salvar usuário")
      }

      toast.success(usuario ? "Usuário atualizado com sucesso" : "Usuário criado com sucesso", { duration: 2000 })
      onSuccess()
      reset()
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar usuário", { duration: 2000 })
    }
  }

  const carregarCargos = async () => {
    try {
      setCarregandoCargos(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/cargos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar cargos")

      const data = await response.json()
      const todosCargos = Array.isArray(data.data.items) ? data.data.items : []
      setCargos(todosCargos)
    } catch (error) {
      console.error("Erro ao carregar cargos:", error)
      toast.error("Não foi possível carregar a lista de cargos", { duration: 2000 })
    } finally {
      setCarregandoCargos(false)
    }
  }

  useEffect(() => {
    carregarCargos()
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      {/* Nome */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="nome" className="font-bold mb-2">
          Nome:
        </Label>
        <Input
          id="nome"
          {...register("nome", { required: "Nome é obrigatório" })}
          placeholder="Digite o nome completo do usuário..."
        />
        {errors.nome && <span className="text-sm text-red-500">{errors.nome.message}</span>}
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
              message: "Email inválido"
            }
          })}
          placeholder="Digite o email do usuário..."
        />
        {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
      </div>

      {/* Senha */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="senha" className="font-bold mb-2">
          Senha: {usuario && <span className="text-sm font-normal text-gray-500">(Deixe em branco para manter a atual)</span>}
        </Label>
        <Input
          id="senha"
          type="password"
          {...register("senha", { 
            required: usuario ? false : "Senha é obrigatória",
            minLength: {
              value: 6,
              message: "A senha deve ter pelo menos 6 caracteres"
            }
          })}
          placeholder={usuario ? "••••••••" : "Digite a senha do usuário..."}
        />
        {errors.senha && <span className="text-sm text-red-500">{errors.senha.message}</span>}
      </div>

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
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(value)}
                >
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
                      <div className="p-2 text-center text-gray-500">
                        Nenhum cargo encontrado
                      </div>
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
        <Label className="font-bold mb-2">
          Status:
        </Label>
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status é obrigatório" }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ativo" id="status-ativo" />
                <Label htmlFor="status-ativo" className="font-normal">Ativo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inativo" id="status-inativo" />
                <Label htmlFor="status-inativo" className="font-normal">Inativo</Label>
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
          ) : (
            usuario ? "Atualizar" : "Salvar"
          )}
        </Button>
      </div>
    </form>
  )
}
