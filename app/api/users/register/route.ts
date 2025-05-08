import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  // Lê o corpo da requisição como JSON
  const { email, password, nome_completo, telefone, cpf_cnpj, c_tipo_usuario_id } = await req.json();

  try {
    // Verifique se o e-mail já está registrado
    const response = await fetch('http://145.223.121.165:3010/api/users/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (data.error) {
      return NextResponse.json({ error: 'Usuário já existe' }, { status: 400 });
    }

    // Criptografe a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crie o novo usuário via API externa
    const newUserResponse = await fetch('http://145.223.121.165:3010/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: hashedPassword,
        nome_completo,
        telefone,
        cpf_cnpj,
        c_tipo_usuario_id: parseInt(c_tipo_usuario_id, 10),
      }),
    });

    const newUserData = await newUserResponse.json();
    if (newUserResponse.ok) {
      return NextResponse.json({ message: 'Usuário criado com sucesso', user: newUserData }, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Erro ao cadastrar o usuário', details: newUserData }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao cadastrar o usuário' }, { status: 500 });
  }
}
