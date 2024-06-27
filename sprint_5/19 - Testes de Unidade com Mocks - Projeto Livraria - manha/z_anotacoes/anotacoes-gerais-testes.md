# Test Driven Development

TDD, ou Desenvolvimento Orientado a Testes (Test-Driven Development), é uma abordagem de desenvolvimento de software em que os testes automatizados são escritos antes mesmo do código de produção. O ciclo básico do TDD é geralmente composto por três etapas: "Red", "Green" e "Refactor" (em inglês, "Red", "Green", "Refactor").

- **Red**: Escrever um teste que falhe. Nesse ponto, nenhuma implementação ainda foi feita.
- **Green**: Fazer o teste recém criado passar. Isso envolve escrever a quantidade mínima de código de produção necessário para que o teste passe. A ênfase aqui é em escrever código que satisfaça as condições do teste e não necessariamente em escrever código otimizado ou completo.
- **Refactor**: Uma vez que o teste esteja passando, a etapa de "Refatoração" permite melhorar o código de produção. Isso pode envolver a eliminação de duplicações, melhoria da legibilidade do código, otimização de desempenho, entre outras ações. Durante esta etapa, todos os testes já escritos devem continuar passando para garantir que as mudanças não tenham introduzido regressões.

## Categorias de Testes

- **Testes de unidade (ou unitário)**:
  - Estes são os testes mais básicos e granulares.
  - Sua concepção é sobre verificar o comportamento de unidades individuais de código, como funções ou métodos, isoladamente do resto do sistema.
  - Os testes unitários são rápidos de serem executados e são ótimos para verificar pequenas partes do código, garantindo que cada unidade funcione corretamente.
- **Testes de Integração**:
  - Estes testes verificam a interação entre diferentes partes do sistema.
  - Eles garantem que os componentes individuais trabalhem juntos corretamente quando integrados.
  - Os testes de integração podem abranger várias unidades de código, módulos ou até mesmo sistemas externos.
- **Testes End-to-End (E2E)**:
  - Estes testes simulam o comportamento do usuário final, interagindo com o sistema como um todo.
  - Eles verificam o fluxo completo de uma funcionalidade, desde a entrada do usuário até a saída esperada.
  - Os testes E2E são executados em um ambiente semelhante ao de produção e testam a aplicação em sua totalidade.

## Pirâmide de Testes

A pirâmide de testes é um conceito que descreve a distribuição ideal dos diferentes tipos de testes em um projeto de software. Ela é representada visualmente como uma pirâmide, onde os testes unitários formam a base, os testes de integração ocupam o meio e os testes end-to-end (E2E) ficam no topo.

```
         /\
        /  \           (Testes End-to-End - E2E)
       /    \
      /______\
     /        \
    /          \       (Testes de Integração)
   /____________\
  /              \
 /                \    (Testes Unitários)
/__________________\
```

## Testes de Unidade

Testes de unidade são os testes mais básicos e granulares. Tem como objetivo verificiar o comportamento de unidades individuais de código, como funções/métodos isoladamente do resto do sistema.

**TESTES DE UNIDADE NAO INTERAGEM COM BANCO**

### Mocks

Um mock é um objeto que simula o comportamento de objetos reais de maneira controlada durante os testes. São usados para substituir partes do sistema que estão sendo testadas.
