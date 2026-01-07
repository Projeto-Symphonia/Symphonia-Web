# Symphonia-Web

Uma aplicação web para compartilhar e avaliar álbuns e músicas, com posts, comentários e perfis de usuário. Este repositório contém um servidor Node.js (API REST), um cliente legado e uma versão moderna em React (Vite) em `symphonia-project`.

**Resumo rápido**

-   Propósito: permitir que usuários publiquem avaliações (posts) com nota, comentário e referência a álbuns/músicas.
-   Funcionalidades principais: criação/visualização/exclusão de posts, comentários, perfis de usuário, avaliação por estrelas.

**Tecnologias**

-   Backend: Node.js, Express (API REST), MongoDB (Mongoose)
-   Frontend legado: pasta `client`
-   Frontend moderno: `symphonia-project` (React + Vite)
-   HTTP client: Axios (arquivo de serviço em `symphonia-project/src/services/api.js`)

Estrutura relevante

-   `server.js` – Ponto de entrada do backend (API)
-   `src/` (backend) – `app.js`, `controllers/`, `models/`, `routes/` (lógica da API)
-   `client/` – Código do cliente original (frontend estático/vanilla)
-   `symphonia-project/` – Aplicação React moderna (Vite)
    -   `src/Components/PagePost` – componente de exibição de post
    -   `src/services/api.js` – cliente Axios configurado

Instalação e execução (desenvolvimento)

Pré-requisitos:

-   Node.js (>= 16)
-   MongoDB rodando localmente ou URI de conexão

Passos gerais:

1. Instalar dependências do backend (na raiz ou pasta do servidor):

```bash
npm install
```

2. Iniciar backend (exemplo):

```bash
npm run dev
# ou
node server.js
```

3. Frontend moderno (React / Vite):

```bash
cd symphonia-project
npm install
npm run dev
```

4. Frontend legado (se aplicável):

```bash
cd client
npm install
npm start
```

Variáveis de ambiente importantes

-   `MONGODB_URI` – string de conexão com MongoDB
-   `PORT` – porta do servidor (ex.: 3001)
-   `JWT_SECRET` – segredo para tokens (se usado)

API (pontos comuns)

Nota: os nomes podem variar conforme implementação; ajuste conforme `src/routes` no backend.

-   `POST /auth/login` – autenticação
-   `GET /posts` – listar posts
-   `GET /posts/:id` – obter post
-   `POST /posts` – criar post
-   `DELETE /posts/:id` – excluir post
-   `GET /comments/post/:postId` – listar comentários de um post
-   `POST /comments` – criar comentário
-   `DELETE /comments/:id` – excluir comentário

Boas práticas e comportamento do app

-   Operações sensíveis (ex.: exclusão de post) devem exigir autenticação e autorização (verificar proprietário).
-   Preferir remoção em cascata no backend (ex.: quando apagar um post, remover comentários vinculados no servidor) para evitar chamadas múltiplas do cliente.

Contribuindo

-   Abra uma issue descrevendo o que pretende mudar.
-   Faça um fork, crie uma branch `feature/descricao`, implemente e abra um pull request.

Dúvidas / próximos passos

-   Posso atualizar a documentação com exemplos de endpoints reais se você quiser que eu leia os arquivos de rotas do backend.
-   Posso também criar scripts npm úteis ou `.env.example` com as variáveis necessárias.

Arquivo atualizado: [README.md](README.md)
