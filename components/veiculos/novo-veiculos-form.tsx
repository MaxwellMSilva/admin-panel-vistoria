"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Veiculo = {
    onSuccess: () => void
    onCancel: () => void
}

export function NovoVeiculoForm({ onSuccess, onCancel }: Veiculo) {
    const [formData, setFormData] = useState({ 
        placa: "",
        v_modelo_id: "",
        v_cor_id: "",
        v_fabricante_id: "",
        c_cliente_id: ""
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

            const response = await fetch("/api/veiculos", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    placa: formData.placa,
                    v_modelo_id: formData.v_modelo_id,
                    v_cor_id: formData.v_cor_id,
                    v_fabricante_id: formData.v_fabricante_id,
                    c_cliente_id: formData.c_cliente_id
                }),
            })

            if (!response.ok) {
                let errorMessage = "Falha ao criar veiculo"
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

            toast.success("Veiculo criado com sucesso", {
            duration: 2000
            })
            onSuccess()

            setFormData({ 
                placa: "",
                v_modelo_id: "",
                v_cor_id: "",
                v_fabricante_id: "",
                c_cliente_id: ""
            })
        } catch (error: any) {
        console.error("Erro ao criar veiculo:", error)
        toast.error(error.message || "Não foi possível criar o veiculo", {
            duration: 2000
        })
        } finally {
        setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            placa: "",
            v_modelo_id: "",
            v_cor_id: "",
            v_fabricante_id: "",
            c_cliente_id: ""
        })
        onCancel()
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setFormData({
            placa: "",
            v_modelo_id: "",
            v_cor_id: "",
            v_fabricante_id: "",
            c_cliente_id: ""
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

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="placa" className="text-left font-bold">
                    Placa:
                </Label>
                <Input
                    id="placa"
                    name="placa"
                    placeholder="Digite a placa..."
                    value={formData.placa}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="v_modelo_id" className="text-left font-bold">
                    Modelo:
                </Label>
                <Input
                    id="v_modelo_id"
                    name="v_modelo_id"
                    placeholder="Digite o modelo..."
                    value={formData.v_modelo_id}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="v_cor_id" className="text-left font-bold">
                    Cor:
                </Label>
                <Input
                    id="v_cor_id"
                    name="v_cor_id"
                    placeholder="Digite a cor..."
                    value={formData.v_cor_id}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="v_fabricante_id" className="text-left font-bold">
                    Fabricante:
                </Label>
                <Input
                    id="v_fabricante_id"
                    name="v_fabricante_id"
                    placeholder="Digite o fabricante..."
                    value={formData.v_fabricante_id}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="c_cliente_id" className="text-left font-bold">
                    Cliente:
                </Label>
                <Input
                    id="c_cliente_id"
                    name="c_cliente_id"
                    placeholder="Digite o cliente..."
                    value={formData.c_cliente_id}
                    onChange={handleChange}
                    className="col-span-3 w-full"
                    required
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
