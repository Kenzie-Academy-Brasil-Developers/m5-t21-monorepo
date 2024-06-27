export class GreettingService {
  public getCurrentTime() {
    // 2024-06-27T12:37:54.063Z
    const currentTime = new Date();

    const ptBrFormat = currentTime.toLocaleString("pt-BR");

    console.log(`
###############################
Método getCurrentTime() foi chamado!! Data gerada: ${ptBrFormat}
###############################
      `);

    return currentTime;
  }

  public getGreeting() {
    const currentTime = this.getCurrentTime();
    const currentHour = currentTime.getHours();
    const ptBrFormat = currentTime.toLocaleString("pt-BR");

    console.log(`
###############################
Método getGreeting() foi chamado!! ${ptBrFormat}
###############################
        `);

    if (currentHour < 12) {
      return "Bom dia!!";
    } else if (currentHour <= 18) {
      return "Boa tarde!!";
    }

    return "Boa noite!!";
  }
}

// const instance = new GreettingService();
// instance.getCurrentTime();
