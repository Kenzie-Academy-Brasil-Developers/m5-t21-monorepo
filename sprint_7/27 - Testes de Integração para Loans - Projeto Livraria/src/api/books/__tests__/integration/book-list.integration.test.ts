import { prisma } from "../../../../configs/prisma.config";
import { MAX_PER_PAGE_NUMBER } from "../../../@shared/pagination/pagination.middleware";
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
    expect(response.body.data).toEqual([]);
    expect(response.body.count).toBe(0);
    // expect(response.body.previousPage).toBe(null);
    expect(response.body.previousPage).toBeNull();
    expect(response.body.nextPage).toBeNull();
  });

  test("should be able to list all books", async () => {
    // AAA (Arrange, Act, Assert)

    // Arrange - O que preciso para realizar esse teste?
    const numberOfBooksToCreate = 20;
    const createdBooks = await BookFactory.createMany(numberOfBooksToCreate);
    const expectedReturnedBooks = createdBooks.slice(0, MAX_PER_PAGE_NUMBER);

    // Act - De fato realizo a operação que será testada na sequencia
    const response = await apiClient.get("/api/books");

    // Assert - Verificação(assert) do teste
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(MAX_PER_PAGE_NUMBER);
    expect(response.body.data).toEqual(
      expectedReturnedBooks.map((book) => ({ ...book }))
    );

    expect(response.body.count).toBe(numberOfBooksToCreate);
    expect(response.body.previousPage).toBeNull();
    expect(response.body.nextPage).toMatch(
      new RegExp(`\\?page=2&perPage=${MAX_PER_PAGE_NUMBER}`)
    );
  });
});

/* TODO: Casos de teste para paginação:
  - Caso em que não é passado nenhum page & perPage;
  - Caso em que só page é passado ->
    - page válido
    - page se encaixa na minha lógica (>= 1) ?
  - Caso em que só perPage é passado
    - perPage fora do limite
    - 1 < perPage < MAX_PER_PAGE
    - 
*/
