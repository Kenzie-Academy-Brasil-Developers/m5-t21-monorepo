import { prisma } from "../../../../configs/prisma.config";
import { apiClient } from "../../../@shared/tests/setupFiles";

/*
  TODO:
  - Testar com body com chaves corretas, mas com valores de types errados
*/

describe("INTEGRATION: POST /api/books", () => {
  // SETUP
  beforeAll(async () => {
    await prisma.book.deleteMany();
  });

  beforeEach(async () => {
    await prisma.book.deleteMany();
  });

  // TEARDOWN
  afterEach(async () => {
    await prisma.book.deleteMany();
  });

  afterAll(async () => {
    await prisma.book.deleteMany();
  });

  test("should be able to create a book with valid data", async () => {
    // SETUP

    // Mock de objeto
    const bookData = {
      title: "Titulo Teste",
      author: "Autor Teste",
      publicationYear: 2023,
      available: false,
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

    /* TODO:
      - Como assegurar se o dado realmente foi criado no banco?
        - Além do retorno de status code e body, preciso assegurar que o 
        registro foi criado no banco.
    */

    //  SELECT COUNT() FROM "books";
    const bookCount = await prisma.book.count();
    expect(bookCount).toBe(1);
  });

  test("should return an error if creating a book without required fields", async () => {
    const response = await apiClient.post("/api/books").send({});

    const expectedResponseBody = {
      details: [
        {
          field: ["title"],
          message: "Required",
        },
        {
          field: ["author"],
          message: "Required",
        },
        {
          field: ["publicationYear"],
          message: "Required",
        },
      ],
    };

    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(400);

    const bookCount = await prisma.book.count();
    expect(bookCount).toBe(0);
  });

  test("should return an error if creating a book with an empty title", async () => {
    const bookData = {
      title: "",
      author: "Autor Teste",
      publicationYear: 2023,
      available: false,
    };

    const response = await apiClient.post("/api/books").send(bookData);

    const expectedResponseBody = {
      details: [
        {
          field: ["title"],
          message: "String must contain at least 1 character(s)",
        },
      ],
    };

    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(400);

    const bookCount = await prisma.book.count();
    expect(bookCount).toBe(0);
  });

  test("should return an error if creating a book with a title longer than 255 chars", async () => {
    const longTitle = "a".repeat(256);
    const bookData = {
      title: longTitle,
      author: "Autor Teste",
      publicationYear: 2023,
      available: false,
    };

    const response = await apiClient.post("/api/books").send(bookData);

    const expectedResponseBody = {
      details: [
        {
          field: ["title"],
          message: "String must contain at most 255 character(s)",
        },
      ],
    };

    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(400);

    const bookCount = await prisma.book.count();
    expect(bookCount).toBe(0);
  });

  test("should return an error if creating a book with an empty author", async () => {
    const bookData = {
      title: "Book Test",
      author: "",
      publicationYear: 2023,
      available: false,
    };

    const response = await apiClient.post("/api/books").send(bookData);

    const expectedResponseBody = {
      details: [
        {
          field: ["author"],
          message: "String must contain at least 1 character(s)",
        },
      ],
    };

    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(400);

    const bookCount = await prisma.book.count();
    expect(bookCount).toBe(0);
  });

  test("should return an error if creating a book with a author longer than 100 chars", async () => {
    const longAuthor = "a".repeat(101);
    const bookData = {
      title: "Book Test",
      author: longAuthor,
      publicationYear: 2023,
      available: false,
    };

    const response = await apiClient.post("/api/books").send(bookData);

    const expectedResponseBody = {
      details: [
        {
          field: ["author"],
          message: "String must contain at most 100 character(s)",
        },
      ],
    };

    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(400);

    const bookCount = await prisma.book.count();
    expect(bookCount).toBe(0);
  });

  test("should return an error if creating a book with a negative/zero publicationYear", async () => {
    const bookData = {
      title: "Book Test",
      author: "Author Test",
      publicationYear: -100,
      available: false,
    };

    const response = await apiClient.post("/api/books").send(bookData);

    const expectedResponseBody = {
      details: [
        {
          field: ["publicationYear"],
          message: "Number must be greater than 0",
        },
      ],
    };

    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(400);

    const bookCount = await prisma.book.count();
    expect(bookCount).toBe(0);
  });

  test("should be able to create a book with `available` field default to true if not specified", async () => {
    const bookData = {
      title: "Book Test",
      author: "Author Test",
      publicationYear: 2023,
    };

    const response = await apiClient.post("/api/books").send(bookData);

    const expectedResponseBody = {
      id: expect.any(Number),
      title: bookData.title,
      author: bookData.author,
      publicationYear: bookData.publicationYear,
      available: true,
    };

    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(201);

    const bookCount = await prisma.book.count();
    expect(bookCount).toBe(1);
  });
});
