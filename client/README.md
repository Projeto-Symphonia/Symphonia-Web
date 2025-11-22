## Cliente (API REST)

Este diretório contém o client que é uma API REST responsável por fazer a comunicação entre o banco de dados MongoDB e o front-end desenvolvido em React.

A API expõe endpoints que o front-end consome e persiste/recupera dados de coleções no MongoDB (por exemplo, álbuns musicais). O serviço foi pensado para atuar como camada de aplicação entre a UI e o banco de dados.

## Funcionalidades

-   Conexão com MongoDB para persistência de dados.
-   Endpoints RESTful para operações CRUD (Create, Read, Update, Delete) sobre recursos (por exemplo, `albums`).
-   Validação e tratamento básico de erros nas rotas.
-   Estrutura modular com separação entre rotas, modelos e configuração de banco.

## Estrutura do projeto (visão geral)

Estrutura principal dentro do diretório do client:

-   `package.json` — dependências e scripts do projeto.
-   `server.js` — ponto de entrada do servidor (ou equivalente que inicia o app).
-   `src/` — código-fonte da aplicação
    -   `app.js` — configuração principal do Express (middlewares, parsing, CORS, etc.)
    -   `config/`
        -   `dbConnect.js` — configuração e função de conexão com MongoDB
    -   `models/`
        -   `Album.js` — modelo Mongoose para álbuns (exemplo de recurso)
    -   `routes/`
        -   `index.js` — definição das rotas e controllers vinculados

> Observação: a árvore exata de arquivos pode variar; os nomes acima seguem as convenções presentes no projeto atual.

## Endpoints de exemplo

Abaixo exemplos comuns (ajuste conforme rotas reais definidas em `routes`):

-   GET /albums — lista todos os álbuns
-   GET /albums/:id — obtém um álbum pelo ID
-   POST /albums — cria um novo álbum (body JSON com os campos do modelo)
-   PUT /albums/:id — atualiza um álbum existente
-   DELETE /albums/:id — remove um álbum

Exemplo de requisição (curl) para criar um álbum:

```bash
curl -X POST http://localhost:3000/albums \
	-H "Content-Type: application/json" \
	-d '{"title":"Meu Álbum","artist":"Artista","year":2025}'
```

## Variáveis de ambiente

Configure as variáveis de ambiente necessárias (exemplo):

-   `MONGO_URI` — string de conexão com MongoDB (por exemplo, `mongodb://usuario:senha@host:port/nomeDB`)
-   `PORT` — porta em que o servidor vai rodar (padrão: 3000)

Recomenda-se criar um arquivo `.env` (não comitar credenciais sensíveis) e utilizar um pacote como `dotenv` para carregá-las.

## Como executar localmente

1. Instale as dependências:

```bash
npm install
```

2. Defina `MONGO_URI` e outras variáveis de ambiente (por exemplo via `.env`).

3. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

ou em modo de produção:

```bash
npm start
```

> Ajuste os scripts conforme o `package.json` do seu projeto.

## Casos de uso e integração com o front-end React

-   O front-end React consome os endpoints REST para exibir, criar e editar dados.
-   Fluxo típico: o usuário interage com a UI → React faz fetch para a API → API valida/processa → API persiste no MongoDB e retorna resposta → React atualiza a interface.

## Boas práticas e notas

-   Trate corretamente erros e códigos HTTP nas respostas (ex.: 200/201/204, 400, 404, 500).
-   Não exponha credenciais no repositório; use variáveis de ambiente.
-   Considere adicionar testes unitários para rotas e integração com banco.

## Contribuição

1. Abra uma issue descrevendo a sugestão/bug.
2. Crie uma branch com o prefixo `feature/` ou `fix/`.
3. Envie um pull request descrevendo a mudança.

## Licença

Coloque aqui a informação de licença do projeto (por exemplo, MIT) ou remova esta seção se não aplicável.

