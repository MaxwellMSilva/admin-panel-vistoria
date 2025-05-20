"use client"

import { Layout } from "@/components/layout"
import { useState, useEffect } from "react"

import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { Search, Trash2, Pencil, Loader, Car, ChevronLeft, ChevronRight, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { NovoVeiculoForm } from "./veiculos/novo-veiculos-form"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Veiculo = {
  id: string
  placa: string
  descricao: string
  v_modelo_id: string
  v_cor_id: string
  v_fabricante_id: string
  c_cliente_id: string
}

export function VeiculosContent() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingPagination, setLoadingPagination] = useState(false)

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

  const fetchVeiculos = async (page = 1) => {
    try {
      setLoadingPagination(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_veiculos?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar veículos")

      const data = await response.json()
      console.log("Veículos API Response:", data)

      const items = Array.isArray(data.data.items) ? data.data.items : []
      setVeiculos(items)

      const { totalPages: pages, totalItems: items_count } = extractPaginationInfo(data)
      setTotalPages(pages)
      setTotalItems(items_count || items.length)

      return checkEmptyPageAndGoBack(items, page)
    } catch (error) {
      console.error("Erro ao buscar veículos:", error)
      toast.error("Não foi possível carregar os veículos", {
        duration: 1000,
      })
      return false
    } finally {
      setLoading(false)
      setLoadingPagination(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este veículo?")) return

    setLoadingDelete(true)

    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_veiculos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao excluir veículo")

      const pageChanged = await fetchVeiculos(currentPage)

      if (!pageChanged) {
        toast.success("Veículo excluído com sucesso", {
          duration: 1000,
        })
      }
    } catch (error) {
      console.error("Erro ao excluir veículo:", error)
      toast.error("Não foi possível excluir o veículo", {
        duration: 1000,
      })
    } finally {
      setLoadingDelete(false)
    }
  }

  useEffect(() => {
    const token = Cookies.get("access_token")
    if (!token) {
      router.push("/users/login")
    } else {
      fetchVeiculos(1)
    }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
    fetchVeiculos(1)
  }, [searchTerm])

  const filteredVeiculos = Array.isArray(veiculos)
    ? veiculos.filter(
        (veiculo) =>
          veiculo.placa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          veiculo.descricao?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  const displayedItemsCount = filteredVeiculos.length

  const handleNovoVeiculoSuccess = () => {
    fetchVeiculos(currentPage)
    setIsDialogOpen(false)
    setSelectedVeiculo(null)
  }

  const [currentPageNav, setCurrentPageNav] = useState("veiculos")

  useEffect(() => {
    if (!isDialogOpen) {
      setSelectedVeiculo(null)
    }
  }, [isDialogOpen])

  const goToPage = (page: number) => {
    console.log(`Attempting to go to page ${page}, total pages: ${totalPages}`)

    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setLoadingPagination(true)
      fetchVeiculos(page)
    }
  }

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
    <Layout currentPage={currentPageNav} onNavigate={setCurrentPageNav}>
      <>
        {/* Cabeçalho com título e botão de novo veículo */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Veículos</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie seus veículos</p>
          </div>

          <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <SheetTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md flex items-center gap-2 transition-colors w-full sm:w-auto">
                <Car size={16} />
                <span>Novo Veículo</span>
              </Button>
            </SheetTrigger>

            <SheetContent className="max-h-screen overflow-auto p-4 sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold">
                  {selectedVeiculo ? "Editar Veículo" : "Novo Veículo"}
                </SheetTitle>
                <SheetDescription className="text-sm">
                  {selectedVeiculo ? "Edite os dados do veículo abaixo." : "Cadastre um novo veículo abaixo."}
                </SheetDescription>
              </SheetHeader>

              <NovoVeiculoForm
                onSuccess={handleNovoVeiculoSuccess}
                onCancel={() => {
                  setIsDialogOpen(false)
                  setSelectedVeiculo(null)
                }}
                veiculo={selectedVeiculo}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Filtros - Visíveis em todos os dispositivos */}
        <Card className="mb-6">
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
                <label className="block text-sm font-medium mb-1">Buscar Veículos</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    className="pl-10 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Buscar por placa ou descrição..."
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
        <Card>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold">Lista de Veículos</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {displayedItemsCount} {displayedItemsCount === 1 ? "veículo encontrado" : "veículos encontrados"}
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
                  <p className="text-gray-500 mt-4 font-medium">Carregando veículos...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Mobile card view */}
                <div className="sm:hidden space-y-3">
                  {filteredVeiculos.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-lg">Nenhum veículo encontrado</p>
                        <p className="text-sm text-gray-400">Tente ajustar os filtros ou adicione um novo veículo</p>
                      </div>
                    </div>
                  ) : (
                    filteredVeiculos.map((veiculo) => (
                      <div key={veiculo.id} className="bg-white border rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Badge variant="outline" className="mb-2 bg-gray-50">
                              {veiculo.placa}
                            </Badge>
                            <h3 className="font-medium text-lg">{veiculo.descricao}</h3>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedVeiculo(veiculo)
                                setIsDialogOpen(true)
                              }}
                              className="hover:bg-blue-50 transition-colors h-8 w-8"
                            >
                              <Pencil className="w-4 h-4 text-blue-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(veiculo.id)}
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
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 border-b">Placa</th>
                        <th className="py-3 px-4 font-semibold text-gray-700 border-b text-center">Descrição</th>
                        <th className="py-3 px-4 font-semibold text-gray-700 border-b text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVeiculos.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-12 text-center text-gray-500">
                            <div className="flex flex-col items-center gap-2">
                              <p className="text-lg">Nenhum veículo encontrado</p>
                              <p className="text-sm text-gray-400">
                                Tente ajustar os filtros ou adicione um novo veículo
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredVeiculos.map((veiculo) => (
                          <tr key={veiculo.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 text-gray-700">{veiculo.placa}</td>
                            <td className="py-3 px-4 text-center text-gray-700">{veiculo.descricao}</td>
                            <td className="py-3 px-4">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedVeiculo(veiculo)
                                    setIsDialogOpen(true)
                                  }}
                                  className="hover:bg-blue-50 transition-colors"
                                >
                                  <Pencil className="w-4 h-4 text-blue-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(veiculo.id)}
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
      </>
    </Layout>
  )
}
