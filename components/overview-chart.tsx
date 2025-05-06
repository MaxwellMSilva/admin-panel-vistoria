"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Download, BarChart2, LineChart, PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

interface OverviewChartProps {
  className?: string
}

export function OverviewChart({ className }: OverviewChartProps) {
  const [mounted, setMounted] = useState(false)
  const [chartType, setChartType] = useState("line")

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className={cn(className, "border-none shadow-md")}>
        <CardHeader>
          <CardTitle>Visão Geral</CardTitle>
          <CardDescription>Visualize o desempenho do seu negócio.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">Carregando...</div>
        </CardContent>
      </Card>
    )
  }

  const ChartIcon = () => {
    switch (chartType) {
      case "line":
        return <LineChart className="h-4 w-4" />
      case "bar":
        return <BarChart2 className="h-4 w-4" />
      case "pie":
        return <PieChart className="h-4 w-4" />
      default:
        return <LineChart className="h-4 w-4" />
    }
  }

  return (
    <Card className={cn(className, "border-none shadow-md")}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Visão Geral</CardTitle>
          <CardDescription>Visualize o desempenho do seu negócio.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Filtrar</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue" className="space-y-4">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="revenue">Receita</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
            </TabsList>
            <div className="flex gap-1 rounded-md border p-1">
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setChartType("line")}
              >
                <LineChart className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "ghost"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setChartType("bar")}
              >
                <BarChart2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant={chartType === "pie" ? "default" : "ghost"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setChartType("pie")}
              >
                <PieChart className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <TabsContent value="revenue" className="space-y-4">
            <div className="h-[300px] rounded-md bg-muted/40 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <ChartIcon />
                <p className="ml-2 text-muted-foreground">Gráfico de Receita</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <div className="h-[300px] rounded-md bg-muted/40 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <ChartIcon />
                <p className="ml-2 text-muted-foreground">Gráfico de Usuários</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
          </TabsContent>
          <TabsContent value="orders" className="space-y-4">
            <div className="h-[300px] rounded-md bg-muted/40 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <ChartIcon />
                <p className="ml-2 text-muted-foreground">Gráfico de Pedidos</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
