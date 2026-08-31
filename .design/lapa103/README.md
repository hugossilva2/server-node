# Card — Bom Jesus da Lapa, 103 anos

Cards de Instagram para o aniversário de emancipação política de
Bom Jesus da Lapa/BA (31 de agosto de 1923 — 103 anos em 2026).

Publicado em: https://claude.ai/code/artifact/03fec196-b9cb-4834-a67c-e4c438ee6ef1

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `Main.dc.html` | Card do feed, 1080×1080 — peça principal |
| `SeloClaro.dc.html` | Alternativa clara, 1080×1080, sem foto |
| `Story.dc.html` | Story, 1080×1920 |
| `canvas.json` | Posição das pranchetas no canvas |
| `santuario.jpg` | Foto do Santuário, recorte vertical (coluna do feed) |
| `santuario-story.jpg` | Foto do Santuário, recorte do story |
| `fitas.jpg` | Faixa das fitas do Santuário, usada como borda |

O `.html` publicado não é versionado — ele é gerado a partir dos arquivos
acima e pesa 2,7 MB.

## Pendências

- **Logo do candidato.** Os retângulos tracejados são o espaço reservado.
  Substituir por um PNG com fundo transparente.
- Confirmar com o jurídico da campanha se a peça precisa levar número e
  partido.

## Regerar o canvas

Rode a skill `/design` na pasta e ela reaproveita estes arquivos, ou
gere manualmente com o `seed-canvas.mjs` da skill:

```bash
node "<base da skill design>/seed-canvas.mjs" \
  --template "<base da skill design>/payload.template.html" \
  --out bom-jesus-da-lapa-103-anos.html \
  --title "Bom Jesus da Lapa 103 Anos" \
  --artboard Main.dc.html --artboard SeloClaro.dc.html --artboard Story.dc.html \
  --image santuario.jpg --image santuario-story.jpg --image fitas.jpg \
  --canvas canvas.json
```

## Fontes da data

- https://bomjesusdalapa.ba.gov.br — site oficial da prefeitura
- https://www.bomjesusdalapanoticias.com.br — celebração dos 103 anos
