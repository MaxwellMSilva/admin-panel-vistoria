"use client"

import { Layout } from "@/components/layout"
import { useState, useEffect } from "react"

import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { Search, Trash2, Pencil, Loader, Car, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { NovoClienteForm } from "./clientes/novo-cliente-form"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type Cliente = {
  id: string
  nome_completo: string
  cpf_cnpj: string
}

export function ClientesContent() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
  const [loadingDelete, setLoadingDelete] = useState(false)

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const router = useRouter()

  const fetchClientes = async () => {
    try {
      setLoading(true)
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
      toast.error("Não foi possível carregar os clientes", {
        duration: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return

    setLoadingDelete(true)

    try {
      const token = Cookies.get("access_token")
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/c_clientes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao excluir cliente")

      await fetchClientes()
      toast.success("Cliente excluído com sucesso", {
        duration: 2000,
      })
    } catch (error) {
      console.error("Erro ao excluir cliente:", error)
      toast.error("Não foi possível excluir o cliente", {
        duration: 2000,
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
      fetchClientes()
    }
  }, [])

  // Reset para a primeira página quando mudar o termo de busca
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const filteredClientes = Array.isArray(clientes)
    ? clientes.filter(
        (cliente) =>
          cliente.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cliente.cpf_cnpj.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  const totalItems = filteredClientes.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const currentItems = filteredClientes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleNovoClienteSuccess = () => {
    fetchClientes()
    setIsDialogOpen(false)
    setSelectedCliente(null)
  }

  const [currentPageNav, setCurrentPageNav] = useState("clientes")

  useEffect(() => {
    if (!isDialogOpen) {
      setSelectedCliente(null)
    }
  }, [isDialogOpen])

  // Função para navegar para uma página específica
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <Layout currentPage={currentPageNav} onNavigate={setCurrentPageNav}>
      <>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold">Clientes</h1>

          <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <SheetTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-4 py-2 flex items-center gap-2 transition-colors">
                <Car className="h-4 w-4" /> Novo Cliente
              </Button>
            </SheetTrigger>

            <SheetContent className="max-h-screen overflow-auto p-4">
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold">
                  {selectedCliente ? "Editar Cliente" : "Novo Cliente"}
                </SheetTitle>
                <SheetDescription className="text-sm">
                  {selectedCliente ? "Edite os dados do cliente abaixo." : "Cadastre um novo cliente abaixo."}
                </SheetDescription>
              </SheetHeader>

              <NovoClienteForm
                onSuccess={handleNovoClienteSuccess}
                onCancel={() => {
                  setIsDialogOpen(false)
                  setSelectedCliente(null)
                }}
                cliente={selectedCliente}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="mb-6 bg-white border rounded-md p-4 shadow-sm">
          <div className="flex flex-wrap items-end gap-4">
            <div className="relative flex-1 w-full">
              <label className="block text-sm font-medium mb-1">Buscar Clientes</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  className="pl-10 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Buscar por nome ou CPF/CNPJ..."
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
              <h2 className="text-lg font-semibold">Lista de Clientes</h2>
              <p className="text-sm text-gray-500">
                {totalItems} {totalItems === 1 ? "cliente encontrado" : "clientes encontrados"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500">Itens por página:</label>
              <select
                className="p-1 border rounded text-sm"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center items-center">
              <div className="flex flex-col items-center gap-2">
                <Loader className="animate-spin h-8 w-8 text-red-500" />
                <p className="text-gray-500">Carregando clientes...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[400px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 border-b">Nome</th>
                      <th className="py-3 px-4 font-semibold text-gray-700 border-b text-center">CPF/CNPJ</th>
                      <th className="py-3 px-4 font-semibold text-gray-700 border-b text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-12 text-center text-gray-500">
                          <div className="flex flex-col items-center gap-2">
                            <p className="text-lg">Nenhum cliente encontrado</p>
                            <p className="text-sm text-gray-400">
                              Tente ajustar os filtros ou adicione um novo cliente
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      currentItems.map((cliente) => (
                        <tr key={cliente.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-gray-700">{cliente.nome_completo}</td>
                          <td className="py-3 px-4 text-center text-gray-700">{cliente.cpf_cnpj}</td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedCliente(cliente)
                                  setIsDialogOpen(true)
                                }}
                                className="hover:bg-blue-50 transition-colors"
                              >
                                <Pencil className="w-4 h-4 text-blue-500" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(cliente.id)}
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

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
                  <div className="text-sm text-gray-500">
                    Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
                    {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} clientes
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {totalPages <= 5 ? (
                      // Se houver 5 páginas ou menos, mostrar todas
                      Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={`page-${page}`}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => goToPage(Number(page))}
                          className={`h-8 w-8 ${currentPage === page ? "bg-red-500 hover:bg-red-600" : ""}`}
                        >
                          {page}
                        </Button>
                      ))
                    ) : (
                      // Se houver mais de 5 páginas, mostrar um subconjunto
                      <>
                        {/* Primeira página */}
                        <Button
                          variant={currentPage === 1 ? "default" : "outline"}
                          onClick={() => goToPage(1)}
                          className={`h-8 w-8 ${currentPage === 1 ? "bg-red-500 hover:bg-red-600" : ""}`}
                        >
                          1
                        </Button>

                        {/* Elipses ou segunda página */}
                        {currentPage > 3 ? (
                          <span className="px-2">...</span>
                        ) : (
                          <Button
                            variant={currentPage === 2 ? "default" : "outline"}
                            onClick={() => goToPage(2)}
                            className={`h-8 w-8 ${currentPage === 2 ? "bg-red-500 hover:bg-red-600" : ""}`}
                          >
                            2
                          </Button>
                        )}

                        {/* Página atual e adjacentes */}
                        {currentPage !== 1 && currentPage !== totalPages && (
                          <Button variant="default" className="h-8 w-8 bg-red-500 hover:bg-red-600">
                            {currentPage}
                          </Button>
                        )}

                        {/* Elipses ou penúltima página */}
                        {currentPage < totalPages - 2 ? (
                          <span className="px-2">...</span>
                        ) : (
                          <Button
                            variant={currentPage === totalPages - 1 ? "default" : "outline"}
                            onClick={() => goToPage(totalPages - 1)}
                            className={`h-8 w-8 ${currentPage === totalPages - 1 ? "bg-red-500 hover:bg-red-600" : ""}`}
                          >
                            {totalPages - 1}
                          </Button>
                        )}

                        {/* Última página */}
                        <Button
                          variant={currentPage === totalPages ? "default" : "outline"}
                          onClick={() => goToPage(totalPages)}
                          className={`h-8 w-8 ${currentPage === totalPages ? "bg-red-500 hover:bg-red-600" : ""}`}
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
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
