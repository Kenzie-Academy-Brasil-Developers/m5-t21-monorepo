import { BookFactory } from "../src/api/books/factory";
import { LoanFactory } from "../src/api/loans/factory";
import { MemberFactory } from "../src/api/members/factory";
import { prisma } from "../src/configs/prisma.config";

const AVAILABLE_BOOKS_TO_CREATE = 10_000;
const UNAVAILABLE_BOOKS_TO_CREATE = 10_000;
const MEMBERS_TO_CREATE = 10_000;
const LOANS_TO_CREATE = 10_000;

async function resetDatabase() {
  await prisma.loan.deleteMany();
  await prisma.book.deleteMany();
  await prisma.member.deleteMany();
}

async function main() {
  await resetDatabase();

  // BOOKS
  const availableBooks = await BookFactory.createMany(
    AVAILABLE_BOOKS_TO_CREATE,
    { available: true }
  );

  const unavailableBooks = await BookFactory.createMany(
    AVAILABLE_BOOKS_TO_CREATE,
    { available: false }
  );

  // MEMBERS
  const members = await MemberFactory.createMany(MEMBERS_TO_CREATE);

  // LOANS
  for (let i = 0; i < LOANS_TO_CREATE; i++) {
    const randomIndexMember = i % MEMBERS_TO_CREATE;
    const randomIndexBook = i % AVAILABLE_BOOKS_TO_CREATE;

    const member = members[randomIndexMember];
    const book = availableBooks[randomIndexBook];

    console.log("");
    console.log(`${randomIndexMember} ${randomIndexBook}`);

    const createdLoan = await LoanFactory.create({
      memberId: member.id,
      bookId: book.id,
    });
  }

  console.log("");
  console.log(`${AVAILABLE_BOOKS_TO_CREATE} available books created`);
  console.log(`${UNAVAILABLE_BOOKS_TO_CREATE} unavailable books created`);
  console.log(`${MEMBERS_TO_CREATE} members created`);
  console.log(`${LOANS_TO_CREATE} loans created`);
}

const initialTimer = new Date().getTime();
main()
  .then(async () => {
    const endTimer = new Date().getTime();
    console.log(`tempo: ${endTimer - initialTimer}`);
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
