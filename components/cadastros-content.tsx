"use client"

import { Layout } from "@/components/layout"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { Search, Trash2, Pencil, Loader, Menu, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { NovoModeloForm } from "./cadastros/novo-modelo-form"
import { NovoCorForm } from "./cadastros/novo-cor-form"
import { NovoFabricanteForm } from "./cadastros/novo-fabricante-form"
import { NovoCategoriaForm } from "./cadastros/novo-categoria-form"

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

export function CadastrosContent() {
  const [modelos, setModelos] = useState<Modelo[]>([])
  const [cores, setCores] = useState<Cor[]>([])
  const [fabricantes, setFabricante] = useState<Fabricante[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])

  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("modelos")
  const [loadingDelete, setLoadingDelete] = useState(false)

  const [isModeloDialogOpen, setIsModeloDialogOpen] = useState(false)
  const [isCorDialogOpen, setIsCorDialogOpen] = useState(false)
  const [isFabricanteDialogOpen, setIsFabricanteDialogOpen] = useState(false)
  const [isCategoriaDialogOpen, setIsCategoriaDialogOpen] = useState(false)

  // Estados para armazenar o item selecionado para edição
  const [selectedModelo, setSelectedModelo] = useState<Modelo | null>(null)
  const [selectedCor, setSelectedCor] = useState<Cor | null>(null)
  const [selectedFabricante, setSelectedFabricante] = useState<Fabricante | null>(null)
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null)

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Valor fixo de 10 itens por página
  const [totalPages, setTotalPages] = useState(1)

  const router = useRouter()

  const fetchModelos = async (page = 1) => {
    try {
      setLoading(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_modelos?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setModelos(Array.isArray(data.data.items) ? data.data.items : [])

      // Atualizar o total de páginas se a API fornecer essa informação
      if (data.data.total_pages) {
        setTotalPages(data.data.total_pages)
      }
    } catch (error) {
      console.error("Erro ao buscar modelos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleNovoModeloSuccess = () => {
    fetchModelos()
    setIsModeloDialogOpen(false)
    setSelectedModelo(null)
  }

  const fetchCores = async (page = 1) => {
    try {
      setLoading(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_cores?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setCores(Array.isArray(data.data.items) ? data.data.items : [])
      if (data.data.total_pages) {
        setTotalPages(data.data.total_pages)
      }
    } catch (error) {
      console.error("Erro ao buscar cores:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleNovoCorSuccess = () => {
    fetchCores()
    setIsCorDialogOpen(false)
    setSelectedCor(null)
  }

  const fetchFabricantes = async (page = 1) => {
    try {
      setLoading(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_fabricantes?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setFabricante(Array.isArray(data.data.items) ? data.data.items : [])
      if (data.data.total_pages) {
        setTotalPages(data.data.total_pages)
      }
    } catch (error) {
      console.error("Erro ao buscar fabricantes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleNovoFabricanteSuccess = () => {
    fetchFabricantes()
    setIsFabricanteDialogOpen(false)
    setSelectedFabricante(null)
  }

  const fetchCategorias = async (page = 1) => {
    try {
      setLoading(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_categorias?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setCategorias(Array.isArray(data.data.items) ? data.data.items : [])
      if (data.data.total_pages) {
        setTotalPages(data.data.total_pages)
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleNovoCategoriaSuccess = () => {
    fetchCategorias()
    setIsCategoriaDialogOpen(false)
    setSelectedCategoria(null)
  }

  const handleDelete = async (id: string, endpoint: string, entityName: string) => {
    if (!confirm(`Tem certeza que deseja excluir este(a) ${entityName}?`)) return

    setLoadingDelete(true)

    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error(`Falha ao excluir ${entityName}`)

      // Refaz a busca após exclusão
      switch (endpoint) {
        case "v_modelos":
          await fetchModelos()
          break
        case "v_cores":
          await fetchCores()
          break
        case "v_fabricantes":
          await fetchFabricantes()
          break
        case "v_categorias":
          await fetchCategorias()
          break
      }

      toast.success(`${entityName} excluído(a) com sucesso`, {
        duration: 2000,
      })
    } catch (error) {
      console.error(`Erro ao excluir ${entityName}:`, error)
      toast.error(`Não foi possível excluir ${entityName}`, {
        duration: 2000,
      })
    } finally {
      setLoadingDelete(false)
    }
  }

  // Função para lidar com a edição de um item
  const handleEdit = (item: any, type: string) => {
    switch (type) {
      case "modelos":
        setSelectedModelo(item)
        setIsModeloDialogOpen(true)
        break
      case "cores":
        setSelectedCor(item)
        setIsCorDialogOpen(true)
        break
      case "fabricantes":
        setSelectedFabricante(item)
        setIsFabricanteDialogOpen(true)
        break
      case "categorias":
        setSelectedCategoria(item)
        setIsCategoriaDialogOpen(true)
        break
    }
  }

  // Limpar o item selecionado quando o diálogo for fechado
  useEffect(() => {
    if (!isModeloDialogOpen) setSelectedModelo(null)
    if (!isCorDialogOpen) setSelectedCor(null)
    if (!isFabricanteDialogOpen) setSelectedFabricante(null)
    if (!isCategoriaDialogOpen) setSelectedCategoria(null)
  }, [isModeloDialogOpen, isCorDialogOpen, isFabricanteDialogOpen, isCategoriaDialogOpen])

  // Função para abrir o diálogo de novo cadastro e garantir que não há item selecionado
  const handleNovoClick = (type: string) => {
    switch (type) {
      case "modelo":
        setSelectedModelo(null)
        setIsModeloDialogOpen(true)
        break
      case "cor":
        setSelectedCor(null)
        setIsCorDialogOpen(true)
        break
      case "fabricante":
        setSelectedFabricante(null)
        setIsFabricanteDialogOpen(true)
        break
      case "categoria":
        setSelectedCategoria(null)
        setIsCategoriaDialogOpen(true)
        break
    }
  }

  useEffect(() => {
    const token = Cookies.get("access_token")
    if (!token) {
      router.push("/users/login")
    } else {
      fetchModelos()
      fetchCores()
      fetchFabricantes()
      fetchCategorias()
    }
  }, [])

  // Reset para a primeira página quando mudar o tipo de filtro ou o termo de busca
  useEffect(() => {
    setCurrentPage(1)

    switch (filterType) {
      case "modelos":
        fetchModelos(1)
        break
      case "cores":
        fetchCores(1)
        break
      case "fabricantes":
        fetchFabricantes(1)
        break
      case "categorias":
        fetchCategorias(1)
        break
    }
  }, [filterType])

  const filteredModelos = modelos.filter(
    (modelo) =>
      modelo.id.toString().includes(searchTerm) || modelo.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCores = cores.filter(
    (cor) => cor.id.toString().includes(searchTerm) || cor.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredFabricantes = fabricantes.filter(
    (fab) => fab.id.toString().includes(searchTerm) || fab.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCategorias = categorias.filter(
    (cat) => cat.id.toString().includes(searchTerm) || cat.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredData =
    filterType === "modelos"
      ? filteredModelos
      : filterType === "cores"
        ? filteredCores
        : filterType === "fabricantes"
          ? filteredFabricantes
          : filterType === "categorias"
            ? filteredCategorias
            : []

  // Remover estas linhas
  // const totalItems = filteredData.length
  // const totalPages = Math.ceil(totalItems / itemsPerPage)
  // const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // E use diretamente os dados retornados da API
  const currentItems =
    filterType === "modelos"
      ? modelos
      : filterType === "cores"
        ? cores
        : filterType === "fabricantes"
          ? fabricantes
          : filterType === "categorias"
            ? categorias
            : []

  const totalItems =
    filterType === "modelos"
      ? filteredModelos.length
      : filterType === "cores"
        ? filteredCores.length
        : filterType === "fabricantes"
          ? filteredFabricantes.length
          : filterType === "categorias"
            ? filteredCategorias.length
            : 0

  // Função para obter o endpoint correto com base no tipo de filtro
  const getEndpoint = (type: string) => {
    return `v_${type}`
  }

  // Função para obter o label correto com base no tipo de filtro
  const getLabel = (type: string) => {
    // Remove o 's' final para obter o singular
    return type.slice(0, -1)
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)

      // Buscar dados da página selecionada
      switch (filterType) {
        case "modelos":
          fetchModelos(page)
          break
        case "cores":
          fetchCores(page)
          break
        case "fabricantes":
          fetchFabricantes(page)
          break
        case "categorias":
          fetchCategorias(page)
          break
      }
    }
  }

  // Adicione este useEffect dentro do componente, antes do return
  useEffect(() => {
    console.log(`Página atual: ${currentPage}, Itens por página: ${itemsPerPage}, Total de páginas: ${totalPages}`)
    // Este useEffect é apenas para debug
  }, [currentPage, itemsPerPage, totalPages])

  return (
    <Layout
      onNavigate={(page: string) => {
        const pageNum = Number(page)
        if (!isNaN(pageNum)) {
          console.log(`Layout navegando para página: ${pageNum}`)
          setCurrentPage(pageNum)
        }
      }}
      currentPage={String(currentPage)}
    >
      <>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold">Cadastros</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-4 py-2 flex items-center gap-2 transition-colors">
                <Menu className="h-4 w-4" />
                Novo Cadastro
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 rounded-md shadow-lg bg-white border p-1">
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => handleNovoClick("modelo")}
                >
                  Novo Modelo
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => handleNovoClick("cor")}
                >
                  Nova Cor
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => handleNovoClick("fabricante")}
                >
                  Novo Fabricante
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => handleNovoClick("categoria")}
                >
                  Nova Categoria
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Sheets para os formulários */}
        <Sheet open={isModeloDialogOpen} onOpenChange={setIsModeloDialogOpen}>
          <SheetContent className="max-h-screen overflow-auto p-4">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">
                {selectedModelo ? "Editar Modelo" : "Novo Modelo"}
              </SheetTitle>
              <SheetDescription className="text-sm">
                {selectedModelo ? "Edite os dados do modelo abaixo." : "Cadastre um novo modelo abaixo."}
              </SheetDescription>
            </SheetHeader>

            <NovoModeloForm
              onSuccess={handleNovoModeloSuccess}
              onCancel={() => {
                setIsModeloDialogOpen(false)
                setSelectedModelo(null)
              }}
              modelo={selectedModelo}
            />
          </SheetContent>
        </Sheet>

        <Sheet open={isCorDialogOpen} onOpenChange={setIsCorDialogOpen}>
          <SheetContent className="max-h-screen overflow-auto p-4">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">{selectedCor ? "Editar Cor" : "Nova Cor"}</SheetTitle>
              <SheetDescription className="text-sm">
                {selectedCor ? "Edite os dados da cor abaixo." : "Cadastre uma nova cor abaixo."}
              </SheetDescription>
            </SheetHeader>

            <NovoCorForm
              onSuccess={handleNovoCorSuccess}
              onCancel={() => {
                setIsCorDialogOpen(false)
                setSelectedCor(null)
              }}
              cor={selectedCor}
            />
          </SheetContent>
        </Sheet>

        <Sheet open={isFabricanteDialogOpen} onOpenChange={setIsFabricanteDialogOpen}>
          <SheetContent className="max-h-screen overflow-auto p-4">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">
                {selectedFabricante ? "Editar Fabricante" : "Novo Fabricante"}
              </SheetTitle>
              <SheetDescription className="text-sm">
                {selectedFabricante ? "Edite os dados do fabricante abaixo." : "Cadastre um novo fabricante abaixo."}
              </SheetDescription>
            </SheetHeader>

            <NovoFabricanteForm
              onSuccess={handleNovoFabricanteSuccess}
              onCancel={() => {
                setIsFabricanteDialogOpen(false)
                setSelectedFabricante(null)
              }}
              fabricante={selectedFabricante}
            />
          </SheetContent>
        </Sheet>

        <Sheet open={isCategoriaDialogOpen} onOpenChange={setIsCategoriaDialogOpen}>
          <SheetContent className="max-h-screen overflow-auto p-4">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">
                {selectedCategoria ? "Editar Categoria" : "Nova Categoria"}
              </SheetTitle>
              <SheetDescription className="text-sm">
                {selectedCategoria ? "Edite os dados da categoria abaixo." : "Cadastre uma nova categoria abaixo."}
              </SheetDescription>
            </SheetHeader>

            <NovoCategoriaForm
              onSuccess={handleNovoCategoriaSuccess}
              onCancel={() => {
                setIsCategoriaDialogOpen(false)
                setSelectedCategoria(null)
              }}
              categoria={selectedCategoria}
            />
          </SheetContent>
        </Sheet>

        <div className="mb-6 bg-white border rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Filtros</h2>
          <p className="text-sm text-gray-500 mb-4">Selecione o tipo de cadastro e busque por ID ou descrição</p>

          <div className="flex flex-wrap items-end gap-4">
            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium mb-1">Tipo de Cadastro</label>
              <select
                name="tipo_cadastro"
                className="p-2 border rounded w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                required
                onChange={(e) => setFilterType(e.target.value)}
                value={filterType}
              >
                <option value="modelos">Modelo</option>
                <option value="cores">Cor</option>
                <option value="fabricantes">Fabricante</option>
                <option value="categorias">Categoria</option>
              </select>
            </div>

            <div className="relative flex-1 w-full">
              <label className="block text-sm font-medium mb-1">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  className="pl-10 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Buscar por ID ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-md p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">Lista de Cadastros</h2>
              <p className="text-sm text-gray-500">
                {totalItems} {totalItems === 1 ? "registro encontrado" : "registros encontrados"}
              </p>
            </div>
          </div>

          {/* Paginação - Agora posicionada ANTES da tabela e sempre visível */}
          <div className="mb-6">
            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm font-bold text-red-700">
                  Página {currentPage} de {totalPages}
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 h-12 rounded-md shadow-md disabled:bg-gray-300"
                  >
                    <ChevronLeft className="h-6 w-6 mr-2" />
                    Anterior
                  </Button>

                  <Button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 h-12 rounded-md shadow-md disabled:bg-gray-300"
                  >
                    Próxima
                    <ChevronRight className="h-6 w-6 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center items-center">
              <div className="flex flex-col items-center gap-2">
                <Loader className="animate-spin h-8 w-8 text-red-500" />
                <p className="text-gray-500">Carregando cadastros...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 border-b">ID</th>
                    <th className="py-3 px-4 font-semibold text-gray-700 border-b text-center">Descrição</th>
                    <th className="py-3 px-4 font-semibold text-gray-700 border-b text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-lg">Nenhum registro encontrado</p>
                          <p className="text-sm text-gray-400">Tente ajustar os filtros ou adicione um novo cadastro</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-gray-700">{item.id}</td>
                        <td className="py-3 px-4 text-center text-gray-700">{item.descricao}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(item, filterType)}
                              className="hover:bg-blue-50 transition-colors"
                            >
                              <Pencil className="w-4 h-4 text-blue-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(item.id, getEndpoint(filterType), getLabel(filterType))}
                              disabled={loadingDelete}
                              className="hover:bg-red-50 transition-colors"
                            >
                              {loadingDelete ? (
                                <Loader className="animate-spin h-4 w-4" />
                              ) : (
                                <Trash2 className="w-4 h-4 text-red-500" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    </Layout>
  )
}
