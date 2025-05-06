-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_completo" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cidade_id" INTEGER NOT NULL,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "numero_casa" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
