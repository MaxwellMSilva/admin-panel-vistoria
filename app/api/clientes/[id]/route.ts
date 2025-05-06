import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const cliente = await prisma.cliente.findFirst({
      where: { id },
    })

    if (!cliente) {
      return NextResponse.json({ error: "Cliente não encontrado", exists: false }, { status: 404 })
    }

    return NextResponse.json(cliente)
  } catch (error) {
    console.error("Erro ao buscar cliente:", error)
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 })
    }

    const body = await request.json()

    // Verificar se o cliente existe
    const cliente = await prisma.cliente.findUnique({
      where: { id },
    })

    if (!cliente) {
      return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 })
    }

    // Atualizar o cliente
    const updatedCliente = await prisma.cliente.update({
      where: { id },
      data: {
        nome_completo: body.nome_completo,
        cpf_cnpj: body.cpf_cnpj,
        rg: body.rg,
        telefone: body.telefone,
        rua: body.rua,
        email: body.email,
        cidade_id: body.cidade_id,
        cep: body.cep,
        bairro: body.bairro,
        numero_casa: body.numero_casa,
      },
    })

    return NextResponse.json(updatedCliente)
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error)
    return NextResponse.json({ error: "Erro ao atualizar cliente" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      const id = Number(params.id)
  
      if (isNaN(id)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 })
      }
  
      const cliente = await prisma.cliente.findUnique({
        where: { id },
      })
  
      if (!cliente) {
        return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 })
      }
  
      await prisma.cliente.delete({
        where: { id },
      })
  
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("Erro ao remover cliente:", error)
      return NextResponse.json({ error: "Erro ao remover cliente" }, { status: 500 })
    }
}
