import { prisma } from "../../../../../configs/prisma.config";
import { BookFactory } from "../../../factory";
import { BookService } from "../../../service";

describe("UNIT: BookService.create", () => {
  let bookService: BookService;

  beforeEach(async () => {
    bookService = new BookService();
  });

  test("should create a new book", async () => {
    // Arrange
    // const bookData = {
    //   title: "Titulo Teste",
    //   author: "Autor Teste",
    //   publicationYear: 2023,
    //   available: false,
    // };
    const bookData = BookFactory.build();

    const mockPrismaBookCreate = jest.spyOn(prisma.book, "create");
    mockPrismaBookCreate.mockResolvedValueOnce({
      ...bookData,
      id: 100,
    });

    const expectedResult = {
      id: expect.any(Number),
      ...bookData,
    };

    // Act
    const result = await bookService.create(bookData);

    // Assert
    expect(prisma.book.create).toHaveBeenCalledTimes(1);
    expect(prisma.book.create).toHaveBeenCalledWith({ data: bookData });

    expect(result).toEqual(expectedResult);
  });
});
