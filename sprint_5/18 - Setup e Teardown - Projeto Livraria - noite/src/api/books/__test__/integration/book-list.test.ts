import { prisma } from "../../../../configs/prisma.config";
import { apiClient } from "../../../@shared/tests/setupFiles";
import { BookService } from "../../service";

describe("GET /api/books - Book list integration tests", () => {
  // SETUP / TEARDOWN

  // Executa 1x antes de todos os testes
  beforeAll(async () => {
    await prisma.book.deleteMany();
    // console.log(`
    // #####################
    //   beforeAll executado
    // #####################
    //   `);
  });

  // Executa 1x depois de todos os testes
  afterAll(() => {
    // console.log(`
    // #####################
    //   afterAll executado
    // #####################
    //   `);
  });

  // Executa 1x antes de cada testes
  beforeEach(() => {
    // console.log(`
    // #####################
    //   beforeEach executado
    // #####################
    //   `);
  });

  // Executa 1x depois de cada testes
  afterEach(async () => {
    // console.log(`
    // #####################
    //   afterEach executado
    // #####################
    //   `);
    await prisma.book.deleteMany();
  });

  test("should return an empty list when no books are available", async () => {
    const response = await apiClient.get("/api/books");

    expect(response.status).toBe(200);
    // TODO: Melhorar o teste para testar com registros retornados.
    expect(response.body).toEqual([]);
  });

  test("should be able to list all books", async () => {
    // AAA - (Arrange, Act, Assert)

    // ARRANGE - O que preciso para realizar ESTE teste
    // Preciso de livros criados no banco
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

    // ACT
    const response = await apiClient.get("/api/books");

    // ASSERT

    // response.status === 200 ?
    // expect(response.status).toBe(200);
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
