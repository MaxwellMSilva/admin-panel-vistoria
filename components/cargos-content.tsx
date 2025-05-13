"use client"

import { Layout } from "@/components/layout"
import { useState, useEffect } from "react"

import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { Search, Trash2, Pencil, Loader, BadgeCheck, ChevronLeft, ChevronRight, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { NovoCargoForm } from "./cargos/page"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Cargo = {
  id: string
  nome: string
  descricao: string
  nivel: number
  ativo: boolean
  permissoes?: string[]
}

// Vamos atualizar o componente CargosContent para ficar mais parecido com a tela de clientes

// Mantenha os imports existentes

// Atualize a função CargosContent para o seguinte formato:
export function CargosContent() {
  const [cargos, setCargos] = useState<Cargo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingPagination, setLoadingPagination] = useState(false)

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

  const fetchCargos = async (page = 1) => {
    try {
      setLoading(true)
      setLoadingPagination(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/cargos?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar cargos")

      const data = await response.json()
      console.log("Cargos API Response:", data)

      const items = Array.isArray(data.data.items) ? data.data.items : []
      setCargos(items)

      const { totalPages: pages, totalItems: items_count } = extractPaginationInfo(data)
      setTotalPages(pages)
      setTotalItems(items_count || items.length)

      // Verificar se a página está vazia e voltar para a anterior se necessário
      return checkEmptyPageAndGoBack(items, page)
    } catch (error) {
      console.error("Erro ao buscar cargos:", error)
      toast.error("Não foi possível carregar os cargos", { duration: 2000 })

      // Se a API ainda não estiver implementada, usar dados simulados
      const mockCargos = [
        {
          id: "1",
          nome: "Administrador",
          descricao: "Acesso total ao sistema",
          permissoes: ["dashboard", "cadastros", "clientes", "veiculos", "usuarios", "cargos"],
        },
        {
          id: "2",
          nome: "Gerente",
          descricao: "Acesso a gestão de clientes e veículos",
          permissoes: ["dashboard", "clientes", "veiculos"],
        },
        {
          id: "3",
          nome: "Operador",
          descricao: "Acesso a cadastros básicos",
          permissoes: ["dashboard", "cadastros"],
        },
        {
          id: "4",
          nome: "Atendente",
          descricao: "Acesso a clientes",
          permissoes: ["dashboard", "clientes"],
        },
      ]
      setCargos(mockCargos)
      setTotalPages(1)
      setTotalItems(mockCargos.length)

      return false
    } finally {
      setLoading(false)
      setLoadingPagination(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este cargo?")) return

    setLoadingDelete(true)

    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/cargos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao excluir cargo")

      // Após excluir, recarregar os dados da página atual
      const pageChanged = await fetchCargos(currentPage)

      // Se a página não mudou (não estava vazia), mostrar mensagem de sucesso
      if (!pageChanged) {
        toast.success("Cargo excluído com sucesso", {
          duration: 2000,
        })
      }
    } catch (error) {
      console.error("Erro ao excluir cargo:", error)
      toast.error("Não foi possível excluir o cargo", {
        duration: 2000,
      })

      // Se a API ainda não estiver implementada, remover localmente
      setCargos((prev) => prev.filter((cargo) => cargo.id !== id))
      toast.success("Cargo excluído com sucesso", { duration: 2000 })
    } finally {
      setLoadingDelete(false)
    }
  }

  useEffect(() => {
    const token = Cookies.get("access_token")
    if (!token) {
      router.push("/users/login")
    } else {
      fetchCargos(1)
    }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
    fetchCargos(1)
  }, [searchTerm])

  const filteredCargos = cargos.filter(
    (cargo) =>
      cargo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cargo.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Use this for displaying the count:
  const displayedItemsCount = filteredCargos.length

  const handleNovoCargoSuccess = () => {
    fetchCargos(currentPage)
    setIsDialogOpen(false)
    setSelectedCargo(null)
  }

  const [currentPageNav, setCurrentPageNav] = useState("cargos")

  useEffect(() => {
    if (!isDialogOpen) {
      setSelectedCargo(null)
    }
  }, [isDialogOpen])

  const goToPage = (page: number) => {
    console.log(`Attempting to go to page ${page}, total pages: ${totalPages}`)

    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setLoadingPagination(true)
      fetchCargos(page)
    }
  }

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

  // Lista de permissões disponíveis
  const permissoesDisponiveis = [
    { id: "dashboard", label: "Dashboard" },
    { id: "cadastros", label: "Cadastros" },
    { id: "clientes", label: "Clientes" },
    { id: "veiculos", label: "Veículos" },
    { id: "usuarios", label: "Usuários" },
    { id: "cargos", label: "Cargos" },
  ]

  return (
    <Layout currentPage={currentPageNav} onNavigate={setCurrentPageNav}>
      <div className="space-y-6">
        {/* Cabeçalho com título e botão de novo cargo */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Cargos</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie os cargos e permissões do sistema</p>
          </div>

          <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <SheetTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md flex items-center gap-2 transition-colors w-full sm:w-auto">
                <BadgeCheck size={16} />
                <span>Novo Cargo</span>
              </Button>
            </SheetTrigger>

            <SheetContent className="max-h-screen overflow-auto p-4 sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold">
                  {selectedCargo ? "Editar Cargo" : "Novo Cargo"}
                </SheetTitle>
                <SheetDescription className="text-sm">
                  {selectedCargo ? "Edite os dados do cargo abaixo." : "Cadastre um novo cargo abaixo."}
                </SheetDescription>
              </SheetHeader>

              <NovoCargoForm
                onSuccess={handleNovoCargoSuccess}
                onCancel={() => {
                  setIsDialogOpen(false)
                  setSelectedCargo(null)
                }}
                cargo={selectedCargo}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Filtros - Visíveis em todos os dispositivos */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Filter size={18} className="text-red-500" />
                Filtros
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Buscar Cargos</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    className="pl-10 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Buscar por nome ou descrição..."
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
          </CardContent>
        </Card>

        {/* Conteúdo principal */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold">Lista de Cargos</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {displayedItemsCount} {displayedItemsCount === 1 ? "cargo encontrado" : "cargos encontrados"}
                  {totalItems > 0 && ` de ${totalItems} total`}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
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
                  <p className="text-gray-500 mt-4 font-medium">Carregando cargos...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Mobile card view */}
                <div className="sm:hidden space-y-3">
                  {filteredCargos.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-lg">Nenhum cargo encontrado</p>
                        <p className="text-sm text-gray-400">Tente ajustar os filtros ou adicione um novo cargo</p>
                      </div>
                    </div>
                  ) : (
                    filteredCargos.map((cargo) => (
                      <div key={cargo.id} className="bg-white border rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-lg">{cargo.nome}</h3>
                            <p className="text-sm text-gray-500 mb-2">{cargo.descricao}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {cargo.permissoes &&
                                cargo.permissoes.map((permissao) => {
                                  const permissaoInfo = permissoesDisponiveis.find((p) => p.id === permissao)
                                  return (
                                    <Badge
                                      key={permissao}
                                      variant="outline"
                                      className="bg-blue-50 text-blue-700 border-blue-200"
                                    >
                                      {permissaoInfo?.label || permissao}
                                    </Badge>
                                  )
                                })}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedCargo(cargo)
                                setIsDialogOpen(true)
                              }}
                              className="hover:bg-blue-50 transition-colors h-8 w-8"
                            >
                              <Pencil className="w-4 h-4 text-blue-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(cargo.id)}
                              disabled={loadingDelete}
                              className="hover:bg-red-50 transition-colors h-8 w-8"
                            >
                              {loadingDelete ? (
                                <Loader className="animate-spin h-4 w-4" />
                              ) : (
                                <Trash2 className="w-4 h-4 text-red-500" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Desktop table view */}
                <div className="hidden sm:block overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 border-b">Nome</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 border-b">Descrição</th>
                        <th className="py-3 px-4 font-semibold text-gray-700 border-b">Permissões</th>
                        <th className="py-3 px-4 font-semibold text-gray-700 border-b text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCargos.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-12 text-center text-gray-500">
                            <div className="flex flex-col items-center gap-2">
                              <p className="text-lg">Nenhum cargo encontrado</p>
                              <p className="text-sm text-gray-400">
                                Tente ajustar os filtros ou adicione um novo cargo
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredCargos.map((cargo) => (
                          <tr key={cargo.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 text-gray-700">{cargo.nome}</td>
                            <td className="py-3 px-4 text-gray-700">{cargo.descricao}</td>
                            <td className="py-3 px-4">
                              <div className="flex flex-wrap gap-1">
                                {cargo.permissoes &&
                                  cargo.permissoes.map((permissao) => {
                                    const permissaoInfo = permissoesDisponiveis.find((p) => p.id === permissao)
                                    return (
                                      <Badge
                                        key={permissao}
                                        variant="outline"
                                        className="bg-blue-50 text-blue-700 border-blue-200"
                                      >
                                        {permissaoInfo?.label || permissao}
                                      </Badge>
                                    )
                                  })}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedCargo(cargo)
                                    setIsDialogOpen(true)
                                  }}
                                  className="hover:bg-blue-50 transition-colors"
                                >
                                  <Pencil className="w-4 h-4 text-blue-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(cargo.id)}
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
              </>
            )}

            {/* Paginação inferior - Visível apenas em telas menores quando há mais de uma página */}
            {totalPages > 1 && !loading && (
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
