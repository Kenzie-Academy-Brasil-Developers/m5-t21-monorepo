## Senhas

- NUNCA armazenar senhas puras (plain text) no banco.
- NUNCA retornar a senha para o usuario (POST/GET/PATCH/DELETE)

## Hashing vs Criptografia

Hashing:

- Processo IRREVERSÍVEL

Criptografia

- Processo é REVERSÍVEL
- Tenho uma chave, que posso usar para 'descriptografar' um dado.

## Autenticação vs Autorização/Permissão

Autenticação -> Identidade de um usuário -> Se ele é quem diz ser. Verificação através de login/token

Autorização / Permissão -> Se o usuário tem permissão ou não para acessar determinado recurso.
