import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RecentActivityTableProps {
  className?: string
}

export function RecentActivityTable({ className }: RecentActivityTableProps) {
  const activities = [
    {
      user: {
        name: "João Silva",
        email: "joao@exemplo.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "comprou",
      target: "iPhone 13 Pro",
      date: "há 2 minutos",
      amount: "R$ 5.999,00",
      status: "success",
    },
    {
      user: {
        name: "Maria Oliveira",
        email: "maria@exemplo.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "assinou",
      target: "Plano Premium",
      date: "há 15 minutos",
      amount: "R$ 49,90",
      status: "success",
    },
    {
      user: {
        name: "Pedro Santos",
        email: "pedro@exemplo.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "cancelou",
      target: "Pedido #45678",
      date: "há 1 hora",
      amount: "R$ 349,00",
      status: "error",
    },
    {
      user: {
        name: "Ana Costa",
        email: "ana@exemplo.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "devolveu",
      target: "Fone de Ouvido",
      date: "há 3 horas",
      amount: "R$ 199,90",
      status: "warning",
    },
    {
      user: {
        name: "Carlos Mendes",
        email: "carlos@exemplo.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "adicionou",
      target: "Novo Endereço",
      date: "há 5 horas",
      amount: "-",
      status: "info",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Concluído</Badge>
        )
      case "error":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">Cancelado</Badge>
      case "warning":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">
            Pendente
          </Badge>
        )
      case "info":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">Informação</Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className={cn(className, "border-none shadow-md")}>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>Últimas 5 atividades no sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 rounded-lg transition-colors hover:bg-muted/50 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Avatar className="h-10 w-10 border-2 border-primary/10">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback className="bg-primary/10 text-primary">{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                  <div className="ml-auto">{getStatusBadge(activity.status)}</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.action} <span className="font-medium text-foreground">{activity.target}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{activity.amount}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
