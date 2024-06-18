# SP4

# Dia 1 - Injeção de Dependência Manual

S O L I D (POO) - Conceitos que visam criar sistemas mais fáceis de manter e expandir. É um acronimo. Desenvolvido pelo Robert C. Martin (uncle bob (clean arch, clean code))

1. Single Responsabily Principle - Uma classe deve ter apenas uma responsabilidade ou motivo para mudar.
2. Open/Closed Principle: As classes devem ser abertas para extensão (herança) mas fechadas para modificação.
3. Liskov Substituition Principle: Subtipos (classes filhas) devem ser substituiveis por seus tipos bases sem alterar o comportamento do programa.
4. Interface Segregation Principle: Muitas interfaces específicas são melhores do que uma interface geral
5. Dependency Inversion Principle (IoC) Inversão de Controle: Dependa de abstrações (interfaces), e não de implementações. Injeção de dependencia está associado diretamente com IoC.

# Dia 2 - Injeção de Dependência com Tsyringe

A biblioteca Tsyringe tem como objetivo facilitar a organização e gerenciamento das dependências em uma aplicação, fornecendo uma maneira simples e flexível de registrar, resolver e gerenciar objetos e suas dependências.

### Instalação

```bash
npm install tsyringe reflect-metadata
```

### Utilização

alterar tsconfig.json:

```typescript
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

importar reflect-metadata no topo do app.ts

```typescript
import "reflect-metadata";
```

## Modificações

- [] - Modificar a lógica de injeção de dependencia manual para a utilização do Tsyringe. Arquivos/classes modificados:
  - accounts:
  - [x] - Transformar `AccountService` em `@injectable`, utilizar a classe a partir de agora.
  - [x] - Registrar `AccountService` como singleton em `account/router.ts`
  - [x] - Transformar `AccountController` em `@injectable` e criar um construtor para receber o serviço por injeção de dependencia -
  - [x] - Criar uma instancia de `AccountController` em `account.router.ts` a partir do container do Tsyringe

## Níveis de conta:

Formas:

1. Utilizar enum para definir os diferentes níveis da conta.
2. Criar uma tabela de ROLES e associar com account 1:N (account : role)

Rotas:

- Recebendo a chave role na criação da conta.
  /accounts/nurse
  /accounts/doctor
  /accounts/lab-technician
