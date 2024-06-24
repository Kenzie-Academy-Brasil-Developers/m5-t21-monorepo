import { apiClient } from "../../../@shared/tests/setupFiles";

describe("GET /api/books - Book list integration tests", () => {
  test("should be able to list all books", async () => {
    const response = await apiClient.get("/api/books");

    expect(response.status).toBe(200);
    // TODO: Melhorar o teste para testar com registros retornados.
    expect(response.body).toEqual([]);
  });
});
