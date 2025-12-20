/* quiz.js
   - 56 questions (tes textes exacts)
   - Choix multiples (checkbox) sans limite
   - Enregistre les profils cochés
   - Calcule profil dominant + secondaire
   - Égalités: départage aléatoire
   - Affiche la figure divine + conclusion associées au couple (dominant -> secondaire)
*/

const PROFILES = [
  "Leader",
  "Combattant",
  "Créatif",
  "Protecteur",
  "Sensible",
  "Indépendant",
  "Libre",
  "Séducteur",
];

/**
 * 56 combinaisons ordonnées: 8 profils * 7 (sans dom==sec).
 * Clé: `${dominant}->${secondary}`
 *
 * Chaque entrée:
 * - figure: "Nom"
 * - tagline: courte phrase résumant le lien profil->figure
 * - conclusion: texte (placeholder ~600 mots, à écrire plus tard)
 */
const PAIR_RESULTS = {
  // --- LEADER dominant ---
  "Leader->Combattant": {
    figure: "Zeus",
    tagline: "Autorité suprême qui impose sa volonté par la force.",
    conclusion: "À ÉCRIRE (≈600 mots) — Zeus — Leader → Combattant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Leader->Créatif": {
    figure: "Athéna",
    tagline: "Dirige par l’intelligence, la stratégie et l’invention.",
    conclusion: "À ÉCRIRE (≈600 mots) — Athéna — Leader → Créatif.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Leader->Protecteur": {
    figure: "Héra",
    tagline: "Autorité fondée sur la protection de l’ordre et des liens.",
    conclusion: "À ÉCRIRE (≈600 mots) — Héra — Leader → Protecteur.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Leader->Séducteur": {
    figure: "Ouranos",
    tagline: "Chef dominé par la passion et la possession.",
    conclusion: "À ÉCRIRE (≈600 mots) — Ouranos — Leader → Séducteur.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Leader->Libre": {
    figure: "Jason",
    tagline: "Chef aventureux : avance vite, change de cap, entraîne les autres.",
    conclusion: "À ÉCRIRE (≈600 mots) — Jason — Leader → Libre.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Leader->Indépendant": {
    figure: "Cronos",
    tagline: "Dirige seul, contrôle et coupe ce qui menace son pouvoir.",
    conclusion: "À ÉCRIRE (≈600 mots) — Cronos — Leader → Indépendant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Leader->Sensible": {
    figure: "Poséidon",
    tagline: "Autorité puissante, mais émotionnelle et imprévisible.",
    conclusion: "À ÉCRIRE (≈600 mots) — Poséidon — Leader → Sensible.\n\n(Colle ici ton texte de conclusion.)",
  },

  // --- COMBATTANT dominant ---
  "Combattant->Leader": {
    figure: "Arès",
    tagline: "Combattant qui veut commander par l’intimidation et la force.",
    conclusion: "À ÉCRIRE (≈600 mots) — Arès — Combattant → Leader.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Combattant->Créatif": {
    figure: "Ulysse",
    tagline: "Force et courage soutenus par la ruse et l’adaptation.",
    conclusion: "À ÉCRIRE (≈600 mots) — Ulysse — Combattant → Créatif.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Combattant->Protecteur": {
    figure: "Hector",
    tagline: "Guerrier qui se bat d’abord pour défendre les siens.",
    conclusion: "À ÉCRIRE (≈600 mots) — (Figure à définir) — Combattant → Protecteur.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Combattant->Séducteur": {
    figure: "Achille",
    tagline: "Héros glorieux : intensité, ego, besoin d’être reconnu.",
    conclusion: "À ÉCRIRE (≈600 mots) — Achille — Combattant → Séducteur.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Combattant->Libre": {
    figure: "À Bellérophon",
    tagline: "Héros audacieux qui cherche le dépassement et le risque.",
    conclusion: "À ÉCRIRE (≈600 mots) — (Figure à définir) — Combattant → Libre.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Combattant->Indépendant": {
    figure: "Ajax",
    tagline: "Force solitaire : fierté, rigidité, agit sans compromis.",
    conclusion: "À ÉCRIRE (≈600 mots) — Ajax — Combattant → Indépendant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Combattant->Sensible": {
    figure: "Héraclès",
    tagline: "Puissance immense, mais émotions intenses qui débordent.",
    conclusion: "À ÉCRIRE (≈600 mots) — Héraclès — Combattant → Sensible.\n\n(Colle ici ton texte de conclusion.)",
  },

  // --- CRÉATIF dominant ---
  "Créatif->Leader": {
    figure: "Prométhée",
    tagline: "Créateur qui structure le monde par la technique et les idées.",
    conclusion: "À ÉCRIRE (≈600 mots) — Prométhée — Créatif → Leader.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Créatif->Combattant": {
    figure: "Dédale",
    tagline: "Ingéniosité utilisée pour survivre et s’en sortir sous pression.",
    conclusion: "À ÉCRIRE (≈600 mots) — Dédale — Créatif → Combattant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Créatif->Protecteur": {
    figure: "Gaïa",
    tagline: "Création tournée vers la protection de ses enfants et du vivant.",
    conclusion: "À ÉCRIRE (≈600 mots) — Gaïa — Créatif → Protecteur.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Créatif->Séducteur": {
    figure: "Orphée",
    tagline: "Touche, attire, transforme par l’émotion.",
    conclusion: "À ÉCRIRE (≈600 mots) — Orphée — Créatif → Séducteur.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Créatif->Libre": {
    figure: "Dionysos",
    tagline: "Casse les cadres, libère les autres.",
    conclusion: "À ÉCRIRE (≈600 mots) — Dionysos — Créatif → Libre.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Créatif->Indépendant": {
    figure: "Héphaïstos",
    tagline: "Bâtit, répare, avance à son rythme.",
    conclusion: "À ÉCRIRE (≈600 mots) — Héphaïstos — Créatif → Indépendant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Créatif->Sensible": {
    figure: "Séléné",
    tagline: "Intensité intérieure, sensibilité et poésie.",
    conclusion: "À ÉCRIRE (≈600 mots) — Séléné — Créatif → Sensible.\n\n(Colle ici ton texte de conclusion.)",
  },

  // --- PROTECTEUR dominant ---
  "Protecteur->Leader": {
    figure: "Hestia",
    tagline: "Structure le groupe en gardant la paix.",
    conclusion: "À ÉCRIRE (≈600 mots) — Hestia — Protecteur → Leader.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Protecteur->Combattant": {
    figure: "Artémis",
    tagline: "Défend les limites et frappe si nécessaire.",
    conclusion: "À ÉCRIRE (≈600 mots) — Artémis — Protecteur → Combattant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Protecteur->Créatif": {
    figure: "Déméter",
    tagline: "Crée la sécurité par le soin et le cycle.",
    conclusion: "À ÉCRIRE (≈600 mots) — Déméter — Protecteur → Créatif.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Protecteur->Séducteur": {
    figure: "Perséphone",
    tagline: "Douceur protectrice mêlée d’attraction et de pouvoir.",
    conclusion: "À ÉCRIRE (≈600 mots) — Perséphone — Protecteur → Séducteur.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Protecteur->Libre": {
    figure: "Antigone",
    tagline: "Protège ses valeurs jusqu’à contredire les règles imposées.",
    conclusion: "À ÉCRIRE (≈600 mots) — Antigone — Protecteur → Libre.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Protecteur->Indépendant": {
    figure: "Rhéa",
    tagline: "Protège en secret pour sauver ses proches.",
    conclusion: "À ÉCRIRE (≈600 mots) — Rhéa — Protecteur → Indépendant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Protecteur->Sensible": {
    figure: "Pénélope",
    tagline: "Protection du foyer avec loyauté.",
    conclusion: "À ÉCRIRE (≈600 mots) — Pénélope — Protecteur → Sensible.\n\n(Colle ici ton texte de conclusion.)",
  },

  // --- SÉDUCTEUR dominant ---
  "Séducteur->Leader": {
    figure: "Aphrodite",
    tagline: "Attire et guide par la relation.",
    conclusion: "À ÉCRIRE (≈600 mots) — Aphrodite — Séducteur → Leader.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Séducteur->Combattant": {
    figure: "Nérée",
    tagline: "Séduit, provoque, gagne par l’impact.",
    conclusion: "À ÉCRIRE (≈600 mots) — (Figure à définir) — Séducteur → Combattant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Séducteur->Créatif": {
    figure: "Éros",
    tagline: "Le désir crée du lien, du chaos et de nouvelles possibilités.",
    conclusion: "À ÉCRIRE (≈600 mots) — Éros — Séducteur → Créatif.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Séducteur->Protecteur": {
    figure: "Calypso",
    tagline: "Proximité, soin… parfois possessif.",
    conclusion: "À ÉCRIRE (≈600 mots) — Calypso — Séducteur → Protecteur.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Séducteur->Libre": {
    figure: "Apollon",
    tagline: "Brille à sa manière quitte à compliquer l’amour.",
    conclusion: "À ÉCRIRE (≈600 mots) — Apollon — Séducteur → Libre.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Séducteur->Indépendant": {
    figure: "Circé",
    tagline: "Magnétisme autonome.",
    conclusion: "À ÉCRIRE (≈600 mots) — Circé — Séducteur → Indépendant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Séducteur->Sensible": {
    figure: "Médée",
    tagline: "Passion brûlante.",
    conclusion: "À ÉCRIRE (≈600 mots) — Médée — Séducteur → Sensible.\n\n(Colle ici ton texte de conclusion.)",
  },

  // --- LIBRE dominant ---
  "Libre->Leader": {
    figure: "Hermès",
    tagline: "Organise, négocie et débloque les situations.",
    conclusion: "À ÉCRIRE (≈600 mots) — Hermès — Libre → Leader.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Libre->Combattant": {
    figure: "Atalante",
    tagline: "Avance, lutte, refuse d’être freinée.",
    conclusion: "À ÉCRIRE (≈600 mots) — Atalante — Libre → Combattant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Libre->Créatif": {
    figure: "Pan",
    tagline: "Liberté instinctive.",
    conclusion: "À ÉCRIRE (≈600 mots) — Pan — Libre → Créatif.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Libre->Protecteur": {
    figure: "Iris",
    tagline: "Apporte, relie, protège par présence.",
    conclusion: "À ÉCRIRE (≈600 mots) — Iris — Libre → Protecteur.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Libre->Sensible": {
    figure: "Icare",
    tagline: "Fuit l’étouffement, suit l’émotion du moment.",
    conclusion: "À ÉCRIRE (≈600 mots) — (Figure à définir) — Libre → Sensible.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Libre->Indépendant": {
    figure: "Océan",
    tagline: "Explore, se détache, vit selon ses propres règles.",
    conclusion: "À ÉCRIRE (≈600 mots) — (Figure à définir) — Libre → Indépendant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Libre->Séducteur": {
    figure: "Icare",
    tagline: "Fascination du dépassement : attire par l’audace et le risque.",
    conclusion: "À ÉCRIRE (≈600 mots) — Icare — Libre → Séducteur.\n\n(Colle ici ton texte de conclusion.)",
  },

  // --- INDÉPENDANT dominant ---
  "Indépendant->Leader": {
    figure: "Hadès",
    tagline: "Contrôle calme, solitude assumée.",
    conclusion: "À ÉCRIRE (≈600 mots) — Hadès — Indépendant → Leader.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Indépendant->Combattant": {
    figure: "Thésée",
    tagline: "Tranche seul, avance sans attendre l’accord.",
    conclusion: "À ÉCRIRE (≈600 mots) — Thésée — Indépendant → Combattant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Indépendant->Créatif": {
    figure: "Hécate",
    tagline: "Autonomie intérieure.",
    conclusion: "À ÉCRIRE (≈600 mots) — Hécate — Indépendant → Créatif.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Indépendant->Protecteur": {
    figure: "Chiron",
    tagline: "Sage retiré : soigne, guide, protège sans dominer.",
    conclusion: "À ÉCRIRE (≈600 mots) — Chiron — Indépendant → Protecteur.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Indépendant->Sensible": {
    figure: "Hippolyte",
    tagline: "Rigidité et fragilité.",
    conclusion: "À ÉCRIRE (≈600 mots) — Hippolyte — Indépendant → Sensible.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Indépendant->Libre": {
    figure: "Œdipe",
    tagline: "Avance même quand tout s’effondre.",
    conclusion: "À ÉCRIRE (≈600 mots) — Œdipe — Indépendant → Libre.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Indépendant->Séducteur": {
    figure: "Daphné",
    tagline: "Protège sa liberté par la fuite.",
    conclusion: "À ÉCRIRE (≈600 mots) — Daphné — Indépendant → Séducteur.\n\n(Colle ici ton texte de conclusion.)",
  },

  // --- SENSIBLE dominant ---
  "Sensible->Leader": {
    figure: "Andromaque",
    tagline: "Mène par l’émotion, la compassion et l’exemple.",
    conclusion: "À ÉCRIRE (≈600 mots) — (Figure à définir) — Sensible → Leader.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Sensible->Combattant": {
    figure: "Iphigénie",
    tagline: "Émotion qui pousse à agir : défend par attachement, colère ou amour.",
    conclusion: "À ÉCRIRE (≈600 mots) — (Figure à définir) — Sensible → Combattant.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Sensible->Créatif": {
    figure: "Cassandre",
    tagline: "Comprend avant les autres, souvent incomprise.",
    conclusion: "À ÉCRIRE (≈600 mots) — Cassandre — Sensible → Créatif.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Sensible->Protecteur": {
    figure: "Thétis",
    tagline: "Tente d’épargner la souffrance et le destin.",
    conclusion: "À ÉCRIRE (≈600 mots) — Thétis — Sensible → Protecteur.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Sensible->Séducteur": {
    figure: "Psyché",
    tagline: "Vulnérabilité, confiance, besoin d’être aimée.",
    conclusion: "À ÉCRIRE (≈600 mots) — Psyché — Sensible → Séducteur.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Sensible->Libre": {
    figure: "Ariane",
    tagline: "Suit l’amour et l’intuition.",
    conclusion: "À ÉCRIRE (≈600 mots) — Ariane — Sensible → Libre.\n\n(Colle ici ton texte de conclusion.)",
  },
  "Sensible->Indépendant": {
    figure: "Niobé",
    tagline: "Fierté solitaire.",
    conclusion: "À ÉCRIRE (≈600 mots) — Niobé — Sensible → Indépendant.\n\n(Colle ici ton texte de conclusion.)",
  },
};

function resultKey(dominant, secondary) {
  return `${dominant}->${secondary}`;
}

// --------------------
// QUESTIONS (tes 56 questions)
// --------------------
const QUESTIONS = [
   {
    id: 1,
    text: "Quand une situation te semble injuste dans un groupe…",
    options: [
      { label: "A", text: "Tu soutiens les personnes qui en souffrent.", profile: "Protecteur" },
      { label: "B", text: "Tu réagis pour t’y opposer.", profile: "Combattant" },
      { label: "C", text: "Tu rappelles ce qui devrait être fait.", profile: "Leader" },
      { label: "D", text: "Tu cherches à comprendre pourquoi la situation existe.", profile: "Créatif" },
    ],
  },
  {
    id: 2,
    text: "Quand une relation devient importante pour toi…",
    options: [
      { label: "A", text: "Tu cherches à créer un lien fort et marquant.", profile: "Séducteur" },
      { label: "B", text: "Tu gardes ton autonomie.", profile: "Indépendant" },
      { label: "C", text: "Tu t’investis émotionnellement.", profile: "Sensible" },
      { label: "D", text: "Tu veux être fiable et présent.", profile: "Protecteur" },
    ],
  },
  {
    id: 3,
    text: "Quand tu arrives dans un nouvel environnement…",
    options: [
      { label: "A", text: "Tu l’apprivoises.", profile: "Combattant" },
      { label: "B", text: "Tu observes avant de t’impliquer.", profile: "Indépendant" },
      { label: "C", text: "Tu te fies surtout à ton ressenti.", profile: "Sensible" },
      { label: "D", text: "Tu t’adaptes rapidement.", profile: "Libre" },
    ],
  },
  {
    id: 4,
    text: "Pendant un déménagement tu…",
    options: [
      { label: "A", text: "Essaye de suivre les consignes de ton partenaire pour lui faire plaisir.", profile: "Sensible" },
      { label: "B", text: "Tu bouges le plus de boîte possible.", profile: "Combattant" },
      { label: "C", text: "Tu nettoie la cochonnerie que personne ne touche.", profile: "Indépendant" },
      { label: "D", text: "Dis aux gens quoi faire.", profile: "Leader" },
    ],
  },
  {
    id: 5,
    text: "En amitié, ce qui compte le plus pour toi…",
    options: [
      { label: "A", text: "Pouvoir vivre des moments forts.", profile: "Libre" },
      { label: "B", text: "Partager des idées.", profile: "Créatif" },
      { label: "C", text: "Être là quand ça compte.", profile: "Protecteur" },
      { label: "D", text: "Ressentir une vraie connexion émotionnelle.", profile: "Sensible" },
    ],
  },
  {
    id: 6,
    text: "Face à un conflit entre deux personnes…",
    options: [
      { label: "A", text: "Tu cherches à comprendre les deux côtés.", profile: "Créatif" },
      { label: "B", text: "Tu prends du recul.", profile: "Indépendant" },
      { label: "C", text: "Tu prends position clairement.", profile: "Combattant" },
      { label: "D", text: "Tu supervises la conversation.", profile: "Leader" },
    ],
  },
  {
    id: 7,
    text: "Pour toi, le bonheur ressemble surtout à…",
    options: [
      { label: "A", text: "La joie de réaliser un projet.", profile: "Créatif" },
      { label: "B", text: "Des relations intenses et marquantes.", profile: "Séducteur" },
      { label: "C", text: "Une communauté de soutien.", profile: "Sensible" },
      { label: "D", text: "Pouvoir changer de direction quand tu veux.", profile: "Libre" },
    ],
  },
  {
    id: 8,
    text: "Quand tu dois faire un choix important…",
    options: [
      { label: "A", text: "Tu agis rapidement.", profile: "Combattant" },
      { label: "B", text: "Tu imagines une nouvelle possibilité.", profile: "Créatif" },
      { label: "C", text: "Tu te déconnectes pour avoir la tête libre.", profile: "Libre" },
      { label: "D", text: "Tu écoutes ce que tu ressens profondément.", profile: "Sensible" },
    ],
  },
  {
    id: 9,
    text: "Quand quelqu’un te fait une remarque blessante…",
    options: [
      { label: "A", text: "Tu gères ta peine.", profile: "Sensible" },
      { label: "B", text: "Tu essaies d’expliquer calmement.", profile: "Créatif" },
      { label: "C", text: "Tu préfères ignorer.", profile: "Indépendant" },
      { label: "D", text: "Tu te défends.", profile: "Combattant" },
    ],
  },
  {
    id: 10,
    text: "Dans un travail d’équipe, tu es souvent celui/celle qui…",
    options: [
      { label: "A", text: "Apporte des idées.", profile: "Créatif" },
      { label: "B", text: "Organise et décide.", profile: "Leader" },
      { label: "C", text: "Veille à l’ambiance du groupe.", profile: "Sensible" },
      { label: "D", text: "Passe à l’action.", profile: "Combattant" },
    ],
  },
  {
    id: 11,
    text: "Quand une relation devient compliquée…",
    options: [
      { label: "A", text: "Tu fais des efforts pour écouter l’autre.", profile: "Protecteur" },
      { label: "B", text: "Tu analyses ce qui ne fonctionne pas.", profile: "Créatif" },
      { label: "C", text: "Tu prends de la distance.", profile: "Indépendant" },
      { label: "D", text: "Tu cherches à garder le lien.", profile: "Séducteur" },
    ],
  },
  {
    id: 12,
    text: "Si tu avais un super pouvoir, tu pourrais",
    options: [
      { label: "A", text: "Guérir la souffrance de tes proches.", profile: "Sensible" },
      { label: "B", text: "Devenir invisible.", profile: "Indépendant" },
      { label: "C", text: "Avoir une mémoire parfaite.", profile: "Créatif" },
      { label: "D", text: "Pouvoir te changer en ours.", profile: "Combattant" },
    ],
  },
  {
    id: 13,
    text: "Ton avenir idéal serait surtout…",
    options: [
      { label: "A", text: "Pouvoir choisir ton rythme.", profile: "Libre" },
      { label: "B", text: "Construire quelque chose de solide.", profile: "Protecteur" },
      { label: "C", text: "Être reconnu et apprécié.", profile: "Séducteur" },
      { label: "D", text: "Vivre quelque chose de profond.", profile: "Sensible" },
    ],
  },
  {
    id: 14,
    text: "En amour, tu as tendances à…",
    options: [
      { label: "A", text: "Toucher.", profile: "Séducteur" },
      { label: "B", text: "À écouter.", profile: "Sensible" },
      { label: "C", text: "Organiser des activités.", profile: "Créatif" },
      { label: "D", text: "Complimenter.", profile: "Indépendant" },
    ],
  },
  {
    id: 15,
    text: "Dans une équipe sportive, tu es celui/celle qui…",
    options: [
      { label: "A", text: "Marque.", profile: "Combattant" },
      { label: "B", text: "Proposes des nouvelles stratégies.", profile: "Créatif" },
      { label: "C", text: "Initie le cri de ralliement.", profile: "Leader" },
      { label: "D", text: "Se concentre.", profile: "Indépendant" },
    ],
  },
  {
    id: 16,
    text: "Quand un proche hésite avant une décision…",
    options: [
      { label: "A", text: "Tu proposes une solution.", profile: "Créatif" },
      { label: "B", text: "Tu lui rappelles de se prioriser.", profile: "Protecteur" },
      { label: "C", text: "Tu lui poses des questions.", profile: "Sensible" },
      { label: "D", text: "Tu l’aides à voir les pours et les contres.", profile: "Leader" },
    ],
  },
  {
    id: 17,
    text: "Pour toi, réussir sa vie, c’est surtout…",
    options: [
      { label: "A", text: "Vivre des relations.", profile: "Séducteur" },
      { label: "B", text: "Être utile aux autres.", profile: "Protecteur" },
      { label: "C", text: "Pouvoir avancer sans contraintes.", profile: "Libre" },
      { label: "D", text: "Devenir serein.", profile: "Indépendant" },
    ],
  },
  {
    id: 18,
    text: "Ton film préféré est un film…",
    options: [
      { label: "A", text: "Totalement unique.", profile: "Créatif" },
      { label: "B", text: "Drôle.", profile: "Indépendant" },
      { label: "C", text: "Fantastique.", profile: "Libre" },
      { label: "D", text: "Romantique.", profile: "Sensible" },
    ],
  },
  {
    id: 19,
    text: "Dans un groupe nouveau…",
    options: [
      { label: "A", text: "Tu t’adaptes sans trop y penser.", profile: "Libre" },
      { label: "B", text: "Tu observes avant de t’ouvrir.", profile: "Indépendant" },
      { label: "C", text: "Tu cherches un repère rassurant.", profile: "Sensible" },
      { label: "D", text: "Tu t’affirmes naturellement.", profile: "Leader" },
    ],
  },
  {
    id: 20,
    text: "Les vacances idéales sont…",
    options: [
      { label: "A", text: "Dans un endroit rempli de nouvelles personnes.", profile: "Séducteur" },
      { label: "B", text: "Un endroit calme et paisible.", profile: "Indépendant" },
      { label: "C", text: "Avec quelques amis proches.", profile: "Sensible" },
      { label: "D", text: "Un voyage d’aventures.", profile: "Libre" },
    ],
  },
  {
    id: 21,
    text: "Face à une règle que tu trouves injuste…",
    options: [
      { label: "A", text: "Tu l’évites.", profile: "Indépendant" },
      { label: "B", text: "Tu la refuses clairement.", profile: "Combattant" },
      { label: "C", text: "Tu proposes une autre façon de faire.", profile: "Créatif" },
      { label: "D", text: "Tu fais avec pour éviter les conflits.", profile: "Protecteur" },
    ],
  },
  {
    id: 22,
    text: "Quand tu vas mal, ce qui t’aide le plus…",
    options: [
      { label: "A", text: "Comprendre pourquoi.", profile: "Créatif" },
      { label: "B", text: "Être seul.", profile: "Indépendant" },
      { label: "C", text: "Agir.", profile: "Combattant" },
      { label: "D", text: "En parler.", profile: "Sensible" },
    ],
  },
  {
    id: 23,
    text: "Travailler avec quelqu’un de très différent de toi…",
    options: [
      { label: "A", text: "Tu fais attention aux émotions.", profile: "Protecteur" },
      { label: "B", text: "Tu cherches à apprendre.", profile: "Créatif" },
      { label: "C", text: "Tu poses un cadre clair.", profile: "Leader" },
      { label: "D", text: "Tu gardes tes distances.", profile: "Indépendant" },
    ],
  },
  {
    id: 24,
    text: "Si tu étais un super héros/héroïne tu serais…",
    options: [
      { label: "A", text: "Capitain America, car les gens l’écoute.", profile: "Leader" },
      { label: "B", text: "Iron Man, car il est intelligent.", profile: "Créatif" },
      { label: "C", text: "Deap Pool, car il est drôle.", profile: "Séducteur" },
      { label: "D", text: "Super Man, car il peut sauver n’importe qui.", profile: "Protecteur" },
    ],
  },
  {
    id: 25,
    text: "Des ados intimident un inconnu, tu…",
    options: [
      { label: "A", text: "Tu chuchotes à l’inconnu de te suivre.", profile: "Protecteur" },
      { label: "B", text: "Les attaques.", profile: "Combattant" },
      { label: "C", text: "Tu vas chercher de l’aide.", profile: "Indépendant" },
      { label: "D", text: "Tu leur parles en changent le sujet.", profile: "Créatif" },
    ],
  },
  {
    id: 26,
    text: "Quand tu imagines ton futur…",
    options: [
      { label: "A", text: "Ressentir des choses fortes.", profile: "Sensible" },
      { label: "B", text: "Pouvoir changer de voie.", profile: "Libre" },
      { label: "C", text: "Être apprécié.", profile: "Séducteur" },
      { label: "D", text: "Créer quelque chose de nouveau.", profile: "Créatif" },
    ],
  },
  {
    id: 27,
    text: "Sous pression …",
    options: [
      { label: "A", text: "Tu te replies sur toi.", profile: "Indépendant" },
      { label: "B", text: "Tu changes de direction.", profile: "Libre" },
      { label: "C", text: "Tu cherches à t’exprimer.", profile: "Créatif" },
      { label: "D", text: "Tu t’accroches aux personnes que tu aimes.", profile: "Sensible" },
    ],
  },
  {
    id: 28,
    text: "Un incendie s’est déclaré chez tes voisins, tu aides en…",
    options: [
      { label: "A", text: "Fonçant dans les flames.", profile: "Combattant" },
      { label: "B", text: "Organisant une levée de fonds pour les victimes.", profile: "Créatif" },
      { label: "C", text: "Soignant les personnes blessées.", profile: "Protecteur" },
      { label: "D", text: "Tu passes chaque jour voir les victimes pour leur parler.", profile: "Sensible" },
    ],
  },
  {
    id: 29,
    text: "Après une grande réussite…",
    options: [
      { label: "A", text: "Tu veux être reconnu.", profile: "Séducteur" },
      { label: "B", text: "Tu la savoures.", profile: "Indépendant" },
      { label: "C", text: "Tu penses au prochain défi.", profile: "Combattant" },
      { label: "D", text: "Tu la partages.", profile: "Sensible" },
    ],
  },
  {
    id: 30,
    text: "Pour toi, l’amour c’est…",
    options: [
      { label: "A", text: "Un espace libre.", profile: "Libre" },
      { label: "B", text: "Un lien qui fait grandir.", profile: "Créatif" },
      { label: "C", text: "Une expérience intense.", profile: "Séducteur" },
      { label: "D", text: "Un engagement.", profile: "Protecteur" },
    ],
  },
  {
    id: 31,
    text: "La fin de semaine vient d’arriver, pour bien la commencer tu…",
    options: [
      { label: "A", text: "Tu regardes une série télé au complet.", profile: "Indépendant" },
      { label: "B", text: "Fais de la cuisine avec des amis.", profile: "Créatif" },
      { label: "C", text: "Tu sors ton/ta copain/copine en tête à tête.", profile: "Protecteur" },
      { label: "D", text: "Tu fais la fête dans un festival jusqu’au petite heure du matin.", profile: "Combattant" },
    ],
  },
  {
    id: 32,
    text: "Tu as besoin de te changer les idées après un examen, tu…",
    options: [
      { label: "A", text: "Tu vas danser.", profile: "Créatif" },
      { label: "B", text: "Tu fais un training au gym avec ta musique.", profile: "Indépendant" },
      { label: "C", text: "Tu vas voir tes amis pour parler.", profile: "Sensible" },
      { label: "D", text: "Seul ou accompagné, tu vas prendre de l’air frais", profile: "Libre" },
    ],
  },
  {
    id: 33,
    text: "Être fidèle à soi-même, c’est…",
    options: [
      { label: "A", text: "Agir sans influence.", profile: "Combattant" },
      { label: "B", text: "Refuser de se laisser enfermer.", profile: "Libre" },
      { label: "C", text: "Toucher les autres par ce que tu es.", profile: "Séducteur" },
      { label: "D", text: "Assumer ses valeurs.", profile: "Leader" },
    ],
  },
  {
    id: 34,
    text: "Un mauvais premier ministre est mauvais, car…",
    options: [
      { label: "A", text: "Il a des mauvaises idées.", profile: "Créatif" },
      { label: "B", text: "Il se fou des gens.", profile: "Protecteur" },
      { label: "C", text: "Il est lâche et n’assume pas ses responsabilités.", profile: "Combattant" },
      { label: "D", text: "Il enfonce son pays dans un gouffre.", profile: "Leader" },
    ],
  },
  {
    id: 35,
    text: "Si tu pouvais régler une chose dans le monde ça serait…",
    options: [
      { label: "A", text: "La faim dans le monde.", profile: "Protecteur" },
      { label: "B", text: "La haine dans le monde.", profile: "Séducteur" },
      { label: "C", text: "La paix entre les pays.", profile: "Leader" },
      { label: "D", text: "La pauvreté dans le monde.", profile: "Indépendant" },
    ],
  },
  {
    id: 36,
    text: "Si tu pouvais améliorer quelque chose autour de toi…",
    options: [
      { label: "A", text: "La sécurité et le bien-être.", profile: "Protecteur" },
      { label: "B", text: "Les règles.", profile: "Libre" },
      { label: "C", text: "Les idées et projets.", profile: "Créatif" },
      { label: "D", text: "Les relations humaines.", profile: "Séducteur" },
    ],
  },
  {
    id: 37,
    text: "Quand tu es épuisé mentalement…",
    options: [
      { label: "A", text: "Tu changes d’air.", profile: "Libre" },
      { label: "B", text: "Tu continues coûte que coûte.", profile: "Leader" },
      { label: "C", text: "Tu ressens tout très fort.", profile: "Sensible" },
      { label: "D", text: "Tu t’isoles.", profile: "Indépendant" },
    ],
  },
  {
    id: 38,
    text: "À quel mammifère tu t’identifies le plus…",
    options: [
      { label: "A", text: "À l’éléphant.", profile: "Protecteur" },
      { label: "B", text: "Au gorille.", profile: "Créatif" },
      { label: "C", text: "Au blaireau.", profile: "Combattant" },
      { label: "D", text: "Au loup.", profile: "Leader" },
    ],
  },
  {
    id: 39,
    text: "Le métier le plus amusant serait selon…",
    options: [
      { label: "A", text: "Infirmier.", profile: "Protecteur" },
      { label: "B", text: "Pilote d’avion.", profile: "Libre" },
      { label: "C", text: "Policier.", profile: "Combattant" },
      { label: "D", text: "Enseignant.", profile: "Indépendant" },
    ],
  },
  {
    id: 40,
    text: "La réussite idéale pour toi…",
    options: [
      { label: "A", text: "Ressentir quelque chose de fort.", profile: "Sensible" },
      { label: "B", text: "Être libre.", profile: "Libre" },
      { label: "C", text: "Avoir accompli quelque chose.", profile: "Combattant" },
      { label: "D", text: "Être admiré.", profile: "Séducteur" },
    ],
  },
  {
    id: 41,
    text: "Si tu devais être enseignant de quelque chose, tu enseignerais…",
    options: [
      { label: "A", text: "La musique.", profile: "Séducteur" },
      { label: "B", text: "L’art plastique.", profile: "Créatif" },
      { label: "C", text: "L’éducation physique.", profile: "Combattant" },
      { label: "D", text: "L’éthique et culture.", profile: "Protecteur" },
    ],
  },
  {
    id: 42,
    text: "Si un choix déplaît à ton entourage…",
    options: [
      { label: "A", text: "Tu prends du recul.", profile: "Indépendant" },
      { label: "B", text: "Tu argumentes.", profile: "Séducteur" },
      { label: "C", text: "Tu assumes.", profile: "Leader" },
      { label: "D", text: "Tu adaptes ton choix.", profile: "Libre" },
    ],
  },
  {
    id: 43,
    text: "Te définir toi-même, c’est surtout…",
    options: [
      { label: "A", text: "Te dépasser.", profile: "Combattant" },
      { label: "B", text: "Être touchant pour les autres.", profile: "Séducteur" },
      { label: "C", text: "Évoluer selon tes expériences.", profile: "Libre" },
      { label: "D", text: "Avoir une image claire.", profile: "Leader" },
    ],
  },
  {
    id: 44,
    text: "Si un animal te représente, il serait…",
    options: [
      { label: "A", text: "Une araignée.", profile: "Indépendant" },
      { label: "B", text: "Un papillon.", profile: "Séducteur" },
      { label: "C", text: "Une abeille.", profile: "Protecteur" },
      { label: "D", text: "Une fourmi.", profile: "Leader" },
    ],
  },
  {
    id: 45,
    text: "En famille…",
    options: [
      { label: "A", text: "Tu gardes ton espace.", profile: "Indépendant" },
      { label: "B", text: "Tu soutiens.", profile: "Protecteur" },
      { label: "C", text: "Tu ressens tout très fort.", profile: "Sensible" },
      { label: "D", text: "Tu montres la voie.", profile: "Leader" },
    ],
  },
  {
    id: 46,
    text: "Le plat qui te représente le plus est…",
    options: [
      { label: "A", text: "Épicé.", profile: "Combattant" },
      { label: "B", text: "Réconfortant.", profile: "Protecteur" },
      { label: "C", text: "Beau.", profile: "Séducteur" },
      { label: "D", text: "Prestigieux.", profile: "Leader" },
    ],
  },
  {
    id: 47,
    text: "Quand ton choix va à l’encontre des autres…",
    options: [
      { label: "A", text: "Tu décides seul.", profile: "Indépendant" },
      { label: "B", text: "Tu convainques les autres.", profile: "Séducteur" },
      { label: "C", text: "Tu assumes.", profile: "Leader" },
      { label: "D", text: "Tu écoutes tes émotions.", profile: "Sensible" },
    ],
  },
  {
    id: 48,
    text: "Te sentir à ta place, c’est…",
    options: [
      { label: "A", text: "Être libre.", profile: "Libre" },
      { label: "B", text: "Être entouré.", profile: "Protecteur" },
      { label: "C", text: "Créer du lien fort.", profile: "Séducteur" },
      { label: "D", text: "Être reconnu.", profile: "Leader" },
    ],
  },
  {
    id: 49,
    text: "Face à un désaccord profond…",
    options: [
      { label: "A", text: "Tu défends ta position.", profile: "Combattant" },
      { label: "B", text: "Tu prends du recul.", profile: "Indépendant" },
      { label: "C", text: "Tu structures le dialogue.", profile: "Leader" },
      { label: "D", text: "Tu cherches à comprendre.", profile: "Créatif" },
    ],
  },
  {
    id: 50,
    text: "Ton avenir idéal…",
    options: [
      { label: "A", text: "Être reconnu.", profile: "Combattant" },
      { label: "B", text: "Être entouré.", profile: "Protecteur" },
      { label: "C", text: "Être apprécié.", profile: "Séducteur" },
      { label: "D", text: "Être riche.", profile: "Libre" },
    ],
  },
  {
    id: 51,
    text: "Quand tu te sens mis à l’écart…",
    options: [
      { label: "A", text: "Change d’environnement.", profile: "Libre" },
      { label: "B", text: "Tu ne t’en fais pas, tu feras des nouveaux amis au pire.", profile: "Séducteur" },
      { label: "C", text: "Tu t’affirmes.", profile: "Leader" },
      { label: "D", text: "Tu le vis très fort.", profile: "Sensible" },
    ],
  },
  {
    id: 52,
    text: "Quand tu aides quelqu’un tu le fais…",
    options: [
      { label: "A", text: "Pour respecter son autonomie.", profile: "Indépendant" },
      { label: "B", text: "Par empathie.", profile: "Sensible" },
      { label: "C", text: "Par responsabilité.", profile: "Leader" },
      { label: "D", text: "Pour protéger.", profile: "Protecteur" },
    ],
  },
  {
    id: 53,
    text: "Ton auto idéal serait…",
    options: [
      { label: "A", text: "Un pickup qui te permettra déplacer n’importe où.", profile: "Libre" },
      { label: "B", text: "Une Toyota qui ne te durera 20 ans.", profile: "Leader" },
      { label: "C", text: "Un char de sport.", profile: "Séducteur" },
      { label: "D", text: "Une mi-vanne qui pourra te permettre de conduire tous tes amis", profile: "Sensible" },
    ],
  },
  {
    id: 54,
    text: "Comme partenaire de vie, ta force sera…",
    options: [
      { label: "A", text: "De pouvoir t’adapter.", profile: "Libre" },
      { label: "B", text: "De servir.", profile: "Protecteur" },
      { label: "C", text: "De mettre de l’énergie.", profile: "Combattant" },
      { label: "D", text: "D’organiser.", profile: "Leader" },
    ],
  },
  {
    id: 55,
    text: "Le respect se gagne surtout par…",
    options: [
      { label: "A", text: "L’action.", profile: "Combattant" },
      { label: "B", text: "Le lien émotionnel.", profile: "Séducteur" },
      { label: "C", text: "La cohérence.", profile: "Leader" },
      { label: "D", text: "La liberté d’être soi.", profile: "Libre" },
    ],
  },
  {
    id: 56,
    text: "Ta manière d’avancer dans la vie…",
    options: [
      { label: "A", text: "Construire quelque chose.", profile: "Protecteur" },
      { label: "B", text: "Suivre tes émotions.", profile: "Sensible" },
      { label: "C", text: "Suivre ta propre route.", profile: "Libre" },
      { label: "D", text: "Avancer sans dépendre.", profile: "Indépendant" },
    ],
  },
];

// --------------------
// ÉTAT
// --------------------
const state = {
  index: 0,
  answersByQuestionId: {}, // { [id]: string[] profiles }
};

// --------------------
// UTILITAIRES
// --------------------
function makeEmptyCounts() {
  const counts = {};
  for (const p of PROFILES) counts[p] = 0;
  return counts;
}

function tallyProfiles(answersByQuestionId) {
  const counts = makeEmptyCounts();
  for (const qid of Object.keys(answersByQuestionId)) {
    for (const profile of answersByQuestionId[qid]) {
      if (counts[profile] === undefined) counts[profile] = 0;
      counts[profile] += 1;
    }
  }
  return counts;
}

function pickRandom(arr) {
  if (!arr || arr.length === 0) return null;
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

function getMaxScoreProfiles(counts, excluded = new Set()) {
  let max = -Infinity;
  const candidates = [];
  for (const [profile, score] of Object.entries(counts)) {
    if (excluded.has(profile)) continue;
    if (score > max) {
      max = score;
      candidates.length = 0;
      candidates.push(profile);
    } else if (score === max) {
      candidates.push(profile);
    }
  }
  return { max, candidates };
}

// Dominant: random parmi les meilleurs ex aequo
// Secondaire: random parmi les meilleurs restants (≠ dominant)
function pickTopTwoRandomTies(counts) {
  const first = getMaxScoreProfiles(counts);
  const dominantProfile = pickRandom(first.candidates) || "—";

  const excluded = new Set([dominantProfile]);
  const second = getMaxScoreProfiles(counts, excluded);
  const secondaryProfile = pickRandom(second.candidates) || "—";

  return [
    { profile: dominantProfile, score: counts[dominantProfile] ?? 0 },
    { profile: secondaryProfile, score: counts[secondaryProfile] ?? 0 },
  ];
}

function el(id) {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Element #${id} introuvable`);
  return node;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// --------------------
// RENDER
// --------------------
function renderQuestion() {
  const app = el("app");
  const q = QUESTIONS[state.index];

  if (!q) {
    renderResults();
    return;
  }

  const selectedProfiles = state.answersByQuestionId[q.id] || [];

  app.innerHTML = `
    <div class="card">
      <div class="progress">Question ${state.index + 1} / ${QUESTIONS.length}</div>
      <h2>${q.id}. ${escapeHtml(q.text)}</h2>

      <form id="optionsForm" class="options">
        ${q.options
          .map((opt, i) => {
            const checked = selectedProfiles.includes(opt.profile) ? "checked" : "";
            const inputId = `q${q.id}_${i}`;
            return `
              <label class="option" for="${inputId}">
                <input type="checkbox" id="${inputId}" name="opt" value="${escapeHtml(opt.profile)}" ${checked} />
                <span class="optionLabel">${opt.label}.</span>
                <span class="optionText">${escapeHtml(opt.text)}</span>
              </label>
            `;
          })
          .join("")}
      </form>

      <div class="actions">
        <button id="prevBtn" ${state.index === 0 ? "disabled" : ""}>Précédent</button>
        <button id="nextBtn">Suivant</button>
      </div>

      <div class="hint">
        Tu peux cocher <b>plusieurs réponses</b> si elles te ressemblent. (Aucune limite)
      </div>
    </div>
  `;

  el("prevBtn").addEventListener("click", (e) => {
    e.preventDefault();
    saveSelections(q.id);
    state.index = Math.max(0, state.index - 1);
    renderQuestion();
  });

  el("nextBtn").addEventListener("click", (e) => {
    e.preventDefault();
    saveSelections(q.id);
    state.index += 1;
    renderQuestion();
  });
}

function saveSelections(questionId) {
  const form = document.getElementById("optionsForm");
  if (!form) return;

  const checked = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
    .map((input) => input.value)
    .filter(Boolean);

  state.answersByQuestionId[questionId] = checked;
}

function renderResults() {
  const app = el("app");
  const counts = tallyProfiles(state.answersByQuestionId);
  const [top, second] = pickTopTwoRandomTies(counts);

  const key = resultKey(top.profile, second.profile);
  const mapped = PAIR_RESULTS[key];

  const figure = mapped?.figure ?? "Aucune figure liée";
  const tagline = mapped?.tagline ?? "Cette combinaison n’a pas encore été associée à une figure.";
  const conclusion = mapped?.conclusion ?? `À AJOUTER — clé: ${key}`;

  app.innerHTML = `
    <div class="card">
      <h2>Résultat</h2>

      <p><b>Profil dominant :</b> ${escapeHtml(top.profile)} (${top.score})</p>
      <p><b>Profil secondaire :</b> ${escapeHtml(second.profile)} (${second.score})</p>

      <hr/>

      <h3>${escapeHtml(figure)}</h3>
      <p style="opacity:.85; margin-top: 6px;">${escapeHtml(tagline)}</p>

      <div style="margin-top: 12px; padding: 12px; border: 1px solid rgba(255,255,255,.14); border-radius: 12px; background: rgba(0,0,0,.10); white-space: pre-wrap;">
        ${escapeHtml(conclusion)}
      </div>

      <details>
        <summary>Voir le détail des scores</summary>
        <ul>
          ${Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([profile, score]) => `<li>${escapeHtml(profile)}: ${score}</li>`)
            .join("")}
        </ul>
      </details>

      <div class="actions">
        <button id="restartBtn">Recommencer</button>
      </div>

      <div class="hint" style="margin-top:10px;">
        Clé utilisée pour la conclusion : <b>${escapeHtml(key)}</b>
      </div>
    </div>
  `;

  el("restartBtn").addEventListener("click", () => {
    state.index = 0;
    state.answersByQuestionId = {};
    renderQuestion();
  });
}

// --------------------
// INIT
// --------------------
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (!app) return;
  renderQuestion();
});
