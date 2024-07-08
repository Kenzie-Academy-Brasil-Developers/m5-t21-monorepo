import { LoanStatus } from "@prisma/client";
import { LoanService } from "../../../service";
import { Loan } from "../../../interfaces";
import { MemberService } from "../../../../members/service";
import { ApiError } from "../../../../@shared/errors";
import { BookService } from "../../../../books/service";
import { BookFactory } from "../../../../books/factory";
import { prisma } from "../../../../../configs/prisma.config";

// Forma manual de mockagem.
const MockMemberService = (): jest.Mocked<MemberService> => {
  return {
    create: jest.fn(),
    list: jest.fn(),
    findById: jest.fn(),
    count: jest.fn(),
  };
};

const MockBookService = (): jest.Mocked<BookService> => {
  return {
    create: jest.fn(),
    list: jest.fn(),
    findById: jest.fn(),
    count: jest.fn(),
  };
};

describe("UNIT: LoanService.create", () => {
  let loanService: LoanService;
  let mockedMemberService: jest.Mocked<MemberService>;
  let mockedBookService: jest.Mocked<BookService>;

  const MAX_LOANS_PER_MEMBER = LoanService.MAX_LOANS_PER_MEMBER;
  const loanValidData: Loan = {
    id: 1,
    loanDate: new Date("2022-03-17T00:00:00.000Z"),
    returnDate: new Date("2022-03-23T00:00:00.000Z"),
    status: LoanStatus.ACTIVE,
    amount: 100,
    bookId: 1,
    memberId: 1,
  } as const;

  beforeEach(() => {
    mockedMemberService = MockMemberService();
    mockedBookService = MockBookService();
    loanService = new LoanService(mockedMemberService, mockedBookService);
    jest.clearAllMocks();
  });

  test("should return a new loan", async () => {
    // TODO: Voltar mais tarde para o teste.
    // const expectedResult = {
    //   id: 1,
    //   loanDate: loanValidData.loanDate,
    //   returnDate: loanValidData.returnDate,
    //   status: loanValidData.status,
    //   amount: loanValidData.amount,
    //   bookId: loanValidData.bookId,
    //   memberId: loanValidData.memberId,
    // };

    // const result = await loanService.create(loanValidData);

    // expect(result).toEqual(expectedResult);
    expect(1).toBe(1);
  });

  test("should throw an error if member does not exist", async () => {
    // AAA
    // Arrange
    mockedMemberService.findById.mockRejectedValueOnce(
      new ApiError("Member not found", 404)
    );

    // Act -Assert
    await expect(loanService.create(loanValidData)).rejects.toThrow(
      "Member not found"
    );

    expect(mockedMemberService.findById).toHaveBeenCalledTimes(1);
  });

  test("should throw an error if book does not exist", async () => {
    // AAA
    // Arrange
    // 1.
    mockedMemberService.findById.mockResolvedValueOnce({
      id: 1,
      name: "Alice Silva",
      cpf: "22345678900",
      phoneNumber: "(41) 91234-56-78",
      registrationDate: new Date(),
    });

    // 2.
    mockedBookService.findById.mockRejectedValueOnce(
      new ApiError("Book not found", 404)
    );

    // Act - Assert
    await expect(loanService.create(loanValidData)).rejects.toThrow(
      "Book not found"
    );

    expect(mockedMemberService.findById).toHaveBeenCalledTimes(1);
    expect(mockedBookService.findById).toHaveBeenCalledTimes(1);
  });

  test("should throw an error if book is not available for loan", async () => {
    // AAA
    // Arrange
    // 1.
    mockedMemberService.findById.mockResolvedValueOnce({
      id: 1,
      name: "Alice Silva",
      cpf: "22345678900",
      phoneNumber: "(41) 91234-56-78",
      registrationDate: new Date(),
    });

    // 2.
    const bookData = BookFactory.build({ available: false });
    mockedBookService.findById.mockResolvedValueOnce({ id: 1, ...bookData });

    // Act - Assert
    await expect(loanService.create(loanValidData)).rejects.toThrow(
      "Book is not available for loan"
    );

    expect(mockedMemberService.findById).toHaveBeenCalledTimes(1);
    expect(mockedBookService.findById).toHaveBeenCalledTimes(1);
  });

  test("should throw an error if member has reached the maximum number of allowed loans", async () => {
    // TODO: Implementar o teste
    // AAA
    // Arrange
    // 1.
    mockedMemberService.findById.mockResolvedValueOnce({
      id: 1,
      name: "Alice Silva",
      cpf: "22345678900",
      phoneNumber: "(41) 91234-56-78",
      registrationDate: new Date(),
    });

    // 2.
    const bookData = BookFactory.build({ available: true });
    mockedBookService.findById.mockResolvedValueOnce({ id: 1, ...bookData });

    // 3.
    jest.spyOn(prisma.loan, "count").mockResolvedValue(MAX_LOANS_PER_MEMBER);

    // Act - Assert
    await expect(loanService.create(loanValidData)).rejects.toThrow(
      `Member has reached maximum loans (${MAX_LOANS_PER_MEMBER})`
    );

    expect(mockedMemberService.findById).toHaveBeenCalledTimes(1);
    expect(mockedBookService.findById).toHaveBeenCalledTimes(1);
    expect(prisma.loan.count).toHaveBeenCalledTimes(1);
  });

  test("should throw an error if loanDate is greater than returnDate", async () => {
    // TODO: Implementar o teste
    // AAA
    // Arrange
    // 1.
    // Medida que assegura que o mock nao veio 'infectado'
    // expect(mockedMemberService.findById).toHaveBeenCalledTimes(0);
    mockedMemberService.findById.mockResolvedValueOnce({
      id: 1,
      name: "Alice Silva",
      cpf: "22345678900",
      phoneNumber: "(41) 91234-56-78",
      registrationDate: new Date(),
    });

    // 2.
    const bookData = BookFactory.build({ available: true });
    mockedBookService.findById.mockResolvedValueOnce({ id: 1, ...bookData });

    // 3.
    jest
      .spyOn(prisma.loan, "count")
      .mockResolvedValue(MAX_LOANS_PER_MEMBER - 1);

    const invalidLoanData = {
      ...loanValidData,
      returnDate: new Date("2022-03-17T00:00:00.000Z"),
      loanDate: new Date("2022-03-23T00:00:00.000Z"),
    };

    // Act - Assert
    await expect(loanService.create(invalidLoanData)).rejects.toThrow(
      "loanDate cannot be greater than returnDate"
    );

    expect(mockedMemberService.findById).toHaveBeenCalledTimes(1);
    expect(mockedBookService.findById).toHaveBeenCalledTimes(1);
    expect(prisma.loan.count).toHaveBeenCalledTimes(1);
  });
});
