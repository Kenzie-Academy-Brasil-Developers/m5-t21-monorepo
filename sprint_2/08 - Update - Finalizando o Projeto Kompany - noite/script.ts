class HttpStatus {
  public readonly HTTP_200_OK = 200;
}

const obj = new HttpStatus();

// READONLY NAO DEIXA O ATRIBUTO SER ALTERADO POR FORA DA CLASSE.
// obj.HTTP_200_OK = 1000;
