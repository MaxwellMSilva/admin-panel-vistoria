"use client"

import { Layout } from "@/components/layout"
import { useState, useEffect } from "react"

import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { Search, Trash2, Pencil, Loader, UserPlus, ChevronLeft, ChevronRight, Filter, X, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Usuario = {
  id: string
  nome: string
  email: string
  cargo: string
  status: string
}

export function UsuariosContent() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: "1", nome: "Admin", email: "admin@sistema.com", cargo: "Administrador", status: "Ativo" },
    { id: "2", nome: "João Silva", email: "joao@sistema.com", cargo: "Operador", status: "Ativo" },
    { id: "3", nome: "Maria Santos", email: "maria@sistema.com", cargo: "Gerente", status: "Ativo" },
    { id: "4", nome: "Pedro Oliveira", email: "pedro@sistema.com", cargo: "Operador", status: "Inativo" },
    { id: "5", nome: "Ana Costa", email: "ana@sistema.com", cargo: "Atendente", status: "Ativo" },
  ])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingPagination, setLoadingPagination] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const router = useRouter()

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

  const fetchUsuarios = async (page = 1) => {
    try {
      setLoading(true)
      setLoadingPagination(true)
      
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Calculando a paginação com os dados simulados
      const startIndex = (page - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const paginatedItems = usuarios.slice(startIndex, endIndex)
      
      // Calculando o total de páginas
      const totalPagesCount = Math.ceil(usuarios.length / itemsPerPage)
      setTotalPages(totalPagesCount)
      setTotalItems(usuarios.length)
      
      // Verificar se a página está vazia e voltar para a anterior se necessário
      return checkEmptyPageAndGoBack(paginatedItems, page)
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
      toast.error("Não foi possível carregar os usuários", { duration: 2000 })
      return false
    } finally {
      setLoading(false)
      setLoadingPagination(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return

    setLoadingDelete(true)

    try {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Removendo o usuário da lista
      setUsuarios(prev => prev.filter(usuario => usuario.id !== id))
      
      toast.success("Usuário excluído com sucesso", {
        duration: 2000,
      })
    } catch (error) {
      console.error("Erro ao excluir usuário:", error)
      toast.error("Não foi possível excluir o usuário", {
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
      fetchUsuarios(1)
    }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
    fetchUsuarios(1)
  }, [searchTerm])

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Use this for displaying the count:
  const displayedItemsCount = filteredUsuarios.length

  const handleNovoUsuarioSuccess = (novoUsuario: Usuario) => {
    setUsuarios(prev => [...prev, novoUsuario])
    setIsDialogOpen(false)
    setSelectedUsuario(null)
    toast.success("Usuário salvo com sucesso", { duration: 2000 })
  }

  const [currentPageNav, setCurrentPageNav] = useState("usuarios")

  useEffect(() => {
    if (!isDialogOpen) {
      setSelectedUsuario(null)
    }
  }, [isDialogOpen])

  const goToPage = (page: number) => {
    console.log(`Attempting to go to page ${page}, total pages: ${totalPages}`)

    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setLoadingPagination(true)
      fetchUsuarios(page)
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

  return (
    <Layout currentPage={currentPageNav} onNavigate={setCurrentPageNav}>
      <>
        {/* Cabeçalho com título e botão de novo usuário */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie os usuários do sistema</p>
          </div>

          <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <SheetTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md flex items-center gap-2 transition-colors w-full sm:w-auto">
                <UserPlus size={16} />
                <span>Novo Usuário</span>
              </Button>
            </SheetTrigger>

            <SheetContent className="max-h-screen overflow-auto p-4 sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold">
                  {selectedUsuario ? "Editar Usuário" : "Novo Usuário"}
                </SheetTitle>
                <SheetDescription className="text-sm">
                  {selectedUsuario ? "Edite os dados do usuário abaixo." : "Cadastre um novo usuário abaixo."}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <Input 
                    placeholder="Nome completo" 
                    defaultValue={selectedUsuario?.nome || ""}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input 
                    type="email" 
                    placeholder="email@exemplo.com" 
                    defaultValue={selectedUsuario?.email || ""}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Senha</label>
                  <Input 
                    type="password" 
                    placeholder={selectedUsuario ? "••••••••" : "Digite a senha"}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Cargo</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Selecione um cargo</option>
                    <option value="Administrador" selected={selectedUsuario?.cargo === "Administrador"}>Administrador</option>
                    <option value="Gerente" selected={selectedUsuario?.cargo === "Gerente"}>Gerente</option>
                    <option value="Operador" selected={selectedUsuario?.cargo === "Operador"}>Operador</option>
                    <option value="Atendente" selected={selectedUsuario?.cargo === "Atendente"}>Atendente</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="status" 
                        value="Ativo" 
                        defaultChecked={!selectedUsuario || selectedUsuario.status === "Ativo"}
                      />
                      <span>Ativo</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="status" 
                        value="Inativo" 
                        defaultChecked={selectedUsuario?.status === "Inativo"}
                      />
                      <span>Inativo</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => {
                      const novoId = (Math.max(...usuarios.map(u => parseInt(u.id))) + 1).toString();
                      handleNovoUsuarioSuccess({
                        id: novoId,
                        nome: "Novo Usuário",
                        email: "novo@sistema.com",
                        cargo: "Operador",
                        status: "Ativo"
                      });
                    }}
                  >
                    Salvar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
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
                <label className="block text-sm font-medium mb-1">Buscar Usuários</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    className="pl-10 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Buscar por nome, email ou cargo..."
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
                <CardTitle className="text-lg font-semibold">Lista de Usuários</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {displayedItemsCount} {displayedItemsCount === 1 ? "usuário encontrado" : "usuários encontrados"}
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
                  <p className="text-gray-500 mt-4 font-medium">Carregando usuários...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Mobile card view */}
                <div className="sm:hidden space-y-3">
                  {filteredUsuarios.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-lg">Nenhum usuário encontrado</p>
                        <p className="text-sm text-gray-400">Tente ajustar os filtros ou adicione um novo usuário</p>
                      </div>
                    </div>
                  ) : (
                    filteredUsuarios.map((usuario) => (
                      <div key={usuario.id} className="bg-white border rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-lg">{usuario.nome}</h3>
                            <p className="text-sm text-gray-500">{usuario.email}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="bg-gray-50">
                                {usuario.cargo}
                              </Badge>
                              <Badge 
                                className={usuario.status === "Ativo" 
                                  ? "bg-green-100 text-green-800 border-green-200" 
                                  : "bg-gray-100 text-gray-800 border-gray-200"
                                }
                              >
                                {usuario.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedUsuario(usuario)
                                setIsDialogOpen(true)
                              }}
                              className="hover:bg-blue-50 transition-colors h-8 w-8"
                            >
                              <Pencil className="w-4 h-4 text-blue-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(usuario.id)}
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
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 border-b">Email</th>
                        <th className="py-3 px-4 font-semibold text-gray-700 border-b text-center">Cargo</th>
                        <th className="py-3 px-4 font-semibold text-gray-700 border-b text-center">Status</th>
                        <th className="py-3 px-4 font-semibold text-gray-700 border-b text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsuarios.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-gray-500">
                            <div className="flex flex-col items-center gap-2">
                              <p className="text-lg">Nenhum usuário encontrado</p>
                              <p className="text-sm text-gray-400">
                                Tente ajustar os filtros ou adicione um novo usuário
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredUsuarios.map((usuario) => (
                          <tr key={usuario.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 text-gray-700">{usuario.nome}</td>
                            <td className="py-3 px-4 text-gray-700">{usuario.email}</td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="bg-gray-50">
                                {usuario.cargo}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge 
                                className={usuario.status === "Ativo" 
                                  ? "bg-green-100 text-green-800 border-green-200" 
                                  : "bg-gray-100 text-gray-800 border-gray-200"
                                }
                              >
                                {usuario.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedUsuario(usuario)
                                    setIsDialogOpen(true)
                                  }}
                                  className="hover:bg-blue-50 transition-colors"
                                >
                                  <Pencil className="w-4 h-4 text-blue-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(usuario.id)}
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
