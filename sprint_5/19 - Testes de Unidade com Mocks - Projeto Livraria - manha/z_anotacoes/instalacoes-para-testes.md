### Instalando o JEST

```
npm i -D jest @types/jest ts-jest
```

Inicializar o arquivo de configuração do jest:

```
npx jest --init
```

```
✔ Would you like to use Jest when running "test" script in "package.json"? … yes
✔ Would you like to use Typescript for the configuration file? … yes
✔ Choose the test environment that will be used for testing › node
✔ Do you want Jest to add coverage reports? … no
✔ Which provider should be used to instrument code for coverage? › v8
✔ Automatically clear mock calls, instances, contexts and results before every test? … no
```

Alterar `jest.config.ts`:

```typescript
// ...
preset: "ts-jest",
testMatch: "**/__tests__/(unit|integration)/**/*.test.[jt]s"
```

Instação do supertest (Para fazer testes que precisam de requisição)

```
npm i -D supertest @types/supertest
```

### Rodando apenas os testes de 1 arquivo

npm run test --findRelatedTests caminho-ate-o-arquivo-de-teste/book-create.test.ts

# Recomendações de Leitura

- [Regex - Expressões Regulares - MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_expressions)
