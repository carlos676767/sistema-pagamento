function email(codigo) {
    return `<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmação de Alteração de Senha</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
            }
            .header img {
                max-width: 100px;
            }
            .content {
                text-align: center;
                padding: 20px;
            }
            .content h1 {
                color: #333333;
            }
            .content p {
                color: #666666;
                line-height: 1.6;
            }
            .code {
                display: inline-block;
                font-size: 1.5em;
                color: #ffffff;
                background-color: #007BFF;
                padding: 10px 20px;
                border-radius: 5px;
                margin: 20px 0;
                text-decoration: none;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                font-size: 0.9em;
                color: #666666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://via.placeholder.com/100" alt="Logo">
            </div>
            <div class="content">
                <h1>Confirmação de Alteração de Senha</h1>
                <p>Olá,</p>
                <p>Recebemos uma solicitação para alterar a sua senha:</p>
                <div class="code"><a href="${codigo}" style="color: white;">Alterar senha</a></div>
                <p>Se você não solicitou a alteração de senha, por favor, ignore este e-mail.</p>
            </div>
            <div class="footer">
                <p>© 2024 csdev. Todos os direitos reservados.</p>
            </div>
        </div>
    </body>
    </html>  `
}

module.exports = email