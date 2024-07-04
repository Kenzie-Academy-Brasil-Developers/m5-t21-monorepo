import { prisma } from "../../../../../configs/prisma.config";
import { BookFactory } from "../../../factory";
import { BookService } from "../../../service";

describe("UNIT: BookService.list", () => {
  let bookService: BookService;

  beforeEach(async () => {
    bookService = new BookService();
  });

  test("should list all books", async () => {
    // Arrange
    // const bookListData = Array.from({ length: 10 }, () => BookFactory.build());
    const bookListData = BookFactory.buildMany(10);

    const mockPrismaBookFindMany = jest.spyOn(prisma.book, "findMany");
    mockPrismaBookFindMany.mockResolvedValueOnce(
      bookListData.map((book) => {
        return {
          id: expect.any(Number),
          ...book,
        };
      })
    );

    const expectedResult = bookListData.map((book) => {
      return {
        id: expect.any(Number),
        ...book,
      };
    });

    // Act
    const result = await bookService.list();

    // Assert
    expect(prisma.book.findMany).toHaveBeenCalledTimes(1);

    expect(result).toEqual(expectedResult);
  });
});
