import { prisma } from "../../../../../configs/prisma.config";
import { MemberService } from "../../../service";

/*
  TODO:
  - Rodar os testes multiplas vezes para ver se o comportamento está correto
*/

describe("UNIT: MemberService.create", () => {
  let memberService: MemberService;

  beforeEach(async () => {
    memberService = new MemberService();
  });

  test("should create a new member", async () => {
    // Arrange
    const memberData = {
      name: "Alice Silva",
      cpf: "22345678900",
      phoneNumber: "(41) 91234-56-78",
    };

    const mockPrismaMemberCreate = jest.spyOn(prisma.member, "create");
    mockPrismaMemberCreate.mockResolvedValue({
      ...memberData,
      id: 100,
      registrationDate: new Date(),
    });
    // Act
    const result = await memberService.create(memberData);

    // Assert
    expect(prisma.member.create).toHaveBeenCalledTimes(1);
    expect(prisma.member.create).toHaveBeenCalledWith({ data: memberData });

    expect(result).toEqual({
      id: expect.any(Number),
      name: "Alice Silva",
      cpf: "22345678900",
      phoneNumber: "(41) 91234-56-78",
      registrationDate: expect.any(Date),
    });
  });

  test("shold throw an error if the member cpf already exists", async () => {
    // Arrange
    const memberData = {
      name: "Alice Silva",
      cpf: "22345678900",
      phoneNumber: "(41) 91234-56-78",
    };

    const mockPrismaMemberCount = jest.spyOn(prisma.member, "count");
    // type safe
    mockPrismaMemberCount.mockResolvedValue(3);

    // Act - Assert

    await expect(memberService.create(memberData)).rejects.toThrow(
      "Cpf already used"
    );

    expect(prisma.member.count).toHaveBeenCalledTimes(1);
    expect(prisma.member.count).toHaveBeenCalledWith({
      where: { cpf: memberData.cpf },
    });
  });
});
