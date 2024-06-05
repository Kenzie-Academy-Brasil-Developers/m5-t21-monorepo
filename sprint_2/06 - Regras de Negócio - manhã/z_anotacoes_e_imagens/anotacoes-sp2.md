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

# Dia 2

Como quebrar a criação de uma task (fora as validações do ZOD)

- enviar um projectId que nao exista no DB.
- enviar um devId que nao exista no DB.

- Regras de negócio

- Só posso associar uma task a um dev que faz parte do projeto da task.

- Ajustar maximo do int de id nos schemas.
  Error occurred during query execution:
  ConnectorError(ConnectorError { user_facing_error: None, kind: QueryError(Error { kind: ToSql(0), cause: Some(Error { kind: ConversionError("Unable to fit integer value '10000000000' into an INT4 (32-bit signed integer)."), original_code: None, original_message: None }) }), transient: false })
