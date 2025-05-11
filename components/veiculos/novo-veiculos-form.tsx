"use client"
import { useRef, useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Cookies from "js-cookie"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

  const {
    register,
    handleSubmit,
    control,
    reset,
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
      setClientes(Array.isArray(data.data.items) ? data.data.items : [])
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
        console.log("Modelos:", modelos.length)
        console.log("Cores:", cores.length)
        console.log("Fabricantes:", fabricantes.length)
        console.log("Categorias:", categorias.length)
        console.log("Clientes:", clientes.length)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        toast.error("Ocorreu um erro ao carregar os dados", { duration: 2000 })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
    }
  }, [veiculo, reset])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
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

      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
        <Label htmlFor="placa" className="text-left font-bold">
          Placa:
        </Label>
        <Input
          id="placa"
          {...register("placa", { required: true })}
          placeholder="Digite a placa..."
          className="col-span-3 w-full"
        />
        {errors.placa && <span className="text-red-500 text-sm col-span-3 col-start-2">Placa é obrigatória</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
        <Label htmlFor="descricao" className="text-left font-bold">
          Descrição:
        </Label>
        <Input
          id="descricao"
          {...register("descricao", { required: true })}
          placeholder="Digite a descrição..."
          className="col-span-3 w-full"
        />
        {errors.descricao && (
          <span className="text-red-500 text-sm col-span-3 col-start-2">Descrição é obrigatória</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
        <Label htmlFor="v_categoria_id" className="text-left font-bold">
          Categoria:
        </Label>
        <div className="col-span-3 w-full">
          <Controller
            name="v_categoria_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} defaultValue={veiculo?.v_categoria_id}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.length === 0 ? (
                    <SelectItem value="loading" disabled>
                      Carregando categorias...
                    </SelectItem>
                  ) : (
                    categorias.map((categoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.descricao}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.v_categoria_id && <span className="text-red-500 text-sm">Categoria é obrigatória</span>}
          {categorias.length === 0 && !loading && (
            <span className="text-amber-500 text-sm">
              Nenhuma categoria encontrada. Cadastre uma categoria primeiro.
            </span>
          )}
        </div>
      </div>

      {/* Modifique os componentes Select para garantir que os dados sejam renderizados corretamente */}
      {/* Substitua o componente Select para Modelo */}
      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
        <Label htmlFor="v_modelo_id" className="text-left font-bold">
          Modelo:
        </Label>
        <div className="col-span-3 w-full">
          <Controller
            name="v_modelo_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} defaultValue={veiculo?.v_modelo_id}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um modelo" />
                </SelectTrigger>
                <SelectContent>
                  {modelos.length === 0 ? (
                    <SelectItem value="loading" disabled>
                      Carregando modelos...
                    </SelectItem>
                  ) : (
                    modelos.map((modelo) => (
                      <SelectItem key={modelo.id} value={modelo.id}>
                        {modelo.descricao}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.v_modelo_id && <span className="text-red-500 text-sm">Modelo é obrigatório</span>}
          {modelos.length === 0 && !loading && (
            <span className="text-amber-500 text-sm">Nenhum modelo encontrado. Cadastre um modelo primeiro.</span>
          )}
        </div>
      </div>

      {/* Substitua o componente Select para Cor */}
      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
        <Label htmlFor="v_cor_id" className="text-left font-bold">
          Cor:
        </Label>
        <div className="col-span-3 w-full">
          <Controller
            name="v_cor_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} defaultValue={veiculo?.v_cor_id}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma cor" />
                </SelectTrigger>
                <SelectContent>
                  {cores.length === 0 ? (
                    <SelectItem value="loading" disabled>
                      Carregando cores...
                    </SelectItem>
                  ) : (
                    cores.map((cor) => (
                      <SelectItem key={cor.id} value={cor.id}>
                        {cor.descricao}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.v_cor_id && <span className="text-red-500 text-sm">Cor é obrigatória</span>}
          {cores.length === 0 && !loading && (
            <span className="text-amber-500 text-sm">Nenhuma cor encontrada. Cadastre uma cor primeiro.</span>
          )}
        </div>
      </div>

      {/* Substitua o componente Select para Fabricante */}
      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
        <Label htmlFor="v_fabricante_id" className="text-left font-bold">
          Fabricante:
        </Label>
        <div className="col-span-3 w-full">
          <Controller
            name="v_fabricante_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} defaultValue={veiculo?.v_fabricante_id}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um fabricante" />
                </SelectTrigger>
                <SelectContent>
                  {fabricantes.length === 0 ? (
                    <SelectItem value="loading" disabled>
                      Carregando fabricantes...
                    </SelectItem>
                  ) : (
                    fabricantes.map((fabricante) => (
                      <SelectItem key={fabricante.id} value={fabricante.id}>
                        {fabricante.descricao}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.v_fabricante_id && <span className="text-red-500 text-sm">Fabricante é obrigatório</span>}
          {fabricantes.length === 0 && !loading && (
            <span className="text-amber-500 text-sm">
              Nenhum fabricante encontrado. Cadastre um fabricante primeiro.
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
        <Label htmlFor="c_cliente_id" className="text-left font-bold">
          Cliente:
        </Label>
        <div className="col-span-3 w-full">
          <Controller
            name="c_cliente_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                  >
                    {field.value
                      ? clientes.find((cliente) => cliente.id === field.value)?.nome_completo || "Selecione um cliente"
                      : "Selecione um cliente"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Buscar cliente por nome ou CPF/CNPJ..." />
                    <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {clientes.map((cliente) => (
                          <CommandItem
                            key={cliente.id}
                            value={`${cliente.nome_completo} ${cliente.cpf_cnpj}`}
                            onSelect={() => {
                              field.onChange(cliente.id)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", cliente.id === field.value ? "opacity-100" : "opacity-0")}
                            />
                            <div className="flex flex-col">
                              <span>{cliente.nome_completo}</span>
                              <span className="text-xs text-gray-500">{cliente.cpf_cnpj}</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.c_cliente_id && <span className="text-red-500 text-sm">Cliente é obrigatório</span>}
        </div>
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
