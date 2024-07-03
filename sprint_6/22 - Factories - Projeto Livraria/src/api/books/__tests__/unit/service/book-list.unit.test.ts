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
    // const bookListData = [
    //   {
    //     title: "To Kill a Mockingbird",
    //     author: "Harper Lee",
    //     publicationYear: 1960,
    //     available: true,
    //   },
    //   {
    //     title: "1984",
    //     author: "George Orwell",
    //     publicationYear: 1949,
    //     available: false,
    //   },
    //   {
    //     title: "The Great Gatsby",
    //     author: "F. Scott Fitzgerald",
    //     publicationYear: 1925,
    //     available: true,
    //   },
    // ];

    // const bookListData = Array.from({ length: 10 }, () => {
    //   return BookFactory.build();
    // });
    const bookListData = Array.from({ length: 10 }, () => BookFactory.build());

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
