"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { Layout } from "@/components/layout"
import { StatsCards } from "@/components/stats-cards"
import { RecentInspectionsTable } from "@/components/recent-inspections-table"
import { InspectionChart } from "@/components/inspection-chart"
import { UpcomingInspections } from "@/components/upcoming-inspections"
import { VehicleDistributionChart } from "@/components/vehicle-distribution-chart"
import { FinancialSummary } from "@/components/financial-summary"

export function DashboardPage() {
  const [currentPage, setCurrentPage] = useState("dashboards")

  const router = useRouter()

  useEffect(() => {
      const token = Cookies.get("access_token")
      if (!token) {
        router.push("/users/login")
      }
      // Removidas as chamadas de fetch iniciais
    }, [])

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do sistema de vistorias e financeiro.</p>
        </div>

        <StatsCards />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <InspectionChart className="lg:col-span-4" />
          <RecentInspectionsTable className="lg:col-span-3" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <VehicleDistributionChart />
          <FinancialSummary />
        </div>

        <UpcomingInspections />
      </div>
    </Layout>
  )
}
