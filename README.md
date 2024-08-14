# Mini Sistema de E-commerce

Este é um mini sistema de e-commerce com funcionalidades básicas para gerenciar usuários e produtos, além de processar pagamentos e lidar com a recuperação de senhas. 🛒💳

## Tecnologias Usadas

- **HTML**: 🌐
- **CSS**: 🎨
- **JavaScript**: 🖥️
- **Node.js**: 🚀
- **Express**: ⚙️
- **Mongoose**: 🐍
- **JWT (JSON Web Tokens)**: 🔑
- **Stripe**: 💳
- **Nodemailer**: 📧

## Funcionalidades

- **Login com GitHub**: Permite que os usuários façam login usando suas contas do GitHub. 🐙🔑
- **Cadastro de Usuário**: Registro de novos usuários no sistema. ✍️
- **CRUD de Produtos**: Operações básicas para gerenciar produtos. 📦✏️
- **Pagamento com Stripe**: Integração para processar pagamentos. 💵
- **Confirmação de Código por E-mail**: Envio de códigos para validação de e-mail. 📧🔒
- **Alteração e Recuperação de Senha**: Funcionalidades para alterar e recuperar senhas. 🔐

## Rotas

### Autenticação e Registro

- **`/register`**: Registra um novo usuário. 📝
- **`/login`**: Realiza o login do usuário. 🔑
- **`/resetPass`**: Reseta a senha do usuário. 🔄
- **`/recuperarSenha`**: Recupera a senha do usuário através de um link de recuperação enviado por e-mail. 📨

### Produtos

- **`/db/listProdutos`**: Lista todos os produtos. 🛍️
- **`/db/editProduct`**: Edita o valor e outras informações de um produto. ✏️
- **`/produtos/db`**: Cadastra um novo produto. ➕
- **`/dbDelete/product`**: Deleta um produto. 🗑️

### Pagamento

- **`/pagamento`**: Processa o pagamento dos produtos. 💳
- **`/idProduct`**: Envia o ID do produto para o usuário, que será enviado em um JWT. 🆔
- **`/verifyTokenPay`**: Verifica o token JWT e recupera os IDs dos produtos para processamento de pagamento. 🔍
