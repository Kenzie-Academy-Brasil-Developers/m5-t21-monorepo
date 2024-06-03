# Sumário

- [Dia 1](#dia-1)
- [Dia 2](#dia-2)
- [Dia 3](#dia-3)
- [Dia 4](#dia-4)

# Dia 1

## Comandos gerais de terminal para inicar um projeto TS express

Inicializa o package.json

```bash
npm init -y
```

Instalando pacotes

```bash
npm i --save-dev ts-node-dev typescript
```

Inicializando o tsconfig.json (arquivo de configuração com as regras que o TS aplicará no projeto)

```bash
npx tsc --init
```

# Moldando o formato dos dados

- Managers (gerentes)
  id
  name
  email

Instalando express

```bash
npm i express
```

Instalando @types do express (tipagens do TS sempre como dependencia de desenvolvimento)

```bash
npm i --save-dev @types/express
```

# Arquitetura (explicada na demo do dia 2)

Forma com que diretórios e arquivos são organizados, além da forma com que eles se conversam.

## Controllers

- Lidar com as requisições HTTP e mapea-las para as funções apropriadas nos services.
- Intermediário entre o Client (quem faz a request) e a lógica de negócio (service)

## Services

- Lógica de negócio da aplicação
- Interage com a camada de dados (prisma)
- Processa os dados antes de retornar para o controller

# Dia 2

## ORM (Object Relation Mapper)

Será um tradutor de código SQL -> JS e JS -> SQL
Posso usar qualquer banco de dados:

- Postgres (SQL)
- MySQL (SQL)
- SQLServer (SQL)
- SQLite3 (SQL)
- MongoDB (NoSQL) -> ORM -> ODM (Object Document Mapper)

Outros ORMs conhecidos do ecosistema do NodeJS:

- TypeORM
- Sequelize
- Drizzle

## Diferenças entre frameworks para Backend

Express -> framework 'non opinionated' -> temos que criar a arquitetura (divisão de pastas e arquivos) manualmente

NestJS (utiliza express por baixo dos panos) -> framework 'opinionated' -> Dá um caminho de organização e é mais restrito quanto a implementação das funcionalidades. Geralmente já criar uma estrutura propria de diretórios e conta com varios 'plugins' para operações recorrentes na construção de APIs (autenticação, segurança, roteamento, etc...)

## Comandos de terminal

Instalando o prisma:

```bash
# -D é uma frag equivalente a --save-dev. Salvará o pacote como dependencia de desenvolvimento
npm i -D prisma
```

Inicializar o prisma no projeto (rodar 1x no inicio de cada projeto)

```bash
npx prisma init
```

## Variáveis de Ambiente (.env)

Variáveis de ambiente são variáveis locais associadas a máquina que está rodando o servidor.
O arquivo `.env` server para centralizar variáveis de ambiente, com dados sensíveis da aplicação.

- **_CRIME INAFIANÇAVEL VERSIONAR ARQUIVO .env (sempre devem estar no .gitignore)_**
- **_CRIME INAFIANÇAVEL VERSIONAR NODE_MODULES (sempre deve estar no .gitignore)_**

Deve também ser criado um arquivo `.env.example` que conterá **apenas o nome das variáveis de ambientes utilizadas, com um exemplo de valor e o que elas significam.**

`.env` (com os valores utilizados na aplicação, e estando no .gitignore)

```bash
DATABASE_URL="postgresql://chan:1234@localhost:5432/m5-t21?schema=public"
```

`.env.example` (com valores de EXEMPLO (não reais). Não deve ir no .gitignore)

```bash
// URL de conexão com o postgres
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

## Migrations

Todas as alterações estruturais precisam ser seguidas pela aplicação de uma migration. É como se fosse um 'commit' de versionamento do banco.

Aplicando uma migração:

```bash
npx prisma migrate dev
```

# Dia 3

## Passando migrate para o script do package.json

```json
"scripts": {
  "dev": "tsnd --cls src/app.ts",
  "migrate": "prisma migrate dev",
}
```

Prisma Studio

É um recurso embutido do prisma para interagir com o banco através do navegador.

```
npx prisma studio
```

## Relacionamentos 1:1 e 1:N

- Relacionamento 1-N -> Chave estrangeira SEMPRE do lado N da relação.
- Relacionamento 1-1 -> Preciso avaliar onde colocar a chave estrangeira com a
  regra de negócio do projeto. A diferença do 1-1 do 1-N é que o 1-1 tem a chave estrangeira
  UNICA, definindo que um registro X pode ser associado a somente 1 registro Y, e um registro Y pode
  ser associado apenas a 1 registro X.

# Dia 4

Sempre pensar em formar de quebrar a lógica da sua aplicação:

- Como quebrar a rota POST /managers ?
  - Enviar um body vazio (tenho chaves obrigatórias que DEVEM ser passadas no body de um POST).
  - Enviar um body com chaves corretas mas tipos incorretos.
  - Enviar um body com a chave name com mais de 20 caracteres.
  - Enviar chaves a mais do que a table comporta

O zod lidará com a validação de entrada de body da nossa aplicação:

```bash
npm i zod
```
