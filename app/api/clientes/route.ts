import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "../../../lib/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: {
        id: "asc",
      },
    })

    return NextResponse.json(clientes)
  } catch (error) {
    console.error("Erro ao buscar clientes:", error)
    return NextResponse.json({ error: "Erro ao buscar clientes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // if (!body.nome) {
    //   return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 })
    // }

    // const existe = await prisma.operador.findFirst({
    //   where: {
    //     nome: body.nome,
    //   },
    // })

    // if (existe) {
    //   return NextResponse.json({ error: "Já existe um operador com este nome" }, { status: 409 })
    // }

    const cliente = await prisma.cliente.create({
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
        numero_casa: body.numero_casa
      },
    })

    return NextResponse.json(cliente, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar cliente:", error)
    return NextResponse.json({ error: "Erro ao criar cliente" }, { status: 500 })
  }
}
