import { prisma } from "../../../../configs/prisma.config";
import { apiClient } from "../../../@shared/tests/setupFiles";

describe("INTEGRATION: POST /api/members", () => {
  beforeAll(async () => {
    await prisma.member.deleteMany();
  });

  afterEach(async () => {
    await prisma.member.deleteMany();
  });

  test("should be able to create a member with valid data", async () => {
    // AAA

    // Arrange
    const memberData = {
      name: "Alice Silva",
      cpf: "22345678900",
      phoneNumber: "(41) 91234-56-78",
    };

    // Act
    const response = await apiClient.post("/api/members").send(memberData);

    const expectedResponseBody = {
      id: expect.any(Number),
      name: memberData.name,
      cpf: memberData.cpf,
      phoneNumber: memberData.phoneNumber,
      registrationDate: expect.any(String),
    };

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedResponseBody);

    const memberCount = await prisma.member.count();
    expect(memberCount).toBe(1);
  });

  test("should return an error if creating a member without required fields", async () => {
    // AAA

    // Arrange
    const expectedResponseBody = {
      details: [
        {
          field: ["name"],
          message: "Required",
        },
        {
          field: ["cpf"],
          message: "Required",
        },
        {
          field: ["phoneNumber"],
          message: "Required",
        },
      ],
    };

    // Act
    const response = await apiClient.post("/api/members").send({});

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedResponseBody);

    const memberCount = await prisma.member.count();
    expect(memberCount).toBe(0);
  });

  test("should return an error if creating a member with duplicated cpf", async () => {
    // AAA
    // Arrange (Preciso de 1 registro adicionado anteriormente no banco)
    const memberData = {
      name: "Alice Silva",
      cpf: "22345678900",
      phoneNumber: "(41) 91234-56-78",
    };

    await prisma.member.create({ data: memberData });

    // Act
    const response = await apiClient.post("/api/members").send(memberData);

    const expectedResponseBody = {
      details: "Cpf already used",
    };

    // Assert
    expect(response.status).toBe(409);
    expect(response.body).toEqual(expectedResponseBody);

    const memberCount = await prisma.member.count();
    expect(memberCount).toBe(1);
  });
});
