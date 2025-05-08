"use client"

import { Layout } from "@/components/layout"

import { useState, useEffect } from "react"

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

export function CadastrosContent() {
  const [modelos, setModelos] = useState<Modelo[]>([])
  const [cores, setCores] = useState<Cor[]>([])
  const [fabricantes, setFabricante] = useState<Fabricante[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModeloDialogOpen, setIsModeloDialogOpen] = useState(false)
  const [isCorDialogOpen, setIsCorDialogOpen] = useState(false)
  const [isFabricanteDialogOpen, setIsFabricanteDialogOpen] = useState(false)
  const [filterType, setFilterType] = useState("modelos");

  const fetchModelos = async (page: number = 1) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/v_modelos?page=${page}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer <YOUR_TOKEN>', // Substitua pelo seu token
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar modelos');
      }
  
      const data = await response.json();
      return data; // Retorne os modelos para uso posterior
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
    }
  };

  const handleNovoModeloSuccess = () => {
    fetchModelos()
    setIsModeloDialogOpen(false)
  }

  const fetchCores = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/cores")
      if (!response.ok) throw new Error("Falha ao buscar cores")

      const data = await response.json()
      setCores(data)
    } catch (error) {
      console.error("Erro ao buscar cores:", error)
      toast.error("Não foi possível carregar os cores", {
        duration: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNovoCorSuccess = () => {
    fetchCores()
    setIsCorDialogOpen(false)
  }

  const fetchFabricantes = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/fabricantes")
      if (!response.ok) throw new Error("Falha ao buscar fabricantes")

      const data = await response.json()
      setCores(data)
    } catch (error) {
      console.error("Erro ao buscar fabricantes:", error)
      toast.error("Não foi possível carregar os fabricantes", {
        duration: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNovoFabricanteSuccess = () => {
    fetchFabricantes()
    setIsFabricanteDialogOpen(false)
  }



  useEffect(() => {
    fetchModelos()
    fetchCores()
    fetchFabricantes()
  }, [])

  const filteredModelos = modelos.filter(
    (modelo) =>
        modelo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        modelo.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCores = cores.filter(
    (cor) =>
      cor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cor.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const filteredFabricantes = fabricantes.filter(
    (fab) =>
      fab.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fab.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const [currentPage, setCurrentPage] = useState("modelos")

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      <>
        <div className="flex justify-between items-center mb-3">
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
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    Novo Modelo
                  </Button>
                </SheetTrigger>

                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Novo Modelo</SheetTitle>
                    <SheetDescription>Cadastre um novo modelo abaixo.</SheetDescription>
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
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    Nova Cor
                  </Button>
                </SheetTrigger>

                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Nova Cor</SheetTitle>
                    <SheetDescription>Cadastre uma nova cor abaixo.</SheetDescription>
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
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    Novo Fabricante
                  </Button>
                </SheetTrigger>

                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Novo Fabricante</SheetTitle>
                    <SheetDescription>Cadastre um novo fabricante abaixo.</SheetDescription>
                  </SheetHeader>

                  <NovoFabricanteForm
                    onSuccess={handleNovoFabricanteSuccess}
                    onCancel={() => setIsFabricanteDialogOpen(false)}
                  />
                </SheetContent>
              </Sheet>
            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

        </div>

        <div className="mb-3">
          <RadioGroup
            value={filterType}
            onValueChange={setFilterType}
            className="flex items-center gap-6 mb-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="modelos" id="modelos" />
              <label htmlFor="modelos" className="text-sm font-medium text-gray-700">
                Modelos
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cores" id="cores" />
              <label htmlFor="cores" className="text-sm font-medium text-gray-700">
                Cores
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fabricantes" id="fabricantes" />
              <label htmlFor="fabricantes" className="text-sm font-medium text-gray-700">
                Fabricantes
              </label>
            </div>
          </RadioGroup>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10 w-full"
              placeholder="Buscar cadastros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                  {(filterType === "modelos" ? filteredModelos :
                    filterType === "cores" ? filteredCores :
                    filterType === "fabricantes" ? filteredFabricantes : []
                  ).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        Nenhum registro encontrado
                      </td>
                    </tr>
                  ) : (
                    (filterType === "modelos" ? filteredModelos :
                    filterType === "cores" ? filteredCores :
                    filterType === "fabricantes" ? filteredFabricantes : []
                    ).map((item) => (
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
        </div>
      </>
    </Layout> 
  )
}
