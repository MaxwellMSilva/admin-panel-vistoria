"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function PaginaIndisponivel() {
  const router = useRouter()

  const handleVoltar = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="bg-red-500 p-4 flex justify-center">
          <AlertTriangle className="h-16 w-16 text-white" />
        </div>

        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Página Indisponível</h1>
          <p className="text-gray-600 mb-6">
            Esta página não está funcionando no momento. Por favor, retorne à página anterior.
          </p>

          <Button
            onClick={handleVoltar}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar à página anterior
          </Button>
        </div>
      </motion.div>

      <p className="text-gray-500 text-sm mt-8">Se o problema persistir, entre em contato com o suporte técnico.</p>
    </div>
  )
}
