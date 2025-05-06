import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

export function FinancialSummary() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Resumo Financeiro</CardTitle>
          <CardDescription>Visão geral do módulo financeiro B2C.</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span>Detalhes</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue">
          <TabsList className="mb-4">
            <TabsTrigger value="revenue">Receita</TabsTrigger>
            <TabsTrigger value="contracts">Contratos</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
          </TabsList>
          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-muted/40">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-primary mr-1" />
                    <span className="text-2xl font-bold">R$ 45.890</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">+12%</span>
                    <span className="ml-1">vs. mês anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/40">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium">Faturas Pendentes</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold">R$ 12.450</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <TrendingDown className="h-3 w-3 text-primary mr-1" />
                    <span className="text-primary">+5%</span>
                    <span className="ml-1">vs. mês anterior</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Receita por Forma de Pagamento</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm w-24">Cartão</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <span className="text-sm ml-2 w-12 text-right">65%</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm w-24">Boleto</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                  <span className="text-sm ml-2 w-12 text-right">25%</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm w-24">Pix</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                  <span className="text-sm ml-2 w-12 text-right">10%</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="contracts" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-muted/40">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold">248</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">+8%</span>
                    <span className="ml-1">este mês</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/40">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium">Novos Contratos</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold">32</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">+15%</span>
                    <span className="ml-1">vs. mês anterior</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="plans" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Plano Básico</span>
                <span className="text-sm">42 assinantes</span>
                <span className="text-sm font-medium text-primary">R$ 8.400</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Plano Premium</span>
                <span className="text-sm">78 assinantes</span>
                <span className="text-sm font-medium text-primary">R$ 23.400</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Plano Empresarial</span>
                <span className="text-sm">15 assinantes</span>
                <span className="text-sm font-medium text-primary">R$ 14.250</span>
              </div>
            </div>
            <div className="h-[150px] rounded-md bg-muted/40 flex items-center justify-center relative overflow-hidden mt-2">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground">Distribuição de Planos</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
