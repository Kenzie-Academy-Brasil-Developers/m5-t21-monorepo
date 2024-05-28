# ORM (Object Relational Mapper)

Funcionará como um 'tradutor' de JS -> SQL / SQL -> JS

- Prisma ORM
- Drizzle
- TypeORM
- Sequelize

Bancos SQL

- Postgres (sql)
- MySQL (sql)
- SQLServer (sql)
- SQLite3 (sql)

# Arquitetura (forma de organização de diretórios e responsabilidades de arquivos/classes/funções)

- MVC (Model View Controller)
- Arquitetura Limpa / Design Patterns

## Serviço

- Lógica de negócio (regras)
- Interage com a camada de dados (prisma)
- Processa os dados antes de retornar para o controller

## Controlador

- Lidar com as requisições HTTP e mapeá-las para as funções apropriadas nos serviços
- Intermediário entre o CLient (quem faz a request) entre a lógica de negócio (services)

# Variáveis de Ambiente

Ilegal versionar arquivo .env (tem informações sensível da aplicação)

# Inicializar o package.json

```
npm init -y
npm i express
```

```
npm i -D typescript
npm i -D ts-node-dev
npm i --save-dev @types/express
```

Instalando prisma

```
npm i -D prisma
npx prisma migrate dev
```
