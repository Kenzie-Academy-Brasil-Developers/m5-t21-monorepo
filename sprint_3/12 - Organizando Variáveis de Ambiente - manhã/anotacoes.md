# Dia 1

## Senhas

- NUNCA armazenar senhas puras (texto puro [plain text]) no banco.
- NUNCA retornar a senha para o usuario

## Hashing vs Criptografia

### Hashing

- Operação que não pode ser desfeita
- Envolve o uso de um algoritmo de hashing:
  Exemplos:
  - MD5
  - SHA-1
  - SHA-256
- Em um login, não irei comparar senha pura (entrada) com hash. O bcrypt dara um método para comparar hash com hash.
- Usuario envia email (some_mail@mail.com) e senha ("1234"). Hashear a senha "1234" e comparar a hash gerada com a hash no banco.

### Criptografia

- Dado criptografado a partir de uma chave, que pode ser feito o processo inverso para descriptografar, utilizando a mesma chave.

## Autenticação e Autorização/Permissão

Autenticação -> Identidade do usuário -> Se ele é quem diz ser.
Autorização/Permissão -> Se o usuário tem permissão ou não para acessar determinado recurso

## Dia 3

### Proteção de uma rota

- Somente alguem autenticado poderá enviar uma requisição PATCH para /accounts. Somente alguem com TOKEN poderá continuar o acesso a rota.
- Para que somente o DONO da conta possa alterar dados sobre ela. A identidade do usuario poderá ser verificada através do seu TOKEN JWT

https://devblogs.microsoft.com/typescript/announcing-typescript-5-5-rc/
