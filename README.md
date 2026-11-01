# MESA

Aplicação Next.js de inteligência operacional para restaurantes, com painéis, diagnósticos, simulador e planos de ação. O estado operacional é persistido em SQLite por meio do Drizzle.

## Executar localmente

Requer Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Verificações

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Escopo desta versão

- Os dados analíticos exibidos nos painéis são demonstrativos.
- A seleção de restaurante, recomendações, planos de ação, disponibilidade do cardápio, respostas às avaliações, recomendações de diagnóstico e simulações são persistidos em SQLite.
- Não há autenticação nem integrações externas configuradas.

## Backend

- `src/server/domain`: tipos e regras de negócio sem dependência de Next.js ou do banco.
- `src/server/application`: casos de uso e contratos de repositório.
- `src/server/infrastructure`: persistência SQLite com Drizzle.
- `src/server/infrastructure/database/migrations`: histórico das migrações SQLite.
- `src/server/drizzle.config.ts`: configuração usada pelos comandos `db:*`.
- `src/server/actions.ts`: ações do Next.js que validam entradas, chamam os casos de uso e revalidam as páginas afetadas.
- `src/server/container.ts`: ponto de composição que conecta o repositório e os dados iniciais.

O banco usa `./data/mesa.db` por padrão. Defina `MESA_DATABASE_PATH` para escolher outro arquivo SQLite.
