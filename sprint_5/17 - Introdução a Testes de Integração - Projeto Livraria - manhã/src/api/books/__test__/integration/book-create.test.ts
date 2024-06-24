import { prisma } from "../../../../configs/prisma.config";
import { apiClient } from "../../../@shared/tests/setupFiles";

/*
  O ciclo básico do TDD é geralmente composto por três etapas (Red, Green, Refactor). 
  Testes devem ser INDEPENDENTES.
  - Rodando teste verificando o status code (RED)
  - Implementada a rota para retorno de status 201 (GREEN)
  - Refatoração para controller (REFACTOR)
  - Rodando o teste novamente, ele assegura o comportamento esperado (GREEN).

  Caso o teste falhe após a refatoração, continuo seguindo o mesmo principio,
   voltando para o trecho alterado e verificando o que houve para uma nova refatoração
   que faça o teste passar.


  SETUP - O que preciso para testar a criação de um livro?
    - Forma de realizar requisição para a api (supertest [apiClient])
    - Dados sobre o livro para ser enviado no body do post
  TEARDOWN - O que preciso fazer após testar a criação de um livro?
    - Deletar o livro criado para que não interfira em outros testes.
*/

describe("POST /api/books - Book creation integration tests", () => {
  afterEach(async () => {
    await prisma.book.deleteMany();
  });

  test("should be able to create a book", async () => {
    // SETUP
    const bookData = {
      title: "Titulo Teste",
      author: "Autor Teste",
      publicationYear: 2023,
      available: true,
    };

    const response = await apiClient.post("/api/books").send(bookData);

    const expectedResponseBody = {
      id: expect.any(Number),
      title: bookData.title,
      author: bookData.author,
      publicationYear: bookData.publicationYear,
      available: bookData.available,
    };

    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(201);
  });

  test("should return an error if creating a book with empty body", async () => {
    const response = await apiClient.post("/api/books").send({});

    // const expectedResponseBody = {
    //   id: expect.any(Number),
    //   title: bookData.title,
    //   author: bookData.author,
    //   publicationYear: bookData.publicationYear,
    //   available: bookData.available,
    // };

    expect(response.status).toBe(400);
    // expect(response.body).toEqual(expectedResponseBody);
  });
});
