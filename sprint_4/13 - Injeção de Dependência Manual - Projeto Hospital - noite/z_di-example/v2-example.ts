// Funcionará como um CONTRATO de regras para quem for implementar a interface
interface IInstrumento {
  nome: string;
  tocar(): string;
}

class Guitarra implements IInstrumento {
  public nome = "guitarra";

  public tocar() {
    return `Tocando ${this.nome}: WAH WAH WAH`;
  }
}

class Bateria implements IInstrumento {
  public nome = "bateria";

  public tocar() {
    return `Tocando ${this.nome}: TUDUM TUDUM TUDUM`;
  }
}

class Xilofone implements IInstrumento {
  public nome = "xilofone";

  tocar(): string {
    return `Tocando ${this.nome}: PLIM PLIM PLIM`;
  }
}

class Musico {
  constructor(private instrumento: IInstrumento) {}

  public performar() {
    return `Performando... ${this.instrumento.tocar()}`;
  }
}

const guitarra = new Guitarra();
const musicoGuitarra = new Musico(guitarra);
console.log(musicoGuitarra.performar());

const bateria = new Bateria();
const musicoBateria = new Musico(bateria);
console.log(musicoBateria.performar());

const xilofone = new Xilofone();
const musicoXilofone = new Musico(xilofone);
console.log(musicoXilofone.performar());
