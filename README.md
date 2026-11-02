# MESA

Aplicação Next.js de inteligência operacional para restaurantes, com painéis, diagnósticos, simulador e planos de ação. O estado operacional é persistido em SQLite por meio do Drizzle.

## Executar localmente

Requer Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Popular dados de demonstração

```bash
npm run db:seed
```

O seed cria um restaurante de demonstração com cardápio, pedidos dos últimos 14 dias, avaliações e planos de ação. Ele pode ser executado novamente: atualiza os registros de demonstração sem apagar outros dados e seleciona o restaurante de demonstração apenas quando ainda não há um restaurante selecionado.

O banco usa `./data/mesa.db` por padrão localmente. Na Vercel, usa `/tmp/mesa.db` para evitar gravar no filesystem somente leitura da função. O diretório `/tmp` é temporário e não garante persistência entre execuções; para armazenar dados de produção na Vercel, migre para um banco gerenciado. `MESA_DATABASE_PATH` permite escolher outro arquivo SQLite em ambientes com filesystem persistente.

## Respostas com IA

Na tela **Avaliações**, abra um feedback e use **Gerar resposta com IA** para criar um rascunho em português. A resposta pode ser copiada e revisada antes de marcar a avaliação como respondida; o app não publica respostas no canal do cliente. A chamada envia à OpenAI apenas a nota, o nome do item e o comentário, sem o nome do cliente.

Configure `OPENAI_API_KEY` no `.env` da raiz. O modelo padrão é `gpt-6-luna`, voltado a tarefas focadas e de alto volume, com custo por token menor que o modelo anterior. O comentário enviado é limitado a 600 caracteres e a resposta a 70 tokens. A chave é lida somente no servidor; não use o prefixo `NEXT_PUBLIC_`.

Na home, **Resumo da IA** gera uma leitura dos indicadores, avaliações agregadas e recomendações. A chamada é feita ao clicar no botão, não ao abrir a página; o resumo fica em cache enquanto os dados usados forem os mesmos. Comentários e nomes de clientes não são enviados nessa análise.

Não há limite de gerações de IA. Como o app ainda não tem autenticação, qualquer visitante que alcançar essas ações pode consumir créditos da chave configurada.

## Verificações

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Escopo desta versão

- Os dados analíticos exibidos nos painéis são demonstrativos.
- A seleção de restaurante, recomendações, planos de ação, disponibilidade do cardápio, respostas às avaliações, recomendações de diagnóstico e simulações são persistidos em SQLite.
- Não há autenticação de usuários nem limite de gerações de IA.

## Backend

- `src/server/domain`: tipos e regras de negócio sem dependência de Next.js ou do banco.
- `src/server/application`: casos de uso e contratos de repositório.
- `src/server/infrastructure`: persistência SQLite com Drizzle.
- `src/server/infrastructure/database/migrations`: histórico das migrações SQLite.
- `src/server/drizzle.config.ts`: configuração usada pelos comandos `db:*`.
- `src/server/actions.ts`: ações do Next.js que validam entradas, chamam os casos de uso e revalidam as páginas afetadas.
- `src/server/container.ts`: ponto de composição que conecta o repositório e os dados iniciais.

Localmente, o banco usa `./data/mesa.db` por padrão. Na Vercel, o fallback `/tmp/mesa.db` é temporário; dados duráveis exigem um banco gerenciado. `MESA_DATABASE_PATH` escolhe outro arquivo SQLite em ambientes com filesystem persistente.
