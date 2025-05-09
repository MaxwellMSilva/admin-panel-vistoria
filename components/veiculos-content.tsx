'use client'

import { Layout } from "@/components/layout"
import { useState, useEffect } from "react"

import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

import { Search, Trash2, Pencil, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { NovoVeiculoForm } from "./veiculos/novo-veiculos-form"
import {
  Sheet,
  SheetContent,
  SheetDescription,
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
  
  const router = useRouter()

  const fetchVeiculos = async () => {
    try {
      setLoading(true)
      const token = Cookies.get('access_token')
      if (!token) throw new Error("Token não encontrado")

      const response = await fetch("/api/veiculos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Falha ao buscar veículos")
      const data = await response.json()
      setVeiculos(data)
    } catch (error) {
      console.error("Erro ao buscar veículos:", error)
      toast.error("Não foi possível carregar os veículos", {
        duration: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (!token) {
      router.push('/users/login')
    } else {
      fetchVeiculos()
    }
  }, [])

  const filteredVeiculos = veiculos.filter(
    (v) =>
      v.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.c_cliente_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este veículo?")) return

    try {
      const response = await fetch(`/api/veiculos/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Falha ao excluir veículo")

      await fetchVeiculos()
      toast.success("Veículo excluído com sucesso", { duration: 2000 })
    } catch (error) {
      console.error("Erro ao excluir veículo:", error)
      toast.error("Não foi possível excluir o veículo", { duration: 2000 })
    }
  }

  const handleNovoVeiculoSuccess = () => {
    fetchVeiculos()
    setIsDialogOpen(false)
  }

  return (
    <Layout currentPage="veiculos" onNavigate={() => {}}>
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Veículos</h1>

        <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <SheetTrigger asChild>
            <Button className="bg-red-400 hover:bg-primary">
              <Car className="mr-2 h-4 w-4" /> Novo Veículo
            </Button>
          </SheetTrigger>

          <SheetContent className="max-h-screen overflow-auto p-4">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">Novo Veículo</SheetTitle>
              <SheetDescription>Cadastre um novo veículo abaixo.</SheetDescription>
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
            placeholder="Buscar veículos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white border rounded-md p-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-2">Lista de Veículos</h2>
        <p className="text-sm text-gray-500 mb-4">Total de veículos encontrados</p>

        {loading ? (
          <div className="py-8 text-center">Carregando veículos...</div>
        ) : (
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Placa</th>
                <th className="text-center py-3 px-4 font-semibold">Cliente</th>
                <th className="text-right py-3 px-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredVeiculos.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-gray-500">
                    Nenhum veículo encontrado
                  </td>
                </tr>
              ) : (
                filteredVeiculos.map((v) => (
                  <tr key={v.id} className="border-b">
                    <td className="py-3 px-4">{v.placa}</td>
                    <td className="text-center py-3 px-4">{v.c_cliente_id}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-amber-200 hover:bg-amber-400 hover:text-black"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="bg-red-400 hover:bg-primary"
                          onClick={() => handleDelete(v.id)}
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
    </Layout>
  )
}
