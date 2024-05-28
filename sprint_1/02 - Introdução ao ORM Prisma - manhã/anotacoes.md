# Diferenças entre frameworks para Backend

Express -> framework 'non opinionated' -> temos que criar a arquitetura (divisão de pastas e arquivos) manualmente

NestJS (utiliza express por baixo dos panos) -> framework 'opionated' -> Dá um caminho de organização e é mais restrito quanto a implementação das funcionalidades. Geralmente já criar uma estrutura propria de diretórios e conta com varios 'plugins' para operações recorrentes na construção de APIs (autenticação, segurança, roteamento, etc...)

# ORM (Object Relation Mapper)

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

## Comandos de terminal

Instalando o prisma:

```
// -D é uma frag equivalente a --save-dev. Salvará o pacote como dependencia de desenvolvimento
npm i -D prisma
```

Inicializar o prisma no projeto (rodar 1x no inicio de cada projeto)

```
npx prisma init
```

## Arquivo .env

Centralizar variáveis de ambiente, com dados sensíveis da aplicação.

CRIME INAFIANÇAVEL VERSIONAR ARQUIVO .env (sempre devem estar no .gitignore)
CRIME INAFIANÇAVEL VERSIONAR NODE_MODULES (sempre deve estar no .gitignore)

Deve também ser criado um arquivo `.env.example` que conterá **apenas o nome das variáveis de ambientes utilizadas, com um exemplo de valor e o que elas significam.**

.env (com os valores utilizados na aplicação, e estando no .gitignore)

```
DATABASE_URL="postgresql://chan:1234@localhost:5432/m5-t21?schema=public"
```

.env.example (com valores de EXEMPLO (não reais). Não deve ir no .gitignore)

```
// URL de conexão com o postgres
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

## Migrations

Todas as alterações estruturais precisam ser seguidas pela aplicação de uma migration. É como se fosse um 'commit' de versionamento do banco.

Aplicando uma migração:

```
npx prisma migrate dev
```

# Arquitetura

Forma com que diretórios e arquivos são organizados, além da forma com que eles se conversam.

## Controllers

- Lidar com as requisições HTTP e mapea-las para as funções apropriadas nos services.
- Intermediário entre o Client (quem faz a request) e a lógica de negócio (service)

## Services

- Lógica de negócio da aplicação
- Interage com a camada de dados (prisma)
- Processa os dados antes de retornar para o controller

### Comandos gerais de terminal para inicar um projeto TS express

Inicializa o package.json

```
npm init -y
```

Instalando pacotes

```
npm i --save-dev ts-node-dev typescript
```

Inicializando o tsconfig.json (arquivo de configuração com as regras que o TS aplicará no projeto)

```
npx tsc --init
```

Instalando express

```
npm i express
```

Instalando @types do express (tipagens do TS sempre como dependencia de desenvolvimento)

```
npm i --save-dev @types/express
```

# Moldando o formato dos dados

- Managers (gerentes)
  id
  name
  email
  createdAt
