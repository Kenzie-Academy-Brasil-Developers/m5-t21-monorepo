import { prisma } from "../../../../configs/prisma.config";
import { apiClient } from "../../../@shared/tests/setupFiles";

/*
  SETUP - O que preciso para testar a criação de um livro?
    - Forma de realizar requisição para a api (supertest [apiClient])
    - Dados sobre o livro para ser enviado no body do post
  TEARDOWN - O que preciso fazer após testar a criação de um livro?
    - Deletar o livro criado para que não interfira em outros testes.
*/

describe("INTEGRATION: GET /api/books - Book list tests", () => {
  // SETUP (executado antes de algo)
  // Executa apenas 1x pela suite de testes do describe que ele está inserido antes de todos os testes
  beforeAll(async () => {
    await prisma.book.deleteMany();
  });

  beforeEach(async () => {
    await prisma.book.deleteMany();
  });

  // TEAR DOWN (executado depois de algo)
  // Executa depois de cada teste do describe
  afterEach(async () => {
    await prisma.book.deleteMany();
  });

  afterAll(async () => {
    await prisma.book.deleteMany();
  });

  test("should return an empty list when no books are available", async () => {
    const response = await apiClient.get("/api/books");

    expect(response.status).toBe(200);
    // TODO: Melhorar o teste para testar com registros retornados.
    expect(response.body).toEqual([]);
  });

  test("should be able to list all books", async () => {
    // AAA (Arrange, Act, Assert)

    // Arrange - O que preciso para realizar esse teste?
    // Preciso que existam livros na base de dados
    const bookListData = [
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publicationYear: 1960,
        available: true,
      },
      {
        title: "1984",
        author: "George Orwell",
        publicationYear: 1949,
        available: false,
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publicationYear: 1925,
        available: true,
      },
    ];
    await prisma.book.createMany({ data: bookListData });

    // Act - De fato realizo a operação que será testada na sequencia
    const response = await apiClient.get("/api/books");

    // Assert - Verificação(assert) do teste
    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      bookListData.map((book) => {
        return {
          id: expect.any(Number),
          title: book.title,
          author: book.author,
          publicationYear: book.publicationYear,
          available: book.available,
        };
      })
    );
  });
});
