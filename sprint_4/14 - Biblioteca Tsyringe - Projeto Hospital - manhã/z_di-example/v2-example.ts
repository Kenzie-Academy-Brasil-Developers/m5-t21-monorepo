// Funcionará como um CONTRATO sobre como deve ser o formato de um instrumento
interface IInstrumento {
  name: string;
  tocar(): string;
}

// AccountService
class Guitarra implements IInstrumento {
  public name = "guitarra";

  public tocar() {
    return `Tocando ${this.name}: WAH WAH WAH`;
  }
}

// AccountService
class Bateria implements IInstrumento {
  public name = "bateria";

  public tocar() {
    return `Tocando ${this.name}: TUDUM TUDUM TUDUM`;
  }
}

// AccountService
class Xilofone implements IInstrumento {
  public name = "xilofone";

  public tocar() {
    return `Tocando ${this.name}: PLIM PLIM PLIM`;
  }
}

// AccountController
class Musico {
  constructor(private instrumento: IInstrumento) {}

  public performar() {
    return `Performando: ${this.instrumento.tocar()}`;
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
