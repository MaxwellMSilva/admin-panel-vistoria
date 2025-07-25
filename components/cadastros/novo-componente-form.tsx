"use client"

import { useRef, useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2, Settings, Edit3, Tag } from "lucide-react"
import Cookies from "js-cookie"

type CategoriaComponente = {
  id: string
  descricao: string
}

type ComponenteFormProps = {
  onSuccess: () => void
  onCancel: () => void
  componente?: {
    id: string
    descricao: string
    v_categoria_componente_id?: string
  }
}

type FormValues = {
  descricao: string
  v_categoria_componente_id: string
}

export function NovoComponenteForm({ onSuccess, onCancel, componente }: ComponenteFormProps) {
  // Log detalhado do componente recebido
  console.log("COMPONENTE RECEBIDO PARA EDIÇÃO:", JSON.stringify(componente, null, 2))

  const [categorias, setCategorias] = useState<CategoriaComponente[]>([])
  const [loading, setLoading] = useState(true)
  const [categoriaTexto, setCategoriaTexto] = useState<string>("")
  const [categoriasCarregadas, setCategoriasCarregadas] = useState(false)

  // Referência para controlar a inicialização do formulário
  const formInitialized = useRef(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()

  const formRef = useRef<HTMLFormElement>(null)

  // Função para buscar categorias de componentes
  const fetchCategorias = async () => {
    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_categorias_componentes?page=all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar categorias de componentes")

      const data = await response.json()
      console.log("Categorias de componentes recebidas:", data)

      const categoriasArray = Array.isArray(data.data.items) ? data.data.items : []
      console.log("Categorias de componentes processadas:", categoriasArray)

      setCategorias(categoriasArray)
      setCategoriasCarregadas(true)
    } catch (error) {
      console.error("Erro ao buscar categorias de componentes:", error)
      toast.error("Não foi possível carregar as categorias de componentes", { duration: 1000 })
    } finally {
      setLoading(false)
    }
  }

  // Carregar categorias ao montar o componente
  useEffect(() => {
    fetchCategorias()
  }, [])

  // Inicializar o formulário quando as categorias forem carregadas e o componente estiver disponível
  useEffect(() => {
    if (categoriasCarregadas && componente && !formInitialized.current) {
      console.log("INICIALIZANDO FORMULÁRIO COM:", {
        descricao: componente.descricao,
        categoriaId: componente.v_categoria_componente_id,
      })

      // Definir valores do formulário
      reset({
        descricao: componente.descricao || "",
        v_categoria_componente_id: componente.v_categoria_componente_id || "",
      })

      // Forçar a atualização do valor do select
      setTimeout(() => {
        setValue("v_categoria_componente_id", componente.v_categoria_componente_id || "")
        // Atualizar o texto da categoria selecionada
        if (componente.v_categoria_componente_id) {
          const categoria = categorias.find((c) => c.id === componente.v_categoria_componente_id)
          if (categoria) {
            setCategoriaTexto(categoria.descricao)
            console.log("Categoria encontrada para o componente:", categoria.descricao)
          } else {
            console.log("Categoria não encontrada para ID:", componente.v_categoria_componente_id)
            console.log(
              "IDs das categorias disponíveis:",
              categorias.map((c) => c.id),
            )
          }
        }
        formInitialized.current = true
      }, 100)
    }
  }, [componente, categorias, categoriasCarregadas, reset, setValue])

  // Resetar o estado de inicialização quando o componente mudar
  useEffect(() => {
    formInitialized.current = false
  }, [componente?.id])

  const onSubmit = async (data: FormValues) => {
    try {
      if (!data.v_categoria_componente_id) {
        toast.error("Selecione uma categoria", { duration: 1000 })
        return
      }

      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      // Criar FormData
      const formDataToSend = new FormData()

      // Campos de texto
      formDataToSend.append("v_componente[descricao]", data.descricao.toUpperCase())
      formDataToSend.append("v_componente[v_categoria_componente_id]", data.v_categoria_componente_id)

      // Log do FormData
      console.log("Dados a serem enviados:")
      for (const pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`)
      }

      const url = componente
        ? `${process.env.NEXT_PUBLIC_API_URL}api/v1/v_componentes/${componente.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}api/v1/v_componentes`
      const method = componente ? "PATCH" : "POST"

      console.log(`Enviando requisição ${method} para ${url}`)

      const response = await fetch(url, {
        method,
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
        let errorMessage = `Falha ao processar componente (${response.status})`

        if (responseData && responseData.error) {
          errorMessage = responseData.error
        } else if (responseData && responseData.errors) {
          // Formatar erros de validação
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

      toast.success(componente ? "Componente atualizado com sucesso" : "Componente criado com sucesso", {
        duration: 1000,
      })

      onSuccess()
      reset()
      setCategoriaTexto("")
      formInitialized.current = false
    } catch (error: any) {
      console.error("Erro ao processar componente:", error)
      toast.error(error.message || "Erro ao processar componente", { duration: 1000 })
    }
  }

  // Função para obter o nome da categoria
  const getNomeCategoria = (categoriaId: string) => {
    const categoria = categorias.find((c) => c.id === categoriaId)
    return categoria?.descricao || "Categoria não encontrada"
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
      {componente ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-blue-900">Editando Componente</h3>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                  <Settings className="w-3 h-3 mr-1" />
                  ID: {componente.id}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-blue-700 flex items-center gap-1">
                    <Settings className="w-3 h-3" />
                    Descrição:
                  </span>
                  <p className="text-blue-900 font-medium">{componente.descricao}</p>
                </div>
                {componente.v_categoria_componente_id && (
                  <div>
                    <span className="font-medium text-blue-700 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Categoria:
                    </span>
                    <p className="text-blue-900">{getNomeCategoria(componente.v_categoria_componente_id)}</p>
                  </div>
                )}
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded-md">
                <p className="text-xs text-blue-700">
                  💡 <strong>Dica:</strong> Você está editando o componente "{componente.descricao}". Todos os campos
                  serão atualizados com as novas informações.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">Novo Componente</h3>
              <p className="text-sm text-green-700">
                Preencha os dados abaixo para cadastrar um novo componente no sistema.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Seção: Dados do Componente */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Dados do Componente
        </h4>
        <div className="space-y-4">
          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="descricao" className="font-bold mb-2">
              Descrição:
            </Label>
            <Input
              id="descricao"
              {...register("descricao", {
                required: "Descrição é obrigatória",
                minLength: {
                  value: 2,
                  message: "Descrição deve ter pelo menos 2 caracteres",
                },
              })}
              placeholder="Digite o nome do componente..."
            />
            {errors.descricao && <span className="text-sm text-red-500">{errors.descricao.message}</span>}
          </div>

          {/* Categoria do Componente */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="v_categoria_componente_id" className="font-bold mb-2">
              Categoria do Componente:
            </Label>
            <div className="relative">
              <Controller
                name="v_categoria_componente_id"
                control={control}
                rules={{ required: "Categoria do componente é obrigatória" }}
                render={({ field }) => (
                  <select
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      const categoria = categorias.find((c) => c.id === e.target.value)
                      if (categoria) {
                        setCategoriaTexto(categoria.descricao)
                        console.log("Categoria selecionada:", categoria.descricao)
                      }
                    }}
                  >
                    <option value="" disabled>
                      Selecione uma categoria de componente
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
            {errors.v_categoria_componente_id && (
              <span className="text-sm text-red-500">{errors.v_categoria_componente_id.message}</span>
            )}
            {categorias.length === 0 && !loading && (
              <span className="text-sm text-amber-500">
                Nenhuma categoria encontrada. Cadastre uma categoria primeiro.
              </span>
            )}
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
            setCategoriaTexto("")
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
              Salvando...
            </>
          ) : componente ? (
            "Atualizar Componente"
          ) : (
            "Criar Componente"
          )}
        </Button>
      </div>
    </form>
  )
}
