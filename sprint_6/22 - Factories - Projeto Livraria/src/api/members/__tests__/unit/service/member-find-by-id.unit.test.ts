import { prisma } from "../../../../../configs/prisma.config";
import { MemberService } from "../../../service";

describe("UNIT: MemberService.findById", () => {
  let memberService: MemberService;

  beforeEach(async () => {
    memberService = new MemberService();
  });

  // RED GREEN REFACTOR (Teste Falha, Teste passa, Refactor)
  test("should return a member by id", async () => {
    // Arrange
    const memberData = {
      name: "Alice Silva",
      cpf: "22345678900",
      phoneNumber: "(41) 91234-56-78",
    };

    const mockPrismaMemberFindUnique = jest.spyOn(prisma.member, "findUnique");
    mockPrismaMemberFindUnique.mockResolvedValueOnce({
      id: expect.any(Number),
      name: memberData.name,
      cpf: memberData.cpf,
      phoneNumber: memberData.phoneNumber,
      registrationDate: new Date(),
    });

    const expectedResult = {
      id: expect.any(Number),
      name: memberData.name,
      cpf: memberData.cpf,
      phoneNumber: memberData.phoneNumber,
      registrationDate: expect.any(Date),
    };

    // Act
    const result = await memberService.findById(1);

    // Assert
    expect(prisma.member.findUnique).toHaveBeenCalledTimes(1);

    expect(result).toEqual(expectedResult);
  });

  test("should throw an error if member not found", async () => {
    // Arrange
    const mockPrismaMemberFindUnique = jest.spyOn(prisma.member, "findUnique");
    mockPrismaMemberFindUnique.mockResolvedValueOnce(null);

    // Act - Assert

    await expect(memberService.findById(1)).rejects.toThrow("Member not found");
    expect(prisma.member.findUnique).toHaveBeenCalledTimes(1);
  });
});
