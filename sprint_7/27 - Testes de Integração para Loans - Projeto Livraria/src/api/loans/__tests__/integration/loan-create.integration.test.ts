import { LoanStatus } from "@prisma/client";
import { prisma } from "../../../../configs/prisma.config";
import { apiClient } from "../../../@shared/tests/setupFiles";
import { LoanFactory } from "../../factory";
import { Loan } from "../../interfaces";
import { BookFactory } from "../../../books/factory";
import { MemberFactory } from "../../../members/factory";

describe("INTEGRATION: POST /api/loans", () => {
  const endpoint = "/api/loans";

  beforeEach(async () => {
    await prisma.loan.deleteMany();
    await prisma.member.deleteMany();
    await prisma.book.deleteMany();
  });

  test("should be able to create a loan with valid data", async () => {
    // Arrange
    // O que é necessário para testar o endpoint ?
    // 1. Criar um available book
    const book = await BookFactory.create({ available: true });
    // 2. Criar um member
    const member = await MemberFactory.create();

    const { status, ...validLoanCreateData } = LoanFactory.build({
      bookId: book.id,
      memberId: member.id,
    });

    const response = await apiClient.post(endpoint).send(validLoanCreateData);

    //
    const expectedResponseBody = {
      id: expect.any(Number),
      status: LoanStatus.ACTIVE,
      ...validLoanCreateData,
      loanDate: validLoanCreateData.loanDate.toISOString(),
      returnDate: validLoanCreateData.returnDate.toISOString(),
    };

    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(201);

    const loanCount = await prisma.loan.count();
    expect(loanCount).toBe(1);

    const loanedBook = await prisma.book.findUnique({ where: { id: book.id } });
    expect(loanedBook?.available).toBe(false);
  });

  test("should return an error if creating a loan without required fields", async () => {
    const response = await apiClient.post(endpoint).send({});

    const expectedResponseBody = {
      details: [
        {
          field: ["returnDate"],
          message: "Invalid date",
        },
        {
          field: ["amount"],
          message: "Required",
        },
        {
          field: ["bookId"],
          message: "Required",
        },
        {
          field: ["memberId"],
          message: "Required",
        },
      ],
    };

    expect(response.body).toStrictEqual(expectedResponseBody);
    expect(response.status).toBe(400);

    const loanCount = await prisma.loan.count();
    expect(loanCount).toBe(0);
  });

  test("should return an error if book does not exist", async () => {
    const member = await MemberFactory.create();

    const validLoanCreateData = LoanFactory.build({
      bookId: 1,
      memberId: member.id,
    });

    const response = await apiClient.post(endpoint).send(validLoanCreateData);

    const expectedResponseBody = {
      details: "Book not found",
    };

    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(404);

    const loanCount = await prisma.loan.count();
    expect(loanCount).toBe(0);
  });

  test("should return an error if members does not exist", async () => {
    const book = await BookFactory.create({ available: true });

    const validLoanCreateData = LoanFactory.build({
      bookId: book.id,
      memberId: 1,
    });

    const response = await apiClient.post(endpoint).send(validLoanCreateData);

    const expectedResponseBody = {
      details: "Member not found",
    };

    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(404);

    const loanCount = await prisma.loan.count();
    expect(loanCount).toBe(0);
  });
});
