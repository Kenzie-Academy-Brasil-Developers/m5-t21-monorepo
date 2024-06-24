import { apiClient } from "../../../@shared/tests/setupFiles";

/*
  O ciclo básico do TDD é geralmente composto por três etapas (Red, Green, Refactor)
  - Rodando teste verificando o status code (RED)
  - Implementada a rota para retorno de status 201 (GREEN)
  - Refatoração para controller (REFACTOR)
*/

describe("GET /api/books - Book list integration tests", () => {
  test("should be able to list all books", async () => {
    const response = await apiClient.get("/api/books");

    expect(response.status).toBe(200);
    // TODO: Melhorar o teste para testar com registros retornados.
    expect(response.body).toEqual([]);
  });
});
