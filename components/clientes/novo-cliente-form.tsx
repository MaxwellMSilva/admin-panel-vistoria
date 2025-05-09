"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Cliente = {
  onSuccess: () => void
  onCancel: () => void
}

export function NovoClienteForm({ onSuccess, onCancel }: Cliente) {
    const [formData, setFormData] = useState({
        nome_completo: "", 
        cpf_cnpj: "",
        rg: "",
        telefone: "",
        email: "", 
        cep: "",
        rua: "",
        numero_residencial: "",
        bairro: "",
        complemento: "",  // Adicionando complemento
        g_cidade_id: "",
        anexo_cpf: null,
        anexo_rg: null,
        anexo_comprovante_residencia: null
    })
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dialogContentRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        const formattedValue = value.toUpperCase() // Converte para maiúsculas

        setFormData((prev) => ({ ...prev, [name]: formattedValue }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target
        if (files && files[0]) {
        const file = files[0]
        setFormData((prev) => ({ ...prev, [name]: file }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formDataToSend = new FormData()

        // Enviar dados do formulário
        formDataToSend.append("nome_completo", formData.nome_completo)
        formDataToSend.append("cpf_cnpj", formData.cpf_cnpj)
        formDataToSend.append("rg", formData.rg)
        formDataToSend.append("telefone", formData.telefone)
        formDataToSend.append("rua", formData.rua)
        formDataToSend.append("email", formData.email)
        formDataToSend.append("cidade_id", formData.g_cidade_id)
        formDataToSend.append("cep", formData.cep)
        formDataToSend.append("bairro", formData.bairro)
        formDataToSend.append("numero_residencial", formData.numero_residencial)

        // Anexos
        if (formData.anexo_cpf) formDataToSend.append("anexo_cpf", formData.anexo_cpf)
        if (formData.anexo_rg) formDataToSend.append("anexo_rg", formData.anexo_rg)
        if (formData.anexo_comprovante_residencia) 
        formDataToSend.append("anexo_comprovante_residencia", formData.anexo_comprovante_residencia)

        try {
        setIsSubmitting(true)

        const token = localStorage.getItem("auth_token"); // ou de onde você estiver armazenando o token

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/c_clientes`, {
            method: "POST",
            body: formDataToSend,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            let errorMessage = "Falha ao criar cliente"
            try {
            const errorData = await response.json()
            if (errorData && errorData.error) {
                errorMessage = errorData.error
            }
            } catch (parseError) {
            console.error("Erro ao processar resposta de erro:", parseError)
            }
            throw new Error(errorMessage)
        }

        toast.success("Cliente criado com sucesso", {
            duration: 2000
        })
        onSuccess()

        setFormData({
            nome_completo: "",
            cpf_cnpj: "",
            rg: "",
            telefone: "",
            email: "",
            cep: "",
            rua: "",
            numero_residencial: "",
            bairro: "",
            complemento: "",
            g_cidade_id: "",
            anexo_cpf: null,
            anexo_rg: null,
            anexo_comprovante_residencia: null
        })
        } catch (error: any) {
        console.error("Erro ao criar cliente:", error)
        toast.error(error.message || "Não foi possível criar o cliente", {
            duration: 2000
        })
        } finally {
        setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            nome_completo: "",
            cpf_cnpj: "",
            rg: "",
            telefone: "",
            email: "",
            cep: "",
            rua: "",
            numero_residencial: "",
            bairro: "",
            complemento: "",
            g_cidade_id: "",
            anexo_cpf: null,
            anexo_rg: null,
            anexo_comprovante_residencia: null
        })
        onCancel()
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setFormData({
            nome_completo: "",
            cpf_cnpj: "",
            rg: "",
            telefone: "",
            email: "",
            cep: "",
            rua: "",
            numero_residencial: "",
            bairro: "",
            complemento: "",
            g_cidade_id: "",
            anexo_cpf: null,
            anexo_rg: null,
            anexo_comprovante_residencia: null
        })
        setPreviewImage(null)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Campos de texto para o cliente */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="nome_completo" className="text-left font-bold">
                    Nome:
                </Label>
                <Input
                    id="nome_completo"
                    name="nome_completo"
                    placeholder="Digite o NOME COMPLETO do cliente..."
                    value={formData.nome_completo}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="cpf_cnpj" className="text-left font-bold">
                    CPF/CNPJ:
                </Label>
                <Input
                    id="cpf_cnpj"
                    name="cpf_cnpj"
                    placeholder="Digite o CPF/CNPJ do cliente..."
                    value={formData.cpf_cnpj}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="rg" className="text-left font-bold">
                    RG:
                </Label>
                <Input
                    id="rg"
                    name="rg"
                    placeholder="Digite o RG do cliente..."
                    value={formData.rg}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="telefone" className="text-left font-bold">
                    Telefone:
                </Label>
                <Input
                    id="telefone"
                    name="telefone"
                    placeholder="Digite o TELEFONE do cliente..."
                    value={formData.telefone}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-left font-bold">
                    Email:
                </Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="Digite o EMAIL do cliente..."
                    value={formData.email}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="cep" className="text-left font-bold">
                    CEP:
                </Label>
                <Input
                    id="cep"
                    name="cep"
                    placeholder="Digite o CEP do cliente..."
                    value={formData.cep}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="rua" className="text-left font-bold">
                    Rua:
                </Label>
                <Input
                    id="rua"
                    name="rua"
                    placeholder="Digite a RUA do cliente..."
                    value={formData.rua}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="numero_residencial" className="text-left font-bold">
                    Número Residencial:
                </Label>
                <Input
                    id="numero_residencial"
                    name="numero_residencial"
                    placeholder="Digite o NÚMERO RESIDENCIAL do cliente..."
                    value={formData.numero_residencial}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="bairro" className="text-left font-bold">
                    Bairro:
                </Label>
                <Input
                    id="bairro"
                    name="bairro"
                    placeholder="Digite o BAIRRO do cliente..."
                    value={formData.bairro}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="complemento" className="text-left font-bold">
                    Complemento:
                </Label>
                <Input
                    id="complemento"
                    name="complemento"
                    placeholder="Digite o COMPLEMENTO do cliente..."
                    value={formData.complemento}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="g_cidade_id" className="text-left font-bold">
                    Cidade:
                </Label>
                <Input
                    id="g_cidade_id"
                    name="g_cidade_id"
                    placeholder="Digite a CIDADE do cliente..."
                    value={formData.g_cidade_id}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            {/* Campos de anexos */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="anexo_cpf" className="text-left font-bold">
                Anexo CPF:
                </Label>
                <Input
                id="anexo_cpf"
                name="anexo_cpf"
                type="file"
                onChange={handleFileChange}
                className="col-span-3 w-full"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="anexo_rg" className="text-left font-bold">
                Anexo RG:
                </Label>
                <Input
                id="anexo_rg"
                name="anexo_rg"
                type="file"
                onChange={handleFileChange}
                className="col-span-3 w-full"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="anexo_comprovante_residencia" className="text-left font-bold">
                Comprovante de Residência:
                </Label>
                <Input
                id="anexo_comprovante_residencia"
                name="anexo_comprovante_residencia"
                type="file"
                onChange={handleFileChange}
                className="col-span-3 w-full"
                />
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    )
}
