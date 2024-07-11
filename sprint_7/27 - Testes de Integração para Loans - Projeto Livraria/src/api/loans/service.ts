import { LoanStatus } from "@prisma/client";
import { prisma } from "../../configs/prisma.config";
import { ApiError } from "../@shared/errors";
import { BookService } from "../books/service";
import { MemberService } from "../members/service";
import { ILoanService, Loan, LoanCreate } from "./interfaces";
import { injectable } from "tsyringe";

@injectable()
export class LoanService implements ILoanService {
  public static readonly MAX_LOANS_PER_MEMBER = 3;

  constructor(
    private memberService: MemberService,
    private bookService: BookService
  ) {}

  public create = async (payload: LoanCreate): Promise<Loan> => {
    await this.memberService.findById(payload.memberId);
    const book = await this.bookService.findById(payload.bookId);
    if (!book.available) {
      throw new ApiError("Book is not available for loan");
    }

    const loanCount = await prisma.loan.count({
      where: {
        memberId: payload.memberId,
        status: LoanStatus.ACTIVE,
      },
    });

    if (loanCount >= LoanService.MAX_LOANS_PER_MEMBER) {
      throw new ApiError(
        `Member has reached maximum loans (${LoanService.MAX_LOANS_PER_MEMBER})`
      );
    }

    if (payload.returnDate < payload.loanDate) {
      throw new ApiError("loanDate cannot be greater than returnDate");
    }

    const loan = await prisma.loan.create({ data: payload });

    await prisma.book.update({
      where: { id: payload.bookId },
      data: { available: false },
    });

    console.log(
      `Empréstimo ${loan.id} realizado com o livro ${payload.bookId} feito pelo membro ${payload.memberId}`
    );
    return loan;
  };
}
