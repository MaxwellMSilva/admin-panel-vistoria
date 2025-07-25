"use client"

import { useRef, useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Cookies from "js-cookie"
import { Loader2 } from "lucide-react"

type VeiculoFormProps = {
  onSuccess: () => void
  onCancel: () => void
  veiculo?: {
    id: string
    placa: string
    descricao: string
    v_modelo_id: string
    v_cor_id: string
    v_fabricante_id: string
    c_cliente_id: string
  } | null
}

type FormValues = {
  placa: string
  descricao: string
  v_modelo_id: string
  v_cor_id: string
  v_fabricante_id: string
  c_cliente_id: string
}

type Modelo = {
  id: string
  descricao: string
}

type Cor = {
  id: string
  descricao: string
}

type Fabricante = {
  id: string
  descricao: string
}

type Cliente = {
  id: string
  nome_completo: string
  cpf_cnpj: string
}

export function NovoVeiculoForm({ onSuccess, onCancel, veiculo }: VeiculoFormProps) {
  const [modelos, setModelos] = useState<Modelo[]>([])
  const [cores, setCores] = useState<Cor[]>([])
  const [fabricantes, setFabricantes] = useState<Fabricante[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [dadosCarregados, setDadosCarregados] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string>("")

  // Referência para controlar a inicialização do formulário
  const formInitialized = useRef(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: {
      placa: "",
      descricao: "",
      v_modelo_id: "",
      v_cor_id: "",
      v_fabricante_id: "",
      c_cliente_id: "",
    },
  })

  const formRef = useRef<HTMLFormElement>(null)

  const fetchModelos = async () => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_modelos?page=all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar modelos")

      const data = await response.json()
      console.log("Modelos recebidos:", data)

      let modelosArray: Modelo[] = []
      if (data.success && Array.isArray(data.data?.items)) {
        modelosArray = data.data.items
      } else if (Array.isArray(data.data)) {
        modelosArray = data.data
      } else if (Array.isArray(data)) {
        modelosArray = data
      }

      console.log("Modelos processados:", modelosArray)
      setModelos(modelosArray)
    } catch (error) {
      console.error("Erro ao buscar modelos:", error)
      toast.error("Não foi possível carregar os modelos", { duration: 2000 })
    }
  }

  const fetchCores = async () => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_cores?page=all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar cores")

      const data = await response.json()
      console.log("Cores recebidas:", data)

      let coresArray: Cor[] = []
      if (data.success && Array.isArray(data.data?.items)) {
        coresArray = data.data.items
      } else if (Array.isArray(data.data)) {
        coresArray = data.data
      } else if (Array.isArray(data)) {
        coresArray = data
      }

      console.log("Cores processadas:", coresArray)
      setCores(coresArray)
    } catch (error) {
      console.error("Erro ao buscar cores:", error)
      toast.error("Não foi possível carregar as cores", { duration: 2000 })
    }
  }

  const fetchFabricantes = async () => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_fabricantes?page=all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar fabricantes")

      const data = await response.json()
      console.log("Fabricantes recebidos:", data)

      let fabricantesArray: Fabricante[] = []
      if (data.success && Array.isArray(data.data?.items)) {
        fabricantesArray = data.data.items
      } else if (Array.isArray(data.data)) {
        fabricantesArray = data.data
      } else if (Array.isArray(data)) {
        fabricantesArray = data
      }

      console.log("Fabricantes processados:", fabricantesArray)
      setFabricantes(fabricantesArray)
    } catch (error) {
      console.error("Erro ao buscar fabricantes:", error)
      toast.error("Não foi possível carregar os fabricantes", { duration: 2000 })
    }
  }

  const fetchClientes = async () => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/c_clientes?page=all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar clientes")

      const data = await response.json()
      console.log("Clientes recebidos:", data)

      let clientesArray: Cliente[] = []
      if (data.success && Array.isArray(data.data?.items)) {
        clientesArray = data.data.items
      } else if (Array.isArray(data.data)) {
        clientesArray = data.data
      } else if (Array.isArray(data)) {
        clientesArray = data
      }

      console.log("Clientes processados:", clientesArray)
      setClientes(clientesArray)
    } catch (error) {
      console.error("Erro ao buscar clientes:", error)
      toast.error("Não foi possível carregar os clientes", { duration: 2000 })
    }
  }

  // Carregar todos os dados necessários
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await Promise.all([fetchModelos(), fetchCores(), fetchFabricantes(), fetchClientes()])
        console.log("Todos os dados carregados")
        setDadosCarregados(true)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        toast.error("Ocorreu um erro ao carregar os dados", { duration: 2000 })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Inicializar o formulário quando os dados forem carregados e o veículo estiver disponível
  useEffect(() => {
    const initializeForm = () => {
      if (dadosCarregados && !formInitialized.current) {
        if (veiculo) {
          console.log("Inicializando formulário com dados do veículo:", veiculo)

          const formData = {
            placa: veiculo.placa || "",
            descricao: veiculo.descricao || "",
            v_modelo_id: veiculo.v_modelo_id?.toString() || "",
            v_cor_id: veiculo.v_cor_id?.toString() || "",
            v_fabricante_id: veiculo.v_fabricante_id?.toString() || "",
            c_cliente_id: veiculo.c_cliente_id?.toString() || "",
          }

          console.log("Dados do formulário a serem definidos:", formData)

          // Reset com os dados do veículo
          reset(formData)

          // Definir valores com timeout para garantir que o DOM esteja pronto
          setTimeout(() => {
            // Verificar e definir cada campo
            Object.entries(formData).forEach(([key, value]) => {
              if (value) {
                setValue(key as keyof FormValues, value)
                console.log(`✅ Campo ${key} definido com valor:`, value)
              }
            })

            formInitialized.current = true
            console.log("Formulário inicializado com sucesso")
          }, 100)
        } else {
          // Novo veículo - resetar formulário
          console.log("Inicializando formulário para novo veículo")
          reset({
            placa: "",
            descricao: "",
            v_modelo_id: "",
            v_cor_id: "",
            v_fabricante_id: "",
            c_cliente_id: "",
          })
          formInitialized.current = true
        }
      }
    }

    initializeForm()
  }, [veiculo, dadosCarregados, modelos, cores, fabricantes, clientes, reset, setValue])

  // Resetar o estado de inicialização quando o veículo mudar
  useEffect(() => {
    formInitialized.current = false
    setDebugInfo("")
  }, [veiculo?.id])

  const onSubmit = async (data: FormValues) => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      // Verificar se todos os campos obrigatórios estão preenchidos
      if (
        !data.placa ||
        !data.descricao ||
        !data.v_modelo_id ||
        !data.v_cor_id ||
        !data.v_fabricante_id ||
        !data.c_cliente_id
      ) {
        throw new Error("Todos os campos são obrigatórios")
      }

      // Criar FormData
      const formDataToSend = new FormData()

      // Adicionar campos ao FormData
      formDataToSend.append("v_veiculo[placa]", data.placa.toUpperCase())
      formDataToSend.append("v_veiculo[descricao]", data.descricao.toUpperCase())
      formDataToSend.append("v_veiculo[v_modelo_id]", data.v_modelo_id)
      formDataToSend.append("v_veiculo[v_cor_id]", data.v_cor_id)
      formDataToSend.append("v_veiculo[v_fabricante_id]", data.v_fabricante_id)
      formDataToSend.append("v_veiculo[c_cliente_id]", data.c_cliente_id)

      // Log do FormData
      console.log("Dados a serem enviados:")
      for (const pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`)
      }

      const url = veiculo
        ? `${process.env.NEXT_PUBLIC_API_URL}api/v1/v_veiculos/${veiculo.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}api/v1/v_veiculos`
      const method = veiculo ? "PUT" : "POST"

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
        throw new Error(errorData?.error || "Falha ao processar veículo")
      }

      toast.success(veiculo ? "Veículo atualizado com sucesso" : "Veículo criado com sucesso", {
        duration: 2000,
      })

      onSuccess()
      reset()
      formInitialized.current = false
    } catch (error: any) {
      console.error("Erro ao processar veículo:", error)
      toast.error(error.message || "Erro ao processar veículo", { duration: 2000 })
      setDebugInfo(error.message || "Erro desconhecido")
    }
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
      {debugInfo && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md mb-4">
          <p className="text-sm text-yellow-800 font-medium">Informações de depuração:</p>
          <p className="text-xs text-yellow-700 mt-1">{debugInfo}</p>
        </div>
      )}

      {/* Indicador de modo de edição */}
      {veiculo && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-md mb-4">
          <p className="text-sm text-blue-800 font-medium">
            Editando veículo: {veiculo.placa} - {veiculo.descricao}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="placa" className="font-bold mb-2">
          Placa:
        </Label>
        <Input id="placa" {...register("placa", { required: true })} placeholder="Digite a placa..." />
        {errors.placa && <span className="text-sm text-red-500">Placa é obrigatória</span>}
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="descricao" className="font-bold mb-2">
          Descrição:
        </Label>
        <Input id="descricao" {...register("descricao", { required: true })} placeholder="Digite a descrição..." />
        {errors.descricao && <span className="text-sm text-red-500">Descrição é obrigatória</span>}
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="v_modelo_id" className="font-bold mb-2">
          Modelo:
        </Label>
        <div className="relative">
          <Controller
            name="v_modelo_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                value={field.value?.toString() || ""}
                onChange={(e) => {
                  field.onChange(e.target.value)
                  console.log("Modelo selecionado:", e.target.value)
                }}
              >
                <option value="" disabled>
                  Selecione um modelo
                </option>
                {modelos.map((modelo) => (
                  <option key={modelo.id} value={modelo.id.toString()}>
                    {modelo.descricao}
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
        {errors.v_modelo_id && <span className="text-sm text-red-500">Modelo é obrigatório</span>}
        {modelos.length === 0 && !loading && (
          <span className="text-sm text-amber-500">Nenhum modelo encontrado. Cadastre um modelo primeiro.</span>
        )}
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="v_cor_id" className="font-bold mb-2">
          Cor:
        </Label>
        <div className="relative">
          <Controller
            name="v_cor_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                value={field.value?.toString() || ""}
                onChange={(e) => {
                  field.onChange(e.target.value)
                  console.log("Cor selecionada:", e.target.value)
                }}
              >
                <option value="" disabled>
                  Selecione uma cor
                </option>
                {cores.map((cor) => (
                  <option key={cor.id} value={cor.id.toString()}>
                    {cor.descricao}
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
        {errors.v_cor_id && <span className="text-sm text-red-500">Cor é obrigatória</span>}
        {cores.length === 0 && !loading && (
          <span className="text-sm text-amber-500">Nenhuma cor encontrada. Cadastre uma cor primeiro.</span>
        )}
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="v_fabricante_id" className="font-bold mb-2">
          Fabricante:
        </Label>
        <div className="relative">
          <Controller
            name="v_fabricante_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                value={field.value?.toString() || ""}
                onChange={(e) => {
                  field.onChange(e.target.value)
                  console.log("Fabricante selecionado:", e.target.value)
                }}
              >
                <option value="" disabled>
                  Selecione um fabricante
                </option>
                {fabricantes.map((fabricante) => (
                  <option key={fabricante.id} value={fabricante.id.toString()}>
                    {fabricante.descricao}
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
        {errors.v_fabricante_id && <span className="text-sm text-red-500">Fabricante é obrigatório</span>}
        {fabricantes.length === 0 && !loading && (
          <span className="text-sm text-amber-500">Nenhum fabricante encontrado. Cadastre um fabricante primeiro.</span>
        )}
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="c_cliente_id" className="font-bold mb-2">
          Cliente:
        </Label>
        <div className="relative">
          <Controller
            name="c_cliente_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                value={field.value?.toString() || ""}
                onChange={(e) => {
                  field.onChange(e.target.value)
                  console.log("Cliente selecionado:", e.target.value)
                }}
              >
                <option value="" disabled>
                  Selecione um cliente
                </option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id.toString()}>
                    {cliente.nome_completo} - {cliente.cpf_cnpj}
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
        {errors.c_cliente_id && <span className="text-sm text-red-500">Cliente é obrigatório</span>}
        {clientes.length === 0 && !loading && (
          <span className="text-sm text-amber-500">Nenhum cliente encontrado. Cadastre um cliente primeiro.</span>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset()
            formInitialized.current = false
            onCancel()
          }}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-red-500 hover:bg-red-600">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : veiculo ? (
            "Atualizar"
          ) : (
            "Salvar"
          )}
        </Button>
      </div>
    </form>
  )
}
