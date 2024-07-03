import { prisma } from "../../../../../configs/prisma.config";
import { BookFactory } from "../../../factory";
import { BookService } from "../../../service";

describe("UNIT: BookService.findById", () => {
  let bookService: BookService;

  beforeEach(async () => {
    bookService = new BookService();
    jest.clearAllMocks();
  });

  // RED GREEN REFACTOR (Teste Falha, Teste passa, Refactor)
  test("should return a book by id", async () => {
    // Arrange
    // const bookData = {
    //   title: "Titulo Teste",
    //   author: "Autor Teste",
    //   publicationYear: 2023,
    //   available: false,
    // };
    const bookData = BookFactory.build();

    const mockPrismaBookFindUnique = jest.spyOn(prisma.book, "findUnique");
    mockPrismaBookFindUnique.mockResolvedValueOnce({
      ...bookData,
      id: 1,
    });

    const expectedResult = {
      id: expect.any(Number),
      ...bookData,
    };

    // Act
    const result = await bookService.findById(1);

    // Assert
    expect(prisma.book.findUnique).toHaveBeenCalledTimes(1);

    expect(result).toEqual(expectedResult);
  });

  test("should throw an error if book not found", async () => {
    // Arrange
    const mockPrismaBookFindUnique = jest.spyOn(prisma.book, "findUnique");
    mockPrismaBookFindUnique.mockResolvedValueOnce(null);

    // Act - Assert

    await expect(bookService.findById(1)).rejects.toThrow("Book not found");
    expect(prisma.book.findUnique).toHaveBeenCalledTimes(1);
  });
});
