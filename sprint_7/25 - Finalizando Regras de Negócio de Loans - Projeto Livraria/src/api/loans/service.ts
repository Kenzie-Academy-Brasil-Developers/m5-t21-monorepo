import { LoanStatus } from "@prisma/client";
import { prisma } from "../../configs/prisma.config";
import { ApiError } from "../@shared/errors";
import { BookService } from "../books/service";
import { MemberService } from "../members/service";
import { ILoanService, Loan, LoanCreate } from "./interfaces";

export class LoanService implements ILoanService {
  public static readonly MAX_LOANS_PER_MEMBER = 3;

  constructor(
    private memberService: MemberService,
    private bookService: BookService
  ) {}

  public create = async (payload: LoanCreate): Promise<Loan> => {
    // 1. O emprestimo só pode ser feito se o membro existir.
    await this.memberService.findById(payload.memberId);

    // 2. O emprestimo só pode ser feito se o livro existir e estiver disponível.
    const book = await this.bookService.findById(payload.bookId);

    // 2.1 e estiver disponível
    if (!book.available) {
      throw new ApiError("Book is not available for loan");
    }

    // 3. Um membro pode ter no máximo 3 empréstimos ativos.
    // SELECT COUNT(*) FROM loans WHERE id = 1 AND status = 'ACTIVE';
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

    // 4. O loanDate deve ser menor que o returnDate
    if (payload.returnDate < payload.loanDate) {
      throw new ApiError("loanDate cannot be greater than returnDate");
    }

    // Se todas as regras de negócio foram validadas, crio o emprestimo.
    const loan = await prisma.loan.create({ data: payload });

    return loan;
  };
}
