import { GreetingService } from "../../greetings";

/*
  EVENT LOOP
  CALL STACK
*/

describe("UNIT EXEMPLO: GreetingService", () => {
  let greetingService: GreetingService;

  beforeEach(() => {
    greetingService = new GreetingService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve retornar `Bom dia!!` caso o horário atual seja anterior a 12", () => {
    // AAA

    // Arrange
    // jest
    //   .spyOn(greetingService, "getCurrentTime")
    //   .mockReturnValue(new Date("1993-03-17T09:06:38.214Z"));
    const mockGetCurrentTime = jest.spyOn(greetingService, "getCurrentTime");
    mockGetCurrentTime.mockReturnValueOnce(
      new Date("1993-03-17T09:06:38.214Z")
    );

    // Act
    const result = greetingService.getGreeting();

    // Assert
    expect(result).toBe("Bom dia!!");
    expect(greetingService.getCurrentTime).toHaveBeenCalledTimes(1);
  });

  test("deve retornar `Boa tarde!!` caso o horário atual esteja entre 12 e 18", () => {
    jest
      .spyOn(greetingService, "getCurrentTime")
      .mockReturnValue(new Date("1993-03-17T16:06:38.214Z"));

    const result = greetingService.getGreeting();

    expect(result).toBe("Boa tarde!!");
    expect(greetingService.getCurrentTime).toHaveBeenCalledTimes(1);
  });

  test("deve retornar `Boa noite` caso o horário atual for após 18", () => {
    jest
      .spyOn(greetingService, "getCurrentTime")
      .mockReturnValue(new Date("1993-03-17T23:06:38.214Z"));

    const result = greetingService.getGreeting();

    expect(result).toBe("Boa noite!!");
    expect(greetingService.getCurrentTime).toHaveBeenCalledTimes(1);
  });
});
