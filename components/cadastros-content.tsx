"use client"

import { Layout } from "@/components/layout"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

import { Search, Plus, Trash2, Pencil, Printer, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { NovoModeloForm } from "./cadastros/novo-modelo-form"
import { NovoCorForm } from "./cadastros/novo-cor-form"
import { NovoFabricanteForm } from "./cadastros/novo-fabricante-form" 
import { NovoStatusForm } from "./cadastros/novo-status-form"
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

type Status = {
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
  const [status, setStatus] = useState<Status[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])

  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("modelos");

  const [isModeloDialogOpen, setIsModeloDialogOpen] = useState(false)
  const [isCorDialogOpen, setIsCorDialogOpen] = useState(false)
  const [isFabricanteDialogOpen, setIsFabricanteDialogOpen] = useState(false)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [isCategoriaDialogOpen, setIsCategoriaDialogOpen] = useState(false)

  const router = useRouter()

  const fetchModelos = async () => {
    try {
      setLoading(true)
      const token = Cookies.get('access_token')
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_modelos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setModelos(Array.isArray(data.data.items) ? data.data.items : [])
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
    } finally {
      setLoading(false)
    }
  }

  const handleNovoModeloSuccess = () => {
    fetchModelos()
    setIsModeloDialogOpen(false)
  }

  const fetchCores = async () => {
    try {
      setLoading(true)
      const token = Cookies.get('access_token')
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_cores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setCores(Array.isArray(data.data.items) ? data.data.items : [])
    } catch (error) {
      console.error('Erro ao buscar cores:', error);
    }
  }

  const handleNovoCorSuccess = () => {
    fetchCores()
    setIsCorDialogOpen(false)
  }

  const fetchFabricantes = async () => {
    try {
      setLoading(true)
      const token = Cookies.get('access_token')
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_fabricantes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setFabricante(Array.isArray(data.data.items) ? data.data.items : [])
    } catch (error) {
      console.error('Erro ao buscar fabricantes:', error);
    }
  }

  const handleNovoFabricanteSuccess = () => {
    fetchFabricantes()
    setIsFabricanteDialogOpen(false)
  }

  // const fetchStatus = async () => {
  //   try {
  //     setLoading(true)
  //     const token = Cookies.get('access_token')
  //     if (!token) throw new Error("Token não encontrado")

  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_modelos`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })

  //     const data = await response.json()
  //     setStatus(Array.isArray(data.data.items) ? data.data.items : [])
  //   } catch (error) {
  //     console.error('Erro ao buscar status:', error);
  //   }
  // }

  // const handleNovoStatusSuccess = () => {
  //   fetchStatus()
  //   setIsStatusDialogOpen(false)
  // }

  const fetchCategorias = async () => {
    try {
      setLoading(true)
      const token = Cookies.get('access_token')
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/v_categorias`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setCategorias(Array.isArray(data.data.items) ? data.data.items : [])
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }

  const handleNovoCategoriaSuccess = () => {
    fetchCategorias()
    setIsCategoriaDialogOpen(false)
  }

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (!token) {
      router.push('/users/login')
    } else {
      fetchModelos()
      fetchCores()
      fetchFabricantes()
      fetchCategorias()
    }
  }, [])

  const filteredModelos = modelos.filter(
    (modelo) =>
      modelo.id.toString().includes(searchTerm) ||
      modelo.descricao.includes(searchTerm)
  )

  const filteredCores = cores.filter(
    (cor) =>
      cor.id.toString().includes(searchTerm) ||
      cor.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredFabricantes = fabricantes.filter(
    (fab) =>
      fab.id.toString().includes(searchTerm) ||
      fab.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // const filteredStatus = status.filter(
  //   (stat) =>
  //     stat.id.toString().includes(searchTerm) ||
  //     stat.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  const filteredCategorias = categorias.filter(
    (cat) =>
      cat.id.toString().includes(searchTerm) ||
      cat.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredData = 
    filterType === "modelos" ? filteredModelos :
    filterType === "cores" ? filteredCores :
    filterType === "fabricantes" ? filteredFabricantes :
    // filterType === "status" ? filteredStatus :
    filterType === "categorias" ? filteredCategorias : []

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10  // Quantos itens você deseja por página

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <Layout onNavigate={(page: string) => setCurrentPage(Number(page))} currentPage={String(currentPage)}>
      <>
        <div className="flex justify-between items-center mb-3 flex-wrap gap-4">
          <h1 className="text-2xl font-bold">Cadastros</h1>

          <DropdownMenu>

            <DropdownMenuTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-4 py-2 flex items-center gap-2">
                <Menu className="h-4 w-4" />
                Novo Cadastro
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 rounded-md shadow-lg bg-white border p-1">

              <DropdownMenuItem asChild>
                <Sheet open={isModeloDialogOpen} onOpenChange={setIsModeloDialogOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      Novo Modelo
                    </Button>
                  </SheetTrigger>

                  <SheetContent className="max-h-screen overflow-auto p-4">
                    <SheetHeader>
                      <SheetTitle className="text-xl font-semibold">Novo Modelo</SheetTitle>
                      <SheetDescription className="text-sm">
                        Cadastre um novo modelo abaixo.
                      </SheetDescription>
                    </SheetHeader>

                    <NovoModeloForm
                      onSuccess={handleNovoModeloSuccess}
                      onCancel={() => setIsModeloDialogOpen(false)}
                    />
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Sheet open={isCorDialogOpen} onOpenChange={setIsCorDialogOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      Nova Cor
                    </Button>
                  </SheetTrigger>

                  <SheetContent className="max-h-screen overflow-auto p-4">
                    <SheetHeader>
                      <SheetTitle className="text-xl font-semibold">Nova Cor</SheetTitle>
                      <SheetDescription className="text-sm">
                        Cadastre uma nova cor abaixo.
                      </SheetDescription>
                    </SheetHeader>

                    <NovoCorForm
                      onSuccess={handleNovoCorSuccess}
                      onCancel={() => setIsCorDialogOpen(false)}
                    />
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Sheet open={isFabricanteDialogOpen} onOpenChange={setIsFabricanteDialogOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      Novo Fabricante
                    </Button>
                  </SheetTrigger>

                  <SheetContent className="max-h-screen overflow-auto p-4">
                    <SheetHeader>
                      <SheetTitle className="text-xl font-semibold">Novo Fabricante</SheetTitle>
                      <SheetDescription className="text-sm">
                        Cadastre um novo fabricante abaixo.
                      </SheetDescription>
                    </SheetHeader>

                    <NovoFabricanteForm
                      onSuccess={handleNovoFabricanteSuccess}
                      onCancel={() => setIsFabricanteDialogOpen(false)}
                    />
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>

              {/* <DropdownMenuItem asChild>
                <Sheet open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      Novo Status
                    </Button>
                  </SheetTrigger>

                  <SheetContent className="max-h-screen overflow-auto p-4">
                    <SheetHeader>
                      <SheetTitle className="text-xl font-semibold">Novo Status</SheetTitle>
                      <SheetDescription className="text-sm">
                        Cadastre um novo status abaixo.
                      </SheetDescription>
                    </SheetHeader>

                    <NovoStatusForm
                      onSuccess={handleNovoStatusSuccess}
                      onCancel={() => setIsStatusDialogOpen(false)}
                    />
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem> */}

              <DropdownMenuItem asChild>
                <Sheet open={isCategoriaDialogOpen} onOpenChange={setIsCategoriaDialogOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100">
                      Nova Categoria
                    </Button>
                  </SheetTrigger>

                  <SheetContent className="max-h-screen overflow-auto p-4">
                    <SheetHeader>
                      <SheetTitle className="text-xl font-semibold">Nova Categoria</SheetTitle>
                      <SheetDescription className="text-sm">
                        Cadastre uma nova categoria abaixo.
                      </SheetDescription>
                    </SheetHeader>

                    <NovoCategoriaForm
                      onSuccess={handleNovoCategoriaSuccess}
                      onCancel={() => setIsCategoriaDialogOpen(false)}
                    />
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </div>

        <div className="mb-3">
          
          <div className="mb-3">
            <div className="flex flex-wrap items-end gap-4">
              <label className="block">
                <select
                  name="c_tipo_usuario_id"
                  className="p-2 border rounded w-48"
                  required
                  onChange={(e) => setFilterType(e.target.value)} // Atualiza o filterType
                >
                  <option value="modelos">Modelo</option>
                  <option value="cores">Cor</option>
                  <option value="fabricantes">Fabricante</option>
                  {/* <option value="status">Status</option> */}
                  <option value="categorias">Categoria</option>
                </select>
              </label>

              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  className="pl-10 w-full"
                  placeholder="Buscar cadastros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

        </div>

        <div className="bg-white border rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Lista de Cadastros</h2>
          <p className="text-sm text-gray-500 mb-4">Total de registros encontrados</p>

          {loading ? (
            <div className="py-8 text-center">Carregando cadastros...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">ID:</th>
                    <th className="py-3 px-4 font-semibold flex justify-center">Descrição:</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        Nenhum registro encontrado
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3 px-4">{item.id}</td>
                        <td className="py-3 px-4 flex justify-center">{item.descricao}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="cursor-pointer bg-amber-200 hover:bg-amber-400 hover:text-black"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="cursor-pointer bg-red-400 hover:bg-primary"
                            >
                              <Trash2 className="h-4 w-4" />
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
          <div className="pagination">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>

            <span>
              Página {currentPage} de {totalPages}
            </span>

            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        </div>
      </>
    </Layout> 
  )
}
