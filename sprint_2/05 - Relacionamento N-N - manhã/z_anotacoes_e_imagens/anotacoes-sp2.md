# Sumário

- [Dia 1](#dia-1)

# Dia 1

## Tratamento de erros

Instalação express-async-errors

```bash
npm i express-async-errors
```

## Relacionamento N:N

Relacionamentos N:N **sempre** devem possuem uma tabela intermediária (pivô) que faz a ligação entre as duas principais (através das chaves estrangeiras), caracterizando um relacionamento N:N.

- No SQL puro, eu preciso criar manual essa tabela pivo.
- No prisma, se a tabela intermediária contiver apenas os apontamentos (FKs) entre as principais, eu nao preciso defini-la manualmente no schema, o proprio prisma a criará automaticamente pela definição de N:N entre as principais.
