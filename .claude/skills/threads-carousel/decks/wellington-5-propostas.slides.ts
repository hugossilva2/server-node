// ============================================================
// Carrossel — Wellington Oliveira · "5 Propostas, 5 Compromissos"
// 7 slides · formato 4:5 (Instagram feed) · publicação 17/08
// Slide 07 na versão pós-17/08 (com pedido de voto).
// ============================================================

import type { SlideData, BgType, FormatId, FontId, SurfaceId, AccentId, PurposeId } from "./lib/types";

export const SLIDES: SlideData[] = [
  {
    type: "photo",
    surface: "dark",
    accent: "yellow",
    text: "5 propostas.\n5 compromissos.",
    title: "Com prazo, número e instrumento.",
    footnote: "Para você poder cobrar. →",
    photoSrc: "/images/wellington-bracos-cruzados.png",
    photoAlign: "right",
    photoHeight: 0.62,
  },
  {
    type: "proposta",
    bgColor: "#FACC15",
    fgColor: "#0A0A0A",
    icon: "🚦",
    title: "IPVA justo",
    subtitle: "Menos imposto para quem usa o veículo como ferramenta de trabalho",
    problem:
      "Quem roda 300 km por dia para sustentar a família paga o mesmo imposto de quem deixa o carro na garagem. O carro dele não é luxo — é equipamento de trabalho.",
    commitment:
      "projeto de lei protocolado em até 90 dias de mandato, com estudo de impacto anexado e pedido digital respondido em até 30 dias.",
    boldTerms: ["90 dias", "30 dias"],
  },
  {
    type: "proposta",
    bgColor: "#1A7AB5",
    fgColor: "#FFFFFF",
    icon: "📚",
    title: "Juventude com futuro",
    subtitle: "Qualificação que conversa com as vagas que existem",
    problem:
      "Hoje o jovem faz o curso, recebe o certificado — e não tem aquela vaga na cidade dele. Ele não fracassou. A política é que foi mal feita.",
    commitment:
      "projeto de lei até o 6º mês, nenhuma turma aberta sem diagnóstico do mercado local, e 20 empresas com vaga de aprendiz até o 2º ano.",
    boldTerms: ["6º mês", "20 empresas", "2º ano"],
  },
  {
    type: "proposta",
    bgColor: "#D95030",
    fgColor: "#FFFFFF",
    icon: "🤝",
    title: "Bahia protege a mulher",
    subtitle: "Proteção que se sustenta é proteção com autonomia",
    problem:
      "Proteção sem geração de renda não se sustenta. Se ela não tiver como se sustentar em três meses, ela volta. Não por fraqueza — por falta de alternativa.",
    commitment:
      "emenda parlamentar todo ano para a rede, 8 fiscalizações presenciais por ano e projeto de lei do eixo de autonomia econômica até o 6º mês.",
    boldTerms: ["8 fiscalizações", "6º mês"],
  },
  {
    type: "proposta",
    bgColor: "#6B2F8A",
    fgColor: "#FFFFFF",
    icon: "✨",
    title: "Centro de referência",
    subtitle: "Povos e religiões de matriz africana",
    problem:
      "A mesma cultura que a Bahia exibe no cartão-postal é a que fica desprotegida no dia a dia. Racismo religioso é crime — e muita vítima não sabe disso.",
    commitment:
      "projeto de lei no 1º ano e 4 mutirões regionais de orientação jurídica e regularização até o 3º ano.",
    boldTerms: ["1º ano", "4 mutirões", "3º ano"],
  },
  {
    type: "proposta",
    bgColor: "#2CA050",
    fgColor: "#FFFFFF",
    icon: "🌿",
    title: "Recicla Bahia",
    subtitle: "Quem mais recicla é quem menos ganha",
    problem:
      "Sozinho, o catador vende ao atravessador pelo preço que oferecerem. Com prensa, balança e galpão, a cooperativa negocia direto com a indústria — e o mesmo trabalho passa a valer muito mais.",
    commitment:
      "emenda para equipamento todos os anos, no mínimo 8 cooperativas apoiadas, com publicação de qual equipamento foi para qual cooperativa.",
    boldTerms: ["8 cooperativas"],
  },
  {
    type: "photo",
    bgColor: "#FACC15",
    fgColor: "#0A0A0A",
    kicker: "Wellington Oliveira · PSB Bahia",
    text: "Compromisso com prazo\npode ser cobrado.",
    title: "Promessa sem data é só propaganda.",
    footnote: "Vote em Wellington para Deputado Estadual",
    photoSrc: "/images/wellington-maos.png",
    photoAlign: "right",
    photoHeight: 0.68,
  },
];

export const DEFAULT_FONT: FontId = "minimal";
export const DEFAULT_SURFACE: SurfaceId = "dark";
export const DEFAULT_ACCENT: AccentId = "yellow";
export const DEFAULT_PURPOSE: PurposeId = "carousel";
export const DEFAULT_BG: BgType = "none";
export const DEFAULT_FORMAT: FormatId = "threads-4x5";
