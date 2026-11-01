# MESA — Fase 2: Implementação da Página Diagnósticos

## 1. Contexto do projeto

Estamos desenvolvendo o MESA, uma plataforma SaaS premium de inteligência operacional para restaurantes.

O objetivo do produto é transformar dados operacionais em diagnósticos, insights e recomendações que ajudem gestores a tomar decisões melhores.

O projeto já possui uma página Home (Command Center) desenvolvida em Next.js, React e TypeScript, com uma identidade visual premium inspirada nos princípios de design da Apple e nas interfaces do iOS.

**Sua tarefa agora é implementar exclusivamente a página Diagnósticos, seguindo fielmente a imagem de referência anexada.**

A imagem representa a direção visual aprovada e deve orientar o layout, a composição, os espaçamentos, os componentes e a hierarquia de informações.

Não estamos construindo uma aplicação funcional com IA nesta etapa. Estamos criando um protótipo visual navegável, utilizando dados fictícios e interações locais.

---

## 2. Instruções fundamentais

Antes de implementar:

1. Analise a estrutura atual do projeto.
2. Identifique o layout compartilhado, sidebar, header, componentes e estilos existentes.
3. Identifique a biblioteca de componentes e gráficos utilizada.
4. Reutilize o design system existente.
5. Preserve integralmente a Home e suas funcionalidades.
6. Não recrie a aplicação do zero.
7. Não altere desnecessariamente dependências ou configurações.
8. Não implemente backend, banco de dados ou integração com IA.

**A página Diagnósticos deve parecer uma continuação natural da Home, não uma interface de outro produto.**

Caso algum elemento da referência visual seja incompatível com o design system atual, priorize a consistência do produto, preservando o máximo possível da composição visual aprovada.

---

# 3. Direção visual — Premium iOS SaaS

O design deve transmitir a sensação de um software premium, extremamente refinado e intuitivo.

Referências conceituais:

- Apple Design Philosophy.
- Interfaces modernas do iOS e macOS.
- SaaS premium.
- Minimalismo editorial.
- Interfaces de produtos digitais sofisticados.

## Características obrigatórias

- Fundo off-white com tonalidade levemente quente.
- Cards brancos com bordas extremamente discretas.
- Sombras suaves e difusas.
- Cantos arredondados de maneira consistente.
- Tipografia elegante e muito bem hierarquizada.
- Espaçamento generoso.
- Ícones minimalistas.
- Laranja utilizado como cor de destaque.
- Estados interativos discretos.
- Transições suaves e naturais.

A interface não deve parecer um template genérico de dashboard ou uma página produzida automaticamente por IA.

Evitar:

- Gradientes exagerados.
- Efeitos neon.
- Glassmorphism excessivo.
- Ícones decorativos desnecessários.
- Cards com alturas inconsistentes.
- Sombras muito escuras.
- Animações exageradas.
- Elementos visuais sem função.

Utilizar a imagem anexada como referência prioritária para as proporções e a distribuição dos elementos.

---

# 4. Estrutura da página Diagnósticos

A página será dividida em quatro áreas principais:

1. Saúde operacional.
2. Principais diagnósticos.
3. Explorador de causa raiz.
4. Recomendações da MESA.

No desktop, utilizar uma composição assimétrica em grid, semelhante à imagem anexada.

A primeira linha deve conter o painel de saúde operacional à esquerda e a lista de diagnósticos à direita.

A segunda linha deve conter o explorador de causa raiz à esquerda e as recomendações à direita.

Manter espaçamentos, alinhamentos e proporções visualmente próximos da referência.

---

# 5. Header da página

Título principal:

**Diagnósticos**

Subtítulo:

"Investigue o que está impactando sua operação e descubra oportunidades de melhoria."

Na parte direita, reutilizar os controles existentes:

- Seletor de período.
- Notificações.
- Avatar do usuário.

O seletor de período deverá conter opções demonstrativas:

- Hoje.
- Últimos 7 dias.
- Esta semana.
- Últimos 30 dias.

A seleção poderá alterar o estado visual, sem necessidade de consultar dados externos.

Não duplicar o header caso ele já esteja implementado no layout compartilhado.

---

# 6. Componente 01 — Saúde operacional

Criar um card premium com o título:

**Saúde operacional**

Adicionar um ícone informativo com tooltip explicando que o indicador é uma pontuação demonstrativa baseada em fatores operacionais.

## Indicador principal

Criar um gráfico circular de progresso com:

- Valor: 82%.
- Cor principal: laranja MESA.
- Fundo do indicador em laranja muito claro.
- Espessura equilibrada.
- Animação inicial suave, respeitando preferências de movimento reduzido.

No centro do gráfico:

**82%**

Abaixo:

Indicador positivo de +6 pts.

Ao lado, apresentar:

"Operação estável, com pontos de atenção no tempo de preparo."

## Principais fatores

Abaixo do indicador, criar uma seção com três linhas:

