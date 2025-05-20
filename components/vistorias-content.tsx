"use client"

import { Layout } from "@/components/layout"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { Search, Eye, Loader, ChevronLeft, ChevronRight, Filter, X, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, parseISO, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

type Vistoria = {
  id: string
  data_entrada: string
  previsao_entrega: string
  data_entrega: string | null
  observacao: string
  v_status_id: number
  v_status: {
    id: number
    nome: string
    cor: string
  }
  v_veiculo_id: number
  v_veiculo: {
    id: number
    placa: string
    modelo: string
  }
  v_categoria_id: number
  v_categoria: {
    id: number
    nome: string
  }
  v_servico_ids: number[]
  v_servicos: Array<{
    id: number
    nome: string
  }>
}

export function VistoriasContent() {
  const [vistorias, setVistorias] = useState<Vistoria[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [loadingPagination, setLoadingPagination] = useState(false)
  const [selectedVistoria, setSelectedVistoria] = useState<Vistoria | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const [dataInicio, setDataInicio] = useState<Date | undefined>(undefined)
  const [dataFim, setDataFim] = useState<Date | undefined>(undefined)
  const [statusFiltro, setStatusFiltro] = useState<string>("")

  const router = useRouter()

  const statusOptions = [
    { id: 1, nome: "Aguardando", cor: "bg-yellow-500" },
    { id: 2, nome: "Em andamento", cor: "bg-blue-500" },
    { id: 3, nome: "Concluído", cor: "bg-green-500" },
    { id: 4, nome: "Cancelado", cor: "bg-red-500" },
  ]

  const getStatusBadge = (statusId: number) => {
    const status = statusOptions.find((s) => s.id === statusId)
    if (!status) return <Badge>Desconhecido</Badge>

    return <Badge className={`${status.cor} text-white border-none`}>{status.nome}</Badge>
  }

  const extractPaginationInfo = (data: any) => {
    console.log("API Response Data:", data)

    let pages = 1
    let total = 0

    if (data && data.data) {
      if (typeof data.data.total_pages === "number") {
        pages = data.data.total_pages
      }

      if (data.data.meta && typeof data.data.meta.total_pages === "number") {
        pages = data.data.meta.total_pages
      }

      if (data.data.pagination && typeof data.data.pagination.total_pages === "number") {
        pages = data.data.pagination.total_pages
      }

      if (typeof data.data.total_items === "number") {
        total = data.data.total_items
      } else if (typeof data.data.count === "number") {
        total = data.data.count
      } else if (data.data.meta && typeof data.data.meta.total_items === "number") {
        total = data.data.meta.total_items
      }

      if (total > 0 && pages === 1) {
        pages = Math.ceil(total / itemsPerPage)
      }

      if (pages === 1 && Array.isArray(data.data.items) && data.data.items.length > 0) {
        if (data.data.items.length === itemsPerPage) {
          pages = 2
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

  const fetchVistorias = async (page = 1) => {
    try {
      setLoadingPagination(true)
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      let url = `${process.env.NEXT_PUBLIC_API_URL}api/v1/v_vistorias?page=${page}`

      if (dataInicio) {
        url += `&data_inicio=${format(dataInicio, "yyyy-MM-dd")}`
      }
      if (dataFim) {
        url += `&data_fim=${format(dataFim, "yyyy-MM-dd")}`
      }

      if (statusFiltro && statusFiltro !== "all") {
        url += `&v_status_id=${statusFiltro}`
      }

      console.log("Fetching URL:", url)

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar vistorias")

      const data = await response.json()
      console.log("Vistorias API Response:", data)

      let items = []
      if (data.data && Array.isArray(data.data.items)) {
        items = data.data.items
      } else if (Array.isArray(data.data)) {
        items = data.data
      } else if (data && Array.isArray(data.items)) {
        items = data.items
      } else if (Array.isArray(data)) {
        items = data
      }

      const mappedItems = items.map((item) => ({
        ...item,
        v_veiculo_id: item.v_veiculo_id || (item.v_veiculo ? item.v_veiculo.id : null),
        v_categoria_id: item.v_categoria_id || (item.v_categoria ? item.v_categoria.id : null),
        v_servico_ids: item.v_servico_ids || (item.v_servicos ? item.v_servicos.map((s) => s.id) : []),
      }))

      setVistorias(mappedItems)

      const { totalPages: pages, totalItems: items_count } = extractPaginationInfo(data)
      setTotalPages(pages)
      setTotalItems(items_count || items.length)

      return checkEmptyPageAndGoBack(items, page)
    } catch (error) {
      console.error("Erro ao buscar vistorias:", error)
      toast.error("Não foi possível carregar as vistorias", { duration: 3000 })
      return false
    } finally {
      setLoading(false)
      setLoadingPagination(false)
    }
  }

  useEffect(() => {
    const token = Cookies.get("access_token")
    if (!token) {
      router.push("/users/login")
    } else {
      fetchVistorias(1)
    }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
    fetchVistorias(1)
  }, [searchTerm, dataInicio, dataFim, statusFiltro])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Não definido"
    try {
      return format(parseISO(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR })
    } catch (error) {
      return "Data inválida"
    }
  }

  const filteredVistorias = Array.isArray(vistorias)
    ? vistorias.filter(
        (vistoria) =>
          vistoria.v_veiculo?.placa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vistoria.observacao?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  const displayedItemsCount = filteredVistorias.length

  const [currentPageNav, setCurrentPageNav] = useState("vistorias")

  const goToPage = (page: number) => {
    console.log(`Attempting to go to page ${page}, total pages: ${totalPages}`)

    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setLoadingPagination(true)
      fetchVistorias(page)
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

  const clearFilters = () => {
    setDataInicio(undefined)
    setDataFim(undefined)
    setStatusFiltro("")
    setSearchTerm("")
  }

  const viewDetails = (vistoria: Vistoria) => {
    setSelectedVistoria(vistoria)
    setIsDetailsOpen(true)
  }

  // Dados de exemplo para desenvolvimento
  const mockVistorias: Vistoria[] = [
    {
      id: "1",
      data_entrada: "2025-05-03T15:00:00",
      previsao_entrega: "2025-05-05T18:00:00",
      data_entrega: "2025-05-04T16:00:00",
      observacao: "Veículo chegou com arranhões no para-choque",
      v_status_id: 1,
      v_status: {
        id: 1,
        nome: "Aguardando",
        cor: "yellow",
      },
      v_veiculo_id: 2,
      v_veiculo: {
        id: 2,
        placa: "ABC1234",
        modelo: "Toyota Corolla",
      },
      v_categoria_id: 1,
      v_categoria: {
        id: 1,
        nome: "Revisão Completa",
      },
      v_servico_ids: [1, 2],
      v_servicos: [
        {
          id: 1,
          nome: "Troca de óleo",
        },
        {
          id: 2,
          nome: "Verificação de freios",
        },
      ],
    },
    {
      id: "2",
      data_entrada: "2025-05-03T15:00:00",
      previsao_entrega: "2025-05-05T18:00:00",
      data_entrega: "2025-05-04T16:00:00",
      observacao: "Cliente solicitou verificação do sistema de ar condicionado",
      v_status_id: 3,
      v_status: {
        id: 3,
        nome: "Concluído",
        cor: "green",
      },
      v_veiculo_id: 2,
      v_veiculo: {
        id: 2,
        placa: "XYZ5678",
        modelo: "Honda Civic",
      },
      v_categoria_id: 1,
      v_categoria: {
        id: 1,
        nome: "Manutenção Preventiva",
      },
      v_servico_ids: [1, 2],
      v_servicos: [
        {
          id: 1,
          nome: "Verificação do ar condicionado",
        },
        {
          id: 2,
          nome: "Alinhamento e balanceamento",
        },
      ],
    },
  ]

  return (
    <Layout currentPage={currentPageNav} onNavigate={setCurrentPageNav}>
      <>
        {/* Cabeçalho com título */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Vistorias</h1>
            <p className="text-sm text-gray-500 mt-1">Consulte as vistorias realizadas</p>
          </div>
        </div>

        {/* Filtros - Visíveis em todos os dispositivos */}
        <Card className="mb-6">
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Filter size={18} className="text-red-500" />
                Filtros
              </CardTitle>
              {(searchTerm || dataInicio || dataFim || statusFiltro) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  Limpar filtros
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Buscar Vistorias</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    className="pl-10 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Buscar por placa ou observação..."
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

              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Data Inicial</label>
                <Input
                  type="date"
                  className="w-full"
                  value={dataInicio ? format(dataInicio, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      setDataInicio(parse(e.target.value, "yyyy-MM-dd", new Date()))
                    } else {
                      setDataInicio(undefined)
                    }
                  }}
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Data Final</label>
                <Input
                  type="date"
                  className="w-full"
                  value={dataFim ? format(dataFim, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      setDataFim(parse(e.target.value, "yyyy-MM-dd", new Date()))
                    } else {
                      setDataFim(undefined)
                    }
                  }}
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select value={statusFiltro} onValueChange={setStatusFiltro}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.id} value={status.id.toString()}>
                        {status.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo principal */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold">Lista de Vistorias</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {displayedItemsCount} {displayedItemsCount === 1 ? "vistoria encontrada" : "vistorias encontradas"}
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
                  <p className="text-gray-500 mt-4 font-medium">Carregando vistorias...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Mobile card view */}
                <div className="sm:hidden space-y-3">
                  {filteredVistorias.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-lg">Nenhuma vistoria encontrada</p>
                        <p className="text-sm text-gray-400">Tente ajustar os filtros para encontrar o que procura</p>
                      </div>
                    </div>
                  ) : (
                    filteredVistorias.map((vistoria) => (
                      <div key={vistoria.id} className="bg-white border rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Badge variant="outline" className="mt-1 bg-gray-50">
                              {vistoria.v_veiculo?.placa}
                            </Badge>
                          </div>
                          <div>{getStatusBadge(vistoria.v_status_id)}</div>
                        </div>
                        <div className="mt-3 space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400" />
                            <span>Entrada: {formatDate(vistoria.data_entrada)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-gray-400" />
                            <span>Previsão: {formatDate(vistoria.previsao_entrega)}</span>
                          </div>
                          {vistoria.data_entrega && (
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-gray-400" />
                              <span>Entrega: {formatDate(vistoria.data_entrega)}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewDetails(vistoria)}
                            className="w-full border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver detalhes
                          </Button>
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
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 border-b">Data Entrada</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 border-b">Previsão Entrega</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700 border-b">Status</th>
                        <th className="py-3 px-4 font-semibold text-gray-700 border-b text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVistorias.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-gray-500">
                            <div className="flex flex-col items-center gap-2">
                              <p className="text-lg">Nenhuma vistoria encontrada</p>
                              <p className="text-sm text-gray-400">
                                Tente ajustar os filtros para encontrar o que procura
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredVistorias.map((vistoria) => (
                          <tr key={vistoria.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 text-gray-700">{vistoria.v_veiculo?.placa}</td>
                            <td className="py-3 px-4 text-gray-700">{formatDate(vistoria.data_entrada)}</td>
                            <td className="py-3 px-4 text-gray-700">{formatDate(vistoria.previsao_entrega)}</td>
                            <td className="py-3 px-4 text-center">{getStatusBadge(vistoria.v_status_id)}</td>
                            <td className="py-3 px-4">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => viewDetails(vistoria)}
                                  className="border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Detalhes
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

        {/* Modal de detalhes */}
        <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <SheetContent className="max-h-screen overflow-auto p-4 sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">Detalhes da Vistoria</SheetTitle>
              <SheetDescription className="text-sm">
                Informações completas sobre a vistoria selecionada.
              </SheetDescription>
            </SheetHeader>

            {selectedVistoria && (
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Veículo</h3>
                  <p className="text-lg font-medium">{selectedVistoria.v_veiculo?.modelo}</p>
                  <Badge variant="outline" className="mt-1 bg-gray-50">
                    {selectedVistoria.v_veiculo?.placa}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div>{getStatusBadge(selectedVistoria.v_status_id)}</div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Categoria</h3>
                  <p>{selectedVistoria.v_categoria?.nome || "Não definida"}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Datas</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Entrada:</span>
                      <span>{formatDate(selectedVistoria.data_entrada)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Previsão de Entrega:</span>
                      <span>{formatDate(selectedVistoria.previsao_entrega)}</span>
                    </div>
                    {selectedVistoria.data_entrega && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Data de Entrega:</span>
                        <span>{formatDate(selectedVistoria.data_entrega)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedVistoria.v_servicos && selectedVistoria.v_servicos.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Serviços</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedVistoria.v_servicos.map((servico) => (
                        <Badge key={servico.id} variant="secondary">
                          {servico.nome}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedVistoria.observacao && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Observações</h3>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{selectedVistoria.observacao}</p>
                  </div>
                )}

                <div className="pt-4">
                  <Button onClick={() => setIsDetailsOpen(false)} className="w-full">
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </>
    </Layout>
  )
}
