import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    console.log('Requisição recebida:', req.method);

    try {
        const body = await req.json();
        const { email, password } = body;

        console.log('Email:', email);
        console.log('Password:', password);

        // Fazer a requisição para a API externa de login
        const response = await fetch('http://145.223.121.165:3010/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json({ access_token: data.access_token });
        } else {
            return NextResponse.json({ message: 'Erro ao fazer login' }, { status: 400 });
        }
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return NextResponse.json({ message: 'Erro ao processar a requisição' }, { status: 500 });
    }
}
