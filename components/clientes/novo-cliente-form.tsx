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

type NovoClienteFormProps = {
  onSuccess: () => void
  onCancel: () => void
  cliente?: FormValues
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

type Cidade = {
  id: string
  descricao: string
  g_estado_id: string
  g_estado?: {
    uf_descricao: string
  }
}

export function NovoClienteForm({ onSuccess, onCancel, cliente }: NovoClienteFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()

  const [cidades, setCidades] = useState<Cidade[]>([])
  const [cidadeSelecionada, setCidadeSelecionada] = useState<Cidade | null>(null)
  const [carregandoCidades, setCarregandoCidades] = useState(false)
  const [termoPesquisa, setTermoPesquisa] = useState("")
  const [cidadesFiltradas, setCidadesFiltradas] = useState<Cidade[]>([])

  const buscarCidadePorId = async (id: string | number) => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/g_cidades/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) return null

      const data = await response.json()

      if (data && data.data) {
        return data.data
      }
      return null
    } catch (error) {
      console.error("Erro ao buscar cidade por ID:", error)
      return null
    }
  }

  useEffect(() => {
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

      // Buscar a cidade pelo ID para exibir o nome
      if (cliente.g_cidade_id) {
        const carregarCidade = async () => {
          setCarregandoCidades(true)
          try {
            const cidade = await buscarCidadePorId(cliente.g_cidade_id)
            if (cidade) {
              console.log("Cidade carregada:", cidade)
              setCidadeSelecionada(cidade)
            } else {
              console.warn("Cidade não encontrada pelo ID:", cliente.g_cidade_id)
            }
          } catch (error) {
            console.error("Erro ao carregar cidade:", error)
          } finally {
            setCarregandoCidades(false)
          }
        }

        carregarCidade()
      }
    }
  }, [cliente, reset])

  const onSubmit = async (data: FormValues) => {
    const formDataToSend = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key.startsWith("anexo_") === false && typeof value === "string") {
        formDataToSend.append(`c_cliente[${key}]`, value.toUpperCase())
      }
    })

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
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

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

      toast.success(cliente ? "Cliente atualizado com sucesso" : "Cliente criado com sucesso", { duration: 1000 })
      onSuccess()
      reset()
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar cliente", { duration: 1000 })
    }
  }

  const carregarTodasCidades = async () => {
    try {
      setCarregandoCidades(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/g_cidades?page=all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar cidades")

      const data = await response.json()
      const todasCidades = Array.isArray(data.data.items) ? data.data.items : []

      if (cliente && cliente.g_cidade_id && todasCidades.length > 0) {
        const cidadeDoCliente = todasCidades.find((c: Cidade) => c.id.toString() === cliente.g_cidade_id.toString())
        if (cidadeDoCliente) {
          setCidadeSelecionada(cidadeDoCliente)
        }
      }

      return todasCidades
    } catch (error) {
      console.error("Erro ao carregar todas as cidades:", error)
      return []
    } finally {
      setCarregandoCidades(false)
    }
  }

  useEffect(() => {
    const inicializarCidades = async () => {
      const todasCidades = await carregarTodasCidades()
      if (todasCidades.length > 0) {
        setCidades(todasCidades)
        setCidadesFiltradas(todasCidades)
      }
    }

    inicializarCidades()
  }, [])

  // Filtrar cidades quando o termo de pesquisa mudar
  useEffect(() => {
    if (termoPesquisa.length >= 3) {
      const filtradas = cidades.filter((cidade) => cidade.descricao.toLowerCase().includes(termoPesquisa.toLowerCase()))
      setCidadesFiltradas(filtradas)
    } else {
      setCidadesFiltradas(cidades)
    }
  }, [termoPesquisa, cidades])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      {/* Nome Completo */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="nome_completo" className="font-bold mb-2">
          Nome:
        </Label>
        <Input
          id="nome_completo"
          {...register("nome_completo", { required: true })}
          placeholder="Digite o nome completo do cliente..."
        />
        {errors.nome_completo && <span className="text-sm text-red-500">Nome é obrigatório</span>}
      </div>

      {/* CPF/CNPJ */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="cpf_cnpj" className="font-bold mb-2">
          CPF/CNPJ:
        </Label>
        <Input
          id="cpf_cnpj"
          {...register("cpf_cnpj", { required: true })}
          placeholder="Digite o CPF ou CNPJ do cliente..."
        />
        {errors.cpf_cnpj && <span className="text-sm text-red-500">CPF/CNPJ é obrigatório</span>}
      </div>

      {/* RG */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="rg" className="font-bold mb-2">
          RG:
        </Label>
        <Input id="rg" {...register("rg", { required: true })} placeholder="Digite o RG do cliente..." />
        {errors.rg && <span className="text-sm text-red-500">RG é obrigatório</span>}
      </div>

      {/* Telefone */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="telefone" className="font-bold mb-2">
          Telefone:
        </Label>
        <Input
          id="telefone"
          {...register("telefone", { required: true })}
          placeholder="Digite o telefone do cliente..."
        />
        {errors.telefone && <span className="text-sm text-red-500">Telefone é obrigatório</span>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="email" className="font-bold mb-2">
          Email:
        </Label>
        <Input id="email" {...register("email", { required: true })} placeholder="Digite o email do cliente..." />
        {errors.email && <span className="text-sm text-red-500">Email é obrigatório</span>}
      </div>

      {/* CEP */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="cep" className="font-bold mb-2">
          CEP:
        </Label>
        <Input id="cep" {...register("cep", { required: true })} placeholder="Digite o CEP do cliente..." />
        {errors.cep && <span className="text-sm text-red-500">CEP é obrigatório</span>}
      </div>

      {/* Rua */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="rua" className="font-bold mb-2">
          Rua:
        </Label>
        <Input id="rua" {...register("rua", { required: true })} placeholder="Digite a rua do cliente..." />
        {errors.rua && <span className="text-sm text-red-500">Rua é obrigatória</span>}
      </div>

      {/* Número Residencial */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="numero_residencial" className="font-bold mb-2">
          Número Residencial:
        </Label>
        <Input
          id="numero_residencial"
          {...register("numero_residencial", { required: true })}
          placeholder="Digite o número residencial..."
        />
        {errors.numero_residencial && <span className="text-sm text-red-500">Número residencial é obrigatório</span>}
      </div>

      {/* Bairro */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="bairro" className="font-bold mb-2">
          Bairro:
        </Label>
        <Input id="bairro" {...register("bairro", { required: true })} placeholder="Digite o bairro do cliente..." />
        {errors.bairro && <span className="text-sm text-red-500">Bairro é obrigatório</span>}
      </div>

      {/* Complemento */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="complemento" className="font-bold mb-2">
          Complemento:
        </Label>
        <Input
          id="complemento"
          {...register("complemento", { required: true })}
          placeholder="Digite o complemento do endereço..."
        />
        {errors.complemento && <span className="text-sm text-red-500">Complemento é obrigatório</span>}
      </div>

      {/* Cidade - Select Nativo */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="g_cidade_id" className="font-bold mb-2">
          Cidade:
        </Label>

        {/* Campo de pesquisa para filtrar cidades */}
        <Controller
          name="g_cidade_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="relative">
              {carregandoCidades ? (
                <div className="flex items-center justify-center p-4 border rounded-md">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Carregando cidades...</span>
                </div>
              ) : (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => {
                    field.onChange(value)
                    const cidade = cidades.find((c) => c.id.toString() === value)
                    if (cidade) {
                      setCidadeSelecionada(cidade)
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {cidadesFiltradas.length > 0 ? (
                      cidadesFiltradas.map((cidade) => (
                        <SelectItem key={cidade.id} value={cidade.id.toString()}>
                          {cidade.descricao} {cidade.g_estado?.uf_descricao ? `- ${cidade.g_estado.uf_descricao}` : ""}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-center text-gray-500">
                        {termoPesquisa.length >= 3
                          ? "Nenhuma cidade encontrada"
                          : "Digite pelo menos 3 caracteres para buscar"}
                      </div>
                    )}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}
        />
        {errors.g_cidade_id && <span className="text-sm text-red-500">Cidade é obrigatória</span>}
      </div>

      {/* Arquivos */}
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="anexo_cpf" className="font-bold mb-2">
          Anexo CPF:
        </Label>
        <Input id="anexo_cpf" type="file" {...register("anexo_cpf")} />
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="anexo_rg" className="font-bold mb-2">
          Anexo RG:
        </Label>
        <Input id="anexo_rg" type="file" {...register("anexo_rg")} />
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="anexo_comprovante_residencia" className="font-bold mb-2">
          Comprovante de Residência:
        </Label>
        <Input id="anexo_comprovante_residencia" type="file" {...register("anexo_comprovante_residencia")} />
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : cliente ? "Atualizar" : "Salvar"}
        </Button>
      </div>
    </form>
  )
}
