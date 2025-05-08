export async function cadastrarModelo(descricao: string) {
  try {
    const response = await fetch('http://localhost:3000/api/v1/v_modelos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer <YOUR_TOKEN>', // Substitua pelo seu token
      },
      body: new URLSearchParams({
        'v_modelo[descricao]': descricao,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar modelo');
    }

    const data = await response.json();
    return data; // Retorne os dados do novo modelo criado
  } catch (error) {
    console.error('Erro ao criar modelo:', error);
  }
}
