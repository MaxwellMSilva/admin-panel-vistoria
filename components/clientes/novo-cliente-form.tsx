"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
    onSuccess: () => void
    onCancel: () => void
}

export function NovoClienteForm({ onSuccess, onCancel }: Cliente) {
    const [formData, setFormData] = useState({ 
        nome_completo: "", 
        cpf_cnpj: "",
        rg: "",
        telefone: "",
        rua: "",
        email: "",
        cidade_id: "",
        cep: "",
        bairro: "",
        numero_casa: ""
    })
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dialogContentRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null) 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        const formattedValue = value
        .toUpperCase() // Converte para maiúsculas
        // .normalize("NFD") // Normaliza caracteres com acentos
        // .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        // .replace(/[^A-Z]/g, ""); // Remove tudo que não seja letra

        setFormData((prev) => ({ ...prev, [name]: formattedValue }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setIsSubmitting(true)

            const response = await fetch("/api/clientes", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome_completo: formData.nome_completo,
                    cpf_cnpj: formData.cpf_cnpj,
                    rg: formData.rg,
                    telefone: formData.telefone,
                    rua: formData.rua,
                    email: formData.email,
                    cidade_id: parseInt(formData.cidade_id, 10),
                    cep: formData.cep,
                    bairro: formData.bairro,
                    numero_casa: formData.numero_casa
                }),
            })

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
                rua: "",
                email: "",
                cidade_id: "",
                cep: "",
                bairro: "",
                numero_casa: ""
            })
        } catch (error: any) {
        console.error("Erro ao criar cliente:", error)
        toast.error(error.message || "Não foi possível criar o modelo", {
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
            rua: "",
            email: "",
            cidade_id: "",
            cep: "",
            bairro: "",
            numero_casa: ""
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
            rua: "",
            email: "",
            cidade_id: "",
            cep: "",
            bairro: "",
            numero_casa: ""
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
            <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nome_completo" className="text-right font-bold">
                            Nome:
                        </Label>
                        <Input
                            id="nome_completo"
                            name="nome_completo"
                            placeholder="Digite o NOME COMPLETO do cliente..."
                            value={formData.nome_completo}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cpf_cnpj" className="text-right font-bold">
                            CPF/CNPJ:
                        </Label>
                        <Input
                            id="cpf_cnpj"
                            name="cpf_cnpj"
                            placeholder="Digite o CPF/CNPJ do cliente..."
                            value={formData.cpf_cnpj}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rg" className="text-right font-bold">
                            RG:
                        </Label>
                        <Input
                            id="rg"
                            name="rg"
                            placeholder="Digite o RG do cliente..."
                            value={formData.rg}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="telefone" className="text-right font-bold">
                            Telefone:
                        </Label>
                        <Input
                            id="telefone"
                            name="telefone"
                            placeholder="Digite o TELEFONE do cliente..."
                            value={formData.telefone}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rua" className="text-right font-bold">
                            Rua:
                        </Label>
                        <Input
                            id="rua"
                            name="rua"
                            placeholder="Digite a RUA do cliente..."
                            value={formData.rua}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right font-bold">
                            Email:
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Digite o EMAIL do cliente..."
                            value={formData.email}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cidade_id" className="text-right font-bold">
                            Cidade:
                        </Label>
                        <Input
                            id="cidade_id"
                            name="cidade_id"
                            placeholder="Digite o CÓDIGO DA CIDADE do cliente..."
                            value={formData.cidade_id}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cep" className="text-right font-bold">
                            CEP:
                        </Label>
                        <Input
                            id="cep"
                            name="cep"
                            placeholder="Digite o CEP do cliente..."
                            value={formData.cep}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bairro" className="text-right font-bold">
                            Bairro:
                        </Label>
                        <Input
                            id="bairro"
                            name="bairro"
                            placeholder="Digite o BAIRRO do cliente..."
                            value={formData.bairro}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="numero_casa" className="text-right font-bold">
                            Número:
                        </Label>
                        <Input
                            id="numero_casa"
                            name="numero_casa"
                            placeholder="Digite o NÚMERO DA CASA do cliente..."
                            value={formData.numero_casa}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>

            {/* Adicione os demais campos aqui... */}

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
