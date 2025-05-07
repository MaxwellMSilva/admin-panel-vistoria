"use client"

import { Layout } from "@/components/layout"

import { useState, useEffect } from "react"

import { Search, Plus, Trash2, Pencil, Printer, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Dialog } from "@/components/ui/dialog"
import { NovoModeloForm } from "./cadastros/novo-modelo-form"
import { NovoCorForm } from "./cadastros/novo-cor-form"
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

type Modelo = {
  id: string
  descricao: string
}

type Cor = {
  id: string
  descricao: string
}

export function CadastrosContent() {
  const [modelos, setModelos] = useState<Modelo[]>([])
  const [cores, setCores] = useState<Cor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isModeloDialogOpen, setIsModeloDialogOpen] = useState(false)
  const [isCorDialogOpen, setIsCorDialogOpen] = useState(false)

  const [selectedModelo, setSelectedModelo] = useState<Modelo | null>(null)

  const fetchModelos = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/modelos")
      if (!response.ok) throw new Error("Falha ao buscar modelos")

      const data = await response.json()
      setModelos(data)
    } catch (error) {
      console.error("Erro ao buscar modelos:", error)
      toast.error("Não foi possível carregar os modelos", {
        duration: 2000,
      })
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



  useEffect(() => {
    fetchModelos()
    fetchCores()
  }, [])

  const filteredModelos = modelos.filter(
    (modelo) =>
        modelo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        modelo.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const [currentPage, setCurrentPage] = useState("modelos")

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      <>
        <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold">Cadastros</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-red-400 hover:bg-primary cursor-pointer">
                <Menu className="mr-2 h-4 w-4 font-semibold"/> Novo Cadastro
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsModeloDialogOpen(true)}>
                Modelo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsCorDialogOpen(true)}>
                Cor
              </DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Modelos</h1>
          <Button className="bg-red-400 hover:bg-primary cursor-pointer" onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4 font-semibold" />Novo Modelo
          </Button>
        </div> */}

        <div className="mb-6">
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
                  {filteredModelos.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        Nenhum registro encontrado
                      </td>
                    </tr>
                  ) : (
                    filteredModelos.map((modelo) => (
                      <tr key={modelo.id} className="border-b">
                        <td className="py-3 px-4">{modelo.id}</td>
                        <td className="py-3 px-4 flex justify-center">{modelo.descricao}</td>
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
                              // onClick={() => handleDelete(modelo.id)}
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

        {/* Modal para adicionar novo modelo */}
        <Dialog open={isModeloDialogOpen} onOpenChange={setIsModeloDialogOpen}>
          <NovoModeloForm onSuccess={handleNovoModeloSuccess} onCancel={() => setIsModeloDialogOpen(false)} />
        </Dialog>

        {/* Modal para adicionar nova cor */}
        <Dialog open={isCorDialogOpen} onOpenChange={setIsCorDialogOpen}>
          <NovoCorForm onSuccess={handleNovoCorSuccess} onCancel={() => setIsCorDialogOpen(false)} />
        </Dialog>
      </>
    </Layout> 
  )
}
