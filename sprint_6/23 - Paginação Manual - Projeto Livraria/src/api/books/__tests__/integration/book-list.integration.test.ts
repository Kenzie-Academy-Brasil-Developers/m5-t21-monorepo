import { prisma } from "../../../../configs/prisma.config";
import { apiClient } from "../../../@shared/tests/setupFiles";
import { BookFactory } from "../../factory";

describe("INTEGRATION: GET /api/books", () => {
  beforeAll(async () => {
    await prisma.book.deleteMany();
  });

  afterEach(async () => {
    await prisma.book.deleteMany();
  });

  test("should return an empty list when no books are available", async () => {
    const response = await apiClient.get("/api/books");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("should be able to list all books", async () => {
    // AAA (Arrange, Act, Assert)

    // Arrange - O que preciso para realizar esse teste?
    // const bookListData = Array.from({ length: 10 }, () => BookFactory.build());
    const bookListData = BookFactory.buildMany(10);
    await prisma.book.createMany({ data: bookListData });

    // Act - De fato realizo a operação que será testada na sequencia
    const response = await apiClient.get("/api/books");

    // Assert - Verificação(assert) do teste
    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      bookListData.map((book) => {
        return {
          id: expect.any(Number),
          ...book,
        };
      })
    );
  });
});
