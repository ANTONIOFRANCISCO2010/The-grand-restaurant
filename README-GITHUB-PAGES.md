# THE GRAND RESTAURANT — ficheiros para GitHub Pages

Esta versão é um site estático: não precisa do servidor da aplicação, de uma base de dados nem de serviços privados para mostrar o conteúdo. As fotografias estão guardadas localmente na pasta `images/`.

## Ficheiros a colocar no GitHub

Copie estes elementos para a raiz do repositório GitHub:

- `index.html`
- `site.css`
- `site.js`
- a pasta `images/`, incluindo `grand-hero.jpg` e `grand-dish.jpg`

O ficheiro `index.html` tem de ficar diretamente na raiz publicada. Não mude os nomes dos ficheiros nem a localização da pasta `images`.

## Ativar o GitHub Pages

1. Crie ou abra um repositório no GitHub.
2. Carregue os quatro elementos acima para a raiz do repositório e faça commit.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/(root)` e guarde.
6. Aguarde a publicação; o GitHub mostrará o endereço do site nessa página.

## Antes de publicar

- Em `site.js`, substitua `WHATSAPP_NUMBER` pelo número real, com indicativo internacional e sem espaços (por exemplo, `351912345678`).
- Em `index.html`, atualize a morada e os contactos de demonstração.
- Reveja os horários, pratos e preços no `index.html` e no `site.js`.
- O formulário só prepara uma mensagem de WhatsApp e não confirma uma reserva. Para ativar este fluxo, configure primeiro o número real no `site.js`.

O projeto original continua em `artifacts/grand-restaurant/`. Estes ficheiros estáticos foram acrescentados à raiz para facilitar a publicação no GitHub Pages.
