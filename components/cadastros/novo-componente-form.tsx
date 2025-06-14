"use client"

import { useRef, useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
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
      <div className="flex flex-col gap-1 mb-4">
        <Label htmlFor="descricao" className="font-bold mb-2">
          Descrição:
        </Label>
        <Input
          id="descricao"
          {...register("descricao", { required: "Descrição é obrigatória" })}
          placeholder="Digite o nome do componente..."
        />
        {errors.descricao && <span className="text-sm text-red-500">{errors.descricao.message}</span>}
      </div>

      <div className="flex flex-col gap-1 mb-4">
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
          <span className="text-sm text-amber-500">Nenhuma categoria encontrada. Cadastre uma categoria primeiro.</span>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset()
            setCategoriaTexto("")
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
          ) : componente ? (
            "Atualizar"
          ) : (
            "Salvar"
          )}
        </Button>
      </div>
    </form>
  )
}
