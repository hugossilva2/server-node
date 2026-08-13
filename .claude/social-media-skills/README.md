# Social Media Skills

Conjunto de 14 skills de social media instaladas neste projeto, disponíveis
automaticamente para o Claude Code em `.claude/skills/`.

- **Origem:** https://github.com/blacktwist/social-media-skills
- **Versão do pacote:** 1.0.0 (marketplace.json upstream)
- **Licença:** MIT (ver `LICENSE`)

## Catálogo

### Fundação

| Skill | O que faz |
| --- | --- |
| `social-media-context-sms` | Captura público, pilares de conteúdo, tom de voz e plataformas. Gera `.agents/social-media-context-sms.md`, lido por todas as outras skills. **Use primeiro.** |

### Estratégia

| Skill | O que faz |
| --- | --- |
| `content-strategy-sms` | Define pilares de conteúdo, público-alvo e posicionamento |
| `content-calendar-sms` | Planeja cadência, temas e agendamento de publicações |
| `platform-strategy-sms` | Táticas por plataforma (LinkedIn, X, Threads, Bluesky) |

### Criação

| Skill | O que faz |
| --- | --- |
| `post-writer-sms` | Posts avulsos otimizados por plataforma |
| `thread-writer-sms` | Threads / séries multi-parte com arco narrativo |
| `carousel-writer-sms` | Roteiro slide a slide para carrosséis |
| `caption-writer-sms` | Legendas para plataformas visuais (IG, TikTok, Pinterest, FB, YouTube) |
| `content-repurposer-sms` | Reaproveita um conteúdo em vários formatos/plataformas |
| `hook-writer-sms` | Primeiras linhas / ganchos de alta retenção |

### Análise

| Skill | O que faz |
| --- | --- |
| `performance-analyzer-sms` | Interpreta métricas de posts e conta |
| `audience-growth-tracker-sms` | Acompanha crescimento de seguidores |
| `content-pattern-analyzer-sms` | Identifica formatos e temas que performam melhor |
| `optimization-advisor-sms` | Recomendações priorizadas a partir dos dados |

## Como usar

As skills são acionadas automaticamente pelo contexto da conversa
("escreve um post pro LinkedIn sobre X", "monta um calendário de conteúdo"),
ou explicitamente pelo nome: `/post-writer-sms`.

Fluxo recomendado: `social-media-context-sms` → `content-strategy-sms` →
`content-calendar-sms` → skills de criação → skills de análise.

## Integração com MCP (opcional)

As skills de análise e publicação usam o MCP do **BlackTwist**
(`mcp__blacktwist`) quando disponível — publicar, agendar, buscar métricas.
Sem ele, todas operam em **modo consultivo**: geram o conteúdo e as instruções
para publicação manual. Nenhuma skill executa código nem acessa APIs externas
por conta própria.

Referência completa das ferramentas: `TOOLS-REGISTRY.md`.

## Validação e atualização

```bash
# valida frontmatter, nomes e tamanho dos SKILL.md
bash .claude/validate-skills.sh

# atualizar a partir do upstream
git clone --depth 1 https://github.com/blacktwist/social-media-skills.git /tmp/sms
cp -r /tmp/sms/skills/* .claude/skills/
bash .claude/validate-skills.sh
```
