"use client"

import { Layout } from "@/components/layout"

import { useState, useEffect } from "react"

import { Search, Plus, Trash2, Pencil, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"  
import { NovoClienteForm } from "./clientes/novo-cliente-form"
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

  const fetchClientes = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/clientes")
      if (!response.ok) throw new Error("Falha ao buscar clientes")

      const data = await response.json()
      setClientes(data)
    } catch (error) {
      console.error("Erro ao buscar clientes:", error)
      toast.error("Não foi possível carregar os clientes", {
        duration: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cpf_cnpj.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return

    try {
      const response = await fetch(`/api/clientes/${id}`, {
        method: "DELETE",
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
    }
  }

  const handleNovoClienteSuccess = () => {
    fetchClientes()
    setIsDialogOpen(false)
  }

  const [currentPage, setCurrentPage] = useState("clientes")

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      <>
      <div className="flex flex-row justify-between md:flex-row md:justify-between items-center mb-6 gap-4 text-center">
          <h1 className="text-2xl font-bold">Clientes</h1>

          <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <SheetTrigger asChild>
              <Button className="bg-red-400 hover:bg-primary cursor-pointer">
                <Plus className="mr-2 h-4 w-4 font-semibold" /> Novo Cliente
              </Button>
            </SheetTrigger>

            <SheetContent className="max-h-screen overflow-auto p-4">
              <SheetHeader>
                <SheetTitle className="text-xl font-semibold">Novo Cliente</SheetTitle>
                <SheetDescription className="text-sm">
                  Cadastre um novo cliente abaixo.
                </SheetDescription>
              </SheetHeader>

              <NovoClienteForm
                onSuccess={handleNovoClienteSuccess}
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
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white border rounded-md p-4 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-2">Lista de Clientes</h2>
          <p className="text-sm text-gray-500 mb-4">Total de {filteredClientes.length} clientes encontrados</p>

          {loading ? (
            <div className="py-8 text-center">Carregando clientes...</div>
          ) : (
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Nome:</th>
                  <th className="py-3 px-4 font-semibold text-center">CPF/CNPJ:</th>
                  <th className="py-3 px-4 font-semibold text-right">Ações:</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">
                      Nenhum cliente encontrado
                    </td>
                  </tr>
                ) : (
                  filteredClientes.map((cliente) => (
                    <tr key={cliente.id} className="border-b">
                      <td className="py-3 px-4">{cliente.nome_completo}</td>
                      <td className="py-3 px-4 text-center">{cliente.cpf_cnpj}</td>
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
                            onClick={() => handleDelete(cliente.id)}
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
