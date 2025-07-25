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
import { NovoComponenteForm } from "./cadastros/novo-componente-form"

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

type CategoriaComponente = {
  id: string
  descricao: string
}

type Componente = {
  id: string
  descricao: string
  v_categoria_componente_id?: string
  categoria_descricao?: string
  v_categoria_componente?: {
    descricao: string
    id: string
  }
}

export function CadastrosContent() {
  const [modelos, setModelos] = useState<Modelo[]>([])
  const [cores, setCores] = useState<Cor[]>([])
  const [fabricantes, setFabricante] = useState<Fabricante[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [componentes, setComponentes] = useState<Componente[]>([])
  const [categoriasComponentes, setCategoriasComponentes] = useState<CategoriaComponente[]>([])

  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingPagination, setLoadingPagination] = useState(false)

  const [isModeloDialogOpen, setIsModeloDialogOpen] = useState(false)
  const [isCorDialogOpen, setIsCorDialogOpen] = useState(false)
  const [isFabricanteDialogOpen, setIsFabricanteDialogOpen] = useState(false)
  const [isCategoriaDialogOpen, setIsCategoriaDialogOpen] = useState(false)
  const [isComponenteDialogOpen, setIsComponenteDialogOpen] = useState(false)

  const [selectedModelo, setSelectedModelo] = useState<Modelo | null>(null)
  const [selectedCor, setSelectedCor] = useState<Cor | null>(null)
  const [selectedFabricante, setSelectedFabricante] = useState<Fabricante | null>(null)
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null)
  const [selectedComponente, setSelectedComponente] = useState<Componente | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const router = useRouter()

  const extractPaginationInfo = (data: any) => {
    console.log("API Response Data:", data)

    let pages = 1
    let total = 0

    if (data && data.data) {
      if (typeof data.data.total_pages === "number") {
        pages = data.data.total_pages
        console.log("Found total_pages in data.data:", pages)
      }

      if (data.data.meta && typeof data.data.meta.total_pages === "number") {
        pages = data.data.meta.total_pages
        console.log("Found total_pages in data.data.meta:", pages)
      }

      if (data.data.pagination && typeof data.data.pagination.total_pages === "number") {
        pages = data.data.pagination.total_pages
        console.log("Found total_pages in data.data.pagination:", pages)
      }

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

      if (total > 0 && pages === 1) {
        pages = Math.ceil(total / itemsPerPage)
        console.log("Calculated pages from total items:", pages)
      }

      if (pages === 1 && Array.isArray(data.data.items) && data.data.items.length > 0) {
        if (data.data.items.length === itemsPerPage) {
          pages = 2
          console.log("Estimated at least 2 pages based on items length")
        }
      }
    }

    pages = Math.max(1, pages)

    return { totalPages: pages, totalItems: total }
  }

  const checkEmptyPageAndGoBack = (items: any[], currentPageValue: number) => {
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

      return checkEmptyPageAndGoBack(items, page)
    } catch (error) {
      console.error("Erro ao buscar modelos:", error)
      toast.error("Erro ao buscar modelos. Tente novamente.", { duration: 1000 })
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

      return checkEmptyPageAndGoBack(items, page)
    } catch (error) {
      console.error("Erro ao buscar cores:", error)
      toast.error("Erro ao buscar cores. Tente novamente.", { duration: 1000 })
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

      return checkEmptyPageAndGoBack(items, page)
    } catch (error) {
      console.error("Erro ao buscar fabricantes:", error)
      toast.error("Erro ao buscar fabricantes. Tente novamente.", { duration: 1000 })
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

      return checkEmptyPageAndGoBack(items, page)
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
      toast.error("Erro ao buscar categorias. Tente novamente.", { duration: 1000 })
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

  const fetchCategoriasComponentes = async () => {
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
      console.log("Categorias de componentes API Response:", data)
      const items = Array.isArray(data.data.items) ? data.data.items : []
      setCategoriasComponentes(items)
    } catch (error) {
      console.error("Erro ao buscar categorias de componentes:", error)
      toast.error("Erro ao buscar categorias de componentes. Tente novamente.", { duration: 1000 })
    }
  }

  const fetchComponentes = async (page = 1) => {
    try {
      setLoadingPagination(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_componentes?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      console.log("Componentes API Response:", data)

      const items = Array.isArray(data.data.items) ? data.data.items : []

      // Usar diretamente o campo v_categoria_componente.descricao da resposta da API
      const componentesComCategoria = items.map((componente) => {
        // Garantir que o ID da categoria esteja disponível
        const componenteProcessado = {
          ...componente,
          v_categoria_componente_id:
            componente.v_categoria_componente_id ||
            (componente.v_categoria_componente ? componente.v_categoria_componente.id : undefined),
          categoria_descricao: componente.v_categoria_componente
            ? componente.v_categoria_componente.descricao
            : "Sem categoria",
        }

        console.log("Componente processado:", {
          id: componenteProcessado.id,
          descricao: componenteProcessado.descricao,
          v_categoria_componente_id: componenteProcessado.v_categoria_componente_id,
          categoria_descricao: componenteProcessado.categoria_descricao,
        })

        return componenteProcessado
      })

      console.log("Componentes com categoria:", componentesComCategoria)
      setComponentes(componentesComCategoria)

      const { totalPages: pages, totalItems: items_count } = extractPaginationInfo(data)
      setTotalPages(pages)
      setTotalItems(items_count)

      return checkEmptyPageAndGoBack(items, page)
    } catch (error) {
      console.error("Erro ao buscar componentes:", error)
      toast.error("Erro ao buscar componentes. Tente novamente.", { duration: 1000 })
      return false
    } finally {
      setLoading(false)
      setLoadingPagination(false)
    }
  }

  const handleNovoComponenteSuccess = () => {
    fetchComponentes()
    setIsComponenteDialogOpen(false)
    setSelectedComponente(null)
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
        case "v_componentes":
          pageChanged = await fetchComponentes(currentPage)
          break
      }

      if (!pageChanged) {
        toast.success(`${entityName} excluído(a) com sucesso`, { duration: 1000 })
      }
    } catch (error) {
      console.error(`Erro ao excluir ${entityName}:`, error)
      toast.error(`Não foi possível excluir ${entityName}`, { duration: 1000 })
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
      case "componentes":
        // Garantir que o ID da categoria esteja disponível
        const componenteParaEditar = {
          ...item,
          v_categoria_componente_id:
            item.v_categoria_componente_id ||
            (item.v_categoria_componente ? item.v_categoria_componente.id : undefined),
        }

        console.log("Componente selecionado para edição:", JSON.stringify(componenteParaEditar, null, 2))
        setSelectedComponente(componenteParaEditar)
        setIsComponenteDialogOpen(true)
        break
    }
  }

  const handleNovoClick = (type: string) => {
    switch (type) {
      case "modelo":
        setIsModeloDialogOpen(true)
        setSelectedModelo(null)
        break
      case "cor":
        setIsCorDialogOpen(true)
        setSelectedCor(null)
        break
      case "fabricante":
        setIsFabricanteDialogOpen(true)
        setSelectedFabricante(null)
        break
      case "categoria":
        setIsCategoriaDialogOpen(true)
        setSelectedCategoria(null)
        break
      case "componente":
        setIsComponenteDialogOpen(true)
        setSelectedComponente(null)
        break
    }
  }

  useEffect(() => {
    if (!isModeloDialogOpen) setSelectedModelo(null)
    if (!isCorDialogOpen) setSelectedCor(null)
    if (!isFabricanteDialogOpen) setSelectedFabricante(null)
    if (!isCategoriaDialogOpen) setSelectedCategoria(null)
    if (!isComponenteDialogOpen) setSelectedComponente(null)
  }, [isModeloDialogOpen, isCorDialogOpen, isFabricanteDialogOpen, isCategoriaDialogOpen, isComponenteDialogOpen])

  useEffect(() => {
    const token = Cookies.get("access_token")
    if (!token) {
      router.push("/users/login")
    }
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
        case "componentes":
          fetchComponentes(1)
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

  const filteredComponentes = componentes.filter(
    (comp) =>
      comp.id.toString().includes(searchTerm) ||
      comp.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (comp.categoria_descricao && comp.categoria_descricao.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const currentItems = searchTerm
    ? filterType === "modelos"
      ? filteredModelos
      : filterType === "cores"
        ? filteredCores
        : filterType === "fabricantes"
          ? filteredFabricantes
          : filterType === "componentes"
            ? filteredComponentes
            : filteredCategorias
    : filterType === "modelos"
      ? modelos
      : filterType === "cores"
        ? cores
        : filterType === "fabricantes"
          ? fabricantes
          : filterType === "componentes"
            ? componentes
            : categorias

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
        case "componentes":
          fetchComponentes(page)
          break
      }
    }
  }

  useEffect(() => {
    console.log(
      `Página atual: ${currentPage}, Itens por página: ${itemsPerPage}, Total de páginas: ${totalPages}, Total de itens: ${totalItems}`,
    )
  }, [currentPage, itemsPerPage, totalPages, totalItems])

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPageButtons = 3

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)

      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, 3)
      }

      if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 2)
      }

      if (start > 2) {
        pageNumbers.push("...")
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      if (end < totalPages - 1) {
        pageNumbers.push("...")
      }

      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

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
              <Button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-3 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 transition-colors shadow-sm">
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

              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => handleNovoClick("componente")}
                >
                  Novo Componente
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

        <Sheet open={isComponenteDialogOpen} onOpenChange={setIsComponenteDialogOpen}>
          <SheetContent className="max-h-screen overflow-auto p-4 sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">
                {selectedComponente ? "Editar Componente" : "Novo Componente"}
              </SheetTitle>
              <SheetDescription className="text-sm">
                {selectedComponente ? "Edite os dados do componente abaixo." : "Cadastre um novo componente abaixo."}
              </SheetDescription>
            </SheetHeader>

            <NovoComponenteForm
              onSuccess={handleNovoComponenteSuccess}
              onCancel={() => {
                setIsComponenteDialogOpen(false)
                setSelectedComponente(null)
              }}
              componente={selectedComponente}
            />
          </SheetContent>
        </Sheet>

        {/* Filtros - Visíveis em todos os dispositivos */}
        <div className="mb-6 overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg shadow-sm">
          {/* Cabeçalho dos filtros */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
            </div>
            <p className="text-sm text-gray-600 mt-1">Selecione o tipo de cadastro e busque por ID ou descrição</p>
          </div>

          {/* Corpo dos filtros */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Menu className="h-4 w-4 text-gray-500" />
                  <span>Tipo de Cadastro</span>
                </label>
                <div className="relative">
                  <select
                    name="tipo_cadastro"
                    className="w-full h-10 pl-3 pr-10 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-700 appearance-none"
                    required
                    onChange={(e) => setFilterType(e.target.value)}
                    value={filterType}
                  >
                    <option value="">Selecione um tipo</option>
                    <option value="modelos">Modelos</option>
                    <option value="cores">Cores</option>
                    <option value="fabricantes">Fabricantes</option>
                    <option value="categorias">Categorias</option>
                    <option value="componentes">Componentes</option>
                  </select>
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
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Search className="h-4 w-4 text-gray-500" />
                  <span>Buscar</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    className="pl-10 pr-10 h-10 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-700"
                    placeholder="Buscar por ID ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {filterType && (
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Filtro ativo: <span className="text-red-600 font-semibold capitalize">{filterType}</span>
                    </span>
                  </div>
                  {searchTerm && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium text-gray-700">
                        Termo de busca: <span className="text-blue-600 font-semibold">{searchTerm}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
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
                <div>
                  {/* Tabela para telas médias e grandes */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700 border-b">ID</th>
                          <th className="py-3 px-4 font-semibold text-gray-700 border-b text-center">Descrição</th>
                          {filterType === "componentes" && (
                            <th className="py-3 px-4 font-semibold text-gray-700 border-b text-center">Categoria</th>
                          )}
                          <th className="py-3 px-4 font-semibold text-gray-700 border-b text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.length === 0 ? (
                          <tr>
                            <td
                              colSpan={filterType === "componentes" ? 4 : 3}
                              className="py-12 text-center text-gray-500"
                            >
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
                              {filterType === "componentes" && (
                                <td className="py-3 px-4 text-center text-gray-700">
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {item.categoria_descricao || "Sem categoria"}
                                  </span>
                                </td>
                              )}
                              <td className="py-3 px-4">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEdit(item, filterType)}
                                    className="hover:bg-blue-50 transition-colors"
                                  >
                                    <Pencil className="w-4 h-4 text-yellow-500" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(item.id, getEndpoint(filterType), getLabel(filterType))}
                                    className="hover:bg-red-50 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Cards para telas pequenas */}
                  <div className="sm:hidden">
                    {currentItems.length === 0 ? (
                      <div className="py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-lg">Nenhum registro encontrado</p>
                          <p className="text-sm text-gray-400">Tente ajustar os filtros ou adicione um novo cadastro</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {currentItems.map((item) => (
                          <div key={item.id} className="bg-white border rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="text-xs font-medium text-gray-500">ID</span>
                                <p className="font-medium">{item.id}</p>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(item, filterType)}
                                  className="h-8 w-8 hover:bg-blue-50 transition-colors"
                                >
                                  <Pencil className="w-4 h-4 text-yellow-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(item.id, getEndpoint(filterType), getLabel(filterType))}
                                  className="h-8 w-8 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                              </div>
                            </div>

                            <div className="mt-2">
                              <span className="text-xs font-medium text-gray-500">Descrição</span>
                              <p className="font-medium">{item.descricao}</p>
                            </div>

                            {filterType === "componentes" && item.categoria_descricao && (
                              <div className="mt-3">
                                <span className="text-xs font-medium text-gray-500">Categoria</span>
                                <div className="mt-1">
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {item.categoria_descricao || "Sem categoria"}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
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
