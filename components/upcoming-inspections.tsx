import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, Calendar, MapPin, Clock, ChevronRight } from "lucide-react"

export function UpcomingInspections() {
  const upcomingInspections = [
    {
      id: "INS-001",
      vehicle: "Honda Civic 2020",
      plate: "ABC-1234",
      client: "João Silva",
      location: "Centro de Vistoria - Zona Sul",
      date: "Hoje, 14:30",
      status: "confirmed",
    },
    {
      id: "INS-002",
      vehicle: "Toyota Corolla 2021",
      plate: "DEF-5678",
      client: "Maria Oliveira",
      location: "Centro de Vistoria - Zona Norte",
      date: "Hoje, 16:00",
      status: "confirmed",
    },
    {
      id: "INS-003",
      vehicle: "Volkswagen Golf 2019",
      plate: "GHI-9012",
      client: "Pedro Santos",
      location: "Centro de Vistoria - Centro",
      date: "Amanhã, 09:15",
      status: "pending",
    },
    {
      id: "INS-004",
      vehicle: "Fiat Argo 2022",
      plate: "JKL-3456",
      client: "Ana Costa",
      location: "Centro de Vistoria - Zona Oeste",
      date: "Amanhã, 11:30",
      status: "pending",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Confirmado</Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">
            Pendente
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Próximas Vistorias</CardTitle>
          <CardDescription>Vistorias agendadas para hoje e amanhã.</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>Ver Agenda</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {upcomingInspections.map((inspection, index) => (
            <div
              key={index}
              className="group relative rounded-lg border p-4 hover:bg-muted/50 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="absolute right-4 top-4">{getStatusBadge(inspection.status)}</div>
              <div className="mb-2 flex items-center gap-2">
                <Car className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">{inspection.vehicle}</h3>
              </div>
              <div className="text-sm text-muted-foreground mb-1">
                <span className="font-medium text-foreground">Placa:</span> {inspection.plate}
              </div>
              <div className="text-sm text-muted-foreground mb-1">
                <span className="font-medium text-foreground">Cliente:</span> {inspection.client}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {inspection.location}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {inspection.date}
              </div>
              <Button variant="ghost" size="sm" className="mt-2 w-full justify-between">
                <span>Ver Detalhes</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
