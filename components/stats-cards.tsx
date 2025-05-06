import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Users, ClipboardCheck, DollarSign, TrendingUp } from "lucide-react"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="card-hover overflow-hidden border-none shadow-md dark:bg-gradient-to-br dark:from-card dark:to-[#2a3040]">
        <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Veículos</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
            <Car className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.842</div>
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-primary" />
            <span className="text-primary font-medium">+12%</span>
            <span className="ml-1">este mês</span>
          </div>
        </CardContent>
      </Card>
      <Card className="card-hover overflow-hidden border-none shadow-md dark:bg-gradient-to-br dark:from-card dark:to-[#2a3040]">
        <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
            <Users className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1.248</div>
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-primary" />
            <span className="text-primary font-medium">+8.3%</span>
            <span className="ml-1">este mês</span>
          </div>
        </CardContent>
      </Card>
      <Card className="card-hover overflow-hidden border-none shadow-md dark:bg-gradient-to-br dark:from-card dark:to-[#2a3040]">
        <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vistorias Realizadas</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
            <ClipboardCheck className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5.672</div>
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-primary" />
            <span className="text-primary font-medium">+15%</span>
            <span className="ml-1">este mês</span>
          </div>
        </CardContent>
      </Card>
      <Card className="card-hover overflow-hidden border-none shadow-md dark:bg-gradient-to-br dark:from-card dark:to-[#2a3040]">
        <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 45.890</div>
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-primary" />
            <span className="text-primary font-medium">+12%</span>
            <span className="ml-1">este mês</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
