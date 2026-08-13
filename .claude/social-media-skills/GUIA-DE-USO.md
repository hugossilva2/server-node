# Guia de uso — Social Media Skills

Passo a passo prático das 14 skills instaladas em `.claude/skills/`.

---

## Como acionar uma skill

Duas formas, ambas funcionam:

1. **Linguagem natural** — a skill dispara sozinha pelo contexto.
   > "escreve um post pro LinkedIn sobre X"
   > "monta um calendário de conteúdo pro mês"
2. **Chamada explícita** — pelo nome, com barra.
   > `/post-writer-sms`

Prefira a chamada explícita quando quiser garantir qual skill vai rodar
(ex.: `post-writer-sms` vs `caption-writer-sms` para Instagram).

---

## Passo 1 — Configurar o contexto (obrigatório, ~5 min)

**Skill:** `social-media-context-sms`

Esta é a base. Ela cria o arquivo `.agents/social-media-context-sms.md`, que
**todas as outras skills leem antes de qualquer coisa**. Sem ele, as skills de
criação avisam que falta contexto e escrevem em voz genérica.

```
/social-media-context-sms
```

Ela vai oferecer dois caminhos:

- **Caminho A — Setup rápido:** você despeja um parágrafo com tudo que sabe
  (bio, público, temas) e ela monta o arquivo, perguntando só o que faltou.
- **Caminho B — Passo a passo:** ela pergunta seção por seção. Melhor se você
  ainda não tem estratégia definida.

As 8 seções que ela captura:

| # | Seção | O que responder |
| --- | --- | --- |
| 1 | Identidade | Pessoa ou marca, nome, handles, cargo, nicho específico, diferencial em uma linha |
| 2 | Público-alvo | Quem é, o que sofre, o que quer, nível de conhecimento, onde está |
| 3 | Voz e tom | 3–5 adjetivos, frases que você usa, frases que odeia, formalidade, humor |
| 4 | Pilares de conteúdo | 3–5 temas + seu ângulo próprio em cada um |
| 5 | Plataformas | Quais usa, objetivo de cada uma, frequência atual e desejada |
| 6 | Formatos | Posts, threads, carrosséis — o que prefere e o que evita |
| 7 | Posts de exemplo | **3–5 posts reais seus, copiados literalmente** |
| 8 | Anti-padrões | Temas proibidos, tons que não combinam, o que nunca escrever |

> **A seção 7 é a mais importante.** É dela que sai o casamento de voz. Cole os
> posts sem limpar nem resumir — as manias de pontuação e ritmo é que fazem
> soar como você.

**Mínimo para começar:** identidade + público + voz + uma plataforma. O resto
dá para completar depois.

**Para atualizar:** rode a skill de novo. Ela lê o arquivo, pergunta qual seção
mudar e mexe só naquela.

**Dica:** commite o `.agents/social-media-context-sms.md` no git. Não tem
segredo nenhum ali e assim ele sobrevive entre máquinas e sessões.

---

## Passo 2 — Definir estratégia (uma vez, revisar a cada trimestre)

Nesta ordem:

### 2.1 `content-strategy-sms` — o *quê* e o *porquê*
Transforma seus pilares em um framework: clusters de temas, mix de conteúdo,
posicionamento. Rode antes de pensar em calendário.

> "define minha estratégia de conteúdo"

### 2.2 `platform-strategy-sms` — as táticas por canal
Guia específico de LinkedIn, X, Threads e Bluesky: o que o algoritmo premia,
como adaptar o mesmo conteúdo, em qual focar primeiro.

> "qual plataforma eu devia priorizar?"

### 2.3 `content-calendar-sms` — o *quando*
Cadência, temas por dia, plano semanal ou mensal, lotes de produção.

> "monta um calendário de 4 semanas"

---

## Passo 3 — Criar conteúdo (o dia a dia)

Escolha a skill pelo **formato**, não pela plataforma:

| Quero... | Skill | Observação |
| --- | --- | --- |
| Um post avulso | `post-writer-sms` | Cobre todas as plataformas |
| Thread / série multi-parte | `thread-writer-sms` | X, LinkedIn, Threads, séries de Reels/Shorts |
| Carrossel slide a slide | `carousel-writer-sms` | Só o texto dos slides, não o design |
| Legenda de foto/vídeo | `caption-writer-sms` | IG, TikTok, Pinterest, Facebook, YouTube |
| Só a primeira linha | `hook-writer-sms` | Gera e testa ganchos isolados |
| Reaproveitar algo pronto | `content-repurposer-sms` | 1 conteúdo → vários formatos |

