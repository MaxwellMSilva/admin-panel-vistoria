import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Car } from "lucide-react"

interface RecentInspectionsTableProps {
  className?: string
}

export function RecentInspectionsTable({ className }: RecentInspectionsTableProps) {
  const inspections = [
    {
      vehicle: {
        model: "Toyota Corolla",
        year: "2020",
        plate: "ABC-1234",
        image: "/placeholder.svg?height=32&width=32",
      },
      inspector: "João Silva",
      date: "há 15 minutos",
      status: "completed",
      result: "aprovado",
    },
    {
      vehicle: {
        model: "Honda Civic",
        year: "2019",
        plate: "DEF-5678",
        image: "/placeholder.svg?height=32&width=32",
      },
      inspector: "Maria Oliveira",
      date: "há 45 minutos",
      status: "completed",
      result: "reprovado",
    },
    {
      vehicle: {
        model: "Volkswagen Golf",
        year: "2021",
        plate: "GHI-9012",
        image: "/placeholder.svg?height=32&width=32",
      },
      inspector: "Pedro Santos",
      date: "há 1 hora",
      status: "in-progress",
      result: "pendente",
    },
    {
      vehicle: {
        model: "Fiat Argo",
        year: "2022",
        plate: "JKL-3456",
        image: "/placeholder.svg?height=32&width=32",
      },
      inspector: "Ana Costa",
      date: "há 2 horas",
      status: "scheduled",
      result: "agendado",
    },
    {
      vehicle: {
        model: "Hyundai HB20",
        year: "2018",
        plate: "MNO-7890",
        image: "/placeholder.svg?height=32&width=32",
      },
      inspector: "Carlos Mendes",
      date: "há 3 horas",
      status: "completed",
      result: "aprovado",
    },
  ]

  const getStatusBadge = (status: string, result: string) => {
    switch (status) {
      case "completed":
        if (result === "aprovado") {
          return (
            <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Aprovado</Badge>
          )
        } else {
          return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">Reprovado</Badge>
        }
      case "in-progress":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">Em Andamento</Badge>
        )
      case "scheduled":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">
            Agendado
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className={cn(className, "border-none shadow-md")}>
      <CardHeader>
        <CardTitle>Vistorias Recentes</CardTitle>
        <CardDescription>Últimas 5 vistorias realizadas.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {inspections.map((inspection, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 rounded-lg transition-colors hover:bg-muted/50 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-primary/10">
                  <AvatarImage src={inspection.vehicle.image} alt={inspection.vehicle.model} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {inspection.vehicle.model.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-background flex items-center justify-center">
                  <Car className="h-3 w-3 text-primary" />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <p className="text-sm font-medium leading-none">
                    {inspection.vehicle.model} ({inspection.vehicle.year})
                  </p>
                  <div className="ml-auto">{getStatusBadge(inspection.status, inspection.result)}</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Placa: <span className="font-medium text-foreground">{inspection.vehicle.plate}</span> • Vistoriador:{" "}
                  <span className="font-medium text-foreground">{inspection.inspector}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{inspection.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
