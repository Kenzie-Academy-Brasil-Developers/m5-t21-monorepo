## Início Projeto Livraria

Sistema de gerenciamento de biblioteca, que inclui várias entidades e regras de negócios, como livros, membros, empréstimos de livros, devoluções e multas por atrasos.

### Modelagem de dados

Entidades e relacionamentos:

- Book:Loan (1:N) (obrigatório loan ter um bookId)
- Member:Loan (1:N) (obrigatório loan ter um memberId)
- Fine:Loan (1:1) (opcional, multa é aplicada apenas se o member devolveu o livro fora do prazo estipulado)

### Levantamento de requisitos (objetivos da aplicação)

- Deve ser possível:
  - Criar Livro
  - Listar Livros
  - Registrar Membro
  - Listar Membros
  - Emprestar Livro
  - Devolver Livro.
  - Listar Empréstimos
  - Listar Multas.

### Regras de negócio

1. O emprestimo só pode ser feito se o membro existir.
2. O emprestimo só pode ser feito se o livro existir e estiver disponível.
3. Um membro pode ter no máximo 3 empréstimos ativos.
4. O loanDate deve ser menor que o returnDate.
5. **_Desafio Extra:_** O tempo máximo de um emprestimo deve ser de 1 semana.
   Dica:

```js
> loanDate
2022-03-17T10:02:12.000Z
> returnDate
2022-03-23T15:23:11.000Z
> const interval = returnDate.getTime() - loanDate.getTime()
undefined
> interval
537659000
> interval / 1000 / 60 / 60 / 24 / 7
0.8889864417989418
```

### Representação de dinheiro

- NUNCA UTILIZAR FLOAT PARA REPRESENTAR DINHEIRO/MOEDA

- Posso utilizar o Decimal (Postgresl)
- Posso utilizar Int, representando o valor monetario na menor unidade possível da moeda. 100 -> 1 Real