### Como pedir bem

O `post-writer-sms` só precisa de **tema + plataforma** para começar. Se você
der os dois, ele escreve direto sem interrogatório. Quanto mais você der,
melhor:

- **Tema ou rascunho** — pode ser uma ideia crua ou um texto para refinar
- **Plataforma(s)** — LinkedIn, X, Threads, Bluesky, IG, TikTok...
- **Tipo** — educativo, história, promocional, engajamento ou pessoal
- **Ângulo ou CTA** — o que o leitor deve pensar, sentir ou fazer

Exemplo de pedido bom:

> "post pro LinkedIn, tipo história, sobre a migração do banco que deu errado
> na semana passada. CTA: pergunta aberta sobre rollback."

Peça **variantes** quando quiser opções: "me dá 3 versões com ganchos
diferentes."

### O que sai

Texto pronto para copiar e colar, já dentro das regras da plataforma —
contagem de caracteres, quantidade de hashtags, quebras de linha e onde o link
deve ir. O checklist que a skill aplica antes de entregar inclui:

- Hashtags: 3–5 LinkedIn · 0–2 X · 0–1 Threads · 0 Bluesky · 1–3 Facebook ·
  3–10 Instagram · 3–5 TikTok · 0 Pinterest · ≤3 YouTube
- Link **nunca** no corpo do LinkedIn (vai no primeiro comentário) nem no
  Instagram (vai na bio)
- Nunca mais de 2–3 linhas sem quebra em branco

---

## Passo 4 — Analisar e otimizar (mensal)

Sem o MCP do BlackTwist conectado, **você precisa fornecer os dados**. Não tem
como as skills buscarem métricas sozinhas.

### 4.1 Junte os números

Aceita screenshot do painel, export CSV, ou a tabela abaixo preenchida:

| Post | Data | Impressões | Curtidas | Comentários | Reposts | Salvos | Cliques | Visitas ao perfil |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

**Mínimo viável:** impressões + curtidas + comentários de **pelo menos 5
posts**. Com menos que isso a skill se recusa a analisar — e está certa, não dá
para tirar conclusão de 3 posts.

Onde achar os números sem BlackTwist:

- **LinkedIn** — Perfil > Análises (pessoal) ou Admin da Página > Análises
- **X** — analytics.twitter.com, ou métricas por post no menu "..."
- **Threads** — Perfil > Informações (precisa de conta Criador ou 100+ seguidores)
- **Bluesky** — analytics nativo limitado; use Clearsky ou Bluesky Stats

### 4.2 Rode as análises nesta ordem

1. `performance-analyzer-sms` — o que os números dizem, post a post
2. `content-pattern-analyzer-sms` — quais temas e formatos performam melhor
3. `audience-growth-tracker-sms` — o que está puxando seguidor novo
4. `optimization-advisor-sms` — sintetiza os três acima em ações priorizadas

O `optimization-advisor-sms` é o que fecha o ciclo: as recomendações dele
alimentam a próxima rodada de `content-strategy-sms` e `content-calendar-sms`.

---

## O ciclo completo

```
social-media-context-sms  (uma vez)
          ↓
  content-strategy-sms  →  platform-strategy-sms
          ↓
   content-calendar-sms
          ↓
  post / thread / carousel / caption / hook / repurposer   ← dia a dia
          ↓
  performance → pattern → audience → optimization-advisor  ← mensal
          ↓
       (volta para a estratégia)
```

---

## Limites — o que estas skills não fazem

- **Não publicam nem agendam nada.** Sem o MCP do BlackTwist conectado, tudo
  opera em modo consultivo: geram o texto, você posta.
- **Não buscam métricas.** Os dados de análise vêm de você.
- **Não geram imagem nem design.** O `carousel-writer-sms` entrega o texto dos
  slides; o visual é por sua conta.
- **Não executam código nem chamam APIs externas.** São instruções em markdown,
  nada mais.

Para habilitar publicação, agendamento e analytics automáticos, conecte o MCP
do BlackTwist (`mcp__blacktwist`) — a lista de ferramentas está em
`TOOLS-REGISTRY.md`.

---

## Primeiro uso — comece por aqui

```
/social-media-context-sms
```

Reserve 5 minutos, tenha 3 posts seus em mãos para colar na seção 7, e o resto
flui a partir daí.
