# Bot Estoque

Sistema inteligente de gerenciamento de estoque e receitas culinárias com assistente conversacional baseado em IA.

## Descrição

Bot Estoque é uma API REST que combina gerenciamento de inventário com um assistente de IA conversacional multi-agente. O sistema permite controlar itens de estoque, gerenciar receitas culinárias e interagir naturalmente através de perguntas em linguagem natural.

## Funcionalidades

- **Gerenciamento de Estoque**: CRUD completo para itens do inventário com controle de quantidade e preço
- **Gerenciamento de Receitas**: Cadastro e consulta de receitas culinárias
- **Assistente IA Conversacional**:
    - Consulta de quantidades e preços de produtos
    - Busca de receitas no banco de dados local
    - Verificação de disponibilidade de ingredientes
    - Pesquisa de receitas na internet
    - Salvamento automático de novas receitas
    - Respostas contextualizadas mantendo histórico de conversação
- **Sistema de Roteamento Multi-LLM**: Suporte para múltiplos provedores de IA (Anthropic, OpenAI, Google)

## Arquitetura

O sistema utiliza uma arquitetura multi-agente baseada em LangGraph com os seguintes componentes:

- **Orchestrator**: Roteia requisições para o agente apropriado
- **Trivial**: Responde saudações e perguntas sobre funcionalidades do sistema
- **SQL**: Executa consultas no banco de dados (itens e receitas)
- **Revisor**: Avalia respostas e decide próximos passos
- **Web**: Busca receitas na internet quando não encontradas localmente
- **Structurer**: Estrutura e salva novas receitas no banco de dados

### Sistema de Roteamento de LLM

O sistema possui um roteador inteligente que permite escolher entre diferentes provedores de IA:

- **Anthropic (Claude)**: Claude Sonnet 4.5 (HIGH) / Claude Haiku 4.5 (padrão)
- **OpenAI (GPT)**: GPT-4o (HIGH) / GPT-4o-mini (padrão)
- **Google (Gemini)**: Gemini 2.5 Pro (HIGH) / Gemini 2.5 Flash (padrão)

Você pode selecionar seu provedor preferido através da variável de ambiente `PROVIDER`.

## Tecnologias

- **Backend**: Node.js, Express, TypeScript
- **Banco de Dados**: PostgreSQL, TypeORM
- **IA**: LangChain, LangGraph, Multi-LLM (Anthropic/OpenAI/Google)
- **Containerização**: Docker, Docker Compose
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest, Supertest

## Estrutura do Projeto

```
bot-estoque/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuração do banco de dados
│   │   ├── controllers/      # Controladores das rotas
│   │   ├── entities/         # Entidades TypeORM
│   │   ├── graph/            # Sistema de agentes LangGraph
│   │   │   ├── agents/       # Lógica dos agentes
│   │   │   ├── nodes/        # Nós do grafo
│   │   │   ├── prompts/      # Prompts YAML dos agentes
│   │   │   ├── schemas/      # Schemas de validação
│   │   │   └── tools/        # Ferramentas dos agentes
│   │   ├── repositories/     # Repositórios de dados
│   │   ├── routes/           # Definição de rotas
│   │   ├── app.ts            # Configuração do Express
│   │   └── swagger.ts        # Configuração do Swagger
│   ├── tests/                # Testes automatizados
│   ├── docs/                 # Documentação OpenAPI
│   ├── server.ts             # Ponto de entrada da aplicação
│   ├── Dockerfile            # Container do backend
│   └── package.json
├── docker-compose.yaml       # Orquestração dos containers
└── .env                      # Variáveis de ambiente
```

## Instalação

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js (versão 18 ou superior) - apenas para desenvolvimento local
- npm ou yarn - apenas para desenvolvimento local

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/Ryans007/StockBot.git
cd bot-estoque
```

2. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Chaves de API dos provedores de IA
GOOGLE_API_KEY=sua-chave-google-caso-utilize
OPENAI_API_KEY=sua-chave-openai-caso-utilize
ANTHROPIC_API_KEY=sua-chave-anthropic-caso-utilize

# Configuração do Provedor de IA
# Opções: ANTHROPIC, OPENAI, GOOGLE
PROVIDER=GOOGLE

# Chave para busca na web
TAVILY_API_KEY=sua-chave-tavily

# Configuração do PostgreSQL
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Porta do backend
BACKEND_PORT=3000
```

**Nota**: Você só precisa configurar a chave de API do provedor que escolheu usar na variável `PROVIDER`. Por exemplo, se definir `PROVIDER=ANTHROPIC`, preencha apenas `ANTHROPIC_API_KEY`.

3. Inicie os containers Docker:

```bash
docker-compose up -d
```

O sistema irá criar dois containers:
- **postgres_db**: Container do banco de dados PostgreSQL
- **backend**: Container da aplicação Node.js/Express

O banco de dados PostgreSQL será inicializado automaticamente na primeira execução.

## Uso

### Com Docker (Recomendado)

1. Inicie os containers:
```bash
docker-compose up -d
```

2. Verifique os logs:
```bash
docker-compose logs -f backend
```

3. Pare os containers:
```bash
docker-compose down
```

O servidor estará disponível em `http://localhost:3000` (ou na porta configurada em `BACKEND_PORT`).

### Desenvolvimento Local (Sem Docker)

Se preferir executar sem Docker, você precisará ter PostgreSQL instalado e configurado localmente.

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute em modo de desenvolvimento:
```bash
npm run dev
```

### Produção

1. Compile o projeto:
```bash
npm run build
```

2. Execute a versão compilada:
```bash
npm start
```

### Documentação da API

Acesse a documentação interativa Swagger em:
```
http://localhost:3000/docs
```

(Ou substitua `3000` pela porta configurada em `BACKEND_PORT`)

## Endpoints Principais

### Items
- `GET /items` - Lista todos os itens
- `POST /items` - Cria novo item
- `PUT /items/:id` - Atualiza item
- `DELETE /items/:id` - Remove item

### Recipes
- `GET /recipes` - Lista todas as receitas
- `POST /recipes` - Cria nova receita
- `PUT /recipes/:id` - Atualiza receita
- `DELETE /recipes/:id` - Remove receita

### Assistant
- `POST /assistant/send_message` - Envia mensagem para o assistente
- `GET /assistant/history` - Retorna histórico de conversas

## Exemplos de Uso do Assistente

```json
POST /assistant/send_message
{
  "user_message": "Quantos ovos tenho no estoque?"
}
```

```json
POST /assistant/send_message
{
  "user_message": "Como fazer purê de batata?",
  "thread_id": "9f01015f-9662-4b14-a2d6-93fb4d46dabe"
}
```

```json
POST /assistant/send_message
{
  "user_message": "Tenho os ingredientes para fazer bolo de chocolate?"
}
```

## Testes

O projeto possui cobertura de testes de 89.93%.

### Executar todos os testes:
```bash
npm test
```

### Executar testes em modo watch:
```bash
npm run test:watch
```

### Gerar relatório de cobertura:
```bash
npm run test:coverage
```

O relatório de cobertura será gerado na pasta `coverage/`.

## Autor

Ryan Soares
- Email: ryansoaresjorvino@gmail.com