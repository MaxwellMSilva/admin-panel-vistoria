"use client"

import { useEffect, useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Cookies from "js-cookie"
import { Loader2, User, Edit3, MapPin, FileText, Phone, Mail, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
  id: string | number
  descricao: string
  g_estado?: {
    id: string | number
    descricao: string
    uf_descricao: string
  }
}

export function NovoClienteForm({ onSuccess, onCancel, cliente }: NovoClienteFormProps) {
  // Log detalhado do cliente recebido
  console.log("CLIENTE RECEBIDO PARA EDIÇÃO:", JSON.stringify(cliente, null, 2))

  const [cidades, setCidades] = useState<Cidade[]>([])
  const [loading, setLoading] = useState(true)
  const [cidadesCarregadas, setCidadesCarregadas] = useState(false)

  // Referência para controlar a inicialização do formulário
  const formInitialized = useRef(false)

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()

  const formRef = useRef<HTMLFormElement>(null)

  // Função para buscar cidades
  const fetchCidades = async () => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/g_cidades?page=all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar cidades")

      const data = await response.json()
      console.log("Cidades recebidas:", data)

      // Baseado na estrutura que vimos no screenshot
      let cidadesArray: Cidade[] = []
      if (data.success && Array.isArray(data.data?.items)) {
        cidadesArray = data.data.items
      } else if (Array.isArray(data.data)) {
        cidadesArray = data.data
      } else if (Array.isArray(data)) {
        cidadesArray = data
      }

      console.log("Cidades processadas:", cidadesArray)
      setCidades(cidadesArray)
      setCidadesCarregadas(true)
    } catch (error) {
      console.error("Erro ao buscar cidades:", error)
      toast.error("Não foi possível carregar as cidades", { duration: 1000 })
    } finally {
      setLoading(false)
    }
  }

  // Função para buscar cliente específico por ID
  const fetchClienteById = async (clienteId: number) => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      console.log("Buscando cliente por ID:", clienteId)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/c_clientes/${clienteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar cliente")

      const data = await response.json()
      console.log("Cliente específico recebido da API:", data)

      // Retornar apenas os dados do cliente (baseado na estrutura da API)
      return data.data || data
    } catch (error) {
      console.error("Erro ao buscar cliente:", error)
      toast.error("Não foi possível carregar os dados do cliente", { duration: 1000 })
      return null
    }
  }

  // Carregar cidades ao montar o componente
  useEffect(() => {
    fetchCidades()
  }, [])

  // Inicializar o formulário quando as cidades forem carregadas e o cliente estiver disponível
  useEffect(() => {
    const initializeForm = async () => {
      if (cidadesCarregadas && cliente && !formInitialized.current) {
        let clienteData = cliente

        // Se temos apenas o ID, buscar os dados completos do endpoint individual
        if (cliente.id && (!cliente.nome_completo || !cliente.g_cidade_id)) {
          console.log("Buscando dados completos do cliente via API individual...")
          const dadosCompletos = await fetchClienteById(cliente.id)
          if (dadosCompletos) {
            clienteData = dadosCompletos
            console.log("Dados completos do cliente obtidos:", clienteData)
          }
        }

        console.log("=== INICIALIZANDO FORMULÁRIO ===")
        console.log("Cliente para inicialização:", JSON.stringify(clienteData, null, 2))
        console.log("Cidade ID do cliente:", clienteData.g_cidade_id, "Tipo:", typeof clienteData.g_cidade_id)
        console.log(
          "Cidades disponíveis:",
          cidades.map((c) => ({ id: c.id, descricao: c.descricao })),
        )

        // Definir valores do formulário
        const formData = {
          nome_completo: clienteData.nome_completo || "",
          cpf_cnpj: clienteData.cpf_cnpj || "",
          rg: clienteData.rg || "",
          telefone: clienteData.telefone || "",
          email: clienteData.email || "",
          cep: clienteData.cep || "",
          rua: clienteData.rua || "",
          numero_residencial: clienteData.numero_residencial || "",
          bairro: clienteData.bairro || "",
          complemento: clienteData.complemento || "",
          g_cidade_id: clienteData.g_cidade_id?.toString() || "",
        }

        console.log("Dados do formulário a serem definidos:", formData)
        reset(formData)

        // Verificar e definir a cidade
        const cidadeIdString = clienteData.g_cidade_id?.toString()
        if (cidadeIdString) {
          const cidadeEncontrada = cidades.find((c) => c.id.toString() === cidadeIdString)
          console.log("Procurando cidade com ID:", cidadeIdString)
          console.log("Cidade encontrada:", cidadeEncontrada)

          if (cidadeEncontrada) {
            console.log("✅ Cidade encontrada:", cidadeEncontrada.descricao)
            // Definir o valor da cidade com delay para garantir que o DOM esteja pronto
            setTimeout(() => {
              setValue("g_cidade_id", cidadeIdString)
              console.log("Valor da cidade definido:", cidadeIdString)
              // Verificar se foi definido corretamente
              setTimeout(() => {
                const selectElement = document.querySelector('select[name="g_cidade_id"]') as HTMLSelectElement
                if (selectElement) {
                  console.log("Valor atual do select no DOM:", selectElement.value)
                  if (selectElement.value !== cidadeIdString) {
                    console.log("⚠️ Forçando valor diretamente no DOM")
                    selectElement.value = cidadeIdString
                    // Disparar evento de mudança
                    selectElement.dispatchEvent(new Event("change", { bubbles: true }))
                  }
                }
              }, 100)
              formInitialized.current = true
            }, 200)
          } else {
            console.log("❌ Cidade não encontrada para ID:", cidadeIdString)
            console.log(
              "IDs disponíveis:",
              cidades.map((c) => c.id.toString()),
            )
            formInitialized.current = true
          }
        } else {
          console.log("⚠️ Cliente sem cidade definida")
          formInitialized.current = true
        }
      }
    }

    initializeForm()
  }, [cliente, cidades, cidadesCarregadas, reset, setValue])

  // Resetar o estado de inicialização quando o cliente mudar
  useEffect(() => {
    formInitialized.current = false
  }, [cliente?.id])

  const onSubmit = async (data: FormValues) => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      // Criar FormData
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

      // Log do FormData
      console.log("Dados a serem enviados:")
      for (const pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`)
      }

      const url = cliente
        ? `${process.env.NEXT_PUBLIC_API_URL}api/v1/c_clientes/${cliente.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}api/v1/c_clientes`
      const method = cliente ? "PUT" : "POST"

      console.log(`Enviando requisição ${method} para ${url}`)

      const response = await fetch(url, {
        method,
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error || "Falha ao processar cliente")
      }

      toast.success(cliente ? "Cliente atualizado com sucesso" : "Cliente criado com sucesso", { duration: 1000 })
      onSuccess()
      reset()
      formInitialized.current = false
    } catch (error: any) {
      console.error("Erro ao processar cliente:", error)
      toast.error(error.message || "Erro ao processar cliente", { duration: 1000 })
    }
  }

  // Função para obter o nome da cidade
  const getNomeCidade = (cidadeId: string | number) => {
    const cidade = cidades.find((c) => c.id.toString() === cidadeId.toString())
    return cidade
      ? `${cidade.descricao}${cidade.g_estado?.uf_descricao ? ` - ${cidade.g_estado.uf_descricao}` : ""}`
      : "Cidade não encontrada"
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando dados...</span>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      {/* Indicador de modo de edição */}
      {cliente ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-blue-900">Editando Cliente</h3>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                  <User className="w-3 h-3 mr-1" />
                  ID: {cliente.id}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-blue-700 flex items-center gap-1">
                    <User className="w-3 h-3" />
                    Nome:
                  </span>
                  <p className="text-blue-900 truncate">{cliente.nome_completo}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-700 flex items-center gap-1">
                    <CreditCard className="w-3 h-3" />
                    CPF/CNPJ:
                  </span>
                  <p className="text-blue-900">{cliente.cpf_cnpj}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-700 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Telefone:
                  </span>
                  <p className="text-blue-900">{cliente.telefone}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-700 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Email:
                  </span>
                  <p className="text-blue-900 truncate">{cliente.email}</p>
                </div>
                {cliente.g_cidade_id && (
                  <div className="sm:col-span-2">
                    <span className="font-medium text-blue-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Cidade:
                    </span>
                    <p className="text-blue-900">{getNomeCidade(cliente.g_cidade_id)}</p>
                  </div>
                )}
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded-md">
                <p className="text-xs text-blue-700">
                  💡 <strong>Dica:</strong> Você está editando os dados do cliente. Todos os campos serão atualizados
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
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">Novo Cliente</h3>
              <p className="text-sm text-green-700">
                Preencha os dados abaixo para cadastrar um novo cliente no sistema.
              </p>
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
              Nome:
            </Label>
            <Input
              id="nome_completo"
              {...register("nome_completo", { required: "Nome é obrigatório" })}
              placeholder="Digite o nome completo do cliente..."
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
              {...register("cpf_cnpj", { required: "CPF/CNPJ é obrigatório" })}
              placeholder="Digite o CPF ou CNPJ do cliente..."
            />
            {errors.cpf_cnpj && (
              <span className="text-sm text-red-500">{errors.cpf_cnpj.message}</span>
            )}
          </div>

          {/* RG */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="rg" className="font-bold mb-2">
              RG:
            </Label>
            <Input
              id="rg"
              {...register("rg", { required: "RG é obrigatório" })}
              placeholder="Digite o RG do cliente..."
            />
            {errors.rg && <span className="text-sm text-red-500">{errors.rg.message}</span>}
          </div>

          {/* Telefone */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="telefone" className="font-bold mb-2">
              Telefone:
            </Label>
            <Input
              id="telefone"
              {...register("telefone", { required: "Telefone é obrigatório" })}
              placeholder="Digite o telefone do cliente..."
            />
            {errors.telefone && (
              <span className="text-sm text-red-500">{errors.telefone.message}</span>
            )}
          </div>

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
              placeholder="Digite o email do cliente..."
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
          </div>
        </div>
      </div>

      {/* Seção: Endereço */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Endereço
        </h4>
        <div className="grid grid-cols-1 gap-4">
          {/* CEP */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="cep" className="font-bold mb-2">
              CEP:
            </Label>
            <Input
              id="cep"
              {...register("cep", { required: "CEP é obrigatório" })}
              placeholder="Digite o CEP do cliente..."
            />
            {errors.cep && <span className="text-sm text-red-500">{errors.cep.message}</span>}
          </div>

          {/* Rua */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="rua" className="font-bold mb-2">
              Rua:
            </Label>
            <Input
              id="rua"
              {...register("rua", { required: "Rua é obrigatória" })}
              placeholder="Digite a rua do cliente..."
            />
            {errors.rua && <span className="text-sm text-red-500">{errors.rua.message}</span>}
          </div>

          {/* Número Residencial */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="numero_residencial" className="font-bold mb-2">
              Número:
            </Label>
            <Input
              id="numero_residencial"
              {...register("numero_residencial", { required: "Número residencial é obrigatório" })}
              placeholder="Digite o número..."
            />
            {errors.numero_residencial && (
              <span className="text-sm text-red-500">{errors.numero_residencial.message}</span>
            )}
          </div>

          {/* Bairro */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="bairro" className="font-bold mb-2">
              Bairro:
            </Label>
            <Input
              id="bairro"
              {...register("bairro", { required: "Bairro é obrigatório" })}
              placeholder="Digite o bairro..."
            />
            {errors.bairro && <span className="text-sm text-red-500">{errors.bairro.message}</span>}
          </div>

          {/* Complemento */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="complemento" className="font-bold mb-2">
              Complemento:
            </Label>
            <Input
              id="complemento"
              {...register("complemento", { required: "Complemento é obrigatório" })}
              placeholder="Digite o complemento..."
            />
            {errors.complemento && <span className="text-sm text-red-500">{errors.complemento.message}</span>}
          </div>

          {/* Cidade */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="g_cidade_id" className="font-bold mb-2">
              Cidade:
            </Label>
            <div className="relative">
              <Controller
                name="g_cidade_id"
                control={control}
                rules={{ required: "Cidade é obrigatória" }}
                render={({ field }) => (
                  <select
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={field.value?.toString() || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      console.log("Cidade selecionada:", e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Selecione uma cidade
                    </option>
                    {cidades.map((cidade) => (
                      <option key={cidade.id} value={cidade.id.toString()}>
                        {cidade.descricao} {cidade.g_estado?.uf_descricao ? `- ${cidade.g_estado.uf_descricao}` : ""}
                      </option>
                    ))}
                  </select>
                )}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {errors.g_cidade_id && <span className="text-sm text-red-500">{errors.g_cidade_id.message}</span>}
            {cidades.length === 0 && !loading && (
              <span className="text-sm text-amber-500">Nenhuma cidade encontrada.</span>
            )}
          </div>
        </div>
      </div>

      {/* Seção: Documentos */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Documentos
        </h4>

        <div className="flex flex-col gap-4">
          {/* Anexo CPF */}
          <div className="flex flex-col">
            <Label htmlFor="anexo_cpf" className="font-bold mb-2">
              Anexo CPF:
            </Label>
            <Input
              id="anexo_cpf"
              type="file"
              {...register("anexo_cpf")}
              accept=".pdf,.jpg,.jpeg,.png"
              className="h-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Anexo RG */}
          <div className="flex flex-col">
            <Label htmlFor="anexo_rg" className="font-bold mb-2">
              Anexo RG:
            </Label>
            <Input
              id="anexo_rg"
              type="file"
              {...register("anexo_rg")}
              accept=".pdf,.jpg,.jpeg,.png"
              className="h-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Comprovante de Residência */}
          <div className="flex flex-col">
            <Label htmlFor="anexo_comprovante_residencia" className="font-bold mb-2">
              Comprovante de Residência:
            </Label>
            <Input
              id="anexo_comprovante_residencia"
              type="file"
              {...register("anexo_comprovante_residencia")}
              accept=".pdf,.jpg,.jpeg,.png"
              className="h-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">📎 Formatos aceitos: PDF, JPG, JPEG, PNG</p>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-2 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset()
            formInitialized.current = false
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
              {cliente ? "Atualizando..." : "Salvando..."}
            </>
          ) : cliente ? (
            "Atualizar Cliente"
          ) : (
            "Criar Cliente"
          )}
        </Button>
      </div>
    </form>
  )
}
