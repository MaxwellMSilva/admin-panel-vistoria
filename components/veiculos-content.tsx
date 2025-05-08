"use client"

import { Layout } from "@/components/layout"

import { useState, useEffect } from "react"

import { Search, Plus, Trash2, Pencil, Printer, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"  
import { NovoVeiculoForm } from "./veiculos/novo-veiculos-form"
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

type Veiculo = {
  id: string
  placa: string
  c_cliente_id: string
}

export function VeiculosContent() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null)

  const fetchVeiculo = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/veiculos")
      if (!response.ok) throw new Error("Falha ao buscar veiculos")

      const data = await response.json()
      setVeiculos(data)
    } catch (error) {
      console.error("Erro ao buscar veiculos:", error)
      toast.error("Não foi possível carregar os veiculos", {
        duration: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVeiculo()
  }, [])

  const filteredVeiculos = veiculos.filter(
    (veiculo) =>
      veiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veiculo.c_cliente_id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este veiculo?")) return

    try {
      const response = await fetch(`/api/veiculos/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Falha ao excluir veiculo")

      await fetchVeiculo()
      toast.success("Veiculo excluído com sucesso", {
        duration: 2000,
      })
    } catch (error) {
      console.error("Erro ao excluir veiculo:", error)
      toast.error("Não foi possível excluir o veiculo", {
        duration: 2000,
      })
    }
  }

  const handleNovoVeiculoSuccess = () => {
    fetchVeiculo()
    setIsDialogOpen(false)
  }

  const [currentPage, setCurrentPage] = useState("veiculos")

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      <>
        <div className="flex flex-row justify-between md:flex-row md:justify-between items-center mb-6 gap-4 text-center">
          <h1 className="text-2xl font-bold">Veiculos</h1>

          <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <SheetTrigger asChild>
              <Button className="bg-red-400 hover:bg-primary cursor-pointer">
                <Car className="mr-2 h-4 w-4 font-semibold" /> Novo Veiculo
              </Button>
            </SheetTrigger>

            <SheetContent className="max-h-screen overflow-auto p-4">
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold">Novo Veiculo</SheetTitle>
                <SheetDescription className="text-sm">
                  Cadastre um novo veiculo abaixo.
                </SheetDescription>
              </SheetHeader>

              <NovoVeiculoForm
                onSuccess={handleNovoVeiculoSuccess}
                onCancel={() => setIsDialogOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10 w-full"
              placeholder="Buscar veiculos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white border rounded-md p-4 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-2">Lista de Veiculos</h2>
          <p className="text-sm text-gray-500 mb-4">Total de veiculos encontrados</p>

          {loading ? (
            <div className="py-8 text-center">Carregando veiculos...</div>
          ) : (
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Placa:</th>
                  <th className="py-3 px-4 font-semibold text-center">Cliente:</th>
                  <th className="py-3 px-4 font-semibold text-right">Ações:</th>
                </tr>
              </thead>
              <tbody>
                {filteredVeiculos.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">
                      Nenhum veiculo encontrado
                    </td>
                  </tr>
                ) : (
                  filteredVeiculos.map((veiculo) => (
                    <tr key={veiculo.id} className="border-b">
                      <td className="py-3 px-4">{veiculo.placa}</td>
                      <td className="py-3 px-4 text-center">{veiculo.c_cliente_id}</td>
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
                            onClick={() => handleDelete(veiculo.id)}
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
          )}
        </div>
      </>
    </Layout> 
  )
}
