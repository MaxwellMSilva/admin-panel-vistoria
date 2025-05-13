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
    v_categoria_id?: string
  }
}

type FormValues = {
  placa: string
  descricao: string
  v_modelo_id: string
  v_cor_id: string
  v_fabricante_id: string
  c_cliente_id: string
  v_categoria_id: string
  c_empresa_id: string
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

type Categoria = {
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
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState<string>("")

  // Estados para armazenar os textos dos itens selecionados
  const [categoriaTexto, setCategoriaTexto] = useState<string>("")
  const [modeloTexto, setModeloTexto] = useState<string>("")
  const [corTexto, setCorTexto] = useState<string>("")
  const [fabricanteTexto, setFabricanteTexto] = useState<string>("")
  const [clienteTexto, setClienteTexto] = useState<string>("")

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
      placa: veiculo?.placa || "",
      descricao: veiculo?.descricao || "",
      v_modelo_id: veiculo?.v_modelo_id || "",
      v_cor_id: veiculo?.v_cor_id || "",
      v_fabricante_id: veiculo?.v_fabricante_id || "",
      c_cliente_id: veiculo?.c_cliente_id || "",
      v_categoria_id: veiculo?.v_categoria_id || "",
      c_empresa_id: "1", // Valor padrão para c_empresa_id
    },
  })

  const formRef = useRef<HTMLFormElement>(null)

  const fetchModelos = async () => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_modelos?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar modelos")

      const data = await response.json()
      console.log("Modelos recebidos:", data)
      const modelosArray = Array.isArray(data.data.items) ? data.data.items : []
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_cores?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar cores")

      const data = await response.json()
      console.log("Cores recebidas:", data)
      const coresArray = Array.isArray(data.data.items) ? data.data.items : []
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_fabricantes?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar fabricantes")

      const data = await response.json()
      console.log("Fabricantes recebidos:", data)
      const fabricantesArray = Array.isArray(data.data.items) ? data.data.items : []
      console.log("Fabricantes processados:", fabricantesArray)
      setFabricantes(fabricantesArray)
    } catch (error) {
      console.error("Erro ao buscar fabricantes:", error)
      toast.error("Não foi possível carregar os fabricantes", { duration: 2000 })
    }
  }

  const fetchCategorias = async () => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_categorias?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar categorias")

      const data = await response.json()
      console.log("Dados de categorias recebidos:", data)

      if (Array.isArray(data.data.items)) {
        setCategorias(data.data.items)
        console.log("Categorias carregadas:", data.data.items.length)
      } else {
        console.error("Formato inesperado de dados de categorias:", data)
        setCategorias([])
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
      toast.error("Não foi possível carregar as categorias", { duration: 2000 })
    }
  }

  const fetchClientes = async () => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/c_clientes?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar clientes")

      const data = await response.json()
      const clientesArray = Array.isArray(data.data.items) ? data.data.items : []
      setClientes(clientesArray)
    } catch (error) {
      console.error("Erro ao buscar clientes:", error)
      toast.error("Não foi possível carregar os clientes", { duration: 2000 })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await Promise.all([fetchModelos(), fetchCores(), fetchFabricantes(), fetchCategorias(), fetchClientes()])
        console.log("Todos os dados carregados")
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        toast.error("Ocorreu um erro ao carregar os dados", { duration: 2000 })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Atualizar os textos dos itens selecionados quando os dados forem carregados ou o veículo for carregado
  useEffect(() => {
    if (veiculo) {
      reset({
        placa: veiculo.placa,
        descricao: veiculo.descricao,
        v_modelo_id: veiculo.v_modelo_id,
        v_cor_id: veiculo.v_cor_id,
        v_fabricante_id: veiculo.v_fabricante_id,
        c_cliente_id: veiculo.c_cliente_id,
        v_categoria_id: veiculo.v_categoria_id || "",
        c_empresa_id: "1", // Valor padrão para c_empresa_id
      })

      // Atualizar os textos dos itens selecionados
      const categoria = categorias.find((c) => c.id === veiculo.v_categoria_id)
      if (categoria) setCategoriaTexto(categoria.descricao)

      const modelo = modelos.find((m) => m.id === veiculo.v_modelo_id)
      if (modelo) setModeloTexto(modelo.descricao)

      const cor = cores.find((c) => c.id === veiculo.v_cor_id)
      if (cor) setCorTexto(cor.descricao)

      const fabricante = fabricantes.find((f) => f.id === veiculo.v_fabricante_id)
      if (fabricante) setFabricanteTexto(fabricante.descricao)

      const cliente = clientes.find((c) => c.id === veiculo.c_cliente_id)
      if (cliente) setClienteTexto(`${cliente.nome_completo} - ${cliente.cpf_cnpj}`)
    }
  }, [veiculo, reset, categorias, modelos, cores, fabricantes, clientes])

  // Observar mudanças nos valores do formulário para atualizar os textos
  const watchedValues = watch()

  useEffect(() => {
    // Atualizar textos quando os valores mudarem
    const categoriaId = watchedValues.v_categoria_id
    if (categoriaId) {
      const categoria = categorias.find((c) => c.id === categoriaId)
      if (categoria) setCategoriaTexto(categoria.descricao)
    }

    const modeloId = watchedValues.v_modelo_id
    if (modeloId) {
      const modelo = modelos.find((m) => m.id === modeloId)
      if (modelo) setModeloTexto(modelo.descricao)
    }

    const corId = watchedValues.v_cor_id
    if (corId) {
      const cor = cores.find((c) => c.id === corId)
      if (cor) setCorTexto(cor.descricao)
    }

    const fabricanteId = watchedValues.v_fabricante_id
    if (fabricanteId) {
      const fabricante = fabricantes.find((f) => f.id === fabricanteId)
      if (fabricante) setFabricanteTexto(fabricante.descricao)
    }

    const clienteId = watchedValues.c_cliente_id
    if (clienteId) {
      const cliente = clientes.find((c) => c.id === clienteId)
      if (cliente) setClienteTexto(`${cliente.nome_completo} - ${cliente.cpf_cnpj}`)
    }
  }, [watchedValues, categorias, modelos, cores, fabricantes, clientes])

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
        !data.c_cliente_id ||
        !data.v_categoria_id ||
        !data.c_empresa_id
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
      formDataToSend.append("v_veiculo[v_categoria_id]", data.v_categoria_id)
      formDataToSend.append("v_veiculo[c_empresa_id]", data.c_empresa_id)

      // Log do FormData (não é possível visualizar diretamente, então vamos listar as entradas)
      for (const pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`)
      }

      const url = veiculo
        ? `${process.env.NEXT_PUBLIC_API_URL}api/v1/v_veiculos/${veiculo.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}api/v1/v_veiculos`

      console.log("URL da requisição:", url)
      console.log("Método:", veiculo ? "PUT" : "POST")

      const response = await fetch(url, {
        method: veiculo ? "PUT" : "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Log da resposta
      console.log("Status da resposta:", response.status)
      console.log("Status text:", response.statusText)

      const responseText = await response.text()
      console.log("Resposta completa:", responseText)

      let responseData
      try {
        responseData = JSON.parse(responseText)
        console.log("Resposta como JSON:", responseData)
      } catch (e) {
        console.log("Não foi possível parsear a resposta como JSON")
      }

      if (!response.ok) {
        // Tentar extrair mensagem de erro mais específica
        let errorMessage = `Falha ao processar veículo (${response.status})`
        if (responseData && responseData.error) {
          errorMessage = responseData.error
        } else if (responseData && responseData.errors) {
          // Formatar erros de validação - corrigido para lidar com diferentes formatos
          try {
            const errorEntries = Object.entries(responseData.errors)
            const formattedErrors = errorEntries
              .map(([field, messages]) => {
                // Verificar se messages é um array, string ou outro formato
                if (Array.isArray(messages)) {
                  return `${field}: ${messages.join(", ")}`
                } else if (typeof messages === "string") {
                  return `${field}: ${messages}`
                } else {
                  return `${field}: erro de validação`
                }
              })
              .join("; ")

            errorMessage = `Erros de validação: ${formattedErrors}`
          } catch (e) {
            console.error("Erro ao formatar mensagens de erro:", e)
            errorMessage = "Erro de validação nos dados enviados"
          }
        }
        throw new Error(errorMessage)
      }

      toast.success(veiculo ? "Veículo atualizado com sucesso" : "Veículo criado com sucesso", {
        duration: 2000,
      })
      onSuccess()
      reset()
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
        <Label htmlFor="v_categoria_id" className="font-bold mb-2">
          Categoria:
        </Label>
        <div className="relative">
          <Controller
            name="v_categoria_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value)
                  const categoria = categorias.find((c) => c.id === e.target.value)
                  if (categoria) setCategoriaTexto(categoria.descricao)
                }}
              >
                <option value="" disabled>
                  Selecione uma categoria
                </option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.descricao}
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
        {errors.v_categoria_id && <span className="text-sm text-red-500">Categoria é obrigatória</span>}
        {categorias.length === 0 && !loading && (
          <span className="text-sm text-amber-500">Nenhuma categoria encontrada. Cadastre uma categoria primeiro.</span>
        )}
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
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value)
                  const modelo = modelos.find((m) => m.id === e.target.value)
                  if (modelo) setModeloTexto(modelo.descricao)
                }}
              >
                <option value="" disabled>
                  Selecione um modelo
                </option>
                {modelos.map((modelo) => (
                  <option key={modelo.id} value={modelo.id}>
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
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value)
                  const cor = cores.find((c) => c.id === e.target.value)
                  if (cor) setCorTexto(cor.descricao)
                }}
              >
                <option value="" disabled>
                  Selecione uma cor
                </option>
                {cores.map((cor) => (
                  <option key={cor.id} value={cor.id}>
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
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value)
                  const fabricante = fabricantes.find((f) => f.id === e.target.value)
                  if (fabricante) setFabricanteTexto(fabricante.descricao)
                }}
              >
                <option value="" disabled>
                  Selecione um fabricante
                </option>
                {fabricantes.map((fabricante) => (
                  <option key={fabricante.id} value={fabricante.id}>
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
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value)
                  const cliente = clientes.find((c) => c.id === e.target.value)
                  if (cliente) setClienteTexto(`${cliente.nome_completo} - ${cliente.cpf_cnpj}`)
                }}
              >
                <option value="" disabled>
                  Selecione um cliente
                </option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
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
            onCancel()
          }}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-red-500 hover:bg-red-600">
          {isSubmitting ? "Salvando..." : veiculo ? "Atualizar" : "Salvar"}
        </Button>
      </div>
    </form>
  )
}