**Tempo de preparo**
- Variação: +27%.
- Indicador desfavorável em vermelho/laranja.

**Capacidade da cozinha**
- Estado: Médio.
- Indicador de atenção.

**Satisfação do cliente**
- Variação: +3%.
- Indicador favorável em verde.

Cada linha deve possuir:

- Ícone discreto.
- Nome do indicador.
- Badge de status.
- Alinhamento consistente.

Todos os valores são fictícios e demonstrativos.

---

# 7. Componente 02 — Principais diagnósticos

Criar um card maior contendo uma lista de diagnósticos operacionais.

Título:

**Principais diagnósticos**

No canto superior direito, adicionar um segmented control inspirado no iOS, com as opções:

- Todos.
- Operação.
- Cliente.
- Cardápio.

O controle deve permitir filtrar os diagnósticos localmente.

## Diagnósticos demonstrativos

### Diagnóstico 01 — Atrasos no horário de pico

Descrição:

"+27% no tempo de preparo às sextas, das 19h às 21h."

Prioridade: Alta.

Categoria: Operação.

### Diagnóstico 02 — Sobrecarga na cozinha

Descrição:

"Volume de pedidos 42% acima da média no jantar de sexta."

Prioridade: Média.

Categoria: Operação.

### Diagnóstico 03 — Reclamações sobre temperatura

Descrição:

"Aumento de 18% nas avaliações mencionando comida fria."

Prioridade: Média.

Categoria: Cliente.

### Diagnóstico 04 — Oportunidade no cardápio

Descrição:

"Pratos com alta demanda e baixa margem de preparo."

Prioridade: Baixa.

Categoria: Cardápio.

## Design da lista

Cada diagnóstico deve apresentar:

- Ícone representativo.
- Título.
- Descrição.
- Badge de prioridade.
- Chevron à direita.

O primeiro diagnóstico deverá aparecer selecionado por padrão, com background laranja extremamente suave.

As demais linhas devem possuir divisores discretos.

## Interação

Ao clicar em um diagnóstico:

- Atualizar o estado selecionado.
- Destacar visualmente a linha.
- Atualizar o conteúdo do Explorador de Causa Raiz.
- Atualizar as recomendações relacionadas, quando existirem no conjunto de dados fictícios.

Não criar navegação para outra página nesta etapa.

A interação deve ocorrer dentro da própria página.

---

# 8. Componente 03 — Explorador de causa raiz

Esta é uma das funcionalidades visuais mais importantes da página.

Título:

**Explorador de causa raiz**

Subtítulo:

"Entenda a cadeia de fatores por trás do problema."

O componente deve apresentar uma sequência visual de possíveis relações entre fatores operacionais.

## Cenário inicial

Para o diagnóstico "Atrasos no horário de pico", apresentar quatro etapas:

**Etapa 01 — Volume de pedidos**

+42%

"no volume de pedidos"

**Etapa 02 — Sobrecarga na cozinha**

"115% da capacidade estimada"

**Etapa 03 — Tempo de preparo**

+27%

"no tempo de preparo"

**Etapa 04 — Satisfação do cliente**

-0,4

"na satisfação do cliente"

## Layout

Criar quatro cards horizontais conectados por setas discretas em laranja.

Cada card deverá conter:

- Ícone.
- Indicador principal ou título.
- Descrição curta.
- Alinhamento consistente.

O segundo card deverá receber um destaque visual em laranja suave.

As conexões devem ser elegantes e proporcionais.

## Interações

- Hover suave nos cards.
- Tooltip contextual com explicações.
- Atualização da sequência conforme o diagnóstico selecionado, quando houver dados demonstrativos.
- Para diagnósticos sem cadeia detalhada, apresentar um estado demonstrativo coerente em vez de reutilizar uma análise incorreta.

**Importante:** Não apresentar essas relações como causalidade comprovada. Utilizar textos como "Possível relação entre fatores" ou "Hipótese operacional" quando necessário.

No mobile, transformar a sequência horizontal em uma composição vertical, preservando a ordem lógica e a legibilidade.

---

# 9. Componente 04 — Recomendações da MESA

Criar um card com o título:

**Recomendações da MESA**

Utilizar um pequeno detalhe visual de destaque ao lado do título, sem exagerar em símbolos de IA.

Exibir três recomendações:

### Recomendação 01

"Ajustar escala de cozinha para sexta"

Descrição:

"Reforçar a equipe entre 18h e 22h."

### Recomendação 02

"Testar novo tempo de pré-preparo"

Descrição:

"Reduzir em até 7 minutos o tempo total."

### Recomendação 03

"Revisar itens com mais reclamações"

Descrição:

"Priorizar ajustes de embalagem e entrega."

Cada recomendação deverá apresentar:

- Indicador de seleção.
- Título.
- Descrição.
- Chevron.
- Estado hover.

## Ações

Na parte inferior, criar dois botões.

**Botão primário: Simular cenário**

Estilo:

- Laranja MESA.
- Texto branco.
- Ícone de execução.
- Cantos arredondados.

