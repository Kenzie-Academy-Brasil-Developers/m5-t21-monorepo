import { prisma } from "../../../../../configs/prisma.config";
import { BookService } from "../../../service";

describe("UNIT: BookService.findById", () => {
  let bookService: BookService;

  beforeEach(async () => {
    bookService = new BookService();
  });

  // RED GREEN REFACTOR (Teste Falha, Teste passa, Refactor)
  test("should return a book by id", async () => {
    // Arrange
    const bookData = {
      title: "Titulo Teste",
      author: "Autor Teste",
      publicationYear: 2023,
      available: false,
    };

    const mockPrismaBookFindUnique = jest.spyOn(prisma.book, "findUnique");
    mockPrismaBookFindUnique.mockResolvedValueOnce({
      id: expect.any(Number),
      title: bookData.title,
      author: bookData.author,
      publicationYear: bookData.publicationYear,
      available: bookData.available,
    });

    const expectedResult = {
      id: expect.any(Number),
      title: bookData.title,
      author: bookData.author,
      publicationYear: bookData.publicationYear,
      available: bookData.available,
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
