export const DEMO_MODE = true;

export type DemoStat = {
  label: string;
  value: string;
  detail: string;
  trend?: string;
};

export const demoUser = {
  firstName: "Camille",
  lastName: "Martin",
  title: "Développeuse web front-end",
  email: "camille.martin@example.test",
  location: "Lyon",
  contract: "CDI",
  availability: "Disponible sous 1 mois",
  mobility: "Lyon · télétravail 2 j/semaine",
  completeness: 72,
};

export const demoStats: DemoStat[] = [
  {
    label: "Offres qualifiées",
    value: "24",
    detail: "dont 8 au-dessus du seuil de 70/100",
    trend: "+6 cette semaine",
  },
  {
    label: "Candidatures envoyées",
    value: "12",
    detail: "3 en attente de réponse",
    trend: "Plafond quotidien : 5",
  },
  {
    label: "Taux de réponse",
    value: "25 %",
    detail: "3 réponses sur 12 candidatures envoyées",
  },
  {
    label: "Entretiens",
    value: "2",
    detail: "1 entretien prévu cette semaine",
  },
];

export type PipelineStatus =
  | "À qualifier"
  | "Brouillon"
  | "Planifiée"
  | "Envoyée"
  | "Réponse"
  | "Entretien"
  | "Refus"
  | "Clôturée";

export const demoPipeline: { status: PipelineStatus; count: number; tone: "neutral" | "info" | "warning" | "success" | "danger" }[] = [
  { status: "À qualifier", count: 8, tone: "neutral" },
  { status: "Brouillon", count: 3, tone: "info" },
  { status: "Planifiée", count: 2, tone: "warning" },
  { status: "Envoyée", count: 3, tone: "info" },
  { status: "Réponse", count: 2, tone: "success" },
  { status: "Entretien", count: 1, tone: "success" },
  { status: "Refus", count: 1, tone: "danger" },
  { status: "Clôturée", count: 0, tone: "neutral" },
];

export type DemoOffer = {
  id: string;
  title: string;
  company: string;
  location: string;
  contract: string;
  score: number;
  source: string;
  publishedAt: string;
  reasons: string[];
  gaps: string[];
};

export const demoOffers: DemoOffer[] = [
  {
    id: "offre-001",
    title: "Développeuse front-end React",
    company: "Atelier Numérique",
    location: "Lyon 7e",
    contract: "CDI · hybride",
    score: 86,
    source: "France Travail (démo)",
    publishedAt: "22 oct. 2026",
    reasons: ["React et TypeScript confirmés", "Expérience de 4 ans", "Lyon, compatible mobilité"],
    gaps: ["Aucune expérience documentée en design system"],
  },
  {
    id: "offre-002",
    title: "Ingénieure logiciel web",
    company: "Novasoft",
    location: "Villeurbanne",
    contract: "CDI",
    score: 81,
    source: "Import CSV (démo)",
    publishedAt: "21 oct. 2026",
    reasons: ["Compétences Next.js correspondantes", "Salaire dans la fourchette"],
    gaps: ["Anglais professionnel non vérifié"],
  },
  {
    id: "offre-003",
    title: "Développeuse full-stack",
    company: "GreenStack",
    location: "Télétravail (France)",
    contract: "CDI · remote",
    score: 74,
    source: "Flux partenaire (démo)",
    publishedAt: "20 oct. 2026",
    reasons: ["TypeScript et PostgreSQL", "Télétravail compatible"],
    gaps: ["Backend Node.js à confirmer", "Déplacements trimestriels"],
  },
  {
    id: "offre-004",
    title: "Lead front-end",
    company: "Studio Orbite",
    location: "Lyon 2e",
    contract: "CDI",
    score: 58,
    source: "France Travail (démo)",
    publishedAt: "19 oct. 2026",
    reasons: ["React confirmé", "Localisation compatible"],
    gaps: ["Management d'équipe non documenté", "Score sous le seuil de 70"],
  },
];

export type DemoCompany = {
  name: string;
  sector: string;
  size: string;
  location: string;
  contactStatus: string;
  reason: string;
};

