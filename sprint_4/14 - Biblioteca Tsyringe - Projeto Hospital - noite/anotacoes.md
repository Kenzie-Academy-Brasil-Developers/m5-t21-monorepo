# SP4

## Dia 1

S O L I D (POO) - Conceitos que visam criar sistemas mais fáceis de manter e expandir. É um acronimo:

1. Single responsability principle - Uma classe de ter apenas uma responsabilidade ou motivo para mudar.
2. Open/Closed principle: As classes devem ser abertas para extensão (herança) mas fechadas para modificação.
3. Liskov Substituition principle: Subtipos (classes filhas) devem ser substuiveis por seus tipos base (classes pai) sem alterar o comportamento do programa.
4. Interface Segregation principle: Muitas interfaces específicas são melhores do que uma interface geral.
5. Dependency Inversion principle (IoC) (Injeção de dependencia): Dependa de abstrações (interfaces) e não de implementações. Injeção de dependencia está associada diretamente com IoC.

## Dia 2 - Injeção de Dependência com Tsyringe

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
  - [] - Transformar `AccountService` em `@injectable`, utilizar a classe a partir de agora.
  - [] - Registrar `AccountService` como singleton em `account/router.ts`
  - [] - Transformar `AccountController` em `@injectable` e criar um construtor para receber o serviço por injeção de dependencia -
  - [] - Criar uma instancia de `AccountController` em `account.router.ts` a partir do container do Tsyringe

## Formas de criar níveis de acesso para uma conta.

1. Enum -> "DOCTOR" | "NURSE" | "LAB_TECHNICIAN".
2. Criar uma tabela expecifica de roles.

Roteamento:
/api/accounts/doctor
/api/accounts/nurse
/api/accounts/lab-technician

/api/accounts
{
...
"role": "DOCTOR"
}
