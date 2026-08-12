# Skills instaladas

Selecionadas a partir de [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)
e copiadas dos repositórios de origem. Escopo: projeto (valem para quem clonar este repo).

| Skill | Origem | Precisa de setup? |
|---|---|---|
| `test-driven-development` | [obra/superpowers](https://github.com/obra/superpowers/tree/main/skills/test-driven-development) | não |
| `systematic-debugging` | [obra/superpowers](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging) | não |
| `brainstorming` | [obra/superpowers](https://github.com/obra/superpowers/tree/main/skills/brainstorming) | não (companion visual é opcional) |
| `using-git-worktrees` | [obra/superpowers](https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees) | não |
| `test-fixing` | [mhattingpete/claude-skills-marketplace](https://github.com/mhattingpete/claude-skills-marketplace/tree/main/engineering-workflow-plugin/skills/test-fixing) | não |
| `postgres` | [sanjay3290/ai-skills](https://github.com/sanjay3290/ai-skills/tree/main/skills/postgres) | **sim** — ver abaixo |
| `skill-builder` | [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) | **sim** — ver abaixo |

## Notas

**`systematic-debugging` no lugar de `root-cause-tracing`.** A awesome-list aponta para
`skills/root-cause-tracing`, que não existe mais no upstream: virou o documento
`systematic-debugging/root-cause-tracing.md`. Instalada a skill que o contém.

**`postgres` precisa de dependência e credenciais.** Requer `psycopg2-binary` e um
`connections.json` (não versionado — contém credenciais). Use `connections.example.json`
como modelo. O script força `conn.set_session(readonly=True)`, então bloqueia escrita.

**`skill-builder` não funciona sozinha.** Diretório renomeado de `skill-seekers` para bater
com o campo `name: skill-builder` do frontmatter. O `SKILL.md` é só um guia para 40 ferramentas
de um servidor MCP externo. Sem rodar o servidor Skill Seekers (venv Python +
`setup_mcp.sh` no repo de origem, registrado no seu `mcp.json`), a skill não tem o que
chamar. Mantida aqui como documentação do fluxo.

**`brainstorming` traz um companion visual opcional** (`scripts/server.cjs`) que sobe um
servidor local com token. Por padrão liga em `127.0.0.1`; nada é enviado para fora.

## Como atualizar

Não há vínculo com o upstream — são cópias. Para atualizar, clone o repositório de
origem e recopie o diretório da skill.
