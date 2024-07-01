import { prisma } from "../../../../../configs/prisma.config";
import { BookService } from "../../../service";

describe("UNIT: BookService.list", () => {
  let bookService: BookService;

  beforeEach(async () => {
    bookService = new BookService();
  });

  test("should list all books", async () => {
    // Arrange
    const bookListData = [
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publicationYear: 1960,
        available: true,
      },
      {
        title: "1984",
        author: "George Orwell",
        publicationYear: 1949,
        available: false,
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publicationYear: 1925,
        available: true,
      },
    ];

    const mockPrismaBookFindMany = jest.spyOn(prisma.book, "findMany");
    mockPrismaBookFindMany.mockResolvedValueOnce(
      bookListData.map((book) => {
        return {
          id: expect.any(Number),
          title: book.title,
          author: book.author,
          publicationYear: book.publicationYear,
          available: book.available,
        };
      })
    );

    const expectedResult = bookListData.map((book) => {
      return {
        id: expect.any(Number),
        title: book.title,
        author: book.author,
        publicationYear: book.publicationYear,
        available: book.available,
      };
    });

    // Act
    const result = await bookService.list();

    // Assert
    expect(prisma.book.findMany).toHaveBeenCalledTimes(1);

    expect(result).toEqual(expectedResult);
  });
});
