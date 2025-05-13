"use client"

import { Layout } from "@/components/layout"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { Search, Trash2, Pencil, Loader, Menu, ChevronLeft, ChevronRight, Filter, X } from "lucide-react"
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
  const [filterType, setFilterType] = useState("")
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingPagination, setLoadingPagination] = useState(false)

  const [isModeloDialogOpen, setIsModeloDialogOpen] = useState(false)
  const [isCorDialogOpen, setIsCorDialogOpen] = useState(false)
  const [isFabricanteDialogOpen, setIsFabricanteDialogOpen] = useState(false)
  const [isCategoriaDialogOpen, setIsCategoriaDialogOpen] = useState(false)

  const [selectedModelo, setSelectedModelo] = useState<Modelo | null>(null)
  const [selectedCor, setSelectedCor] = useState<Cor | null>(null)
  const [selectedFabricante, setSelectedFabricante] = useState<Fabricante | null>(null)
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const router = useRouter()

  // Helper function to extract pagination info from API response
  const extractPaginationInfo = (data: any) => {
    console.log("API Response Data:", data)

    // Try different possible structures for pagination info
    let pages = 1
    let total = 0

    if (data && data.data) {
      // Check for total_pages in data.data
      if (typeof data.data.total_pages === "number") {
        pages = data.data.total_pages
        console.log("Found total_pages in data.data:", pages)
      }

      // Check for meta.total_pages
      if (data.data.meta && typeof data.data.meta.total_pages === "number") {
        pages = data.data.meta.total_pages
        console.log("Found total_pages in data.data.meta:", pages)
      }

      // Check for pagination.total_pages
      if (data.data.pagination && typeof data.data.pagination.total_pages === "number") {
        pages = data.data.pagination.total_pages
        console.log("Found total_pages in data.data.pagination:", pages)
      }

      // Check for total_items/count
      if (typeof data.data.total_items === "number") {
        total = data.data.total_items
        console.log("Found total_items:", total)
      } else if (typeof data.data.count === "number") {
        total = data.data.count
        console.log("Found count:", total)
      } else if (data.data.meta && typeof data.data.meta.total_items === "number") {
        total = data.data.meta.total_items
        console.log("Found total_items in meta:", total)
      }

      // If we have total items but no pages, calculate pages
      if (total > 0 && pages === 1) {
        pages = Math.ceil(total / itemsPerPage)
        console.log("Calculated pages from total items:", pages)
      }

      // Fallback: if we have items array, use its length to estimate
      if (pages === 1 && Array.isArray(data.data.items) && data.data.items.length > 0) {
        // If items.length is exactly itemsPerPage, assume there might be more pages
        if (data.data.items.length === itemsPerPage) {
          pages = 2 // At least 2 pages
          console.log("Estimated at least 2 pages based on items length")
        }
      }
    }

    // Ensure we have at least 1 page
    pages = Math.max(1, pages)

    return { totalPages: pages, totalItems: total }
  }

  // Função para verificar se a página atual está vazia e voltar para a anterior se necessário
  const checkEmptyPageAndGoBack = (items: any[], currentPageValue: number) => {
    // Se estamos em uma página maior que 1 e não há itens, voltar para a página anterior
    if (currentPageValue > 1 && items.length === 0) {
      console.log("Página atual vazia, voltando para a página anterior")
      goToPage(currentPageValue - 1)
      return true
    }
    return false
  }

  const fetchModelos = async (page = 1) => {
    try {
      setLoadingPagination(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_modelos?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      console.log("Modelos API Response:", data)

      const items = Array.isArray(data.data.items) ? data.data.items : []
      setModelos(items)

      const { totalPages: pages, totalItems: items_count } = extractPaginationInfo(data)
      setTotalPages(pages)
      setTotalItems(items_count)

      // Verificar se a página está vazia e voltar para a anterior se necessário
      return checkEmptyPageAndGoBack(items, page)
    } catch (error) {
      console.error("Erro ao buscar modelos:", error)
      toast.error("Erro ao buscar modelos. Tente novamente.")
      return false
    } finally {
      setLoading(false)
      setLoadingPagination(false)
    }
  }

  const handleNovoModeloSuccess = () => {
    fetchModelos()
    setIsModeloDialogOpen(false)
    setSelectedModelo(null)
  }

  const fetchCores = async (page = 1) => {
    try {
      setLoadingPagination(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_cores?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      console.log("Cores API Response:", data)

      const items = Array.isArray(data.data.items) ? data.data.items : []
      setCores(items)

      const { totalPages: pages, totalItems: items_count } = extractPaginationInfo(data)
      setTotalPages(pages)
      setTotalItems(items_count)

      // Verificar se a página está vazia e voltar para a anterior se necessário
      return checkEmptyPageAndGoBack(items, page)
    } catch (error) {
      console.error("Erro ao buscar cores:", error)
      toast.error("Erro ao buscar cores. Tente novamente.")
      return false
    } finally {
      setLoading(false)
      setLoadingPagination(false)
    }
  }

  const handleNovoCorSuccess = () => {
    fetchCores()
    setIsCorDialogOpen(false)
    setSelectedCor(null)
  }

  const fetchFabricantes = async (page = 1) => {
    try {
      setLoadingPagination(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_fabricantes?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      console.log("Fabricantes API Response:", data)

      const items = Array.isArray(data.data.items) ? data.data.items : []
      setFabricante(items)

      const { totalPages: pages, totalItems: items_count } = extractPaginationInfo(data)
      setTotalPages(pages)
      setTotalItems(items_count)

      // Verificar se a página está vazia e voltar para a anterior se necessário
      return checkEmptyPageAndGoBack(items, page)
    } catch (error) {
      console.error("Erro ao buscar fabricantes:", error)
      toast.error("Erro ao buscar fabricantes. Tente novamente.")
      return false
    } finally {
      setLoading(false)
      setLoadingPagination(false)
    }
  }

  const handleNovoFabricanteSuccess = () => {
    fetchFabricantes()
    setIsFabricanteDialogOpen(false)
    setSelectedFabricante(null)
  }

  const fetchCategorias = async (page = 1) => {
    try {
      setLoadingPagination(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_categorias?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      console.log("Categorias API Response:", data)

      const items = Array.isArray(data.data.items) ? data.data.items : []
      setCategorias(items)

      const { totalPages: pages, totalItems: items_count } = extractPaginationInfo(data)
      setTotalPages(pages)
      setTotalItems(items_count)

      // Verificar se a página está vazia e voltar para a anterior se necessário
      return checkEmptyPageAndGoBack(items, page)
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
      toast.error("Erro ao buscar categorias. Tente novamente.")
      return false
    } finally {
      setLoading(false)
      setLoadingPagination(false)
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

      // Após excluir, recarregar os dados da página atual
      let pageChanged = false
      switch (endpoint) {
        case "v_modelos":
          pageChanged = await fetchModelos(currentPage)
          break
        case "v_cores":
          pageChanged = await fetchCores(currentPage)
          break
        case "v_fabricantes":
          pageChanged = await fetchFabricantes(currentPage)
          break
        case "v_categorias":
          pageChanged = await fetchCategorias(currentPage)
          break
      }

      // Se a página não mudou (não estava vazia), mostrar mensagem de sucesso
      if (!pageChanged) {
        toast.success(`${entityName} excluído(a) com sucesso`, {
          duration: 2000,
        })
      }
    } catch (error) {
      console.error(`Erro ao excluir ${entityName}:`, error)
      toast.error(`Não foi possível excluir ${entityName}`, {
        duration: 2000,
      })
    } finally {
      setLoadingDelete(false)
    }
  }

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

  useEffect(() => {
    if (!isModeloDialogOpen) setSelectedModelo(null)
    if (!isCorDialogOpen) setSelectedCor(null)
    if (!isFabricanteDialogOpen) setSelectedFabricante(null)
    if (!isCategoriaDialogOpen) setSelectedCategoria(null)
  }, [isModeloDialogOpen, isCorDialogOpen, isFabricanteDialogOpen, isCategoriaDialogOpen])

  const handleNovoClick = (type: string) => {
    switch (type) {
      case "modelo":
        setSelectedModelo(null)
        setIsModeloDialogOpen(true)
        if (!filterType) setFilterType("modelos")
        break
      case "cor":
        setSelectedCor(null)
        setIsCorDialogOpen(true)
        if (!filterType) setFilterType("cores")
        break
      case "fabricante":
        setSelectedFabricante(null)
        setIsFabricanteDialogOpen(true)
        if (!filterType) setFilterType("fabricantes")
        break
      case "categoria":
        setSelectedCategoria(null)
        setIsCategoriaDialogOpen(true)
        if (!filterType) setFilterType("categorias")
        break
    }
  }

  useEffect(() => {
    const token = Cookies.get("access_token")
    if (!token) {
      router.push("/users/login")
    }
    // Removidas as chamadas de fetch iniciais
  }, [])

  useEffect(() => {
    if (filterType) {
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

  // Define currentItems based on the current filter type
  const currentItems = searchTerm
    ? filterType === "modelos"
      ? filteredModelos
      : filterType === "cores"
        ? filteredCores
        : filterType === "fabricantes"
          ? filteredFabricantes
          : filteredCategorias
    : filterType === "modelos"
      ? modelos
      : filterType === "cores"
        ? cores
        : filterType === "fabricantes"
          ? fabricantes
          : categorias

  // Use this for displaying the count:
  const displayedItemsCount = currentItems.length

  const getEndpoint = (type: string) => {
    return `v_${type}`
  }

  const getLabel = (type: string) => {
    return type.slice(0, -1)
  }

  const goToPage = (page: number) => {
    console.log(`Attempting to go to page ${page}, total pages: ${totalPages}`)

    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setLoadingPagination(true)

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

  useEffect(() => {
    console.log(
      `Página atual: ${currentPage}, Itens por página: ${itemsPerPage}, Total de páginas: ${totalPages}, Total de itens: ${totalItems}`,
    )
  }, [currentPage, itemsPerPage, totalPages, totalItems])

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPageButtons = 3 // Reduzido para melhor visualização em dispositivos móveis

    if (totalPages <= maxPageButtons) {
      // If we have fewer pages than the max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include first page
      pageNumbers.push(1)

      // Calculate start and end of page range around current page
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're at the beginning
      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, 3)
      }

      // Adjust if we're at the end
      if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 2)
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pageNumbers.push("...")
      }

      // Add page numbers in the middle
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pageNumbers.push("...")
      }

      // Always include last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  // Função para limpar a busca
  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <Layout
      onNavigate={(page: string) => {
        const pageNum = Number(page)
        if (!isNaN(pageNum)) {
          goToPage(pageNum)
        }
      }}
      currentPage={String(currentPage)}
    >
      <>
        {/* Cabeçalho com título e botão de novo cadastro */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Cadastros</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-4 py-2 flex items-center gap-2 transition-colors shadow-sm">
                <Menu className="h-4 w-4" />
                <span className="hidden sm:inline">Novo Cadastro</span>
                <span className="sm:hidden">Novo</span>
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
          <SheetContent className="max-h-screen overflow-auto p-4 sm:max-w-md">
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
          <SheetContent className="max-h-screen overflow-auto p-4 sm:max-w-md">
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
          <SheetContent className="max-h-screen overflow-auto p-4 sm:max-w-md">
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
          <SheetContent className="max-h-screen overflow-auto p-4 sm:max-w-md">
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

        {/* Filtros - Visíveis em todos os dispositivos */}
        <div className="mb-6 bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Selecione o tipo de cadastro e busque por ID ou descrição</p>

          <div className="flex flex-col space-y-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Tipo de Cadastro</label>
              <select
                name="tipo_cadastro"
                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                required
                onChange={(e) => setFilterType(e.target.value)}
                value={filterType}
              >
                <option value="">Selecione um tipo</option>
                <option value="modelos">Modelo</option>
                <option value="cores">Cor</option>
                <option value="fabricantes">Fabricante</option>
                <option value="categorias">Categoria</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  className="pl-10 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Buscar por ID ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Lista de Cadastros</h2>
              {filterType ? (
                <p className="text-sm text-gray-500">
                  {displayedItemsCount} {displayedItemsCount === 1 ? "registro encontrado" : "registros encontrados"}
                  {totalItems > 0 && ` de ${totalItems} total`}
                </p>
              ) : (
                <p className="text-sm text-gray-500">Selecione um tipo de cadastro para visualizar os registros</p>
              )}
            </div>
          </div>

          {!filterType ? (
            <div className="py-16 flex justify-center items-center">
              <div className="flex flex-col items-center gap-3 text-center max-w-md">
                <Filter className="h-12 w-12 text-red-200" />
                <h3 className="text-xl font-medium text-gray-700">Nenhum tipo de cadastro selecionado</h3>
                <p className="text-gray-500">
                  Selecione um tipo de cadastro no filtro acima para visualizar os registros correspondentes.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Paginação - Agora com design responsivo melhorado */}
              {totalPages > 1 && (
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-3 sm:p-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-sm font-medium text-red-700 bg-white px-3 py-1 rounded-full shadow-sm border border-red-200">
                        Página {currentPage} de {totalPages}
                      </div>

                      {/* Numbered pagination - Visível apenas em telas maiores */}
                      <div className="hidden md:flex items-center gap-2 flex-wrap justify-center">
                        {getPageNumbers().map((page, index) =>
                          page === "..." ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                              ...
                            </span>
                          ) : (
                            <Button
                              key={`page-${page}`}
                              onClick={() => typeof page === "number" && goToPage(page)}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              className={`w-9 h-9 p-0 ${
                                currentPage === page
                                  ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                                  : "border-red-200 text-red-700 hover:bg-red-50"
                              } rounded-full`}
                              disabled={loadingPagination}
                            >
                              {page}
                            </Button>
                          ),
                        )}
                      </div>

                      {/* Botões de navegação - Sempre visíveis */}
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage <= 1 || loadingPagination}
                          className="bg-white border border-red-200 text-red-600 hover:bg-red-50 px-3 sm:px-4 py-2 h-10 rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          {loadingPagination && currentPage > 1 ? (
                            <Loader className="h-4 w-4 mr-1 sm:mr-2 animate-spin" />
                          ) : (
                            <ChevronLeft className="h-4 w-4 mr-1 sm:mr-2" />
                          )}
                          <span className="hidden sm:inline">Anterior</span>
                        </Button>

                        <Button
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage >= totalPages || loadingPagination}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 h-10 rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          <span className="hidden sm:inline">Próxima</span>
                          {loadingPagination && currentPage < totalPages ? (
                            <Loader className="h-4 w-4 ml-1 sm:ml-2 animate-spin" />
                          ) : (
                            <ChevronRight className="h-4 w-4 ml-1 sm:ml-2" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="py-12 flex justify-center items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-4 border-t-red-500 border-r-red-300 border-b-red-200 border-l-red-100 animate-spin"></div>
                    </div>
                    <p className="text-gray-500 mt-4 font-medium">Carregando cadastros...</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-4 sm:mx-0">
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
                              <p className="text-sm text-gray-400">
                                Tente ajustar os filtros ou adicione um novo cadastro
                              </p>
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

              {/* Paginação inferior - Visível apenas em telas menores quando há mais de uma página */}
              {totalPages > 1 && (
                <div className="mt-6 md:hidden">
                  <div className="flex justify-center">
                    <div className="inline-flex rounded-md shadow-sm">
                      {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                          <span key={`ellipsis-${index}`} className="px-2 flex items-center text-gray-500">
                            ...
                          </span>
                        ) : (
                          <Button
                            key={`page-${page}`}
                            onClick={() => typeof page === "number" && goToPage(page)}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            className={`w-8 h-8 p-0 ${
                              currentPage === page
                                ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                                : "border-red-200 text-red-700 hover:bg-red-50"
                            } ${index === 0 ? "rounded-l-md" : ""} ${
                              index === getPageNumbers().length - 1 ? "rounded-r-md" : ""
                            } rounded-none`}
                            disabled={loadingPagination}
                          >
                            {page}
                          </Button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </>
    </Layout>
  )
}