export const demoCompanies: DemoCompany[] = [
  {
    name: "Atelier Numérique",
    sector: "Agence produit",
    size: "45 salariés",
    location: "Lyon",
    contactStatus: "Contact public identifié",
    reason: "Recrutements récurrents en front-end et stack proche de votre profil.",
  },
  {
    name: "GreenStack",
    sector: "GreenTech",
    size: "20 salariés",
    location: "Télétravail",
    contactStatus: "Formulaire officiel",
    reason: "Croissance récente, pas d'offre publiée correspondant au profil.",
  },
  {
    name: "Studio Orbite",
    sector: "Design et développement",
    size: "12 salariés",
    location: "Lyon",
    contactStatus: "À qualifier",
    reason: "Projets React réguliers, aucune adresse professionnelle vérifiée.",
  },
];

export type DemoApplication = {
  id: string;
  offer: string;
  company: string;
  status: PipelineStatus;
  date: string;
  lastEvent: string;
};

export const demoApplications: DemoApplication[] = [
  {
    id: "cand-001",
    offer: "Développeuse front-end React",
    company: "Atelier Numérique",
    status: "Entretien",
    date: "18 oct. 2026",
    lastEvent: "Entretien visio planifié le 27 oct.",
  },
  {
    id: "cand-002",
    offer: "Ingénieure logiciel web",
    company: "Novasoft",
    status: "Réponse",
    date: "16 oct. 2026",
    lastEvent: "Réponse reçue, relance automatique annulée.",
  },
  {
    id: "cand-003",
    offer: "Développeuse full-stack",
    company: "GreenStack",
    status: "Envoyée",
    date: "15 oct. 2026",
    lastEvent: "Envoi confirmé, aucune réponse pour l'instant.",
  },
  {
    id: "cand-004",
    offer: "Lead front-end",
    company: "Studio Orbite",
    status: "Refus",
    date: "11 oct. 2026",
    lastEvent: "Refus reçu, aucune relance programmée.",
  },
  {
    id: "cand-005",
    offer: "Développeuse React senior",
    company: "Cobalt Labs",
    status: "Brouillon",
    date: "—",
    lastEvent: "Brouillon à relire avant contrôle.",
  },
];

export const demoAutomation = {
  enabled: false,
  dailyLimit: 5,
  minDelayHours: 24,
  window: "09:00 – 18:00",
  matchThreshold: 70,
  excludedDomains: ["exemple-interdit.test"],
  maxFollowUps: 1,
  emailConnected: false,
  requirements: [
    { label: "Profil vérifié et faits confirmés", done: true },
    { label: "Seuil de matching configuré", done: true },
    { label: "Adresse email contrôlée par le candidat", done: false },
    { label: "Test d'envoi validé", done: false },
    { label: "Règles relues et acceptées", done: false },
  ],
};

export type DemoSourceStat = {
  source: string;
  offers: number;
  applications: number;
  replies: number;
  interviews: number;
};

export const demoSourceStats: DemoSourceStat[] = [
  { source: "France Travail (démo)", offers: 12, applications: 6, replies: 2, interviews: 1 },
  { source: "Import CSV (démo)", offers: 7, applications: 4, replies: 1, interviews: 1 },
  { source: "Flux partenaire (démo)", offers: 5, applications: 2, replies: 0, interviews: 0 },
];

export const demoWeeklyActivity = [
  { day: "Lun", qualified: 3, sent: 2 },
  { day: "Mar", qualified: 5, sent: 3 },
  { day: "Mer", qualified: 2, sent: 2 },
  { day: "Jeu", qualified: 6, sent: 3 },
  { day: "Ven", qualified: 4, sent: 2 },
  { day: "Sam", qualified: 3, sent: 0 },
  { day: "Dim", qualified: 1, sent: 0 },
];

export const demoSkills = {
  confirmed: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Git"],
  toVerify: ["Node.js (niveau à confirmer)", "Anglais professionnel", "Design system"],
};

export const demoConnections = [
  { name: "Boîte email", status: "Non connectée", detail: "Intégration prévue au Sprint 9" },
  { name: "France Travail", status: "Source de démonstration", detail: "Connecteur prévu au Sprint 4" },
  { name: "Import CSV", status: "Disponible en démo", detail: "Import contrôlé prévu au Sprint 4" },
];
