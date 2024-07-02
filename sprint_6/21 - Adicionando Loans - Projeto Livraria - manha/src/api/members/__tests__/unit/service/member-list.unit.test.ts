import { prisma } from "../../../../../configs/prisma.config";
import { MemberService } from "../../../service";

describe("UNIT: MemberService.list", () => {
  let memberService: MemberService;

  beforeEach(async () => {
    memberService = new MemberService();
  });

  // RED GREEN REFACTOR (Teste Falha, Teste passa, Refactor)
  test("should list all members", async () => {
    // Arrange
    const memberListData = [
      {
        name: "Alice Silva",
        cpf: "22345678900",
        phoneNumber: "(41) 91234-56-78",
      },
      {
        name: "Chrystian Rodolfo",
        cpf: "11122233300",
        phoneNumber: "(41) 91234-56-78",
      },
    ];

    const mockPrismaMemberFindMany = jest.spyOn(prisma.member, "findMany");
    mockPrismaMemberFindMany.mockResolvedValueOnce(
      memberListData.map((member) => {
        return {
          id: expect.any(Number),
          name: member.name,
          cpf: member.cpf,
          phoneNumber: member.phoneNumber,
          registrationDate: new Date(),
        };
      })
    );

    const expectedResult = memberListData.map((member) => {
      return {
        id: expect.any(Number),
        name: member.name,
        cpf: member.cpf,
        phoneNumber: member.phoneNumber,
        registrationDate: new Date(),
      };
    });

    // Act
    const result = await memberService.list();

    // Assert
    expect(prisma.member.findMany).toHaveBeenCalledTimes(1);

    expect(result).toEqual(expectedResult);
  });
});
