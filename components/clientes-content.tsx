"use client"

import { Layout } from "@/components/layout"
import { useState, useEffect } from "react"

import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

import { Search, Plus, Trash2, Pencil, Loader, Printer, Car } from "lucide-react"
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

  const router = useRouter()

  const fetchClientes = async () => {
    try {
      setLoading(true)
      const token = Cookies.get('access_token')
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

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (!token) {
      router.push('/users/login')
    } else {
      fetchClientes()
    }
  }, [])
  
  const filteredClientes = Array.isArray(clientes)
    ? clientes.filter(
        (cliente) =>
          cliente.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cliente.cpf_cnpj.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return

    setLoadingDelete(true)

    try {
      const token = Cookies.get('access_token')
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

  const [loadingDelete, setLoadingDelete] = useState(false)

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
                <Car className="mr-2 h-4 w-4 font-semibold" /> Novo Cliente
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
          <p className="text-sm text-gray-500 mb-4">Total de clientes encontrados</p>

          {loading ? (
            <div className="py-8 text-center">Carregando cliente...</div>
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
                            onClick={() => {
                              setSelectedCliente(cliente)
                              setIsDialogOpen(true)
                              console.log(cliente)
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="destructive"
                            size="icon"
                            className="cursor-pointer bg-red-400 hover:bg-primary"
                            onClick={() => handleDelete(cliente.id)}
                            disabled={loadingDelete} // Desabilita o botão durante o loading
                          >
                            {loadingDelete ? (
                              <Loader className="animate-spin h-4 w-4" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
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