Comportamento nesta fase:

Abrir um modal demonstrativo informando que a simulação detalhada estará disponível na página Simulador.

Não implementar cálculos reais nesta etapa.

**Botão secundário: Adicionar ao plano**

Estilo:

- Branco.
- Borda sutil.
- Ícone de adição.

Comportamento:

Adicionar a recomendação selecionada a uma lista local demonstrativa de planos de ação.

Exibir um toast de confirmação.

Não persistir em banco de dados.

---

# 10. Dados demonstrativos e tipagem

Centralizar os dados fictícios em arquivos separados.

Criar tipos TypeScript para:

- OperationalHealth.
- OperationalFactor.
- Diagnostic.
- DiagnosticPriority.
- RootCauseStep.
- Recommendation.

Cada diagnóstico deve possuir identificador único, categoria, prioridade, descrição, possíveis fatores e recomendações relacionadas.

Evitar condicionar a interface diretamente a textos ou índices de arrays.

Utilizar identificadores estáveis.

Garantir que o filtro, a seleção e o conteúdo exibido sejam consistentes.

Caso o usuário selecione uma categoria que não contenha o diagnóstico atualmente selecionado, selecionar automaticamente o primeiro diagnóstico disponível ou apresentar um estado vazio apropriado.

---

# 11. Responsividade

## Desktop

Reproduzir a composição da imagem de referência, com os quatro painéis distribuídos em duas linhas.

## Tablet

Reorganizar os cards de acordo com o espaço disponível.

Garantir que os controles de filtro não fiquem comprimidos.

## Mobile

- Cards em coluna única.
- Títulos e textos legíveis.
- Indicador de saúde operacional adaptado.
- Filtros com rolagem horizontal, se necessário.
- Diagnósticos com badges bem posicionados.
- Explorador de causa raiz em orientação vertical.
- Botões de recomendação adaptados à largura disponível.

Não permitir overflow horizontal da página.

---

# 12. Componentização

Organizar a implementação em componentes reutilizáveis.

Sugestões de componentes:

- DiagnosticsPageHeader.
- OperationalHealthCard.
- OperationalFactorItem.
- DiagnosticsList.
- DiagnosticListItem.
- DiagnosticPriorityBadge.
- RootCauseExplorer.
- RootCauseStepCard.
- RecommendationsCard.
- RecommendationItem.

Adaptar os nomes à convenção existente no projeto.

Reutilizar os componentes compartilhados já disponíveis, especialmente cards, badges, botões, tooltips e modais.

Evitar duplicação de código.

---

# 13. Animações e microinterações

Utilizar animações discretas para:

- Entrada dos componentes.
- Transição de seleção.
- Atualização do explorador.
- Hover de diagnósticos.
- Abertura de modais.
- Feedback de ações.

As animações devem ser rápidas, suaves e naturais.

Evitar movimentos exagerados.

Respeitar `prefers-reduced-motion`.

O resultado deve lembrar a fluidez de um aplicativo premium.

---

# 14. Restrições técnicas

Nesta fase, não implementar:

- Integração com LLMs.
- Agentes de IA.
- Backend.
- Banco de dados.
- APIs externas.
- Autenticação adicional.
- n8n.
- Análises reais.
- Algoritmos de causalidade.

Toda a página deve funcionar localmente com dados fictícios.

Não modificar a Home existente, exceto se for estritamente necessário para corrigir um componente compartilhado, preservando sua aparência e comportamento.

---

# 15. Critérios de aceite

A implementação estará concluída quando:

1. A página Diagnósticos estiver acessível pela sidebar existente.
2. O design estiver visualmente próximo da imagem anexada.
3. A página mantiver a identidade premium do MESA.
4. Os quatro painéis estiverem implementados.
5. O filtro de categorias funcionar localmente.
6. A seleção de diagnósticos atualizar o conteúdo relacionado.
7. O Explorador de Causa Raiz apresentar relações demonstrativas coerentes.
8. As recomendações possuírem interações visuais.
9. Os modais e toasts funcionarem.
10. A página estiver responsiva.
11. A Home continuar funcionando sem alterações visuais inesperadas.
12. O projeto não apresentar erros de TypeScript, lint ou build.

---

# 16. Instruções finais para implementação

Antes de escrever código, inspecione o projeto existente e apresente um plano breve de implementação.

Depois, implemente a página Diagnósticos seguindo a imagem anexada.

Ao finalizar:

- Execute as verificações disponíveis.
- Informe os arquivos criados e modificados.
- Explique como acessar a nova página.
- Identifique quais interações são demonstrativas.
- Confirme que a Home foi preservada.

**Prioridade: fidelidade visual, consistência com o design system existente e qualidade de experiência.**

Não avance para a página Simulador nem para as demais funcionalidades do MESA.

Quero uma página que pareça parte de um SaaS premium pronto para ser apresentado a investidores ou clientes, e não apenas um protótipo acadêmico.