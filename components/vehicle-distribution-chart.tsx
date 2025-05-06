"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart } from "lucide-react"

export function VehicleDistributionChart() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Distribuição de Veículos</CardTitle>
          <CardDescription>Por fabricante e modelo.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex items-center justify-center">Carregando...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Distribuição de Veículos</CardTitle>
        <CardDescription>Por fabricante e modelo.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manufacturers">
          <TabsList className="mb-4">
            <TabsTrigger value="manufacturers">Fabricantes</TabsTrigger>
            <TabsTrigger value="models">Modelos</TabsTrigger>
            <TabsTrigger value="years">Anos</TabsTrigger>
          </TabsList>
          <TabsContent value="manufacturers" className="space-y-4">
            <div className="h-[250px] rounded-md bg-muted/40 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <PieChart className="h-4 w-4 mr-2" />
                <p className="text-muted-foreground">Distribuição por Fabricante</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary"></div>
                <span>Volkswagen (28%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span>Fiat (22%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span>Chevrolet (18%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span>Toyota (12%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                <span>Honda (10%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                <span>Outros (10%)</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="models" className="space-y-4">
            <div className="h-[250px] rounded-md bg-muted/40 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <PieChart className="h-4 w-4 mr-2" />
                <p className="text-muted-foreground">Distribuição por Modelo</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
          </TabsContent>
          <TabsContent value="years" className="space-y-4">
            <div className="h-[250px] rounded-md bg-muted/40 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <PieChart className="h-4 w-4 mr-2" />
                <p className="text-muted-foreground">Distribuição por Ano</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
