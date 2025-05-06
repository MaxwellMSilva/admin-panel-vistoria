"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Cor = {
    onSuccess: () => void
    onCancel: () => void
}

export function NovoCorForm({ onSuccess, onCancel }: Cor) {
    const [formData, setFormData] = useState({ descricao: "" })
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

            const response = await fetch("/api/cores", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    descricao: formData.descricao
                }),
            })

            if (!response.ok) {
                let errorMessage = "Falha ao criar cor"
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

            toast.success("Cor criada com sucesso", {
            duration: 2000
            })
            onSuccess()

            setFormData({ 
                descricao: ""
            })
        } catch (error: any) {
        console.error("Erro ao criar cor:", error)
        toast.error(error.message || "Não foi possível criar o cor", {
            duration: 2000
        })
        } finally {
        setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            descricao: ""
        })
        onCancel()
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setFormData({
            descricao: ""
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
        <DialogContent ref={dialogContentRef}>
            <DialogHeader>
                <DialogTitle>Adicionar Nova Cor</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="grid gap-4 py-4">
                
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="descricao" className="text-right font-bold">
                            Descrição:
                        </Label>
                        <Input
                            id="descricao"
                            name="descricao"
                            placeholder="Digite a cor..."
                            value={formData.descricao}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>

                </div>
                
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting} 
                                className="hover:text-primary h-10 w-25 cursor-pointer font-semibold">
                        Cancelar
                    </Button>
                    <Button type="submit" 
                            className="bg-red-400 hover:bg-primary h-10 w-25 cursor-pointer font-semibold"
                            disabled={isSubmitting || !formData.descricao}
                            >
                        {isSubmitting ? "Salvando..." : "Salvar"}
                    </Button>
                </DialogFooter>

            </form>
            
        </DialogContent>
    )
}
