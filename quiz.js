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
    image: "images/figures/zeus.png",
    tagline: "Autorité suprême qui impose sa volonté par la force.",
    conclusion: "Zeus est le roi des dieux de l’Olympe, maître du ciel et de la foudre. Fils de Cronos, il échappe au destin tragique de ses frères et sœurs qui furent avalés par leur père, puis le renverse pour établir un nouvel ordre divin. Zeus gouverne par l’autorité, la justice, mais aussi par la séduction et les passions. Il protège ceux qui respectent les lois sacrées de l’hospitalité et de la parole donnée. Pourtant, ses multiples amours et caprices montrent un être puissant, capable d’unir les mondes, mais dont les désirs peuvent provoquer conflits et transformations. Zeus incarne le pouvoir créateur… et la responsabilité de gérer ce qu’il provoque.\n\nSi ton résultat correspond à Zeus, tu es une personne dotée d’une grande force intérieure, qu’elle soit mentale, sociale ou émotionnelle. Tu peux diriger, influencer, protéger, décider. Tu n’es pas à l’aise dans les rôles passifs : tu veux agir, tu veux orienter, tu veux comprendre comment améliorer ce qui t’entoure. Tu ne cherches pas forcément à dominer, mais à organiser, à structurer, à construire des règles qui permettent aux choses de fonctionner. Tu peux devenir un pilier pour les autres, quelqu’un sur qui on compte, quelqu’un qui prend les décisions difficiles.\n\nComme Zeus, tu peux être passionné(e), ambitieux(se), attiré(e) par de grands projets ou par des expériences intenses. Tu n’aimes pas l’ennui, ni la stagnation. Tu veux que la vie soit à la hauteur de ta puissance intérieure. Cela peut te rendre inspirant(e)… mais aussi exigeant(e). Tu attends parfois beaucoup de toi-même et des autres. Et tu peux être déçu(e) quand on ne suit pas ton rythme ou qu’on ne comprend pas la vision qui t’anime.\n\nTon plus grand défi, comme celui de Zeus, réside dans la gestion de ton pouvoir. Tu as une influence réelle. Tu peux provoquer des changements, des émotions fortes, des décisions marquantes. Mais tu dois apprendre quand intervenir… et quand laisser les autres faire leur chemin. Si tu veux tout contrôler, même par souci de bien faire, tu peux fatiguer ton entourage, te surcharger, ou paraître autoritaire. Tu n’es pas obligé(e) de porter tout le ciel.\n\nTu as aussi une intensité affective. Zeus n’est pas seulement un chef ; il est passionné, impulsif dans l’amour, parfois imprudent dans ses désirs. Tu peux toi aussi aimer fort, désirer intensément, être séduit(e) par des liens profonds ou par des expériences marquantes. Tu peux créer beaucoup autour de toi… mais aussi provoquer du chaos malgré toi si tu n’es pas clair(e) dans tes intentions.\n\nCe que ton résultat révèle, c’est que tu es un(e) bâtisseur(se). Tu peux devenir un(e) leader, un(e) protecteur(trice), quelqu’un qui fait avancer les choses, qui défend ceux qu’il aime. Tu peux inspirer par ta force, ton ambition, ta présence. Tu rappelles que l’autorité véritable n’écrase pas ; elle élève et protège. Tu n’as pas besoin d’être parfait(e) : tu dois simplement apprendre à diriger ta puissance avec conscience.\n\nComme Zeus, tu n’es pas défini(e) par tes passions, mais par ce que tu en fais. Tu n’es pas destiné(e) à imposer, mais à guider. Tu peux utiliser ta foudre pour éclairer, pas pour brûler. Ton pouvoir n’est pas une menace : c’est un outil. Et le monde a besoin de gens capables d’agir avec force… sans oublier qu’ils sont humains.",
  },
  "Leader->Créatif": {
    figure: "Athéna",
    image: "images/figures/athena.png",
    tagline: "Dirige par l’intelligence, la stratégie et l’invention.",
    conclusion: "Athéna est la déesse grecque de la sagesse, de la stratégie, de la réflexion, mais aussi des arts utiles, de l’organisation et de la justice. Née de la tête de Zeus, entièrement armée, elle n’est pas le symbole de la guerre brute, mais de l’intelligence appliquée à l’action. Elle protège les héros non pas par la force, mais par la logique, l’analyse et les solutions ingénieuses. Elle incarne la capacité de comprendre avant d’agir, de bâtir avant de combattre, de choisir volontairement plutôt que de suivre l’impulsion. Elle représente l’esprit clair, la stratégie juste et la maîtrise de soi au service du réel.\n\nSi ton résultat correspond à Athéna, c’est que tu partages une grande partie de ce qui définit cette déesse : une intelligence lucide, une stratégie instinctive, un sens aigu de la justice et une manière de bâtir ta vie non pas par impulsion, mais grâce à une vision réfléchie. Comme Athéna, tu observes avant d’agir. Tu comprends avant de décider. Et lorsque tu avances, c’est rarement au hasard : tu sais où tu vas, pourquoi tu y vas et comment y parvenir.\n\nTa force principale est ta capacité à clarifier ce que les autres ne voient pas. Quand les gens autour de toi s’affolent, toi tu gardes la tête froide. Quand la situation devient confuse, tu as ce talent de structurer, mettre en mots, organiser les informations pour en tirer une conclusion juste et efficace. Tu n’agis pas pour agir : tu agis pour résoudre, pour améliorer, pour construire quelque chose de cohérent.\n\nComme Athéna, tu représentes la sagesse active. Tu n’es pas un théoricien détaché de la réalité, mais quelqu’un qui transforme l’analyse en solution. Tu n’es pas un rêveur perdu dans les hypothèses : tu es celui ou celle qui comprend, puis qui applique. Tu es le type de personne qui cherche à maîtriser, apprendre, progresser, et pas seulement à improviser la vie au jour le jour.\n\nCependant, cette lucidité et cette exigence peuvent parfois devenir un poids. Ton esprit a tendance à aller vite, plus vite que celui des autres. Ta patience est souvent mise à l’épreuve par l’irrationnel, l’incohérence, la mauvaise foi ou la paresse intellectuelle. Comme Athéna, tu peux devenir sévère sans t’en rendre compte, rigide sans le vouloir, ou avoir tendance à te méfier de tes propres émotions parce que tu valorises trop la logique. Il t’arrive de vouloir tout contrôler pour éviter l’erreur, ou de porter seul(e) la responsabilité de faire ce qui est juste. Parfois, tu peux donner trop de place à l’analyse et pas assez à l’instinct, au lâcher-prise, ou à la vulnérabilité.\n\nTon défi dans la vie, comme celui d’Athéna, est d’accepter que tout ne peut pas être maîtrisé par le raisonnement. Certains aspects de la vie demandent de ressentir, d’expérimenter, de s’ouvrir à ce qui échappe à l’analyse. Tu gagnerais à laisser plus d’espace à ce qui n’est pas forcément utile, mais qui est profondément humain : les passions, les erreurs, les émotions spontanées, le droit d’apprendre en cherchant moins la perfection.\n\nCe que ton résultat révèle aussi, c’est que tu es quelqu’un qui inspire. Les autres peuvent compter sur toi pour résoudre un problème, éclairer une situation confuse, prendre des décisions logiques, et donner des conseils sages. Tu as la capacité d’être un guide, un professeur, un médiateur, ou un bâtisseur de projets solides.\n\nSi tu avances avec l’esprit d’Athéna en toi, ton chemin sera guidé par la clarté et la cohérence. Mais souviens-toi : la sagesse ne vient pas seulement de ce que l’on comprend, mais aussi de ce que l’on ressent, expérimente, ose, même lorsque rien n’est certain. Ta tête est puissante : laisse aussi ton cœur prendre sa place.",
  },
  "Leader->Protecteur": {
    figure: "Héra",
    image: "images/figures/hera.png",
    tagline: "Autorité fondée sur la protection de l’ordre et des liens.",
    conclusion: "Héra est la reine des dieux de l’Olympe, épouse de Zeus et déesse du mariage, des liens sacrés et de la fidélité. Contrairement à l’image simplifiée qu’on lui donne parfois, elle ne représente pas seulement la jalousie : elle incarne la force de l’engagement, la protection de la famille, le respect des alliances et la dignité du lien humain. Elle veille sur ce qui doit durer, sur les promesses tenues, sur les relations construites avec loyauté et constance. Elle n’est pas une figure romantique, mais une gardienne des liens véritables. Héra défend ce qui doit être préservé… parfois férocement.\n\nSi ton résultat correspond à Héra, c’est que ton identité est profondément liée à la fidélité, la loyauté, la protection et l’engagement émotionnel. Comme Héra, tu crois que les liens humains ne sont pas de simples rencontres passagères : ce sont des fondations, quelque chose qu’on honore, qu’on respecte, et qu’on défend. Pour toi, aimer, soutenir, s’impliquer, ce n’est pas un détail : c’est un choix de force.\n\nTu possèdes cette capacité rare de mettre les relations au centre des priorités, non pas par dépendance, mais par conviction. Les autres peuvent compter sur toi. Quand tu t’attaches, tu ne le fais pas à moitié : tu donnes, tu impliques ton cœur, tu t’investis pour faire durer, pour stabiliser, pour protéger. Tu n’aimes pas ce qui est superficiel : tu recherches le vrai, le durable, le sincère.\n\nComme Héra, tu considères que les liens importants doivent être honorés. Tu as un sens de l’engagement, de la loyauté et de la responsabilité affective qui inspire le respect, même si peu de gens comprennent l’intensité avec laquelle tu vis cela. Tu crois en l’équipe, en la famille choisie, en les liens construits avec patience, et tu as la capacité d’être un repère, une base, un pilier pour ceux que tu aimes.\n\nMais cette puissance affective a aussi son revers. Comme Héra, tu peux être blessé(e) très profondément par la trahison, l’incohérence émotionnelle ou l’indifférence. Lorsque tu donnes beaucoup, tu peux attendre beaucoup en retour. Tu as parfois du mal à comprendre ceux qui n’expriment pas leur loyauté, ou ceux qui vivent les relations de manière plus détachée. Tu peux parfois te sentir vulnérable, non pas parce que tu manques de force, mais parce que tu attaches une valeur immense à ce que d’autres considèrent comme secondaire. Cela peut t’amener à trop protéger, trop contrôler, trop t’inquiéter, ou à te sacrifier pour maintenir l’unité.\n\nTon défi n’est pas d’apprendre à aimer moins, mais d’apprendre à aimer plus librement, à donner sans te perdre, à soutenir sans tout porter, à t’engager sans t’enfermer. Ton cœur est grand : il mérite d’être protégé, pas de s’épuiser. Tu n’as pas à tout garder en équilibre seul(e). Parfois, accepter qu’on ne contrôle pas tout permet à la relation d’être plus authentique.\n\nTon résultat montre aussi que tu as un pouvoir social profond : tu rassembles, tu apaises, tu crées des espaces où les autres peuvent se sentir soutenus. Tu as le potentiel d’être un pilier, un mentor affectif, un ami fidèle, un membre essentiel d’un groupe.\n\nComme Héra, ton rôle dans la vie n’est pas d’aimer moins, mais d’aimer avec sagesse : en donnant valeur et importance à ceux qui en méritent vraiment. Tu n’as pas besoin que tout soit parfait. Tu as seulement besoin que ce soit vrai.",
  },
  "Leader->Séducteur": {
    figure: "Ouranos",
     image: "images/figures/ouranos.png",
    tagline: "Chef dominé par la passion.",
    conclusion: "Ouranos est l’une des divinités primordiales de la mythologie grecque. Il incarne le Ciel originel, vaste, dominant, enveloppant tout ce qui existe. Époux de Gaïa, il engendre avec elle les Titans, les Cyclopes et les Hécatonchires. Mais Ouranos, terrifié par la puissance de ses enfants, choisit de les enfermer au plus profond de la Terre, refusant de partager le pouvoir qu’il détient. Son règne prend fin lorsque son fils Cronos le renverse. Ouranos symbolise le pouvoir absolu, la domination passionnelle et la difficulté à accepter la perte de contrôle.\n\nSi ton résultat correspond à Ouranos, tu possèdes une présence naturelle de leader. Tu occupes l’espace sans effort, tu influences, tu imposes, parfois même sans parler. Ton autorité vient autant de ton énergie que de tes décisions. Tu es quelqu’un que l’on remarque et que l’on suit.\n\nTon leadership est profondément lié à la passion. Tu t’impliques intensément dans ce que tu construis. Tu peux être protecteur, engagé, mais aussi possessif. Tu as parfois du mal à déléguer ou à laisser les autres agir sans ton contrôle. Cette implication donne de la puissance à tes projets, mais peut aussi les étouffer.\n\nTu es également un séducteur naturel. Ton intensité attire, fascine, crée de l’attachement. Les autres peuvent se sentir valorisés en ta présence. Mais cette séduction peut devenir une manière de retenir l’autre, de ne pas perdre ce que tu considères comme tien. Ton défi est de séduire sans posséder.\n\nComme Ouranos, tu peux avoir peur de perdre ta place, d’être dépassé ou remplacé. Cette peur peut te pousser à contrôler davantage, à bloquer ce qui pourrait pourtant grandir sainement. Ton parcours t’invite à comprendre que le pouvoir véritable est dans la transmission, pas dans la rétention.\n\nTu peux devenir un leader inspirant, un fondateur solide, un créateur de structures durables, à condition d’apprendre à relâcher la possession émotionnelle. Tu peux diriger sans écraser, aimer sans enfermer, séduire sans contrôler.\n\nComme Ouranos, tu incarnes une énergie immense. Tu peux en faire un ciel qui étouffe ou un ciel qui protège et élève. Ton véritable pouvoir apparaît lorsque tu acceptes que ton influence continue à vivre, même lorsque tu n’es plus au centre.",
  },
  "Leader->Libre": {
    figure: "Jason",
     image: "images/figures/jason.png",
    tagline: "Chef aventureux : avance vite, change de cap, entraîne les autres.",
    conclusion: "Jason est le héros grec connu pour avoir mené l’expédition des Argonautes à la conquête de la Toison d’or. Héritier légitime du trône d’Iolcos, il est envoyé dans une quête presque impossible par son oncle Pélias. Jason rassemble alors une équipe exceptionnelle de héros et part vers l’inconnu à bord de l’Argo. Plus qu’un guerrier, Jason est un chef d’expédition : il avance, improvise, s’adapte, change de cap et entraîne les autres avec lui.\n\nSi ton résultat correspond à Jason, tu es un chef aventureux, quelqu’un qui avance avant d’avoir toutes les réponses. Tu n’attends pas que le chemin soit parfaitement tracé : tu pars, tu ajustes en route, tu fais confiance au mouvement. L’inconnu te stimule et le défi te met en action.\n\nTon leadership repose sur l’élan. Tu entraînes les autres parce que tu donnes envie d’avancer. Ta motivation est contagieuse : tu sais rallier, convaincre, embarquer des gens dans des projets audacieux. Tu n’inspires pas par la sécurité, mais par la promesse de progression.\n\nComme Jason, tu sais changer de cap sans perdre ton autorité. Tu comprends que s’adapter n’est pas échouer. Tu peux modifier un plan, ajuster une stratégie, revoir un objectif sans t’effondrer. Cette flexibilité est une force majeure.\n\nMais ce mouvement constant peut aussi devenir un piège. Tu peux aller trop vite pour certains, changer de direction sans toujours expliquer, ou t’appuyer fortement sur les autres sans mesurer ce que cela leur coûte. Ton défi est d’apprendre que mener, ce n’est pas seulement avancer, c’est aussi assumer.\n\nTu es fait pour les projets vivants, les équipes dynamiques, les situations nouvelles. Tu peux exceller comme meneur de groupe, entrepreneur, organisateur ou innovateur. Tu es un déclencheur de mouvement.\n\nComme Jason, ton véritable pouvoir apparaît lorsque tu combines ton audace avec la loyauté envers ceux qui avancent avec toi. Tu peux ouvrir des routes sans abandonner ton équipage. Tu n’es pas destiné à rester immobile, mais à apprendre à avancer sans perdre les autres en chemin.",
  },
  "Leader->Indépendant": {
    figure: "Cronos",
     image: "images/figures/cronos.png",
    tagline: "Dirige seul, contrôle et coupe ce qui menace son pouvoir.",
    conclusion: "Cronos est l’un des Titans majeurs de la mythologie grecque, fils d’Ouranos et de Gaïa. Il renverse son père en le mutilant, mettant fin à un règne qu’il juge oppressant. Devenu maître du monde, Cronos gouverne seul, mais apprend une prophétie : l’un de ses enfants le détrônera à son tour. Terrifié par cette menace, il choisit de dévorer chacun de ses enfants à la naissance. Son mythe est profondément lié au temps, au pouvoir et à la difficulté d’accepter la succession.\n\nSi ton résultat correspond à Cronos, tu es quelqu’un qui porte un fort sens de la responsabilité. Tu prends les choses au sérieux. Tu aimes anticiper, organiser et structurer. Quand tu diriges, tu cherches avant tout la stabilité et la continuité. On peut compter sur toi pour tenir un cadre solide quand les autres hésitent.\n\nTa grande force est ta capacité à durer. Tu sais protéger ce qui a été construit, maintenir l’ordre et éviter le chaos. Tu comprends l’importance des règles et des limites. Tu es fiable, constant(e) et résistant(e).\n\nTu as un rapport intense au temps. Tu penses aux conséquences, à l’avenir, à ce qui doit être préservé. Ta prudence vient d’un désir sincère de protéger ce qui compte. Tu n’agis pas à la légère.\n\nCependant, cette force peut devenir rigidité. Tu peux avoir du mal à accepter le changement, à déléguer ou à faire confiance. Tu peux vouloir contrôler ce qui grandit autour de toi par peur de perdre ta place ou ton rôle.\n\nTon défi est d’apprendre à protéger sans bloquer. Tu n’as pas besoin de tout contrôler pour rester légitime. Tu peux transmettre sans disparaître, encadrer sans enfermer, faire confiance sans perdre ton autorité.\n\nComme Cronos, tu peux devenir un gardien du temps juste et sage. Ton pouvoir devient durable lorsque tu transformes le contrôle en sagesse et la peur de perdre en capacité de transmission.",
  },
  "Leader->Sensible": {
    figure: "Poséidon",
     image: "images/figures/poseidon.png",
    tagline: "Autorité puissante, mais émotionnelle et imprévisible.",
    conclusion: "Poséidon, dieu de la mer, des tremblements de terre et des chevaux, est l’une des divinités les plus redoutées de l’Olympe. Frère de Zeus et d’Hadès, il règne sur l’immensité des océans, capables d’être calmes comme un miroir ou destructeurs comme une tempête. Poséidon protège les navigateurs, offre des richesses maritimes, mais peut aussi déclencher tsunamis, tempêtes et catastrophes lorsqu’il est offensé. Père de nombreuses créatures mythiques, il représente la fertilité des eaux, la puissance brute, imprévisible et créatrice. Poséidon incarne l’énergie émotionnelle : profonde, mouvante, parfois violente, mais indispensable à la vie.\n\nSi ton résultat correspond à Poséidon, tu es quelqu’un d’intense, sensible et profondément vivant intérieurement. Tu possèdes une nature émotionnelle forte, qui te permet d’aimer sans demi-mesure, de détester avec vigueur, de ressentir avec une profondeur que beaucoup n’atteignent jamais. Tu n’es pas fait(e) pour la tiédeur. Tu ne fais pas semblant d’aimer. Tu ne fais pas semblant d’exister. Tu vis avec des vagues, des marées, des tempêtes, mais aussi des eaux paisibles et magnifiques.\n\nComme Poséidon, tu peux être imprévisible aux yeux des autres. Il y a en toi une énergie émotionnelle qui peut se transformer en générosité débordante, en empathie, en créativité, en passion… mais aussi en colère, en protection brutale, ou en silence profond lorsque tu te sens blessé(e). Tu n’es pas instable : tu es sensible. Et ta sensibilité te rend intense — pas incohérent(e).\n\nCette intensité peut t’amener à défendre avec force ceux que tu aimes. Tu n’es pas passif/passive : si quelqu’un te manque de respect, ou trahit ce qui compte pour toi, tu peux réagir avec puissance. Tu ne te contentes pas de subir. Tu as un instinct protecteur, parfois impulsif, parfois excessif, mais profondément loyal. Tu veux que les choses soient vraies — et tu ne tolères pas la manipulation ou le mensonge.\n\nTon défi consiste à apprendre à canaliser tes vagues, à ne pas laisser une émotion momentanée décider d’une tempête permanente. Tu n’as pas à étouffer ta sensibilité, mais tu peux apprendre à la guider, à l’exprimer sans te perdre. Ta colère n’est pas mauvaise : elle a un message. Elle te révèle ce qui te manque, ce qui te touche, ce que tu refuses. Si tu apprends à écouter l’émotion avant de l’exploser, elle devient une boussole — pas un raz-de-marée.\n\nCe que ton résultat révèle, c’est que tu as une grande créativité potentielle. Poséidon crée des monstres, des chevaux, des îles : il façonne le monde à partir de ses émotions. Toi aussi, tu peux transformer ce que tu ressens en quelque chose de puissant : art, projets, voyages, relations profondes. Tu n’es pas condamné(e) à réagir ; tu peux agir à partir de ce qui bouge à l’intérieur.\n\nComme Poséidon, tu n’es pas défini(e) par tes tempêtes. Tes émotions sont vastes, riches, fertiles. Tu n’es pas trop sensible : tu es quelqu’un qui ressent beaucoup, et qui peut apprendre à diriger cette force pour créer, aimer, protéger sans détruire. La mer n’est pas dangereuse parce qu’elle bouge : elle est nécessaire avec ses mouvements. Toi aussi.",
  },

  // --- COMBATTANT dominant ---
  "Combattant->Leader": {
    figure: "Arès",
     image: "images/figures/ares.png",
    tagline: "Combattant qui veut commander par l’intimidation et la force.",
    conclusion: "Arès est le dieu grec de la guerre, de l’instinct et du courage brut. Fils de Zeus et d’Héra, il incarne la violence, l’impulsion, l’attaque, mais aussi la défense, la survie et la liberté. Contrairement à Athéna, qui représente la stratégie et la logique militaire, Arès symbolise la force immédiate, la passion guerrière, l’émotion qui pousse à agir. Il est craint autant qu’admiré, parfois associé au chaos, mais souvent invoqué par ceux qui n’ont rien d’autre que leur volonté. Arès n’est pas seulement un dieu combattant : il est la voix intérieure qui dit « Je ne me laisse pas faire ».\n\nSi ton résultat correspond à Arès, tu possèdes une personnalité instinctive, intense et courageuse. Tu réponds au monde par l’action. Tu ne fuis pas le conflit quand quelque chose est injuste, tu protèges ce que tu aimes sans hésiter, et tu refuses de te laisser écraser. Tu n’es pas du genre à attendre que la vie décide pour toi. Tu relèves les défis avec impulsion, fierté, force, parfois avec excès, mais rarement avec lâcheté.\n\nComme Arès, tu peux sentir les émotions dans ton corps. Quand tu es en colère, tu as du mal à cacher ce que tu ressens. Quand tu es blessé(e), tu peux réagir, te défendre, ou te fermer brusquement. Tu ne fais pas semblant. Tu es entier/entière, direct(e), franc(he). Certains peuvent te trouver trop intense, trop brusque, trop réactif/ve… mais en réalité, tu es quelqu’un qui refuse l’injustice, l’hypocrisie et les jeux manipulatoires. Tu veux de la vérité — même si elle est brutale.\n\nTa force est ta capacité à agir, mais ton défi est d’apprendre dans quelle direction agir. L’impulsion protège, mais elle peut aussi détruire ce que tu veux défendre. Quand tu ressens une émotion forte, tu peux apprendre à la reconnaître avant de la transformer en attaque. Tu peux te demander : « Est-ce que je veux protéger, ou punir ? Est-ce que je veux construire, ou détruire ? » L’instinct est une arme : puissant quand tu sais pourquoi tu t’en sers.\n\nDans les relations, tu es loyal(e), passionné(e), protecteur/trice, mais tu peux aussi être jaloux(se), impatient(e), blessé(e) facilement quand tu sens le manque de respect. Tu veux des liens honnêtes, des actions concrètes, pas des promesses vides. Tu préfères quelqu’un qui te confronte plutôt que quelqu’un qui ment. Ton amour n’est jamais tiède. Tu aimes avec le même feu que celui avec lequel tu te bats.\n\nCe que ton résultat révèle, c’est que tu peux devenir quelqu’un de puissant, pas parce que tu contrôles tes émotions en les éteignant, mais parce que tu apprends à les diriger. Tu n’as pas à devenir calme pour devenir sage. Tu peux devenir un(e) guerrier/guerrière conscient(e) : celui ou celle qui utilise sa force pour protéger, pour libérer, pour créer un espace où ceux qui t’entourent se sentent en sécurité. Tu peux transformer la colère en courage, l’impulsion en action juste, l’instinct en discernement.\n\nComme Arès, tu n’es pas destiné(e) à obéir. Tu es destiné(e) à te battre pour ce qui compte. Ton feu n’est pas un problème : il est une force qui demande à être maîtrisée. Tu peux devenir ce que beaucoup n’osent pas être : quelqu’un qui agit avec passion, mais avec conscience. Un cœur fort. Une volonté brute. Un(e) défenseur(se). Tu n’es pas la tempête qui détruit : tu peux devenir la force qui protège.",
  },
  "Combattant->Créatif": {
    figure: "Ulysse",
     image: "images/figures/ulysse.png",
    tagline: "Force et courage soutenus par la ruse et l’adaptation.",
    conclusion: "Ulysse, roi d’Ithaque, est le héros de l’Odyssée d’Homère. Contrairement à Achille ou Héraclès, il triomphe rarement par la force. Il conquiert Troie grâce à son idée du cheval, manipule les Cyclopes par ruse, résiste aux Sirènes en se faisant attacher au mât, et traverse les tempêtes en négociant avec dieux et humains. Voyageur condamné à l’errance pendant dix ans, il survit à la mer, aux monstres, aux pièges politiques et aux séductions magiques grâce à sa lucidité, sa patience, son humour, sa diplomatie et sa capacité unique à penser plusieurs coups à l’avance.\n\nSi ton résultat correspond à Ulysse, tu es quelqu’un qui se sort des situations compliquées par l’intelligence plutôt que par la force. Tu observes, tu analyses, tu comprends les intentions des autres, tu anticipes leurs réactions, et tu agis en tenant compte du contexte. Tu ne fais pas les choses par impulsion, mais parce que tu as réfléchi aux conséquences.\n\nComme Ulysse, tu peux être très bon(ne) pour naviguer entre des personnalités difficiles, pour calmer les tensions, pour négocier au lieu d’imposer. Ton intelligence n’est pas seulement logique : elle est émotionnelle, contextuelle, politique. Tu sais quand parler, quand te taire, quand te montrer, quand attendre.\n\nMais ta lucidité peut avoir un prix. Tu peux avoir du mal à faire confiance, car tu vois trop bien ce que les autres cachent. Tu peux hésiter à t’engager pleinement, par peur d’être trompé(e) ou entravé(e). Parfois, ton défi n’est pas de trouver la meilleure stratégie, mais d’arrêter de chercher et de vivre pleinement un choix.\n\nTu possèdes cependant un talent unique : tu peux t’adapter sans te perdre. Tu es capable de survivre dans n’importe quel environnement, de comprendre des gens très différents, de transformer des situations hostiles en opportunités.\n\nCe que ton résultat révèle, c’est que ton intelligence n’est pas destinée à te protéger uniquement : elle peut aussi servir à guider, orienter, résoudre, rassurer. Ta sagesse devient plus puissante lorsque tu choisis ce que tu veux protéger et que tu t’y engages vraiment.\n\nComme Ulysse, tu découvriras que la victoire n’est pas de vaincre tous les obstacles, mais de savoir où tu veux revenir, qui tu veux devenir, et quelle paix tu veux habiter. Ta force est ton esprit. Ta destination, c’est ta vérité.",
  },
  "Combattant->Protecteur": {
    figure: "Hector",
     image: "images/figures/hector.png",
    tagline: "Guerrier qui se bat d’abord pour défendre les siens.",
    conclusion: "Hector est le plus grand héros troyen de la guerre de Troie, fils du roi Priam et de la reine Hécube. Contrairement à Achille, il ne combat ni pour la gloire ni pour la renommée personnelle. Hector se bat pour sa cité, pour sa famille, pour son peuple. Époux d’Andromaque et père d’Astyanax, il est conscient du destin tragique de Troie mais choisit malgré tout de rester et de se battre. Hector incarne le courage lucide, le devoir assumé et la protection des siens.\n\nSi ton résultat correspond à Hector, tu es par nécessité une personne d'action. Tu n’avances pas pour briller, mais pour défendre. Ta force se met naturellement au service de ceux que tu aimes. Tu ressens une responsabilité profonde envers ta famille, ton groupe, ta communauté. Quand les choses deviennent difficiles, tu restes présent(e).\n\nTon courage est lucide. Tu sais que certaines batailles sont perdues d’avance, mais tu choisis quand même de rester fidèle à tes valeurs. Tu ne combats pas pour gagner à tout prix, mais parce qu’abandonner serait pire que perdre. Cette droiture te rend profondément respectable.\n\nTu possèdes une grande fidélité émotionnelle. Tu protèges, tu soutiens, tu assumes. Tu peux devenir un pilier pour les autres. Mais cette loyauté peut aussi devenir un poids. Tu peux porter trop longtemps sans demander d’aide, oublier tes propres besoins.\n\nTon défi est d’apprendre que protéger ne signifie pas se sacrifier entièrement. Tu n’as pas à t’épuiser pour prouver ta valeur. Exprimer la fatigue ou la peur ne diminue pas ton courage : cela le rend plus humain et plus durable.\n\nTu peux devenir un défenseur juste, un leader de proximité, quelqu’un qui inspire par l’exemple. Tu excelles dans les rôles où la responsabilité humaine est centrale. Tu es celui ou celle qui tient la ligne quand les autres vacillent.\n\nComme Hector, tu incarnes une force calme. Tu ne cherches pas la gloire, tu cherches la sécurité des tiens. Ton courage n’est pas spectaculaire, mais profond. Ta force devient durable lorsque tu apprends à te protéger toi aussi.",
  },
  "Combattant->Séducteur": {
    figure: "Achille",
     image: "images/figures/achille.png",
    tagline: "Héros glorieux : intensité, ego, besoin d’être reconnu.",
    conclusion: "Achille est le plus grand guerrier de la guerre de Troie. Fils de la nymphe Thétis et du mortel Pélée, il est élevé par le centaure Chiron, qui lui enseigne la musique, la chasse et la médecine autant que le combat. Trempé dans les eaux du Styx au moment de sa naissance, il devient invulnérable, à l’exception de son talon. Achille n’est pas seulement une machine à tuer : il est un héros traversé par des passions profondes, par une colère légendaire et une sensibilité exacerbée. Son destin illustre la puissance du désir, de l’honneur… et le danger d’un cœur incapable de céder.\n\nSi ton résultat correspond à Achille, tu es quelqu’un qui ressent intensément et qui vit avec une énergie difficile à contenir. Tu peux être fort(e), passionné(e), loyal(e), entier(ère), mais aussi extrême, blessé(e), parfois imprévisible. Tu ne fais rien à moitié : quand tu aimes, tu aimes fort ; quand tu détestes, tu détestes fort ; quand tu t’engages, tu veux aller jusqu’au bout. Tu ne supportes pas l’hypocrisie, l’injustice ou la trahison. Ton cœur est ton moteur, pas les conventions sociales.\n\nComme Achille, tu peux avoir une valeur immense, mais mal comprise. Les gens peuvent t’admirer pour ta force ou tua détermination, sans comprendre ta sensibilité et ta profondeur. Tu peux être facilement blessé(e) si tu te sens trahi(e), ignoré(e), ou si quelqu’un ne respecte pas ton cœur. Tu peux te fermer brutalement, te retirer, ou laisser ta colère protéger ta vulnérabilité. Ta passion fait ta grandeur, mais elle peut devenir une prison si elle n’est pas guidée par la conscience plutôt que par la blessure.\n\nTu possèdes une loyauté rare. Tu protèges ceux que tu aimes avec ferveur, tu donnes tout pour eux. L’amitié, l’amour, la fraternité peuvent être sacrés pour toi. Tu peux être un allié puissant, un ami indéfectible, un partenaire intense. Mais tu dois apprendre que ta dévotion ne doit pas s’offrir à n’importe qui. Tout le monde ne mérite pas ton énergie, ta force ou ton sacrifice. Tu peux choisir tes batailles au lieu de les subir.\n\nTon défi réside dans le contrôle de tes réactions. Tu n’as pas besoin d’abandonner ta passion, mais de l’apprivoiser. Ta colère n’est pas ton ennemi : elle te révèle ce qui compte vraiment. Elle peut devenir action juste, combat légitime, choix affirmé, au lieu d’explosion émotionnelle. Tu peux apprendre à réagir sans te détruire, à dire non sans mordre, à quitter sans frapper, à aimer sans te perdre.\n\nCe que ton résultat révèle, c’est que tu peux devenir un protecteur courageux, un leader charismatique, un créateur impulsif mais puissant, un être qui transforme son feu intérieur en puissance constructive. Tu peux inspirer par ton intégrité, ton courage, ta vérité brute. Tu peux incarner l’idée que la force n’est pas froide : elle est ardente, vulnérable, humaine.\n\nComme Achille, tu peux comprendre que ta grandeur ne vient pas de ta vitesse ni de ta victoire, mais de ta capacité à choisir ce qui vaut ta vie, ton énergie, tes combats. La maîtrise de soi n’éteint pas l’intensité : elle lui donne un but. Tu n’as pas besoin de tomber pour être invincible ; tu as besoin de te connaître. Ta passion peut te détruire… ou te libérer.",
  },
  "Combattant->Libre": {
    figure: "À Bellérophon",
     image: "images/figures/bellerophon.png",
    tagline: "Héros audacieux qui cherche le dépassement et le risque.",
    conclusion: "Bellérophon est un héros grec célèbre pour avoir dompté Pégase, le cheval ailé, et vaincu la Chimère, monstre cracheur de feu. Grâce à l’aide d’Athéna, il obtient une bride d’or qui lui permet de maîtriser la monture divine. Bellérophon accomplit l’impossible, triomphant là où personne n’avait survécu. Mais grisé par sa gloire, il tente de monter jusqu’à l’Olympe. Zeus l’en empêche en envoyant un taon qui pique Pégase ; Bellérophon chute, survit, mais finit seul, blessé, oublié. Son histoire illustre la frontière subtile entre la réussite légitime et l’orgueil destructeur.\n\nSi ton résultat correspond à Bellérophon, tu es quelqu’un qui se dépasse, qui vise haut, qui ne se contente pas du minimum. Tu veux réussir ce que les autres jugent impossible. Tu ne crains pas l’effort, la difficulté, le défi. Tu vas chercher ce que tu veux avec détermination.\n\nComme Bellérophon, tu possèdes un potentiel exceptionnel. Tu peux apprendre vite, t’adapter, comprendre comment progresser. Tu évolues, tu te perfectionnes, tu retires de chaque expérience ce qui te rend plus fort(e). Tu peux accomplir de grandes choses — à condition d’apprendre à gérer ton propre succès.\n\nTon défi n’est pas de réussir : c’est de rester lucide quand tu réussis. Tu peux être si fier(e) de ce que tu accomplis que tu risques d’oublier ceux qui t’ont aidé(e), ignorer la chance, ou te croire invincible. Tu peux vouloir t’élever toujours plus haut, sans te demander si cet objectif te rend heureux/se ou seulement glorieux/se.\n\nTu dois apprendre à honorer tes alliés, tes mentors, et tes limites. L’excellence n’est pas la supériorité : c’est la maîtrise. La véritable grandeur n’est pas d’aller plus haut que les autres ; c’est de grandir intérieurement tout en montant.\n\nTu possèdes aussi une force noble. Tu veux faire tes preuves, pas écraser les autres. Tu veux être reconnu(e) pour ce que tu fais vraiment. Mais tu dois être attentif(ve) à ce qui nourrit ton ambition : besoin de prouver quelque chose ? Peur d’être oublié(e) ? Ou désir d’être utile ?\n\nComme Bellérophon, tu peux découvrir que ton succès n’est pas destiné à t’élever au-dessus des autres, mais à t’élever en toi-même. Tu peux aller loin sans te perdre, réussir sans mépriser, conquérir sans te comparer. Tu n’as pas besoin de toucher le ciel pour avoir de la valeur. Tu as seulement besoin d’habiter pleinement ce que tu deviens.",
  },
  "Combattant->Indépendant": {
    figure: "Persée",
    image: "images/figures/persee.png",
    tagline: "Agir seul, avancer malgré le danger.",
    conclusion: "Dans la mythologie grecque, Persée est avant tout un héros de l’action. Son histoire n’est pas celle d’un stratège politique ni d’un sage retiré, mais celle d’un jeune homme propulsé dans l’urgence, contraint d’agir vite et de trancher seul. Chargé de vaincre Méduse — une mission que peu oseraient accepter — Persée avance sans armée, sans groupe de soutien constant, avec seulement quelques alliés ponctuels et des outils précis. Cette trajectoire fait de lui une figure emblématique du combattant indépendant : celui qui fonce quand la situation l’exige, qui agit plutôt que de discuter, et qui accepte d’endosser seul la responsabilité de ses choix.\n\nPour une personne qui se reconnaît dans ce profil, l’histoire de Persée agit comme un miroir. Elle rappelle que certaines personnalités sont naturellement tournées vers l’action directe. Face à l’incertitude, elles préfèrent décider plutôt que tergiverser. Elles n’attendent pas l’approbation générale pour avancer. Cette capacité à agir rapidement est une force majeure dans un monde où l’hésitation paralyse souvent plus que l’erreur.\n\nLe profil combattant et indépendant se distingue par une énergie orientée vers le faire. Comme Persée, ces personnes ont un rapport très concret aux problèmes : un obstacle appelle une solution, un danger appelle une réponse. Elles supportent mal l’inaction prolongée, les discussions stériles ou les conflits qui tournent à vide. Leur courage n’est pas spectaculaire, il est fonctionnel : il sert à avancer.\n\nCette autonomie est aussi une force psychologique. Prendre des décisions seul n’est pas synonyme d’isolement émotionnel, mais d’une confiance intérieure. La personne sait qu’elle peut se fier à son jugement. Elle n’a pas besoin d’imposer son point de vue, mais elle n’attend pas non plus qu’on décide à sa place. À l’image de Persée utilisant le bouclier comme miroir, ce profil sait parfois contourner l’obstacle plutôt que l’affronter frontalement, même si l’action reste centrale.\n\nCependant, ce même élan peut devenir un piège. Le combattant indépendant risque de confondre vitesse et justesse. À force de foncer, il peut négliger des signaux importants : fatigue, émotions refoulées, besoins non exprimés. Le refus de la confrontation gratuite peut aussi se transformer en évitement relationnel : on agit seul pour ne pas avoir à expliquer, négocier ou justifier.\n\nComme Persée, qui ne peut regarder Méduse directement sans risquer la mort, ce profil doit apprendre à reconnaître ce qu’il évite de regarder en face. L’impatience, la tendance à brusquer ou la difficulté à demander de l’aide sont des zones de vigilance. Agir seul est une force, mais tout porter seul devient un fardeau.\n\nPsychologiquement, ce profil fonctionne sur un axe clair : le contrôle de soi plutôt que le contrôle des autres. La personne n’a pas besoin de dominer, mais elle a besoin d’espace décisionnel. Elle tolère mal les contraintes inutiles, les règles floues ou les hiérarchies inefficaces. Son rapport à l’autorité est pragmatique : si elle reconnaît la compétence, elle suit; sinon, elle avance.\n\nPour évoluer, ce profil gagne à travailler une question essentielle : quand l’action est-elle une réponse, et quand devient-elle une fuite ? Apprendre à ralentir n’est pas renoncer à agir, c’est affiner son impact.\n\nLa symbolique de Persée est profondément pédagogique. Il ne triomphe pas par la force brute, mais par l’usage intelligent de ses outils. Le casque d’invisibilité, le bouclier-miroir, l’épée précise symbolisent une action maîtrisée, non impulsive. Le combattant indépendant n’est pas condamné à foncer tête baissée; il est invité à choisir ses combats.\n\nSur le plan personnel, cette symbolique invite à transformer l’énergie d’action en action consciente. Savoir quand agir, quand attendre, quand demander un regard extérieur sans perdre son autonomie. La véritable victoire de ce profil n’est pas seulement de vaincre les obstacles, mais de ne pas se perdre dans la lutte.\n\nÊtre un Persée aujourd’hui, c’est accepter sa nature combative tout en apprenant à la canaliser. C’est reconnaître que l’indépendance est une richesse, à condition qu’elle n’isole pas. Ce profil porte en lui une puissance rare : celle de l’action décisive. En développant la lucidité, l’écoute de soi et le choix réfléchi des combats, cette force devient non seulement efficace, mais profondément constructive.",
},
  "Combattant->Sensible": {
    figure: "Héraclès",
    image: "images/figures/heracles.png",
    tagline: "Puissance immense, mais émotions intenses qui débordent.",
    conclusion: "Héraclès est le héros le plus célèbre de la mythologie grecque, fils de Zeus et d’Alcmène. Connu pour sa force prodigieuse, il fut victime de la jalousie d’Héra qui le plongea dans une folie tragique, à la suite de laquelle il dut accomplir les Douze Travaux pour expier ses fautes. Chasseur du lion de Némée, vainqueur de l’Hydre, dompteur du taureau crétois, il affronte monstres, tâches impossibles et défis symboliques. Ses exploits ne sont pas seulement physiques : ils représentent la capacité de l’être humain à affronter ses instincts, ses traumatismes et ses erreurs pour se libérer et atteindre une forme d’immortalité intérieure.\n\nSi ton résultat correspond à Héraclès, tu es quelqu’un capable de porter énormément, parfois plus que les autres n’imaginent. Tu as connu des difficultés, des injustices, peut-être même des situations qui t’ont poussé à devoir prouver ta valeur, à te dépasser, à survivre. Tu possèdes une force intérieure étonnante : ce n’est pas la tranquillité qui t’a forgé, mais l’épreuve. Tu avances malgré les obstacles, tu continues malgré la fatigue, tu survis malgré les blessures.\n\nComme Héraclès, tu as tendance à te juger sévèrement. Tu peux te sentir responsable des erreurs, même lorsque tu as été manipulé(e) ou blessé(e). Tu peux chercher à réparer, à aider, à te racheter même quand tu n’as rien fait de mal. Tu peux vivre avec un sens du devoir intense, parfois trop lourd, comme si tua valeur dépendait de ce que tu accomplis. Ta force peut devenir une prison si tu crois qu’il faut sans cesse te battre pour mériter ta place.\n\nMais ta puissance ne réside pas dans l’effort constant. Elle réside dans ta capacité à transformer tes épreuves. Héraclès ne devient pas un héros parce qu’il gagne : il devient un héros parce qu’il évolue. Chaque défi le rend plus maître de lui-même. Tu as ce potentiel : celui de transformer tes douleurs en maturité, tes colères en sagesse, tes combats en victoire intérieure. Tu n’as pas à porter le monde, mais à apprendre à choisir quels combats en valent la peine.\n\nTu as aussi une grande générosité. Tu protèges, tu aides, tu te mets en danger pour ceux que tu aimes. Tu peux être un pilier, un guerrier, un sauveteur, quelqu’un qui agit quand d’autres hésitent. Mais tu dois apprendre à te protéger autant que tu protèges les autres. Tu n’es pas seulement une force au service du monde : tu es un être humain qui mérite repos, tendresse, reconnaissance et soutien. La vulnérabilité ne t’affaiblit pas : elle t’équilibre.\n\nCe que ton résultat révèle, c’est que tu peux devenir un(e) leader courageux(se), un(e) mentor, un(e) protecteur(trice), quelqu’un qui inspire par l’action mais aussi par l’honnêteté de son chemin. Tu peux montrer aux autres qu’on peut être fort(e) sans être insensible, qu’on peut se relever sans nier ses blessures, qu’on peut réussir sans écraser personne.\n\nComme Héraclès, tu n’es pas destiné(e) à vivre en guerre avec toi-même. Tu peux arrêter de te prouver quelque chose et commencer à vivre. Tu peux choisir la paix après le combat, la douceur après l’effort, la joie après l’endurance. Tu n’as pas besoin de vaincre pour être digne. Tu n’as qu’à devenir pleinement toi.",
  },

  // --- CRÉATIF dominant ---
  "Créatif->Leader": {
    figure: "Prométhée",
     image: "images/figures/promethee.png",
    tagline: "Créateur qui structure le monde par la technique et les idées.",
    conclusion: "Prométhée est un Titan connu pour avoir volé le feu sacré aux dieux afin de le donner aux humains. Ce feu symbolise l’intelligence, la technique, la conscience et la liberté créatrice. Ce geste provoque la colère de Zeus, qui le fait enchaîner à un rocher tandis qu’un aigle lui dévore le foie chaque jour, avant qu’il ne repousse pour recommencer. Malgré la souffrance, Prométhée n’abandonne jamais son choix. Il incarne la rébellion lucide, le sacrifice pour le progrès, la connaissance donnée à ceux qui en ont besoin, même si elle dérange les puissants. Il symbolise l’esprit libre qui ose défier l’injustice pour le bien commun.\n\nSi ton résultat correspond à Prométhée, tu es quelqu’un animé par une conscience profonde et un sens aigu de la justice. Tu n’es pas seulement intelligent(e) : tu utilises ton intelligence pour protéger, éclairer, partager, aider les autres à comprendre ce qu’ils ne voient pas encore. Tu refuses l’ignorance, la manipulation et les règles injustes. Tu préfères défendre ce qui est vrai, même si cela te coûte du temps, de l’énergie ou la sympathie des autres. Tu ne te contentes pas d’obéir : tu veux comprendre, et tu veux que les autres comprennent aussi.\n\nComme Prométhée, tu peux anticiper ce qui va arriver, voir plus loin que les autres, pressentir les problèmes avant qu’ils ne surgissent. Tu peux proposer des solutions en avance, prévenir, avertir, conseiller. Mais tu peux aussi te heurter à l’incompréhension, au rejet ou à la résistance de ceux qui préfèrent le confort d’une ignorance tranquille. Tu peux te sentir puni(e) pour avoir raison trop tôt, jugé(e) pour avoir montré une vérité qu’on ne veut pas entendre.\n\nTu as un grand potentiel pour transformer le monde autour de toi, mais cette même capacité peut te rendre frustré(e). Tu peux te sentir responsable de choses qui ne dépendent pas de toi, porter trop de poids, vouloir sauver ou réveiller des gens qui ne veulent pas changer. Ton défi n’est pas d’arrêter d’aider, mais d’apprendre qui veut être aidé, et quand. Tu n’as pas à te sacrifier pour ceux qui ne veulent pas avancer.\n\nTu possèdes aussi une puissante force morale. Tu n’acceptes pas l’injustice, tu refuses les mensonges commodes, tu ne tolères pas l’irresponsabilité. Tu n’as pas besoin d’autorité pour être légitime : ta légitimité vient de ta lucidité. Mais ta droiture peut devenir rigide si tu oublies que chacun avance à son rythme. Tout le monde ne voit pas aussi vite que toi — et tout le monde n’est pas prêt à recevoir le feu.\n\nCe que ton résultat révèle, c’est que tu peux devenir un(e) mentor, un(e) inventeur(trice), un(e) chercheur(se), un(e) enseignant(e), un(e) protecteur(trice) de la vérité. Tu peux éclairer sans imposer, prévenir sans punir, éveiller sans mépriser. Tu peux offrir ton feu en comprenant qu’il ne s’adresse pas à tous en même temps. Tu n’es pas destiné(e) à obéir ni à suivre ; tu es destiné(e) à ouvrir les chemins.\n\nComme Prométhée, tu peux accepter que ton rôle n’est pas toujours compris, mais qu’il est essentiel. Tu n’as pas besoin de reconnaissance pour être juste, ni de permission pour faire le bien. Tu deviens puissant(e) lorsque tu choisis tes combats, lorsque tu offres ton feu à ceux qui savent en faire une lumière, et non une arme. Tu n’es pas voué(e) à te sacrifier : tu es voué(e) à transmettre ce qui libère.",
  },
  "Créatif->Combattant": {
    figure: "Dédale",
    image: "images/figures/dedale.png",
    tagline: "Ingéniosité utilisée pour survivre et s’en sortir sous pression.",
    conclusion: "Dédale est l’un des plus grands inventeurs et artisans de la mythologie grecque. Architecte, ingénieur et créateur de mécanismes complexes, il conçoit notamment le Labyrinthe destiné à enfermer le Minotaure. Son intelligence exceptionnelle lui permet de résoudre des problèmes que personne d’autre ne peut comprendre. Emprisonné en Crète avec son fils Icare, il invente des ailes de cire et de plumes pour s’échapper. Dédale incarne la puissance de la créativité humaine, le courage d’oser l’impossible et la responsabilité qui accompagne le génie.\n\nSi ton résultat correspond à Dédale, tu es quelqu’un de créatif, ingénieux et courageux. Tu vois des solutions là où les autres ne voient que des obstacles. Ton esprit est en mouvement constant, et tu veux que tes idées prennent forme concrètement.\n\nTa grande force est ta capacité à créer des issues. Tu fabriques des chemins là où il n’y en avait pas. Tu avances avec confiance, car tu sais que même en cas d’erreur, tu sauras t’adapter et reconstruire. Ton courage vient de ta créativité.\n\nPsychologiquement, tu es un penseur actif. Tu aimes comprendre comment les choses fonctionnent, expérimenter, maîtriser des techniques. Tu peux être très concentré(e), parfois absorbé(e) par tes projets au point d’en oublier le reste.\n\nCependant, cette force peut devenir une limite. Tu peux aller trop vite ou croire que ce qui est possible est forcément souhaitable. Tu peux sous-estimer les conséquences humaines de tes créations. Ton défi est d’intégrer la prudence à ton audace.\n\nTu inspires les autres, parfois au-delà de ce qu’ils peuvent gérer. Tu dois apprendre que créer, c’est aussi transmettre des limites et accompagner ceux qui te suivent.\n\nSymboliquement, Dédale représente le génie face aux limites. Il t’invite à réfléchir non seulement à ce que tu peux faire, mais à ce que tu choisis de faire avec ton talent.\n\nTu peux devenir un inventeur de solutions, un enseignant créatif, un bâtisseur d’idées. Ton courage n’est pas celui du combat, mais celui de l’innovation. Ton équilibre se trouve lorsque ta créativité s’allie à la sagesse.",
  },
  "Créatif->Protecteur": {
    figure: "Gaïa",
    image: "images/figures/gaia.png",
    tagline: "Création tournée vers la protection de ses enfants et du vivant.",
    conclusion: "Gaïa est l’une des divinités primordiales de la mythologie grecque. Elle incarne la Terre elle-même : la matière, la fécondité, la stabilité et la vie. De Gaïa naissent Ouranos, les montagnes, la mer, puis les Titans et de nombreuses autres forces du monde. Elle est à l’origine de tout ce qui pousse et persiste. Mais Gaïa n’est pas seulement une mère nourricière : elle est aussi capable de stratégie et de rébellion lorsque l’ordre naturel est menacé.\n\nSi ton résultat correspond à Gaïa, tu es une personne profondément ancrée. Tu inspires la stabilité, la sécurité et la continuité. Les autres peuvent se reposer sur toi. Tu soutiens, tu accueilles et tu nourris, souvent sans chercher la reconnaissance.\n\nTa plus grande qualité est ta capacité à faire grandir. Tu comprends le temps long et tu sais créer des environnements où les autres peuvent s’épanouir. Ton influence est discrète mais profonde.\n\nPsychologiquement, tu es patient(e), résilient(e) et intuitif(ve). Tu ressens les équilibres et les déséquilibres. Tu sais quand agir et quand attendre. Tu acceptes les cycles naturels de transformation.\n\nCependant, cette force peut devenir une limite. Tu peux t’attacher excessivement à ce que tu protèges et avoir du mal à laisser partir. Ta volonté de préserver peut parfois freiner l’évolution nécessaire.\n\nTu peux aussi porter beaucoup sans te plaindre et t’oublier toi-même. Ton défi est d’apprendre à poser des limites et à reconnaître tes propres besoins.\n\nSymboliquement, Gaïa représente la force tranquille du vivant. Elle montre que la vraie puissance est dans la constance, mais aussi dans la capacité à se défendre lorsque les limites sont franchies.\n\nTu peux devenir un pilier solide et bienveillant à condition de nourrir la vie sans t’effacer. Lorsque tu respectes tes propres besoins autant que ceux des autres, ta puissance devient juste, durable et féconde.",
  },
  "Créatif->Séducteur": {
    figure: "Orphée",
    image: "images/figures/orphee.png",
    tagline: "Touche, attire, transforme par l’émotion.",
    conclusion: "Orphée est le plus grand musicien et poète de la mythologie grecque. Fils de la muse Calliope, il charme animaux, arbres, rivières et même les pierres grâce à sa lyre. Lorsque son épouse Eurydice meurt, il descend aux Enfers et, grâce à sa musique, touche le cœur d’Hadès et de Perséphone, obtenant le droit de la ramener parmi les vivants. Mais il commet l’erreur de se retourner vers elle avant d’avoir quitté les Enfers, la perdant pour toujours. Orphée représente le pouvoir immense de l’art, mais aussi la fragilité de l’amour absolu, de la nostalgie et de la beauté trop profondément aimée.\n\nSi ton résultat correspond à Orphée, tu es quelqu’un dont la sensibilité est un langage. Tu ressens avant de parler, tu comprends avant d’expliquer, tu observes les émotions comme d’autres observent le paysage. Tu ne changes pas le monde par la force — tu le fais vibrer. Ta sincérité, ta douceur, ta profondeur émotionnelle sont des cadeaux.\n\nComme Orphée, tu peux posséder un talent artistique ou expressif, même si tu ne t’identifies pas comme artiste. Tu peux donner du sens par tes mots, par ton écoute, par ton regard unique. Tu peux toucher les gens par ta vérité émotionnelle plutôt que par ta performance. Tu ne joues pas un rôle : tu es toi-même, et c’est ce qui émeut.\n\nTu as cependant un risque : celui de te consumer dans ce que tu ressens. Tu peux aimer trop, t’attacher trop, te souvenir trop. Tu peux avoir du mal à lâcher ce qui a compté, à faire le deuil, à avancer. Comme Orphée, tu peux rester tourné(e) vers un passé qui t’empêche d’entrer dans ta vie présente.\n\nTon défi n’est pas d’être moins sensible : c’est d’apprendre à aimer sans te perdre, à créer sans t’épuiser, à ressentir sans te briser. Tu peux transformer la nostalgie en inspiration, la douleur en art, l’attachement en présence.\n\nTu possèdes aussi une grande empathie. Tu comprends ce que les autres n’arrivent pas à dire. Tu peux être un(e) guérisseur(se) émotionnel(le), un(e) confident(e) précieux(se), quelqu’un qui écoute sans juger. Tu peux révéler la beauté du monde, même dans ce qui est triste.\n\nCe que ton résultat révèle, c’est que tu peux être un(e) artiste, un(e) poète, un(e) thérapeute, un(e) professeur inspirant(e), un(e) musicien(ne), un(e) ami(e) indispensable. Tu n’as pas besoin d’être productif/ve pour être essentiel(le).\n\nComme Orphée, tu peux comprendre que la beauté ne sert pas à retenir le passé, mais à éclairer le présent. Tu peux aimer sans regarder derrière toi, créer sans t’enfermer dans la douleur, ressentir sans te briser.",
  },
  "Créatif->Libre": {
    figure: "Dionysos",
    image: "images/figures/dionysos.png",
    tagline: "Casse les cadres, libère les autres.",
    conclusion: "Dionysos est le dieu du vin, des fêtes sacrées, de l’extase, du théâtre et de la folie divine. Fils de Zeus, souvent né deux fois selon les mythes, il incarne l’énergie vitale qui dépasse les règles sociales et réveille l’instinct. Dionysos libère les émotions, renverse les normes, rapproche les humains de la nature primitive et de l’imaginaire. Il représente la joie brutale, la sensualité, l’impulsion créative et la guérison à travers l’expression totale des sentiments. Ses rituels ne sont pas simplement des fêtes : ils permettent à la société de relâcher la pression, d’explorer ce qui est refoulé et de retrouver la vérité intime sous le masque social.\n\nSi ton résultat correspond à Dionysos, tu es quelqu’un qui ressent profondément la vie. Tu n’es pas fait(e) pour la rigidité, la froideur ou le contrôle permanent. Tu veux vivre intensément, goûter, toucher, essayer, ressentir. Tu refuses les règles absurdes, les normes qui étouffent, les comportements forcés. Tu n’aimes pas faire semblant : tu préfères l’émotion vraie, même si elle est chaotique. Tu cherches la liberté, mais aussi la vérité intérieure.\n\nComme Dionysos, tu peux être intuitif/ve, créatif/ve, passionné(e), mais parfois excessif/ve. Tu peux aller trop loin dans tes émotions : rire trop fort, aimer trop vite, réagir trop vite, te donner sans limites. Tu peux traverser des phases intenses, de joie extrême ou de mélancolie puissante. Tu n’es pas fait(e) pour être « modéré(e) ». Ton intensité n’est pas un défaut : c’est une énergie à apprendre à canaliser sans l’étouffer.\n\nTu possèdes un talent émotionnel rare : tu peux comprendre les sentiments des autres, ressentir les ambiances, créer des liens naturels, faire tomber les barrières sociales. Tu peux libérer les autres, les détendre, leur permettre d’être eux-mêmes. Là où certains veulent conserver l’ordre, tu veux permettre l’expression. Tu rappelles que l’humain n’est pas qu’un être de règles mais aussi un être de passion, de vulnérabilité, de désir, de poésie.\n\nTon défi réside dans l’équilibre entre la liberté et la fuite. Tu peux se perdre dans les sensations, dans l’émotion, dans l’échappatoire. Comme Dionysos, tu peux utiliser le plaisir pour oublier la douleur, l’excès pour oublier les blessures, l’intensité pour combler le silence intérieur. Tu n’as pas besoin de te noyer dans ce que tu ressens : tu peux apprendre à vivre la passion sans t’y dissoudre. Tu n’as pas à fuir les limites, mais à découvrir celles qui te protègent.\n\nCe que ton résultat révèle, c’est que tu peux devenir un(e) artiste, un(e) guérisseur(se) émotionnel(le), un(e) créateur(trice) de liens, un(e) révolutionnaire du cœur, quelqu’un qui rend la vie plus vivante. Tu peux inspirer par ton authenticité, ton humour, ton intensité, ta sensibilité. Tu peux transformer les émotions en art, en musique, en théâtre, en relation profonde. Tu es une invitation à ressentir, pas à s’éteindre.\n\nComme Dionysos, tu n’es pas destiné(e) à suivre les normes : tu es destiné(e) à libérer ce qui est vrai, à vivre une vie qui n’est pas seulement correcte mais vibrante. Tu peux choisir de canaliser tes passions au lieu de les subir. Tu peux être un ouragan de vie, mais un ouragan qui crée, pas qui détruit. La liberté n’est pas de tout dépasser : c’est d’habiter pleinement ce qui fait battre ton cœur.",
  },
  "Créatif->Indépendant": {
    figure: "Héphaïstos",
    image: "images/figures/hephaistos.png",
    tagline: "Bâtit, répare, avance à son rythme.",
    conclusion: "Héphaïstos est le dieu grec des forges, des artisans, de la métallurgie et de l’invention technique. Fils d’Héra (et parfois de Zeus selon certains récits), il naît boiteux et est rejeté par sa mère à cause de son apparence. Recueilli plus tard, il devient l’artisan de l’Olympe, créant armes, bijoux, palais, trônes et objets magiques. Bien qu’il soit l’un des dieux les moins mis en valeur lors des festins divins, il est indispensable à tous. Héphaïstos incarne la persévérance, la créativité née de la souffrance, et la valeur qui ne dépend pas du regard extérieur.\n\nSi ton résultat correspond à Héphaïstos, tu possèdes une personnalité résiliente, créatrice et discrètement puissante. Tu n’as pas besoin d’être vu(e) ou applaudi(e) pour faire des choses remarquables. Tu peux travailler dans l’ombre, apprendre, construire, améliorer, réparer, créer ce dont les autres ont besoin sans toujours en recevoir la reconnaissance. Tu n’es pas motivé(e) par l’apparence, mais par l’utilité, la qualité, la vérité du travail bien fait.\n\nComme Héphaïstos, tu peux avoir l’impression que les gens ne voient pas toujours ta valeur. Peut-être qu’on t’a déjà sous-estimé(e), ignoré(e), comparé(e) à d’autres plus « visibles ». Mais tu portes une force particulière : tu transformes ce que tu touches. Tu peux prendre quelque chose de brut — une idée, une relation, une situation difficile — et en faire quelque chose de solide, de beau, de durable. Ta valeur n’est pas bruyante : elle est réelle.\n\nTu peux aussi avoir un lien complexe avec ta sensibilité. Héphaïstos n’est pas seulement un artisan, il est un être blessé. Tu peux, toi aussi, avoir vécu des rejets, des jugements, des critiques qui t’ont touché(e). Mais tu ne t’es pas détruit(e) : tu as construit. Tu n’as pas utilisé la douleur pour casser, mais pour créer. Ça fait de toi quelqu’un de rare. Quelqu’un qui comprend la fragilité et la force en même temps.\n\nTon défi réside dans la reconnaissance de ta propre valeur. Tu n’as pas besoin d’attendre que les autres te valident pour affirmer qui tu es. Tu peux t’entourer de personnes qui voient ton importance, qui respectent ton travail, qui apprécient ta stabilité. Tu peux aussi apprendre à demander ce que tu mérites : soutien, temps, limites, reconnaissance. Ce n’est pas arrogant : c’est juste.\n\nCe que ton résultat révèle, c’est que tu es capable de bâtir des choses durables : relations, carrières, projets, œuvres, techniques, idées concrètes. Tu peux devenir artisan(e), ingénieur(e), artiste, inventeur(trice), thérapeute, bâtisseur(se) de solutions. Tu peux être un(e) pilier silencieux(se), mais essentiel(le). Tu n’es pas destiné(e) à imiter ceux qui brillent superficiellement : tu es destiné(e) à créer ce qui dure.\n\nComme Héphaïstos, tu n’as pas besoin d’avoir un corps « parfait », une vie « parfaite », ou une apparence irréprochable pour être puissant(e). Ta force vient de ce que tu construis, pas de ce que tu affiches. Tu peux devenir l’être que les autres finissent par respecter, non parce que tu cries ta valeur, mais parce que ton œuvre parle pour toi.",
  },
  "Créatif->Sensible": {
    figure: "Séléné",
    image: "images/figures/selene.png",
    tagline: "Intensité intérieure, sensibilité et poésie.",
    conclusion: "Séléné est la déesse grecque de la Lune, celle qui traverse le ciel nocturne dans son char argenté et illumine doucement les ténèbres. Elle incarne la lumière discrète mais constante, l’intuition profonde, les émotions cachées et le rythme intérieur qui guide chaque être. Contrairement aux soleils éclatants, Séléné ne domine pas : elle murmure, influence, révèle ce qui est secret. Elle accompagne les rêves, les cycles, les peurs silencieuses et les transformations lentes. Elle n’impose jamais sa présence, mais elle est toujours là, éveillant la sensibilité, apaisant les esprits et donnant une voix aux émotions qui n’osent pas se montrer en plein jour.\n\nSi ton résultat correspond à Séléné, c’est que tu possèdes une profondeur sensible et une grande capacité à percevoir les nuances du monde intérieur. Tu ressens ce que les autres taisent, tu remarques ce qui échappe au regard superficiel, tu comprends les émotions derrière les mots. Tu es comme une lumière douce : tu ne cherches pas à éblouir, mais tu éclaires. Tu apportes du réconfort, de la lucidité, une intuition subtile, parfois même une sagesse que tu ne revendiques pas.\n\nComme Séléné, tu ne fonctionnes pas dans le bruit ou la démonstration. Tu observes, tu analyses, tu accueilles, tu guides sans t’imposer. Tu préfères les connexions authentiques, les conversations profondes, les liens qui respectent le rythme de chacun. À tes yeux, ce qui compte n’est pas l’apparence des choses, mais leur vérité intérieure. Tu ne juges pas vite : tu sens d’abord. Tu écoutes avant d’agir. Ta sensibilité n’est pas fragile : elle est éclairante.\n\nTes émotions sont souvent riches, parfois complexes, parfois silencieuses. Tu peux traverser des phases plus introspectives, comme la lune qui disparaît avant de renaître. Tu n’as pas peur de te retirer pour te retrouver. Tu peux vivre intérieurement ce que d’autres vivent extérieurement. Parfois, cela donne l’impression que tu es distant(e) ou difficile à lire, alors que ton monde intérieur bouillonne d’idées, d’intuitions, d’empathie.\n\nComme Séléné, tu peux avoir tendance à porter les émotions des autres, à absorber leur tristesse, à veiller sur eux sans qu’ils s’en rendent compte. Tu peux t’épuiser en étant la lumière des autres, surtout si tu n’oses pas demander qu’on éclaire ton propre chemin. Tu donnes du calme, de l’écoute, mais tu reçois parfois trop peu en retour. Tu mérites des liens où ta sensibilité est soutenue, respectée et vue.\n\nTon défi n’est pas d’être plus bruyant ou de te forcer à briller comme un soleil. Ton défi est d’apprendre que ta lumière mérite aussi d’être protégée. Tu peux choisir qui a accès à ton énergie, qui mérite ton écoute, qui mérite d’être accompagné(e) dans la nuit. Tu n’as pas à t’adapter aux rythmes des autres : tu peux imposer le tien, lent, juste, profond.\n\nCe que ton résultat révèle, c’est que tu as le pouvoir de guider, inspirer, conseiller, comprendre. Tu peux aider les autres à voir leurs vérités cachées, à apprivoiser leurs émotions, à accepter leurs cycles. Tu peux donner la paix là où il y a du chaos, la clarté là où il y a du brouillard, la patience là où il y a de l’agitation. Tu peux transformer sans brusquer, apaiser sans te sacrifier, accompagner sans t’effacer.\n\nComme Séléné, tu n’as pas besoin d’être vu(e) pour être essentiel(le). Tu représentes la lumière qui accompagne, la douceur qui révèle, l’intuition qui oriente. Tu n’es pas un silence vide : tu es un silence qui comprend, un reflet qui éclaire, une nuit qui pense. Ta force est d’être toi-même, sans fracas. Tu n’es pas fait(e) pour imiter le soleil — tu es fait(e) pour être lune.",
  },

  // --- PROTECTEUR dominant ---
  "Protecteur->Leader": {
    figure: "Hestia",
    image: "images/figures/hestia.png",
    tagline: "Structure le groupe en gardant la paix.",
    conclusion: "Hestia est la déesse grecque du foyer sacré, du feu intérieur, de l’hospitalité et de la paix domestique. Juste, humble et discrète, elle incarne le centre invisible qui tient une communauté ensemble. Dans chaque temple comme dans chaque maison, on entretenait son feu, symbole de respect mutuel, de sécurité et de cohérence sociale. Hestia ne cherche ni les combats ni les honneurs : elle est la gardienne silencieuse, la présence stable qui permet aux autres de vivre, créer, aimer et prospérer. Elle représente le refuge, la chaleur humaine, le respect essentiel et simple qui fait qu’un lieu devient « chez soi ».\n\nSi ton résultat correspond à Hestia, c’est que tu portes l’énergie de la tranquillité, de la présence apaisante, de la stabilité et du cœur intérieur des relations. Hestia est la déesse du foyer, non pas au sens d’un espace physique, mais au sens du lieu où l’on se sent soi-même. Elle représente ce qui nous ancre, nous rassemble, nous protège. Si tu lui ressembles, tu es probablement quelqu’un dont la force ne cherche pas l’attention, mais crée une paix que les autres ressentent.\n\nComme Hestia, tu n’as pas besoin de briller pour exister. Tu n’as pas besoin d’être applaudi(e), admiré(e) ou mis(e) en avant. Tu n’es pas en quête de performance sociale. Tu veux être utile, vrai(e), bienveillant(e). Tu donnes une importance immense à la simplicité et à la sincérité. Tu préfères des relations profondes, même peu nombreuses, plutôt que toute forme de popularité superficielle.\n\nTa présence rassure. Tu es une personne avec qui on peut respirer, se reposer, se confier. Tu n’as pas besoin de parler beaucoup pour que ton calme soit ressenti. Ta stabilité crée un espace dans lequel les autres peuvent déposer leurs tensions. Tu sais écouter sans juger, comprendre sans envahir, soutenir sans imposer. Comme Hestia, tu es un feu constant : tu ne brûles pas fort, mais tu réchauffes longtemps.\n\nTa force est discrète mais gigantesque : tu rends le monde plus habitable. Là où tu passes, il y a du respect, de la patience, du soin, de l’attention. Tu protèges ce qui est fragile, tu préserves ce qui est important, tu répares ce qui doit durer. Tu es l’allié(e) de la continuité, de la stabilité, de la douceur essentielle.\n\nMais cette nature protectrice peut aussi t’isoler. Tu peux avoir tendance à rester en retrait, non par manque de confiance, mais par humilité. Tu donnes beaucoup, tu soutiens beaucoup, tu comprimes parfois tes propres besoins pour ne pas déranger, pour que les autres soient bien. Tu peux reculer pour laisser de l’espace aux autres, jusqu’à disparaître un peu. Certains peuvent alors te croire froid(e) ou distant(e), alors que tu offres déjà une immense présence, mais silencieuse.\n\nComme Hestia, tu peux aussi avoir du mal à recevoir. Tu préfères aider qu’être aidé(e). Tu préfères écouter qu’être entendu(e). Tu préfères offrir que demander. Ton défi n’est pas de changer cela, mais d’apprendre à accepter que ton propre feu a besoin d’être nourri. Ton calme est précieux, mais il mérite aussi d’être respecté, soutenu, renouvelé.\n\nTa plus grande force sera de comprendre que prendre soin de toi n’est pas un manque de générosité. Tu mérites de te préserver, de te reposer, d’être entouré(e) de personnes qui honorent la douceur que tu apportes au monde. Hestia n’est pas une servante silencieuse : elle est un centre sacré. Elle enseigne que le respect commence par soi.\n\nCe que ton résultat révèle également, c’est que tu inspires ce qu’il y a de plus honnête dans les relations. Tu peux créer une famille choisie, un groupe soudé, un environnement de confiance. Tu n’as pas besoin de diriger pour unir : tu fédères par ta constance. Tu rappelles aux autres qu’il existe une façon simple d’être heureux ensemble : en se respectant, en se protégeant mutuellement, en honorant ce qui est vrai.\n\nComme Hestia, ton rôle n’est pas de te battre pour exister, ni de te cacher pour protéger les autres. Ton rôle est d’être ce feu intérieur qui éclaire doucement, sans s’éteindre. Ta présence est une maison. Respecte-la comme tu respectes les autres.",
  },
  "Protecteur->Combattant": {
    figure: "Artémis",
    image: "images/figures/artemis.png",
    tagline: "Défend les limites et frappe si nécessaire.",
    conclusion: "Artémis est la déesse grecque de la nature sauvage, de la chasse, de l’indépendance et de la protection des êtres vulnérables. Sœur jumelle d’Apollon, elle parcourt les forêts avec ses flèches d’argent, accompagnée de nymphes et d’animaux sacrés. Elle refuse le mariage pour conserver sa liberté, car elle incarne l’autonomie absolue, l’instinct, la sincérité et la capacité de vivre en accord avec soi-même plutôt qu’avec les attentes sociales. Gardienne des jeunes et des plus fragiles, elle punit sévèrement ceux qui manquent de respect envers la vie. Artémis ne cherche pas l’approbation : elle défend ce qui est vrai, sauvage et juste.\n\nSi ton résultat correspond à Artémis, c’est que tu portes en toi l’énergie de la liberté, de l’instinct, de l’indépendance émotionnelle et de la vérité brute. Artémis n’a jamais cherché à plaire, à se conformer, ou à entrer dans les attentes sociales. Elle suit ce qui est juste, ce qui est vrai, ce qui est essentiel. Si tu lui ressembles, alors tu es quelqu’un qui valorise l’authenticité plus que l’apparence, la loyauté plus que la popularité, la liberté plus que la reconnaissance.\n\nTu as besoin de te sentir aligné(e) avec tes actes. Tu n’agis pas pour être vu(e), admiré(e) ou validé(e) : tu agis parce que ce que tu fais a du sens pour toi. Tu aimes aller vers ce qui te ressemble, vers ce qui te fait grandir, même si cela implique de prendre une route différente de la majorité. Tu préfères la solitude vraie aux relations creuses, l’honnêteté tranchante aux faux sourires, la simplicité profonde aux artifices.\n\nComme Artémis, tu possèdes une grande force d’écoute instinctive : tu sais quand quelque chose sonne faux, tu ressens quand tu dois t’éloigner, tu perçois ce qui ne te convient pas avant même de pouvoir l’expliquer. Tu protèges ce qui te tient à cœur, les êtres vulnérables, les personnes sincères, les espaces qui méritent d’être respectés. Tu peux être extrêmement loyal(e) envers ceux à qui tu fais confiance, mais exigeant(e) dans cette loyauté : tu ne donnes pas ta confiance facilement, et tu ne la reprends presque jamais… sauf en cas de trahison.\n\nCependant, cette indépendance qui fait ta force peut aussi devenir un mur. Comme Artémis, tu peux te tenir à distance des autres, parfois parce que tu es blessé(e), parfois parce que tu ne veux pas devoir affronter ce qui se passe dans une relation. Tu peux fuir avant de risquer d’être déçu(e), te replier avant même d’être compris(e). Tu peux te persuader que tu n’as besoin de rien ni de personne, alors qu’en réalité, ce qui te ferait du bien serait de trouver des liens libres, respectueux et patients.\n\nTon défi n’est pas de te socialiser plus, ni de devenir comme les autres. Ton défi est d’accepter que l’indépendance n’est complète que lorsqu’elle inclut la possibilité du lien, pas lorsque tu t’en prives pour te protéger. Tu peux défendre ton espace tout en laissant entrer ceux qui te respectent. Tu peux rester sauvage sans devenir inaccessible. Tu peux protéger ton monde intérieur sans en faire un refuge isolé.\n\nCe que ton résultat révèle, c’est aussi que tu inspires, souvent sans le vouloir. Tu représentes un modèle de liberté, une vérité qui ne cherche pas à séduire, un courage silencieux qui donne aux autres envie d’être eux-mêmes. Tu peux guider, encourager, donner une direction juste, non pas parce que tu veux diriger, mais parce que tu ne mens pas. Tu sincérité est une force qui éclaire, qui rassure, qui libère.\n\nComme Artémis, ton rôle n’est pas d’être dompté(e) ou compris(e) par tout le monde. Ton rôle est de rester fidèle à ton instinct, tout en laissant la vie te surprendre. Tu n’as pas à te changer : seulement à te permettre d’être libre sans te priver des liens qui pourraient t’enrichir.",
  },
  "Protecteur->Créatif": {
    figure: "Déméter",
    image: "images/figures/demeter.png",
    tagline: "Crée la sécurité par le soin et le cycle.",
    conclusion: "Déméter est la déesse grecque de la fertilité, des récoltes, de la croissance, de l’abondance et du cycle de la vie. Elle fait pousser ce qui nourrit, protège ce qui doit grandir et veille sur les liens essentiels qui permettent à un groupe de survivre et de prospérer. Elle est aussi la mère de Perséphone, symbole de la perte, de l’attente et du retour, ce qui fait de Déméter l’incarnation de l’amour persévérant et du soin sûr et constant. Elle ne crée pas l’éclat, mais la stabilité ; elle n’offre pas la passion passagère, mais ce qui permet à la vie de continuer, même après les tempêtes.\n\nSi ton résultat correspond à Déméter, c’est que tu portes en toi l’énergie de ceux et celles qui font grandir, protéger, nourrir et rassembler. Comme cette déesse de la terre fertile, tu représentes la force douce, celle qui permet aux autres de s’épanouir, de guérir et de trouver leur place. Tu n’es pas seulement quelqu’un de gentil : tu es un moteur relationnel, un refuge, un pilier invisible mais essentiel.\n\nTa manière d’apporter de la valeur au monde n’est pas dans le spectacle ou dans l’exubérance, mais dans le soin quotidien, dans l’attention, dans la façon dont tu observes les besoins des autres et y réponds. Comme Déméter, tu perçois ce qu’il faut nourrir : un talent, une amitié, une idée, un lien. Tu encourages, tu apaises, tu répares, tu accompagnes. Les personnes autour de toi se sentent en sécurité, respectées, soutenues. Elles peuvent être elles-mêmes parce que tu es là.\n\nTon engagement vient d’une conviction profonde : tout ce qui est vivant a besoin de soin pour durer. Les relations, les projets, les familles, les équipes, les rêves : rien de tout cela ne prospère sans patience, loyauté, constance. Tu sais cela instinctivement. Tu es le genre de personne qui aide les autres à tenir bon, qui donne du courage, qui rappelle aux gens ce qu’ils valent, qui persévère même lorsque les autres abandonnent.\n\nMais comme Déméter, tu peux aussi te perdre dans ce rôle de gardien ou de protecteur. Tu peux donner tellement, comprendre tellement, aimer tellement… que tu en viens à t’épuiser. Ton instinct est de couvrir, de défendre, de préserver coûte que coûte. Tu peux parfois croire que tu dois tout porter, tout résoudre, tout tenir en équilibre. Lorsque les autres ne reviennent pas vers toi ou ne te traitent pas avec la même loyauté, la blessure peut être très profonde.\n\nTu peux aussi avoir tendance à retenir trop longtemps ce qui est précieux pour toi : une relation, une idée, un projet, même lorsque celui-ci ne te nourrit plus. Par peur de perdre, comme Déméter lorsqu’on lui arrache Perséphone, tu peux t’accrocher, te sacrifier, essayer de sauver quelque chose qui ne dépend pas uniquement de toi. Ton défi n’est pas d’aimer moins, mais d’apprendre à aimer sans te dissoudre.\n\nCe que ton résultat révèle, c’est que tu possèdes un pouvoir rare : celui de donner de la valeur à ce qui existe déjà. Tu n’attends pas que les choses soient parfaites pour les apprécier. Tu sais voir le potentiel. Tu sais faire fleurir. Tu sais transformer ce qui est simple en quelque chose de riche, solide, durable. Tu peux créer des liens, des environnements, des projets qui changent la vie des autres, non par domination, mais par soutien.\n\nTu n’as pas besoin d’être bruyant pour être puissant. Ton influence est silencieuse, mais profonde. Comme la terre, tu es ce qui fait pousser. Tu inspires la confiance, la stabilité, l’harmonie. Tu permets aux autres de devenir meilleurs. Ton rôle n’est pas de te sacrifier, mais de nourrir en respectant aussi tes propres limites.\n\nSi tu avances avec le cœur de Déméter, tu apporteras du sens, de la solidarité, de la constance. Mais souviens-toi : tu mérites aussi d’être nourri(e), soutenu(e), protégé(e), écouté(e). Tu n’es pas seulement celui ou celle qui donne : tu es quelqu’un qui a le droit de recevoir. Ta bonté n’est pas un devoir, c’est une force. Et elle mérite d’être respectée, y compris par toi-même.",
  },
  "Protecteur->Séducteur": {
    figure: "Perséphone",
    image: "images/figures/persephone.png",
    tagline: "Douceur protectrice mêlée d’attraction et de pouvoir.",
    conclusion: "Perséphone est la déesse grecque du printemps et des renaissances, mais aussi la reine des Enfers. Fille de Déméter, elle symbolise le passage entre la lumière et l’obscurité, entre l’innocence et la profondeur, entre le monde visible et le monde intérieur. Enlevée par Hadès, elle devient une souveraine pratiquant la justice et la compassion auprès des âmes. Perséphone incarne le cœur qui grandit en traversant les épreuves, l’être qui découvre sa force après avoir rencontré sa propre ombre. Elle représente la transformation, la maturité émotionnelle et la beauté qui surgit lorsque l’on accepte toutes les parties de soi — même celles qu’on cachait.\n\nSi ton résultat correspond à Perséphone, c’est que tu portes en toi la puissance de ceux qui ont traversé ou traverseront plusieurs “saisons” dans une même vie : des moments lumineux, des périodes sombres, des renaissances inattendues. Tu n’es pas défini(e) par ce que tu sembles être aujourd’hui, mais par ce que tu deviens, par ta capacité à évoluer, à apprendre, à te transformer. Comme Perséphone, tu caches une profondeur que les autres ne soupçonnent pas toujours au premier regard.\n\nTu es une personne intuitive, sensible et empathique. Tu ressens fortement les émotions — les tiennes et celles des autres. Tu comprends la fragilité humaine, tu sais écouter vraiment, tu peux apporter du réconfort et de l’espoir dans les moments difficiles. Ton cœur se trouve naturellement du côté de ceux qui souffrent ou doutent, parce que tu sais ce que cela représente de chercher sa place. Tu n’aimes pas les jugements rapides : tu préfères découvrir la vérité de quelqu’un avant de te faire une opinion.\n\nComme Perséphone, tu peux vivre un décalage : parfois tu es très sociable et solaire, d’autres fois tu as besoin de solitude et d’introspection. Tu passes d’un monde à l’autre, entre innocence et lucidité, entre naïveté et force intérieure. Ce n’est pas de l’inconstance : c’est la richesse de ton univers intérieur. Tu possèdes différentes facettes, et chacune a besoin de s’exprimer selon les situations.\n\nMais ta grande sensibilité peut aussi te rendre vulnérable. Tu es parfois influencé(e) par les autres, surtout lorsque tu veux préserver l’harmonie ou éviter le conflit. Tu peux accepter des situations ou des relations qui ne te conviennent plus, par peur de blesser ou d’être abandonné(e). Tu peux aussi avoir tendance à cacher tes douleurs, à minimiser ce qui te fait mal, pour protéger ceux que tu aimes ou pour garder la paix autour de toi.\n\nTon défi, comme celui de Perséphone, est d’assumer ta transformation, même si elle t’amène à changer de rôle, de relation, ou de direction de vie. Tu as le droit de devenir quelqu’un de nouveau. Tu n’as pas à rester figé(e) dans une version de toi qui rassure les autres. Ton identité n’est pas une cage : c’est un jardin en expansion.\n\nCe que ton résultat révèle, c’est que tu peux être une lumière dans l’obscurité des autres. Tu peux guider vers la guérison, vers l’espoir, vers la reconstruction. Tu peux aider à faire éclore ce qui était enfoui, encourager des renaissances, rappeler que les cycles de vie sont naturels et que la douleur n’est jamais la fin. Tu sais mieux que personne que les printemps naissent après les hivers.\n\nComme Perséphone, tu es appelé(e) à régner sur tes ombres, pas à les subir. Tu es destiné(e) à devenir plus fort(e) en étant fidèle à ce que tu ressens vraiment. Tu n’as pas besoin d’être parfait(e) ou toujours lumineux(se). Tu as seulement besoin d’être vrai(e). Ta beauté intérieure est celle de la vie qui revient, toujours, même après les plus longues nuits.",
  },
  "Protecteur->Libre": {
    figure: "Antigone",
    image: "images/figures/antigone.png",
    tagline: "Protège ses valeurs jusqu’à contredire les règles imposées.",
    conclusion: "Antigone est l’héroïne de la tragédie de Sophocle. Fille d’Œdipe, elle vit à Thèbes après la guerre entre ses deux frères, Étéocle et Polynice. Le roi Créon interdit d’enterrer Polynice, jugé traître. Antigone refuse cet ordre qu’elle considère injuste et choisit de respecter les lois morales et divines, au prix de sa propre vie. Elle incarne le courage moral et la fidélité aux principes.\n\nSi ton résultat correspond à Antigone, tu es une personne guidée par des valeurs profondes. Tu possèdes une boussole morale intérieure très forte et tu as du mal à accepter ce qui te semble injuste ou inhumain. Tu choisis la cohérence plutôt que la facilité.\n\nTa plus grande qualité est ton courage moral. Tu es capable de dire non quand d’autres se taisent. Tu agis non pour provoquer, mais parce que ton silence te semblerait une trahison.\n\nPsychologiquement, tu es intègre, déterminé(e) et loyal(e) envers tes principes. Ta loyauté est orientée vers la dignité humaine et le respect. Tu peux être ferme et inflexible lorsque certaines valeurs sont en jeu.\n\nCependant, cette force peut devenir une limite. Tu peux t’enfermer dans une position sans te protéger, refuser toute nuance ou toute médiation. Ton défi est d’apprendre que défendre la justice ne signifie pas toujours se sacrifier.\n\nTu peux ressentir une grande solitude morale. Résister fatigue. Tu dois apprendre à durer sans t’épuiser.\n\nSymboliquement, Antigone représente la conscience humaine face au pouvoir. Elle rappelle que l’obéissance n’est pas toujours une vertu et que la loi doit rester au service de l’humain.\n\nTu peux devenir un gardien de l’éthique et de la dignité. Ton évolution consiste à allier courage et discernement afin que ta fidélité aux valeurs reste vivante, juste et durable.",
  },
  "Protecteur->Indépendant": {
    figure: "Rhéa",
    image: "images/figures/rhea.png",
    tagline: "Protège en secret pour sauver ses proches.",
    conclusion: "Rhéa est l’une des plus anciennes déesses grecques, grande Titanide, mère des dieux de l’Olympe : Zeus, Héra, Poséidon, Déméter, Hadès et Hestia. Protectrice de la nature sauvage et des cycles du vivant, elle est aussi la gardienne de la continuité et de la transmission. Pour sauver Zeus du dévorateur Cronos, elle ruse et s’oppose discrètement à son mari, préservant ainsi l’avenir du monde divin. Rhéa n’est ni guerrière ni dominatrice : elle agit par patience, sagesse et stratégie douce. Elle représente la force du soutien silencieux, le courage maternel, et l’art de maintenir l’harmonie sans chercher à dominer.\n\nSi ton résultat correspond à Rhéa, c’est que tu possèdes une force tranquille, une capacité à maintenir l’équilibre, à protéger ce qui est important et à soutenir les autres par des moyens subtils, parfois invisibles. Tu n’as pas besoin de bruit pour être puissant(e). Comme Rhéa, tu observes, tu analyses, tu comprends profondément les situations avant d’agir. Ton influence n’est pas imposée : elle s’exerce avec douceur, patience, discernement et constance.\n\nTu as le don d’apaiser les tensions, de stabiliser les environnements et d’être la base émotionnelle sur laquelle les autres peuvent s’appuyer. Tu n’es pas simplement gentil(le) ou serviable : tu es structurant(e). Tu sais ce qu’il faut préserver, ce qu’il faut laisser grandir, ce que tu dois protéger coûte que coûte. Tu as un instinct puissant pour ce qui peut durer, ce qui doit s’harmoniser, ce qui doit être transmis dans la vie comme dans les relations.\n\nComme Rhéa, tu peux mettre beaucoup d’énergie à soutenir les autres, parfois au point d’oublier ta propre place. Tu peux devenir le pilier, celui ou celle qu’on consulte, qu’on remercie rarement, mais dont tout dépend. Tu connais la puissance de l’écoute, du conseil, du soutien discret, mais tu risques parfois de t’effacer ou de te sacrifier pour que tout tienne debout. Ton cœur cherche à préserver l’harmonie, mais l’harmonie ne doit pas toujours reposer sur toi seul(e).\n\nTu possèdes aussi un sens très fin de la justice affective. Tu peux supporter beaucoup, mais tu n’oublies pas les abus. Comme Rhéa face à Cronos, tu peux supporter longtemps… jusqu’au moment où tu décides d’agir avec intelligence, stratégie et fermeté. Quand tu protèges quelqu’un ou quelque chose que tu aimes, tu peux faire preuve d’une force immense, mais mesurée : tu n’attaques pas, tu sauves. Ta colère est rare, mais juste. Ta révolte ne détruit pas : elle libère.\n\nTon défi n’est pas de devenir plus bruyant(e) ou d’exiger plus de reconnaissance. Ton défi est d’apprendre à exister pour toi, pas seulement pour les autres. Tu peux protéger sans t’épuiser, aider sans te sacrifier, stabiliser sans te nier. Tu as le droit d’être aussi soutenu(e) que tu soutiens. Ton énergie est précieuse, mais elle mérite d’être respectée et renouvelée.\n\nCe que ton résultat révèle, c’est que tu as la capacité de transmettre, d’enseigner, d’élever, d’offrir une sagesse qui ne cherche ni l’autorité ni la domination. Tu peux créer des environnements solides, des relations stables, des décisions justes. Tu peux guider avec tact, transformer avec patience, faire évoluer les autres par la confiance plutôt que par le contrôle. Tu es la mémoire, le lien, la structure humaine.\n\nComme Rhéa, tu n’es pas un personnage secondaire : tu es une fondation. Tu rappelles au monde que la plus grande force n’est pas toujours visible, qu’elle réside dans ce qui dure, dans ce qui protège, dans ce qui transmet. Tu es le gardien de l’essentiel, celui ou celle qui rend possible l’avenir. La vie ne repose pas sur le bruit, mais sur ceux qui veillent. Et toi, tu veilles — mais désormais, veille aussi sur toi.",
  },
  "Protecteur->Sensible": {
    figure: "Pénélope",
    image: "images/figures/penelope.png",
    tagline: "Protection du foyer avec loyauté.",
    conclusion: "Pénélope est l’épouse d’Ulysse dans l’Odyssée. Pendant les vingt années d’absence de son mari, elle gouverne seule le royaume d’Ithaque. Assaillie par des prétendants, elle résiste grâce à l’intelligence, la patience et la ruse, notamment par la stratégie du tissage qu’elle défait chaque nuit. Pénélope incarne la fidélité consciente, la résistance silencieuse et la force intérieure.\n\nSi ton résultat correspond à Pénélope, tu es une personne endurante et dotée d’une grande intelligence émotionnelle. Ta force ne s’exprime pas par la confrontation directe, mais par la constance, la lucidité et la maîtrise de toi-même. Tu sais attendre sans te résigner.\n\nTa plus grande qualité est ta capacité à tenir sans te perdre. Tu choisis la patience stratégique plutôt que l’impulsivité. Tu comprends que certaines situations se traversent dans le temps long.\n\nPsychologiquement, tu es très conscient(e) de tes valeurs. Tu peux sembler discret(ète), mais ton monde intérieur est riche et structuré. Tu possèdes une grande maîtrise émotionnelle.\n\nCependant, cette force peut devenir une limite. Tu peux rester trop longtemps dans l’attente ou par loyauté envers le passé. Ta fidélité peut parfois freiner ton renouveau.\n\nTu as aussi tendance à porter beaucoup en silence. Ton défi est d’apprendre que demander de l’aide ne diminue pas ta force.\n\nSymboliquement, Pénélope représente la fidélité active et la résistance intelligente. Elle montre que la patience est une force, mais qu’elle doit aussi mener à une transformation.\n\nTu peux devenir un pilier discret et fiable. Ton évolution consiste à équilibrer fidélité et mouvement, afin que ta force intérieure reste vivante et libre.",
  },

  // --- SÉDUCTEUR dominant ---
  "Séducteur->Leader": {
    figure: "Aphrodite",
   image: "images/figures/aphrodite.png",
    tagline: "Attire et guide par la relation.",
    conclusion: "Aphrodite est la déesse grecque de l’amour, de l’attirance, de la beauté et du désir créateur. Contrairement à l’idée moderne de « séduction superficielle », elle incarne surtout la puissance des émotions profondes, la joie d’exister, le charme qui naît de la sensibilité et de la façon de se connecter au monde. Selon les mythes, elle fait naître la vie là où elle passe : elle inspire les artistes, adoucit les conflits, réunit les êtres, révèle la valeur cachée derrière les apparences. Aphrodite n’est pas seulement aimée : elle transforme ce qu’elle touche en quelque chose de plus vivant, plus harmonieux, plus humain.\n\nSi ton résultat correspond à Aphrodite, c’est que ta personnalité est profondément liée à l’amour, à la beauté au sens large, à l’harmonie et à la sensibilité affective. Mais attention : être associé(e) à Aphrodite n’a rien à voir avec la superficialité. Ce n’est pas une question d’apparence, mais de relation au vivant, de capacité à sentir ce qui touche le cœur, ce qui rend les êtres humains plus vrais, plus heureux, plus connectés à ce qu’ils doivent devenir.\n\nComme Aphrodite, tu portes en toi un pouvoir rare : l’énergie du lien, la capacité d’attirer, de rapprocher, d’apaiser, de révéler chez les autres leur propre valeur. Tu fais en sorte que les personnes autour de toi se sentent vues, appréciées, valorisées. Tu as le don de faire ressortir leur beauté intérieure, par un compliment sincère, un regard soutenant, une présence lumineuse, ou une façon de comprendre ce qu’ils vivent sans les juger. Ainsi, tu n’es pas simplement aimé(e) : tu es quelqu’un qui inspire l’amour.\n\nTa sensibilité t’aide à percevoir les nuances invisibles : ce qu’un silence veut dire, ce que quelqu’un ressent derrière les mots, les tensions invisibles, ce que les autres ne voient pas mais ressentent. Tu as souvent un instinct émotionnel très juste. Cet instinct peut te guider dans la vie, t’aider à choisir les bonnes personnes, les bons projets, les bonnes relations, mais il peut aussi t’exposer à ce qui te touche trop intensément.\n\nCar comme Aphrodite, tu peux parfois donner beaucoup, t’impliquer trop vite, idéaliser les autres ou les relations que tu veux construire. Tu peux projeter sur les personnes ce que tu crois qu’elles pourraient devenir, au lieu de voir ce qu’elles sont réellement. Dans ton engagement, il peut y avoir de la générosité, mais aussi de la vulnérabilité. La déception peut alors être profonde, car tu n’aimes pas à moitié. Tu t’investis avec le cœur entier.\n\nTon défi, comme celui d’Aphrodite, n’est pas d’aimer moins, mais de reconnaître ta valeur même lorsque tu n’es pas en relation. Tu n’existes pas uniquement à travers les liens que tu crées. Tu possèdes une lumière qui t’appartient, et que personne n’a le droit de définir ou de diminuer. Apprendre à ne pas te perdre dans l’autre, c’est apprendre à aimer avec maturité, pas avec sacrifice.\n\nCe que ton résultat révèle, c’est que tu peux aussi influencer le monde. Tu as la capacité d’améliorer les environnements, de rendre les interactions plus humaines, de rapprocher les gens, de guérir des blessures par la douceur, la patience, la beauté, la communication sincère. Tu peux être un(e) artiste du lien, un(e) créateur(trice) d’harmonie, quelqu’un qui transforme ce qu’il touche, non par puissance, mais par affection.\n\nL’amour, chez toi, n’est pas un besoin : c’est une force créatrice. Comme Aphrodite, ton pouvoir n’est pas d’être aimé(e), mais de révéler ce qui mérite d’être aimé dans le monde.",
  },
  "Séducteur->Combattant": {
    figure: "Thésée",
    image: "images/figures/thesee.png",
    tagline: "Séduit, provoque, gagne par l’impact.",
    conclusion: "Thésée est le fondateur mythique de la cité d’Athènes. Fils du roi Égée (ou de Poséidon selon certaines versions), il grandit sans connaître sa véritable identité, jusqu’au jour où il soulève l’épée cachée sous un rocher et revendique son héritage. Il devient célèbre pour avoir tué le Minotaure dans le labyrinthe de Crète grâce à l’aide d’Ariane, et pour avoir uni le peuple attique en un seul royaume. Plus qu’un guerrier, Thésée est un bâtisseur de civilisation : il affronte autant les injustices humaines que les créatures monstrueuses, et laisse derrière lui un ordre politique, social et juridique.\n\nSi ton résultat correspond à Thésée, tu es quelqu’un qui cherche un sens à ce que tu fais. Tu veux comprendre d’où tu viens, où tu vas, quelle place tu occupes, à quoi tu sers. Tu n’es pas fait(e) pour flotter au hasard : tu veux construire quelque chose de durable. Tu peux avoir le sentiment que ta vie est une quête d’identité, un chemin vers une position juste, un rôle utile.\n\nComme Thésée, tu peux avoir le désir profond de réparer ce qui est injuste. Tu n’aimes pas les abus de pouvoir, les règles absurdes, les systèmes oppressifs, les personnes qui profitent des autres. Tu as envie d’organiser, de réformer, d’améliorer le monde autour de toi, même en commençant par de petites choses.\n\nTon parcours peut avoir été marqué par la recherche de reconnaissance. Peut-être as-tu dû prouver ta valeur, gagner tua place, montrer ce que tu as en toi. Tu peux parfois sentir que tu n’es pas encore arrivé(e) — que tu dois encore accomplir quelque chose pour vraiment te sentir légitime. Ce besoin peut te pousser à agir, mais peut aussi te rendre trop dur(e) avec toi-même ou trop sensible au regard des autres.\n\nComme Thésée, tu peux aussi commettre une erreur fréquente : croire que la réussite suffit pour être aimé(e). Tu peux oublier l’importance de la gratitude, de la loyauté envers ceux qui t’ont aidé(e). Tu peux parfois avancer tellement vite que tu laisses derrière toi des liens précieux.\n\nTu possèdes aussi le talent rare de faire collaborer des gens très différents. Tu peux créer des groupes, des équipes, une communauté. Tu peux être un(e) organisateur(trice), un(e) rassembleur(se), un(e) porte-parole, un(e) bâtisseur(se) de projets. Tu n’es pas seulement capable d’affronter des problèmes : tu sais structurer ce qui vient après.\n\nCe que ton résultat révèle, c’est que tu peux devenir quelqu’un qui donne un cadre au chaos, qui clarifie les règles, qui apporte l’équilibre, qui protège les plus faibles sans tomber dans la tyrannie. Tu n’as pas besoin d’être parfait(e) pour être juste. Tu as besoin d’être constant(e), loyal(e), lucide.\n\nComme Thésée, ta véritable force n’est pas de vaincre des monstres, mais de changer ce qui se passe après la victoire. Tu peux créer de l’ordre là où il y avait du désordre, de la justice là où il y avait de l’arbitraire, de la clarté là où les autres hésitent. Tu n’es pas destiné(e) à chercher ta place toute ta vie : tu es destiné(e) à la construire.",
  },
  "Séducteur->Créatif": {
    figure: "Éros",
    image: "images/figures/eros.png",
    tagline: "Le désir crée du lien, du chaos et de nouvelles possibilités.",
    conclusion: "Éros est le dieu primordial de l’amour, du désir et de l’attraction. Dans certains récits, il naît au début du monde, en même temps que le Chaos et Gaïa, représentant la force qui fait s’unir ce qui était séparé. Dans d’autres versions plus tardives, il devient le fils d’Aphrodite, messager du désir, armé de ses flèches qui rendent amoureux contre leur volonté. Éros n’est pas la tendresse douce : il est l’élan irrésistible qui pousse les êtres à se rapprocher, à se transformer, à se dévoiler. Il symbolise le désir qui crée des liens, révèle la vulnérabilité et change le cœur des humains.\n\nSi ton résultat correspond à Éros, tu es quelqu’un dont la force réside dans le lien. Tu ne cherches pas seulement à aimer : tu cherches à connecter, à toucher la vérité intérieure chez les autres, à créer une relation authentique, intense, vivante. Pour toi, l’amour, l’amitié, les connexions sociales ne sont pas des rôles à jouer, mais des expériences à vivre pleinement. Tu veux que ce qui se passe entre les gens soit vrai, profond, sincère, même si cela fait peur. Tu ressens les liens comme des forces capables de transformer la vie.\n\nComme Éros, tu peux être sensible à ce qui attire les gens, à ce qui les rapproche, à leurs désirs, leurs besoins, leurs blessures. Tu peux comprendre la dynamique émotionnelle d’un groupe, tu peux sentir les tensions, les affinités, les amours cachés ou les colères silencieuses. Tu peux avoir un talent naturel pour créer des liens entre les autres, pour apaiser, séduire, réconcilier, inspirer, émouvoir. Cette sensibilité peut faire de toi une personne magnétique, attachante, dont la présence change l’atmosphère.\n\nMais cette force peut aussi devenir un piège. Tu peux parfois confondre connexion et fusion, désir et dépendance, affection et validation. Tu peux vouloir plaire, comprendre, sauver, aimer trop vite ou trop fort. Tu peux avoir du mal à trouver l’équilibre entre ton besoin d’aimer et ton besoin d’exister pour toi-même. Comme Éros, tu as le pouvoir de toucher les âmes, mais tu dois apprendre à ne pas t’y dissoudre.\n\nTu peux aussi souffrir d’un manque lorsque les liens ne sont pas profonds, authentiques ou réciproques. Tu peux te sentir facilement blessé(e) par l’indifférence, la distance, les masques sociaux, les relations superficielles. Ton désir de connexion te rend puissant(e), mais fragile. Tu n’as pas besoin de cacher cette vulnérabilité : elle est une partie essentielle de ta beauté. Elle est ce qui rend tes liens vrais.\n\nCe que ton résultat révèle, c’est que tu peux devenir un(e) créateur(trice) de relations sincères, un(e) artiste du lien, un(e) thérapeute, un(e) médiateur(trice) émotionnel(le), un(e) ami(e) précieux(se), un(e) partenaire qui transforme la vie des autres. Tu as la capacité rare de faire naître l’amour — sous la forme de compréhension, de complicité, de passion, de tendresse ou de vérité.\n\nComme Éros, tu n’es pas destiné(e) à séduire le monde, mais à l’humaniser. Tu peux apprendre à aimer sans te perdre, à désirer sans te dissoudre, à connecter sans te sacrifier. Tu peux être une flèche qui touche l’autre, sans te transformer en blessure pour toi-même. Tu peux être celui ou celle qui rapproche les cœurs, sans briser le tien.",
  },
  "Séducteur->Protecteur": {
    figure: "Calypso",
    image: "images/figures/calypso.png",
    tagline: "Le pouvoir de l'attachement.",
    conclusion: "Calypso est une nymphe de la mythologie grecque, fille du Titan Atlas. Elle vit sur l’île d’Ogygie, un lieu isolé et hors du temps. Elle recueille Ulysse après un naufrage et tombe amoureuse de lui, lui offrant l’immortalité et une vie à l’écart du monde. Ulysse choisit pourtant de repartir. Calypso incarne la séduction puissante, l’attachement intense et la difficulté à accepter le départ de l’autre.\n\nSi ton résultat correspond à Calypso, tu es une personne intensément magnétique. Ta présence marque, attire et provoque une réaction émotionnelle forte. Tu gagnes par l’impact, par ce que tu fais ressentir, plus que par la contrainte.\n\nTa plus grande qualité est ta capacité à créer des liens profonds et immersifs. Tu sais faire sentir à l’autre qu’il est choisi, désiré et important. Tu offres une expérience émotionnelle forte.\n\nPsychologiquement, tu es sensible et passionné(e). Tu ressens tout intensément et tu cherches des relations vraies, vibrantes et engagées.\n\nCependant, cette intensité peut devenir une limite. Tu peux avoir du mal à laisser partir et confondre amour et possession. Ton attachement peut devenir étouffant si tu n’y prends pas garde.\n\nTu peux aussi t’oublier dans la relation et suspendre ton propre mouvement. Ton défi est d’apprendre que séduire ne signifie pas retenir.\n\nSymboliquement, Calypso représente la séduction comme pouvoir émotionnel. Elle rappelle que l’amour peut être refuge ou prison selon la liberté qu’il laisse.\n\nTu peux devenir une créatrice d’expériences et une source d’émotions fortes. Ton évolution consiste à unir ta capacité d’impact à la liberté, afin que ton amour reste vivant et fécond.",
  },
  "Séducteur->Libre": {
    figure: "Apollon",
    image: "images/figures/apollon.png",
    tagline: "Brille à sa manière quitte à compliquer l’amour.",
    conclusion: "Apollon est le dieu grec de la lumière, des arts, de la musique, de la médecine, de la poésie et des oracles. Fils de Zeus et de Léto, frère jumeau d’Artémis, il incarne l’harmonie, la beauté, la logique et l’inspiration créatrice. Protecteur des muses, il représente la quête d’équilibre entre l’esprit et l’émotion, entre la raison et l’intuition. Apollon n’est pas seulement un artiste : il est celui qui ordonne le chaos par la clarté, qui transforme la sensibilité en structure, la passion en œuvre durable. Il incarne le talent maîtrisé, la beauté consciente et la vérité illuminée.\n\nSi ton résultat correspond à Apollon, tu possèdes une personnalité à la fois créative et structurée. Tu peux réfléchir profondément, ressentir intensément, mais tu cherches à donner un sens à ce que tu vis. Tu n’aimes pas le chaos gratuit, la confusion émotionnelle ou l’irrationnel sans direction : tu veux comprendre, organiser, exprimer quelque chose de vrai à travers ce que tu fais. Tu peux être artiste, stratège, penseur, médiateur… mais tu auras toujours besoin d’un cadre, d’une vision, d’un équilibre.\n\nComme Apollon, tu peux avoir un talent naturel : intellectuel, artistique, social, émotionnel, ou plusieurs en même temps. Tu peux apprendre vite, mémoriser, analyser, créer, expliquer, inspirer. Mais les talents attirent aussi les attentes. Tu peux ressentir une pression intérieure à être « à la hauteur », à ne pas décevoir, à ne rien faire à moitié. Ce n’est pas que tu veuilles être parfait(e) : c’est que tu veux être vrai(e) dans ce que tu accomplis.\n\nIl existe aussi chez toi une forme de distance. Tu observes plus que tu ne t’exposes. Tu choisis soigneusement ce que tu partages. Tu peux paraître calme, parfois froid(e) ou réservé(e), mais ce n’est pas un manque d’empathie : c’est un besoin de préserver ton espace intérieur pour rester en équilibre. Tu ressens beaucoup, mais tu refuses de te laisser dominer par ce que tu ressens. Tu cherches à apprivoiser tes émotions plutôt qu’à les laisser t’envahir.\n\nTon défi est de ne pas transformer ton talent en exigence contre toi-même. Tu n’as pas à tout maîtriser. Tu n’as pas à être parfait(e) pour inspirer. Ton don est précieux, mais il ne doit pas devenir une cage. Tu peux accepter l’imperfection comme une partie de la création, le doute comme une étape de l’apprentissage, la vulnérabilité comme une forme de vérité. L’harmonie ne se construit pas en supprimant les failles, mais en les intégrant.\n\nCe que ton résultat révèle, c’est que tu peux devenir un(e) créateur(trice) d’ordre, un(e) artisan(e) de la beauté, un(e) chercheur(se) de sens. Tu peux aider les autres à comprendre, à s’exprimer, à guérir, à trouver leur propre lumière. Tu peux être la personne qui rassure, qui structure, qui clarifie. Tu rappelles que la vérité peut être lumineuse, que la sensibilité peut être constructive, que l’intelligence peut être chaleureuse.\n\nComme Apollon, tu n’es pas destiné(e) à briller uniquement par ton talent, mais par ce que tu fais de ce talent. Tu peux utiliser ta lumière pour guider, pas pour éblouir. Tu peux être un soleil sans brûler, un artiste sans te perdre, une logique sans rigidité. Tu es la preuve qu’on peut unir passion et clarté, émotion et pensée, inspiration et maîtrise.",
  },
  "Séducteur->Indépendant": {
    figure: "Circé",
    image: "images/figures/circe.png",
    tagline: "Magnétisme autonome.",
    conclusion: "Circé est une magicienne de la mythologie grecque, fille du dieu Hélios. Elle vit seule sur l’île d’Ééa, à l’écart du monde. Dans l’Odyssée, elle transforme les compagnons d’Ulysse après les avoir séduits, puis reconnaît l’intelligence et le courage d’Ulysse qui résiste à sa magie. Circé incarne la séduction indépendante, la maîtrise du pouvoir et la liberté assumée.\n\nSi ton résultat correspond à Circé, tu es une personne séduisante et profondément indépendante. Tu attires parce que tu es pleinement toi-même. Tu avances selon tes propres règles et refuses de dépendre du regard des autres.\n\nTa plus grande qualité est ta maîtrise de toi-même. Tu sais ce que tu veux et ce que tu refuses. Tu t’engages par choix, non par besoin, et tu séduis sans t’effacer.\n\nPsychologiquement, tu es lucide, intuitive et consciente de tes limites. Tu perçois rapidement les jeux de pouvoir et tu sais te défendre lorsque tu te sens menacée.\n\nCependant, cette force peut devenir une limite. Tu peux dresser des barrières trop hautes ou utiliser la séduction comme protection, ce qui peut freiner une vraie vulnérabilité.\n\nTu peux préférer la solitude choisie aux compromis relationnels. Ton défi est d’apprendre que l’indépendance n’exclut pas la confiance.\n\nSymboliquement, Circé représente la souveraineté intérieure et la capacité à poser des limites claires. Elle montre que le pouvoir véritable naît de la reconnaissance mutuelle.\n\nTu peux devenir une figure d’autonomie inspirante. Ton évolution consiste à unir ta liberté à l’ouverture, afin que ta puissance relationnelle devienne pleinement transformatrice.",
  },
  "Séducteur->Sensible": {
    figure: "Médée",
    image: "images/figures/medee.png",
    tagline: "Passion brûlante.",
    conclusion: "Médée, princesse de Colchide, est une puissante magicienne descendante du Soleil. Elle aide Jason à obtenir la Toison d’or, trahit sa famille pour le sauver, quitte son pays pour le suivre, élève ses enfants… jusqu’à ce que Jason la trahisse pour épouser une autre femme. Sa vengeance tragique est devenue l’un des mythes les plus intenses de la littérature. Médée incarne l’amour absolu, le don total, la puissance de l’intelligence passionnée, mais aussi l’effondrement intérieur lorsque l’on se sacrifie pour quelqu’un qui ne nous respecte pas. Elle est le symbole du cœur brillant… qui brûle tout ce qui le trahit.\n\nSi ton résultat correspond à Médée, c’est que tu es une personne capable d’aimer avec intensité, loyauté et profondeur. Tu ne donnes pas un petit peu : tu donnes beaucoup. Tu t’engages, tu soutiens, tu crois en ceux que tu choisis, parfois plus qu’ils ne croient en eux-mêmes. Tu peux porter, aider, protéger, défendre ceux que tu aimes. Tu as un cœur de flamme : tu vas jusqu’au bout, même lorsque c’est difficile, même lorsque tu dois quitter ce que tu connais. Ton amour n’est pas tiède, et ton engagement n’est pas superficiel.\n\nComme Médée, ton don peut devenir douleur si tu le confies aux mauvaises personnes. Tu peux investir ton énergie, ton temps, ta confiance, tes talents dans quelqu’un qui ne les mérite pas. Tu peux croire qu’aimer, c’est se dévouer. Mais l’amour véritable ne demande pas l’abandon de soi. Tu n’es pas fait(e) pour te sacrifier. Tu n’es pas obligé(e) de tout donner pour mériter d’être aimé(e). Tu n’as pas à brûler pour réchauffer les autres.\n\nTon intensité peut te rendre admirable, mais aussi vulnérable. Certains peuvent profiter de toi, ou te trahir, non par supériorité, mais parce qu’ils ne savent pas aimer aussi pleinement que toi. Comme Médée, tu peux être blessé(e) là où tu t’es donné(e) le plus. Ta douleur n’est pas de la faiblesse : c’est la conséquence de ta passion. Tu ne te trompes pas en aimant trop ; tu te trompes en t’oublier.\n\nTon défi est d’apprendre à garder ta puissance tout en te préservant. Tu peux aimer sans te dissoudre. Tu peux aider sans te sacrifier. Tu peux être loyal(e) sans suivre aveuglément. Tu peux défendre ce qui est juste… sans perdre ta dignité pour ce qui ne te respecte pas. Ta passion n’est pas dangereuse : ce qui l’est, c’est de la placer chez ceux qui ne la méritent pas.\n\nCe que ton résultat révèle, c’est que tu es un(e) être fort(e), talentueux(se), capable de transformer le monde par ton investissement. Tu es créatif(ve), stratège, déterminé(e). Tu peux accomplir de grandes choses lorsque tu utilises ta flamme pour toi-même, pour tes projets, pour ta vie. Tu n’es pas seulement quelqu’un qui aime fort : tu es quelqu’un qui peut créer fort. Lorsque ton énergie est dirigée vers ton évolution, et non vers la réparation de ceux qui te déçoivent, tu deviens extraordinaire.\n\nComme Médée, tu n’es pas destiné(e) à vivre à travers quelqu’un. Tu es destiné(e) à devenir l’auteur(e) de ta propre puissance. Tu n’as pas à te punir pour avoir aimé. Tu dois seulement t’assurer que ta flamme sert ta vie, pas ta disparition. Ton amour peut construire — si tu le donnes à ceux qui te voient, te respectent et t’égalent.\n\nTu n’es pas une tragédie. Tu es une force qui doit apprendre à choisir ce qu’elle brûle.",
  },

  // --- LIBRE dominant ---
  "Libre->Leader": {
    figure: "Hermès",
    image: "images/figures/hermes.png",
    tagline: "Organise, négocie et débloque les situations.",
    conclusion: "Hermès est le messager des dieux, fils de Zeus et de Maïa. Dieu du mouvement, des voyageurs, du commerce, de l’éloquence et des voleurs, il est connu pour sa rapidité, son intelligence vive et son ingéniosité. Il guide aussi les âmes vers l’Hadès, faisant de lui un passeur entre les mondes, entre la vie et la mort, le ciel et la terre, les dieux et les hommes. Hermès n’est ni guerrier, ni roi : il est celui qui comprend, circule, négocie, s’adapte. Il incarne la mobilité, la communication, la créativité intelligente et la liberté dans l’action.\n\nSi ton résultat correspond à Hermès, tu possèdes un esprit vif, agile et adaptable. Tu peux comprendre les autres rapidement, saisir les nuances d’une situation, trouver des solutions créatives en un instant. Tu n’as pas besoin de faire grand bruit pour influencer le monde : tu observes, tu analyses, tu t’adaptes, puis tu agis au bon moment. Tu n’es pas quelqu’un qui s’enferme dans un seul chemin. Tu aimes avoir plusieurs options, plusieurs projets, plusieurs idées en mouvement.\n\nComme Hermès, tu peux parfois être sous-estimé(e). Certains peuvent croire que tu ne prends rien au sérieux parce que tu es rapide, flexible, drôle ou insaisissable. Pourtant, ton intelligence est profonde : elle est simplement mobile. Tu n’as pas besoin de t’arrêter pour comprendre. Au contraire, tu comprends mieux quand tu bouges, quand tu expérimentes, quand tu explores. Ton esprit est en mouvement constant, et c’est ce qui te rend efficace.\n\nTa créativité peut s’exprimer de mille façons : humour, communication, inventions, stratégies, improvisation, réseaux sociaux, art, négociation, enseignement… Tu peux convaincre, guider, rassurer, divertir, inspirer. Tu peux voir ce que les autres ne remarquent pas, parce que tu n’es pas figé dans une seule manière de penser. Tu es un pont entre les idées, un passeur entre les personnes, un médiateur entre des mondes différents.\n\nTon défi réside dans la constance. Ton agilité peut se transformer en dispersion. Tu peux commencer beaucoup, t’ennuyer vite, vouloir passer à autre chose avant de terminer. Tu peux éviter les engagements qui t’enferment, fuir les situations trop rigides, repousser les responsabilités parce que tu crains de perdre ta liberté. Mais ton intelligence ne disparaît pas quand tu persévères : elle devient une force redoutable.\n\nCe que ton résultat révèle, c’est que tu peux devenir un(e) stratège hors pair, un(e) artiste connecté(e) au monde, un(e) communicateur(trice) brillant(e), un(e) entrepreneur(se) créatif(ve), un(e) médiateur(trice) capable d’apaiser les conflits par la compréhension. Tu peux transformer des idées en projets, des relations en réseaux solides, des messages en inspirations.\n\nComme Hermès, ton pouvoir n’est pas d’imposer, mais de relier. Tu n’es pas destiné(e) à suivre un seul chemin, mais à ouvrir plusieurs voies. Tu n’as pas besoin de devenir plus lourd pour être sérieux(se) : tu as besoin de canaliser tua mobilité pour qu’elle serve ce qui te passionne. Tu peux rester rapide et devenir durable. Tu peux être libre et fiable. Tu peux faire voyager ton esprit… sans te perdre.",
  },
  "Libre->Combattant": {
    figure: "Atalante",
    image: "images/figures/atalante.png",
    tagline: "Avance, lutte, refuse d’être freinée.",
    conclusion: "Atalante est l’une des héroïnes les plus célèbres de la mythologie grecque. Abandonnée à sa naissance sur une montagne parce que son père désirait un fils, elle est recueillie et nourrie par une ourse, puis élevée par des chasseurs. Rapidissime, invincible à la course, farouchement indépendante, elle refuse de se marier et impose un défi : elle n’épousera que celui qui la vaincra à la course… ce que personne ne parvient à faire, jusqu’à l’intervention d’Aphrodite. Atalante incarne la liberté farouche, la force féminine autodéterminée, la dignité qui refuse d’être possédée, et la difficulté de rester soi-même face au désir des autres.\n\nSi ton résultat correspond à Atalante, tu es quelqu’un qui valorise sa liberté avant tout. Tu avances vite, tu comprends vite, tu agis vite. Tu n’aimes pas les limites inutiles, ni les règles imposées par tradition, par pression sociale ou par simple habitude. Tu peux exceller dans ce que tu fais, souvent parce que tu n’attends pas l’autorisation d’avancer. Tu es dynamique, franc(he), direct(e), indépendant(e). Tu ne veux pas dépendre des autres — tu veux choisir. Tu n’acceptes pas de te laisser enfermer dans un rôle. Tu t’appartiens.\n\nComme Atalante, tu peux avoir appris tôt à compter sur toi-même, à ne pas trop attendre des autres, à te protéger en étant autonome. Cette force, admirable et précieuse, peut aussi faire naître une impression que tu n’as besoin de personne. Tu peux être entouré(e) de gens qui te respectent… mais qui ne te connaissent pas vraiment. Tu peux aimer ta liberté au point d’oublier que la connexion n’est pas une menace.\n\nTon indépendance n’est pas un rejet des relations, mais un refus d’être réduit(e), possédé(e), utilisé(e). Tu veux être choisi(e) par respect, pas par nécessité. Tu n’aimes pas qu’on t’impose, qu’on te dise comment vivre, qui être, quoi faire. Tu peux percevoir l’amour comme un piège si tu crois qu’il t’enlèvera ta place. Pourtant, l’amour sain ne demande pas que tu te ralentisses, ni que tu te renies. Il peut courir à tes côtés.\n\nTon défi n’est pas de devenir dépendant(e), mais de permettre à certaines personnes de courir avec toi. De faire confiance, de partager, sans perdre ton rythme propre. Tu n’as pas besoin d’être seul(e) pour rester toi-même. Tu peux aimer sans t’attacher à ceux qui veulent te réduire. Tu peux collaborer sans te dissoudre. Tu peux laisser entrer ce qui respecte ta vitesse, ta puissance, ta vision.\n\nCe que ton résultat révèle, c’est que tu es un(e) bâtisseur(se) de vie autonome, une personne qui ouvre des chemins, qui refuse les limites injustes, qui inspire les autres à agir. Tu peux devenir leader, créateur(trice), explorateur(trice), athlète de l’esprit ou du corps. Tu montres que la liberté est un acte, pas une condition. Tu rappelles que l’existence appartient à ceux qui osent la vivre à leur manière.\n\nComme Atalante, tu n’es pas fait(e) pour être capturé(e), mais pour être rejoint(e). Tu ne dois pas te défendre contre l’amour, seulement contre ce qui veut te ralentir. Ce que tu cherches n’est pas quelqu’un qui te dépasse ou te domine, mais quelqu’un qui court avec toi — et qui te choisit en pleine course. Tu n’as pas besoin d’être apprivoisé(e). Tu as besoin d’être compris(e).",
  },
  "Libre->Créatif": {
    figure: "Pan",
    image: "images/figures/pan.png",
    tagline: "Liberté instinctive.",
    conclusion: "Pan est le dieu des bergers, des forêts sauvages, de la nature brute, de la fertilité et des instincts. À moitié homme et à moitié chèvre, il habite les montagnes, les grottes et les vallées reculées. Il incarne l’énergie primordiale de la Terre : la sexualité instinctive, la musique née du souffle, la liberté hors des villes, la joie sauvage. Pan n’est pas civilisé ni poli ; il rit fort, court librement, joue de la flûte, effraie ceux qui refusent de ressentir. Son nom a donné le mot « panique » : la peur brutale déclenchée par l’inconnu. Pan représente l’instinct — beau, puissant, mais impossible à dompter.\n\nSi ton résultat correspond à Pan, tu es quelqu’un qui porte une force instinctive, naturelle, joyeuse et spontanée. Tu n’es pas fait(e) pour les règles qui étouffent, les conventions inutiles, les apparences fausses. Tu as besoin de respirer, de bouger, d’explorer, d’être toi-même sans masque. Tu valorises l’authenticité, la simplicité, le plaisir d’exister. Tu peux trouver du bonheur là où d’autres ne voient rien : une balade, une musique improvisée, un moment partagé, un éclat de rire. Tu es vivant(e) d’une manière vraie, presque animale, et c’est un cadeau.\n\nComme Pan, tu peux avoir un lien profond avec la nature, les animaux, les sensations, l’écoute du corps. Tu peux comprendre ton environnement intuitivement, ressentir le climat émotionnel d’un groupe, sentir ce qui dérange ou détend. Tu n’as pas besoin d’explications théoriques pour agir : tu sais d’instinct. Ce talent te rend spontané(e), drôle, inspirant(e), capable de réveiller la joie chez les autres. Tu n’essaies pas d’impressionner, tu essaies de vivre — et c’est ce qui impressionne.\n\nMais ta spontanéité peut aussi devenir une fuite. Comme Pan, tu peux éviter les responsabilités trop lourdes, les engagements exigeants, les situations qui t’enferment. Tu peux avoir peur de perdre ta liberté, au point d’éviter même ce qui te ferait grandir. Tu peux fuir les conflits, les émotions difficiles, ou les relations profondes si elles demandent trop de contrôle. Tu n’as pas besoin de perdre ta liberté pour t’engager — mais tu dois apprendre à ne pas confondre liberté et absence d’effort.\n\nTon défi est d’accepter que tu peux rester toi-même tout en construisant quelque chose. La nature sauvage n’est pas désordre : elle a son rythme, ses lois, ses cycles. Ta vie peut devenir un écosystème équilibré plutôt qu’une série d’échappées. Tu n’es pas destiné(e) à fuir les contraintes, mais à choisir celles qui nourrissent ta vie au lieu de l’emprisonner.\n\nCe que ton résultat révèle, c’est que tu peux être un(e) créateur(trice) de joie, un(e) conteur(se), un(e) artiste instinctif(ve), un(e) protecteur(trice) de la nature, un(e) guide vers l’authenticité. Tu as le pouvoir de rappeler aux autres qu’ils sont humains, vivants, sensibles, connectés à la terre. Tu peux devenir un équilibre précieux entre l’âme et le corps, entre l’humour et la vérité, entre la simple présence et l’expérience profonde.\n\nComme Pan, tu n’es pas fait(e) pour te conformer aux formes étroites. Tu peux apprendre à ne pas fuir ce qui te fait peur — non pas en te forçant, mais en apprenant à l’apprivoiser. Tu peux rester sauvage et devenir sage. Tu peux écouter ton corps sans ignorer ton esprit. Tu peux aimer sans t’attacher à la cage. Tu peux vivre librement, sans disparaître. Tu es un souffle de vie, à condition de ne pas t’enfuir avec le vent.",
  },
  "Libre->Protecteur": {
    figure: "Iris",
    image: "images/figures/achille.iris",
    tagline: "Apporte, relie, protège par présence.",
    conclusion: "Iris est la déesse messagère de la mythologie grecque, associée à l’arc-en-ciel. Elle relie les dieux aux humains et circule entre le ciel, la terre et la mer. Servante d’Héra, Iris apporte les messages et accompagne les transitions. Elle symbolise la communication juste, la présence protectrice et la capacité à créer des ponts.\n\nSi ton résultat correspond à Iris, tu es une personne naturellement reliée aux autres. Ta présence apaise, soutient et facilite les échanges. Tu sais être là au bon moment, avec les mots justes ou par une présence rassurante.\n\nTa plus grande qualité est ta capacité à relier. Tu comprends différents points de vue et tu aides à recréer le lien là où il s’est fragilisé. Tu es un médiateur ou un passeur naturel.\n\nPsychologiquement, tu es sensible, attentif(ve) et empathique. Tu ressens les ambiances et protèges par ta constance plutôt que par la domination.\n\nCependant, cette force peut devenir une limite. Tu peux t’oublier en portant trop les autres ou éviter le conflit pour préserver l’harmonie. Ton défi est d’apprendre à poser des limites claires.\n\nSymboliquement, Iris représente le pont vivant et la communication comme forme de protection. Elle rappelle que la paix traverse le chaos plutôt que de le nier.\n\nTu peux devenir un connecteur essentiel dans les groupes et les communautés. Ton évolution consiste à relier sans t’épuiser, afin que ta présence reste juste, forte et durable.",
  },
  "Libre->Sensible": {
    figure: "Éos",
    image: "images/figures/eos.png",
    tagline: "Fuit l’étouffement, suit l’émotion du moment.",
    conclusion: "Éos est la déesse de l’Aurore dans la mythologie grecque. Chaque matin, elle ouvre les portes du ciel pour laisser passer la lumière du jour. Sœur d’Hélios et de Séléné, elle marque le passage entre la nuit et le jour, entre ce qui s’achève et ce qui commence. Éos est associée au renouveau, au mouvement et à l’espoir.\n\nSi ton résultat correspond à Éos, tu es une personne tournée vers le renouveau et les nouvelles possibilités. Tu ressens quand une page doit se tourner et tu es attiré(e) par ce qui peut naître plutôt que par ce qui est figé.\n\nTa plus grande qualité est ton élan vers l’avenir. Tu apportes de la lumière dans les moments de transition et tu aides les autres à envisager un nouveau départ. Tu incarnes l’espoir actif.\n\nPsychologiquement, tu es sensible, mobile et émotionnellement vivant(e). Tu ressens intensément les fins et les commencements. Cette sensibilité te rend profondément humain(e) et inspirant(e).\n\nCependant, cette force peut devenir une limite. Tu peux avoir du mal à t’ancrer dans la durée ou idéaliser les débuts au détriment de la continuité. Ton défi est d’apprendre à faire vivre ce que tu fais naître.\n\nSymboliquement, Éos représente la liberté du passage et la promesse que la nuit n’est jamais définitive. Elle rappelle que chaque fin ouvre un possible, mais que la lumière doit aussi savoir se poser.\n\nTu peux devenir un passeur de transitions, quelqu’un qui ouvre des portes et inspire le renouveau. Ton évolution consiste à unir ton amour du nouveau à la capacité de construire dans le temps, afin que ta liberté devienne durable et féconde.",
  },
  "Libre->Indépendant": {
    figure: "Océan",
    image: "images/figures/ocean.png",
    tagline: "Explore, se détache, vit selon ses propres règles.",
    conclusion: "Océan, ou Océanos, est un Titan primordial de la mythologie grecque. Il représente le grand fleuve cosmique qui entoure le monde et dont toutes les eaux sont issues. Époux de Téthys et père des fleuves et des Océanides, il reste à l’écart des guerres de pouvoir et observe le monde depuis ses frontières. Océan incarne l’immensité, le mouvement continu et l’indépendance.\n\nSi ton résultat correspond à Océan, tu es une personne profondément libre et indépendante. Tu explores, tu observes et tu choisis ton propre chemin sans chercher à dominer. Ta liberté vient du détachement et de la fidélité à ton rythme intérieur.\n\nTa plus grande qualité est ta capacité à vivre selon tes propres règles. Tu sais t’éloigner de ce qui t’enferme et rester fidèle à toi-même, même lorsque le monde s’agite.\n\nPsychologiquement, tu es ouvert(e), fluide et réfléchi(e). Tu observes les situations dans leur ensemble et ressens les courants profonds plutôt que les conflits de surface.\n\nCependant, cette force peut devenir une limite. Tu peux te tenir trop à l’écart, éviter l’engagement ou être perçu(e) comme distant(e). Ton défi est d’apprendre que certaines limites peuvent aussi être des points d’ancrage.\n\nSymboliquement, Océan représente la liberté des frontières et la sagesse de la distance. Il rappelle que toucher le monde sans s’y enfermer est une forme de puissance.\n\nTu peux devenir un explorateur d’idées et de chemins. Ton évolution consiste à unir ton goût de l’exploration à un engagement choisi, afin que ta liberté nourrisse aussi la compréhension et le lien.",
  },
  "Libre->Séducteur": {
    figure: "Icare",
    image: "images/figures/icare.png",
    tagline: "Fascination du dépassement : attire par l’audace et le risque.",
    conclusion: "Icare est le fils de Dédale. Pour s’échapper de Crète, son père lui fabrique des ailes de cire et de plumes. Malgré les avertissements de ne pas voler trop près du soleil, Icare se laisse griser par le vol et s’élève trop haut. La cire fond et il chute dans la mer. Icare incarne l’audace, le désir de dépassement et le danger de l’excès.\n\nSi ton résultat correspond à Icare, tu es une personne attirée par le dépassement et l’intensité. Tu refuses la tiédeur et tu cherches à vivre pleinement. Ton audace et ton énergie attirent les autres et créent de l’impact.\n\nTa plus grande qualité est ton élan vital. Tu oses là où d’autres hésitent et tu inspires par ton courage et ton enthousiasme. Tu rappelles que la vie est faite pour être vécue intensément.\n\nPsychologiquement, tu es sensible aux défis et à la reconnaissance. Le risque te fait sentir vivant(e). Tu peux être charismatique et magnétique.\n\nCependant, cette force peut devenir une limite. Tu peux ignorer les signaux d’alerte ou rejeter les conseils. Ton défi est d’apprendre à accepter les limites sans renoncer à ton audace.\n\nSymboliquement, Icare représente la tension entre rêve et réalité. Il montre que la liberté a besoin de lucidité pour ne pas se transformer en chute.\n\nTu peux devenir un moteur de dépassement et d’innovation. Ton évolution consiste à unir ton goût du risque à la sagesse, afin que ton vol soit long, libre et durable.",
  },

  // --- INDÉPENDANT dominant ---
  "Indépendant->Leader": {
    figure: "Hadès",
    image: "images/figures/hades.png",
    tagline: "Contrôle calme, solitude assumée.",
    conclusion: "Hadès est le dieu du royaume des morts, frère de Zeus et Poséidon. Contrairement aux idées populaires, il n’incarne pas la mort elle-même, mais l’ordre, la justice et l’équilibre qui règne sur le monde invisible. Gouvernant l’Hadès, il veille à ce que chaque âme reçoive ce qui lui revient, sans cruauté ni favoritisme. Souvent perçu comme sombre ou distant, Hadès est en réalité l’un des dieux les plus loyaux, stables et incorruptibles. Époux de Perséphone, qu’il respecte comme reine, il symbolise la profondeur intérieure, l’indépendance émotionnelle, la fidélité et la capacité d’aimer loin du regard du monde.\n\nSi ton résultat correspond à Hadès, tu es quelqu’un de profond, loyal et plus sensible qu’il n’y paraît. Tu n’aimes pas l’illusion, les faux-semblants ou les relations superficielles. Tu préfères les liens vrais, solides, construits lentement, avec des personnes qui comprennent ta valeur sans avoir besoin que tu te mettes en scène. Tu n’es peut-être pas la personne qui parle le plus, mais tu es souvent celle qui pense le plus. Tu observes, tu analyses, tu comprends avant d’agir. Et lorsque tu t’engages, tu le fais entièrement.\n\nComme Hadès, tu peux être mal compris(e). Certains peuvent te croire froid(e), distant(e) ou peu accessible parce que tu n’offres pas ton monde intérieur à tout le monde. Mais en vérité, tu es une personne qui ressent beaucoup, mais qui n’aime pas gaspiller ses émotions. Tu protèges ce qui est précieux, tu offres ta loyauté à quelques personnes, et tu n’as pas besoin d’une foule pour te sentir complet(e). Tu ne recherches pas la popularité : tu veux la vérité.\n\nTu possèdes une personnalité stable, réfléchie, fiable. On peut compter sur toi. Tu n’es pas influençable, tu refuses de jouer des rôles pour plaire. Tu respectes la liberté des autres autant que tu protèges la tienne. Mais ton indépendance peut aussi te pousser à t’isoler, à te renfermer lorsque tu es blessé(e), à préférer le retrait que le conflit. Ton silence peut devenir ta forteresse… mais aussi ta prison.\n\nTon défi est d’apprendre à laisser entrer les bonnes personnes dans ton monde intérieur. Tu n’as pas besoin de tout partager, simplement de ne pas tout garder pour toi au point de te couper de ceux qui t’aiment vraiment. Tu peux aimer sans perdre ta profondeur. Tu peux partager sans perdre ton mystère. Tu peux être vulnérable sans être faible. Ta force ne vient pas de ta distance, mais de ta capacité à choisir avec soin ce qui mérite ton cœur.\n\nCe que ton résultat révèle, c’est que tu as un potentiel immense pour des relations sincères, des projets durables, une vie intérieure riche. Tu peux être un(e) partenaire fidèle, un(e) ami(e) rare, un(e) confident(e) précieux(se). Tu es capable d’aimer en profondeur, pas en surface. De respecter sans posséder. De donner sans te dissoudre. Tu peux aussi exceller dans les domaines qui demandent concentration, analyse, stratégie, patience.\n\nComme Hadès, tu n’as pas besoin d’être vu pour exister. Tu n’es pas destiné(e) à briller aux yeux du monde, mais à créer un royaume intérieur solide et à attirer ceux qui savent le reconnaître. Tu n’es pas sombre : tu es profond. Tu n’es pas distant : tu es sélectif(ve). Tu n’es pas froid(e) : tu es constant(e). Et ce que tu construis dans l’ombre vaut souvent plus que ce que d’autres exposent à la lumière.",
  },
  "Indépendant->Combattant": {
    figure: "Nérée",
    image: "images/figures/neree.png",
    tagline: "Tranche seul, avance sans attendre l’accord.",
    conclusion: "Nérée est une divinité marine ancienne de la mythologie grecque, souvent appelé le Vieillard de la mer. Fils de Pontos et de Gaïa, il incarne la mer calme, profonde et bienveillante. Doté du don de prophétie et de métamorphose, Nérée dit toujours la vérité, mais avec sagesse et mesure. Père des Néréides, il représente une autorité douce fondée sur la connaissance et le respect des équilibres naturels.\n\nSi ton résultat correspond à Nérée, tu es une personne calme, lucide et profondément sage. Tu observes avant d’agir et tu comprends les situations en profondeur. Ta présence apaise et inspire confiance.\n\nTa plus grande qualité est ta clarté intérieure. Tu sais dire la vérité sans brutalité et écouter sans juger. On vient naturellement te demander conseil.\n\nPsychologiquement, tu es réfléchi(e), patient(e) et empathique. Tu sais t’adapter sans te perdre, comme l’eau qui change de forme sans perdre son essence.\n\nCependant, cette force peut devenir une limite. Tu peux t’effacer trop facilement ou éviter la confrontation pour préserver l’harmonie. Ton défi est d’apprendre à exprimer clairement tes besoins et tes limites.\n\nTu peux parfois être perçu(e) comme distant(e), alors que ton calme cache une grande profondeur émotionnelle.\n\nSymboliquement, Nérée représente la sagesse des profondeurs et la vérité qui éclaire sans imposer. Il rappelle que la douceur n’exclut pas la force.\n\nTu peux devenir un conseiller, un médiateur ou un guide précieux. Ton évolution consiste à unir ta sagesse à une parole plus affirmée afin que ta vérité puisse pleinement servir les autres et toi-même.",
  },
  "Indépendant->Créatif": {
    figure: "Hécate",
    image: "images/figures/hecate.png",
    tagline: "Autonomie intérieure.",
    conclusion: "Hécate est une déesse ancienne de la mythologie grecque, associée aux carrefours, aux seuils, à la nuit et à la magie. Elle traverse librement les mondes et conserve une autonomie rare parmi les divinités. Protectrice des passages et des transitions, elle incarne l’autonomie intérieure et la créativité intuitive.\n\nSi ton résultat correspond à Hécate, tu es une personne profondément autonome intérieurement. Tu avances en écoutant ta voix intérieure, même lorsque le chemin n’est pas encore clairement tracé. Tu es à l’aise dans l’incertitude et les zones de transition.\n\nTa plus grande qualité est ton indépendance créative. Tu explores des idées et des solutions originales sans chercher à imiter. Tu transformes le doute et la solitude en puissance créative.\n\nPsychologiquement, tu es intuitive, lucide et consciente des nuances. Tu vois les zones grises et sais attendre le bon moment pour agir.\n\nCependant, cette force peut devenir une limite. Tu peux t’isoler excessivement ou hésiter trop longtemps au moment de choisir. Ton défi est d’oser trancher sans perdre ta liberté.\n\nSymboliquement, Hécate représente la créativité des seuils et la lumière intérieure qui guide dans l’obscurité. Elle rappelle que la vraie puissance vient de la clarté intérieure.\n\nTu peux devenir une pionnière intérieure et une source d’éclairage pour les autres. Ton évolution consiste à unir ton autonomie à l’expression, afin que ta créativité rencontre le monde sans se diluer.",
  },
  "Indépendant->Protecteur": {
    figure: "Chiron",
    image: "images/figures/chrion.png",
    tagline: "Sage retiré : soigne, guide, protège sans dominer.",
    conclusion: "Chiron est un centaure unique dans la mythologie grecque. Contrairement aux autres centaures, il est sage, cultivé et bienveillant. Maître de nombreux héros, il enseigne la médecine, la morale et l’art de vivre. Blessé par une flèche incurable, il incarne le guérisseur blessé et le guide humble.\n\nSi ton résultat correspond à Chiron, tu es une personne sage et profondément tournée vers le soin des autres. Tu influences sans dominer et guides sans imposer. Ta présence inspire confiance et sécurité.\n\nTa plus grande qualité est ta bienveillance lucide. Tu sais écouter, comprendre et accompagner en respectant le rythme de chacun. Tu élèves les autres en les rendant plus forts.\n\nPsychologiquement, tu es patient(e), empathique et réfléchi(e). Tu transformes la souffrance en compréhension et l’épreuve en transmission.\n\nCependant, cette force peut devenir une limite. Tu peux t’oublier en aidant trop, porter seul(e) des charges lourdes ou minimiser tes propres besoins. Ton défi est d’apprendre à te préserver.\n\nSymboliquement, Chiron représente la sagesse du soin et de la transmission. Il rappelle que la vraie autorité est celle qui élève sans dominer.\n\nTu peux devenir un mentor et un guide essentiel. Ton évolution consiste à équilibrer ton don pour les autres avec le soin de toi-même, afin que ta sagesse reste juste, vivante et durable.",
  },
  "Indépendant->Sensible": {
    figure: "Hippolyte",
     image: "images/figures/hippolyte.png",
    tagline: "Rigidité et fragilité.",
    conclusion: "Hippolyte est un héros de la mythologie grecque, fils de Thésée. Dévoué à Artémis, il rejette les passions amoureuses et valorise la pureté, l’indépendance et la maîtrise de soi. Cette rigidité provoque la colère d’Aphrodite et entraîne une tragédie. Hippolyte incarne la tension entre contrôle moral et sensibilité profonde.\n\nSi ton résultat correspond à Hippolyte, tu es une personne indépendante, attachée à tes valeurs et très sensible intérieurement. Tu utilises la discipline et la rigueur pour te protéger d’un monde que tu ressens intensément.\n\nTa plus grande qualité est ton intégrité morale. Tu agis selon ce que tu juges juste et refuses les compromis qui te trahiraient.\n\nPsychologiquement, tu es sensible mais contenu(e). Tu ressens beaucoup, mais tu gardes le contrôle pour ne pas te laisser submerger. Ta fragilité est réelle, mais soigneusement protégée.\n\nCependant, cette force peut devenir une limite. Tu peux nier certaines émotions ou juger ce qui te déstabilise. Ton défi est d’accepter la complexité du vivant sans perdre ta cohérence.\n\nSymboliquement, Hippolyte représente la difficulté d’intégrer le désir et l’émotion dans une quête de pureté. Il rappelle que la rigueur gagne à devenir souple.\n\nTu peux devenir une figure d’intégrité sensible. Ton évolution consiste à unir discipline et acceptation de toi-même, afin que ta force protège sans enfermer.",
  },
  "Indépendant->Libre": {
    figure: "Œdipe",
    image: "images/figures/oedipe.png",
    tagline: "Avance même quand tout s’effondre.",
    conclusion: "Œdipe est une figure centrale de la tragédie grecque. Abandonné à la naissance à cause d’une prophétie, il tente de fuir son destin mais l’accomplit sans le savoir. Devenu roi après avoir vaincu le Sphinx, il gouverne avec intelligence. Lorsque la vérité éclate, il choisit de l’affronter plutôt que de la fuir et part en exil. Œdipe incarne la quête de vérité et l’indépendance.\n\nSi ton résultat correspond à Œdipe, tu es une personne profondément indépendante qui avance même lorsque tout s’effondre. Tu préfères la vérité au confort et refuses de vivre dans l’illusion.\n\nTa plus grande qualité est ton courage face à la réalité. Tu oses regarder ce qui dérange et aller au fond des choses, même quand cela coûte.\n\nPsychologiquement, tu es lucide, déterminé(e) et responsable. Tu assumes les conséquences de tes actes et refuses de te définir uniquement comme victime.\n\nCependant, cette force peut devenir une limite. Tu peux être trop dur(e) envers toi-même, porter seul(e) un poids excessif ou croire que comprendre suffit à réparer. Ton défi est d’apprendre à intégrer la compassion.\n\nSymboliquement, Œdipe représente la liberté par la vérité. Il montre que l’effondrement peut devenir une transformation profonde.\n\nTu peux devenir une figure de résilience lucide. Ton évolution consiste à unir ta quête de vérité à la bienveillance envers toi-même, afin que ta liberté reste vivante et durable.",
  },
  "Indépendant->Séducteur": {
    figure: "Daphné",
    image: "images/figures/daphne.png",
    tagline: "Protège sa liberté par la fuite.",
    conclusion: "Daphné est une nymphe de la mythologie grecque, fille du dieu-fleuve Pénée. Dévouée à Artémis, elle choisit une vie libre et indépendante. Poursuivie par Apollon, elle refuse de céder et est transformée en laurier pour préserver sa liberté. Daphné incarne la fidélité à soi et le refus de la domination.\n\nSi ton résultat correspond à Daphné, tu es une personne profondément indépendante. Tu refuses que ton identité soit définie par le désir ou le pouvoir des autres. Ta liberté n’est pas négociable.\n\nTa plus grande qualité est ton intégrité intérieure. Tu sais dire non même sous pression et rester fidèle à toi-même sans chercher à convaincre.\n\nPsychologiquement, tu es lucide, sensible et consciente de tes limites. Tu protèges ton espace intérieur avec fermeté et instinct.\n\nCependant, cette force peut devenir une limite. Tu peux préférer le retrait à la confrontation et limiter certaines expériences par peur d’être envahi(e). Ton défi est d’apprendre à affirmer ta liberté sans disparaître.\n\nSymboliquement, Daphné représente la liberté par la métamorphose. Elle montre que se préserver peut être un acte de puissance.\n\nTu peux devenir une figure de résistance douce. Ton évolution consiste à unir ton indépendance à une présence affirmée, afin que ta liberté s’exprime sans se cacher.",
  },

  // --- SENSIBLE dominant ---
  "Sensible->Leader": {
    figure: "Andromaque",
    image: "images/figures/andromaque.png",
    tagline: "Mène par l’émotion, la compassion et l’exemple.",
    conclusion: "Andromaque est l’épouse d’Hector et une figure majeure de la mythologie troyenne. Princesse de Troie, elle incarne la force morale, la fidélité et l’humanité face à la guerre et à la perte. Après la chute de Troie, elle endure l’exil sans perdre sa dignité. Andromaque symbolise la compassion active et la capacité de guider par l’exemple.\n\nSi ton résultat correspond à Andromaque, tu es une personne qui mène par l’émotion, la compassion et la cohérence de ses actes. Tu influences sans dominer et inspires par ta sincérité.\n\nTa plus grande qualité est ta capacité à humaniser les situations. Tu rappelles ce qui compte vraiment et tu crées de la confiance autour de toi.\n\nPsychologiquement, tu es empathique, lucide et émotionnellement stable. Tu transformes l’émotion en soutien et en présence rassurante.\n\nCependant, cette force peut devenir une limite. Tu peux t’oublier en portant trop longtemps les autres ou accepter des situations injustes par souci de préserver l’harmonie. Ton défi est d’apprendre à poser des limites.\n\nSymboliquement, Andromaque représente la force morale dans l’effondrement. Elle montre que l’influence la plus durable est celle qui reste humaine.\n\nTu peux devenir une figure de leadership éthique. Ton évolution consiste à unir compassion et affirmation de soi, afin que ton exemple reste juste, fort et durable.",
  },
  "Sensible->Combattant": {
    figure: "Iphigénie",
    image: "images/figures/iphigenie.png",
    tagline: "Émotion qui pousse à agir : défend par attachement, colère ou amour.",
    conclusion: "Iphigénie est la fille d’Agamemnon et de Clytemnestre. Au cœur d’un sacrifice tragique destiné à apaiser Artémis, elle traverse la peur et l’injustice avant de choisir consciemment son rôle. Selon les mythes, elle est sacrifiée ou sauvée par la déesse. Iphigénie incarne l’émotion qui pousse à agir et la loyauté affective.\n\nSi ton résultat correspond à Iphigénie, tu es une personne guidée par l’émotion. Tu agis par attachement, par amour ou par colère lorsque quelque chose d’essentiel est menacé. Ton cœur est un moteur puissant.\n\nTa plus grande qualité est ta capacité à transformer l’émotion en action. Tu défends, protèges et prends position avec courage lorsque les autres hésitent.\n\nPsychologiquement, tu es sensible, loyal(e) et profondément engagé(e). Tu ressens fortement les injustices et les atteintes aux liens importants.\n\nCependant, cette force peut devenir une limite. Tu peux te sacrifier trop vite ou agir contre toi-même par loyauté excessive. Ton défi est d’apprendre à poser des limites.\n\nSymboliquement, Iphigénie représente la force de l’émotion engagée. Elle rappelle que l’amour et la colère peuvent conduire à des actes puissants, mais doivent être accompagnés de conscience.\n\nTu peux devenir une figure de défense émotionnelle. Ton évolution consiste à unir ton engagement affectif au respect de toi-même, afin que ton action te construise plutôt que de t’effacer.",
  },
  "Sensible->Créatif": {
    figure: "Cassandre",
    image: "images/figures/cassandre.png",
    tagline: "Comprend avant les autres, souvent incomprise.",
    conclusion: "Cassandre est la fille du roi Priam de Troie. Dotée par Apollon du don de prophétie, elle voit l’avenir avec clarté. Mais frappée d’une malédiction, ses paroles ne sont jamais crues. Elle annonce la chute de Troie sans être entendue. Cassandre incarne la lucidité et la vérité solitaire.\n\nSi ton résultat correspond à Cassandre, tu es une personne profondément lucide. Tu perçois les dangers, les incohérences et les non-dits avant les autres. Tu refuses de fermer les yeux pour être accepté(e).\n\nTa plus grande qualité est ta fidélité à la vérité intérieure. Tu continues à dire ce que tu vois, même lorsque cela te met à l’écart.\n\nPsychologiquement, tu es intuitive, sensible et consciente. Ta lucidité te rend intelligent(e), mais peut aussi te rendre vulnérable à l’isolement.\n\nCependant, cette force peut devenir une limite. Tu peux te sentir incompris(e) ou tomber dans le fatalisme. Ton défi est d’apprendre à adapter ta parole pour qu’elle soit entendue.\n\nSymboliquement, Cassandre représente la vérité non reconnue et la dignité de celle qui refuse de se taire. Elle rappelle que voir clair est déjà un acte de courage.\n\nTu peux devenir une sentinelle et un guide lucide. Ton évolution consiste à unir ta clarté intérieure à des stratégies de transmission afin que ta vérité protège et éclaire réellement les autres.",
  },
  "Sensible->Protecteur": {
    figure: "Thétis",
    image: "images/figures/thetis.png",
    tagline: "Tente d’épargner la souffrance et le destin.",
    conclusion: "Thétis est une Néréide de la mythologie grecque, mère d’Achille. Dotée de pouvoirs de métamorphose, elle tente par tous les moyens d’épargner à son fils un destin tragique. Elle incarne l’amour protecteur et la lutte contre la souffrance inévitable.\n\nSi ton résultat correspond à Thétis, tu es une personne profondément tournée vers la protection des autres. Tu anticipes la douleur et cherches à adoucir ce qui pourrait blesser ceux que tu aimes.\n\nTa plus grande qualité est ta capacité de soin préventif. Tu rassures, prépares et enveloppes les autres d’une présence sécurisante.\n\nPsychologiquement, tu es sensible, intuitive et très attachée. Tu ressens les dangers avant qu’ils ne surviennent et t’impliques émotionnellement avec intensité.\n\nCependant, cette force peut devenir une limite. Tu peux lutter contre ce qui ne peut être évité ou t’épuiser à vouloir tout empêcher. Ton défi est d’accepter que certaines épreuves font partie du chemin.\n\nSymboliquement, Thétis représente la tension entre amour et destin. Elle rappelle que protéger, c’est aussi accompagner lorsque la souffrance arrive.\n\nTu peux devenir une figure de soutien profond. Ton évolution consiste à unir ton instinct protecteur à l’acceptation, afin que ton amour reste fort sans se transformer en impuissance.",
  },
  "Sensible->Séducteur": {
    figure: "Psyché",
    image: "images/figures/psyche.png",
    tagline: "Vulnérabilité, confiance, besoin d’être aimée.",
    conclusion: "Psyché est une mortelle d’une beauté si profonde qu’elle attire la jalousie d’Aphrodite. Pour la punir, la déesse envoie Éros, dieu de l’amour, afin de la faire tomber amoureuse d’un monstre. Mais Éros tombe lui-même amoureux d’elle et l’emmène dans un palais mystérieux, à condition qu’elle ne tente jamais de voir son visage. En cédant finalement à la curiosité, Psyché perd l’amour qu’elle ignorait être divin, puis doit passer par des épreuves imposées par Aphrodite pour le retrouver. Guidée par sa détermination, elle devient immortelle. Psyché représente l’âme humaine qui apprend à aimer en se découvrant elle-même.\n\nSi ton résultat correspond à Psyché, tu es une personne guidée par l’amour vrai, pas l’apparence sociale, pas l’image, pas l’intérêt. Tu cherches à comprendre le cœur des autres, à ressentir leur vérité, à être en lien authentique. Tu peux aimer profondément, mais tu veux que cet amour soit réel, pas basé sur des illusions. Tu n’es pas fait(e) pour les relations superficielles. Tu es fait(e) pour les connexions qui permettent à chacun de devenir meilleur.\n\nComme Psyché, tu peux traverser des épreuves non parce que tu es faible, mais parce que tu aimes sincèrement. L’amour te rend parfois vulnérable : tu peux douter, avoir peur de perdre, chercher à savoir, vouloir des preuves. Tu peux, toi aussi, “regarder le visage d’Éros” : essayer d’analyser, d’assurer, de contrôler ce que tu aimes, simplement parce que tu veux que les choses soient vraies. Cela ne fait pas de toi quelqu’un de méfiant ou de fragile : cela fait de toi quelqu’un qui veut la clarté.\n\nTon parcours émotionnel peut ressembler à celui de Psyché : tu peux apprendre à aimer sans chercher à retenir, sans avoir besoin d’être rassuré(e) en permanence. Tu peux apprendre à te faire autant confiance qu’aux autres, à reconnaître ta valeur, à ne pas confondre amour et sacrifice. Tu n’as pas à mériter l’amour : tu mérites d’être aimé(e) parce que tu es toi.\n\nTon résultat révèle aussi une force discrète : tu grandis face à la difficulté. Tu n’es pas quelqu’un qui fuit les défis relationnels. Lorsque tu aimes, tu t’investis, tu apprends, tu évolues. Tu peux faire des erreurs, mais tu les utilises pour transformer ta vie. Comme Psyché, tu ne restes pas au sol : tu te reconstruis. Tu fais de tes blessures des passages vers quelque chose de plus vrai.\n\nTu as aussi une grande capacité à aimer sans vouloir posséder. À soutenir sans étouffer. À comprendre sans manipuler. Tu es capable d’un lien qui respecte la liberté, la dignité, le destin de l’autre. C’est rare. C’est précieux. Tu n’es pas seulement quelqu’un qui ressent fort : tu es quelqu’un qui fait grandir par l’amour.\n\nTon défi, c’est d’aimer en restant toi. De ne pas perdre ta lumière dans la quête de reconnaissance. De ne pas croire que tu dois te transformer pour être choisi(e). Tu peux apprendre à regarder ton propre visage avant celui de l’autre, à te faire confiance à toi-même avant de chercher des certitudes à l’extérieur.\n\nComme Psyché, tu es destiné(e) à une forme d’amour qui te révèle, qui te fait devenir plus grand(e), pas plus petit(e). Tu n’as pas besoin de prouver que tu mérites l’amour : tu as seulement besoin de t’élever à ton propre regard. L’amour que tu portes doit d’abord te rendre vivant(e), digne, lumineux(se). Tu es une âme qui ne cherche pas l’attachement : tu cherches la vérité.",
  },
  "Sensible->Libre": {
    figure: "Ariane",
    image: "images/figures/arine.png",
    tagline: "Suit l’amour et l’intuition.",
    conclusion: "Ariane est la fille du roi Minos de Crète, célèbre pour avoir aidé Thésée à vaincre le Minotaure. Grâce à son intelligence, elle lui offre le fil qui lui permet de sortir du labyrinthe, symbole de la stratégie, de la logique appliquée au cœur. Pourtant, après l’avoir sauvé, Ariane est abandonnée par Thésée sur l’île de Naxos, avant d’être découverte par Dionysos, qui l’épouse et la fait devenir immortelle. Ariane incarne la force de l’amour lucide, la capacité d’aider et de guider, mais aussi la douleur de donner trop. Elle représente la renaissance après la trahison : la valeur qui finit par être reconnue.\n\nSi ton résultat correspond à Ariane, c’est que tu possèdes une intelligence relationnelle profonde, une capacité à guider les autres, à les aider à sortir de leurs “labyrinthes” émotionnels ou personnels. Tu vois clair. Tu comprends vite. Tu sais offrir les solutions qui manquent, conseiller avec douceur, soutenir sans écraser. Tu peux devenir la personne qui aide, qui éclaire, qui accompagne, tout en restant modeste. Tu n’as pas besoin d’être au centre : tu veux juste que les choses s’améliorent, que les gens avancent.\n\nComme Ariane, tu peux tomber amoureux(se) de ce que tu aides. Tu peux croire que sauver, comprendre, soutenir suffit à créer un lien réciproque. Tu peux donner beaucoup, espérer qu’on te voit, qu’on te respecte, qu’on te choisisse… et être blessé(e) si ce n’est pas le cas. Tu ne demandes pas grand-chose, tu demandes juste qu’on te traite avec reconnaissance, avec vérité, avec loyauté. Mais tout le monde n’a pas la maturité de te rendre ce que tu offres.\n\nCe résultat ne dit pas que tu es naïf/naïve : il dit que tu crois en la valeur des liens sincères. Tu veux construire, pas utiliser. Tu veux comprendre, pas manipuler. Tu veux donner, mais pas te sacrifier. Pourtant, tu peux parfois te perdre dans tes engagements, t’investir trop dans des relations, des amitiés, des projets où tu mérites mieux. Comme Ariane, tu peux croire en quelqu’un plus que cette personne ne croit en toi.\n\nTon défi n’est pas d’aimer moins, mais de choisir mieux. De reconnaître qui mérite ton fil, qui mérite ton intelligence, qui mérite ton temps. Tu ne dois pas renier ta sensibilité : tu dois la protéger. Tu ne dois pas cesser d’aider : tu dois apprendre à ne pas t’abandonner en aidant. Tu peux guider, conseiller, aimer… sans te perdre dans ceux que tu accompagnes. Tu n’es pas le fil de tout le monde.\n\nCe que ton résultat révèle, c’est que tu peux devenir un(e) guide profond(e), un(e) allié(e) précieux(se), un(e) bâtisseur(se) de relations saines et constructives. Tu peux enseigner, créer, structurer, inspirer. Tu as l’âme d’un(e) architecte émotionnel(le). Tu transformes des vies non par la force, mais par la clarté. Tu donnes du sens là où il y a de la confusion.\n\nComme Ariane, ta valeur ne dépend pas de ceux qui la reconnaissent. Elle existe par elle-même. Ce que tu offres te reviendra, parfois d’ailleurs dans des liens bien plus beaux. Tu n’es pas destiné(e) à rester avec ceux qui ne te voient pas, mais à être aimé(e) par ceux qui savent reconnaître qui tu es. Tu es le fil qui guide les autres vers leur avenir… mais tu as aussi droit au tien.",
  },
  "Sensible->Indépendant": {
    figure: "Niobé",
     image: "images/figures/niobe.png",
    tagline: "Fierté solitaire.",
    conclusion: "Niobé est une reine de Thèbes, célèbre pour sa fierté et sa tragédie. Après s’être vantée face à la déesse Léto, elle voit ses enfants massacrés par Apollon et Artémis. Accablée par la douleur, elle se retire du monde et est transformée en pierre, d’où coulent des larmes éternelles. Niobé incarne la fierté blessée et la dignité solitaire.\n\nSi ton résultat correspond à Niobé, tu es une personne fière et consciente de ta valeur. Tu refuses d’être diminué(e) et préfères le silence à la plainte.\n\nTa plus grande qualité est ta dignité. Même dans l’épreuve, tu restes debout et fidèle à toi-même.\n\nPsychologiquement, tu es sensible et marqué(e) par des blessures profondes, mais tu contiens tes émotions pour ne pas te briser.\n\nCependant, cette force peut devenir une limite. Tu peux t’isoler, refuser l’aide ou figer ta souffrance par orgueil. Ton défi est d’accepter la vulnérabilité sans perdre ta dignité.\n\nSymboliquement, Niobé représente la fierté qui survit à la perte, mais qui peut aussi se transformer en immobilité.\n\nTu peux devenir une figure de dignité silencieuse. Ton évolution consiste à transformer ta fierté en socle vivant, afin que la douleur puisse circuler sans t’enfermer.",
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
      { label: "B", text: "Tu t'épanouies en restant toi-même.", profile: "Indépendant" },
      { label: "C", text: "Tu t’investis émotionnellement.", profile: "Sensible" },
      { label: "D", text: "Tu fais des compromis pour l'alimenter.", profile: "Protecteur" },
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
      { label: "A", text: "Essayes de suivre les consignes de ton partenaire pour lui faire plaisir.", profile: "Sensible" },
      { label: "B", text: "Bouges le plus de boîtes possibles.", profile: "Combattant" },
      { label: "C", text: "Nettoies la cochonnerie que personne ne touche.", profile: "Indépendant" },
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
      { label: "A", text: "Tu laisses le tout mijoter, tu prendras la décision sur le coup.", profile: "Combattant" },
      { label: "B", text: "Tu pèses les pours et le contres.", profile: "Indépendant" },
      { label: "C", text: "Tu te déconnectes pour avoir la tête libre.", profile: "Libre" },
      { label: "D", text: "Tu en parles à des amis.", profile: "Sensible" },
    ],
  },
  {
    id: 9,
    text: "Quand quelqu’un te fait une remarque blessante…",
    options: [
      { label: "A", text: "Tu respectes ses sentiments même si ça te blesse.", profile: "Sensible" },
      { label: "B", text: "Tu réfléchis longtemps au pourquoi", profile: "Créatif" },
      { label: "C", text: "Tu t'en fou.", profile: "Indépendant" },
      { label: "D", text: "Tu confrontes la personne.", profile: "Combattant" },
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
    text: "Quand une relation devient compliquée avec un bon ami…",
    options: [
      { label: "A", text: "Tu fais des efforts pour écouter l’autre.", profile: "Protecteur" },
      { label: "B", text: "Tu réfléchis à ce qui ne fonctionne pas pour mieux agir après.", profile: "Créatif" },
      { label: "C", text: "Tu prends une pause, le temps réparer bien des choses.", profile: "Indépendant" },
      { label: "D", text: "Tu t'investis pour amener du positif de manière alternative.", profile: "Séducteur" },
    ],
  },
  {
    id: 12,
    text: "Si tu avais un super pouvoir, tu pourrais",
    options: [
      { label: "A", text: "Guérir la souffrance avec tes mains.", profile: "Sensible" },
      { label: "B", text: "Devenir invisible.", profile: "Indépendant" },
      { label: "C", text: "Avoir une mémoire parfaite.", profile: "Créatif" },
      { label: "D", text: "Avoir la force d'un ours.", profile: "Combattant" },
    ],
  },
  {
    id: 13,
    text: "Ton avenir idéal serait surtout…",
    options: [
      { label: "A", text: "Pouvoir travailler 6 mois sur 12.", profile: "Libre" },
      { label: "B", text: "Construire une famille solide.", profile: "Protecteur" },
      { label: "C", text: "Être reconnu et apprécié.", profile: "Séducteur" },
      { label: "D", text: "Vivre un amour profond.", profile: "Sensible" },
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
      { label: "A", text: "Insulte l'équipe ennemie qui intimide ton coéquipier.", profile: "Combattant" },
      { label: "B", text: "Marque.", profile: "Séducteur" },
      { label: "C", text: "Fais la passe pour marquer.", profile: "Leader" },
      { label: "D", text: "Joue sérieusement.", profile: "Indépendant" },
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
    text: "Pour toi, réussir sa vie c’est surtout…",
    options: [
      { label: "A", text: "Être connu.", profile: "Séducteur" },
      { label: "B", text: "Être entouré.", profile: "Protecteur" },
      { label: "C", text: "Être heureux.", profile: "Libre" },
      { label: "D", text: "Être riche.", profile: "Indépendant" },
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
    text: "Dans un nouveau groupe…",
    options: [
      { label: "A", text: "Tu t’adaptes sans trop y penser.", profile: "Libre" },
      { label: "B", text: "Tu observes avant de t’ouvrir.", profile: "Indépendant" },
      { label: "C", text: "Tu t'assures d'être plaisant.", profile: "Sensible" },
      { label: "D", text: "Tu organises un jeu pour découvrir les autres.", profile: "Leader" },
    ],
  },
  {
    id: 20,
    text: "Les vacances idéales sont…",
    options: [
      { label: "A", text: "Dans un endroit rempli de nouvelles personnes.", profile: "Séducteur" },
      { label: "B", text: "Dans un endroit calme et paisible.", profile: "Indépendant" },
      { label: "C", text: "Avec quelques amis proches.", profile: "Sensible" },
      { label: "D", text: "Un voyage d’aventures.", profile: "Libre" },
    ],
  },
  {
    id: 21,
    text: "Face à une règle que tu trouves injuste…",
    options: [
      { label: "A", text: "Tu l’ignores.", profile: "Indépendant" },
      { label: "B", text: "Tu confrontes le responsable.", profile: "Combattant" },
      { label: "C", text: "Tu cherches une autre façon de faire.", profile: "Créatif" },
      { label: "D", text: "Tu en parles à tes amis.", profile: "Protecteur" },
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
    text: "Lorsque tu travailles avec quelqu’un de très différent de toi…",
    options: [
      { label: "A", text: "Tu fais attention à ne pas la froisser.", profile: "Protecteur" },
      { label: "B", text: "Tu cherches à apprendre à la connaître.", profile: "Créatif" },
      { label: "C", text: "Tu lui proposes un cadre de travail.", profile: "Leader" },
      { label: "D", text: "Tu fais le travail seul autant que possible.", profile: "Indépendant" },
    ],
  },
  {
    id: 24,
    text: "Si tu étais un super héros/héroïne tu serais comme…",
    options: [
      { label: "A", text: "Capitain America, car les gens l’écoutent.", profile: "Leader" },
      { label: "B", text: "Iron Man, car il est peu créer n'importe quoi.", profile: "Créatif" },
      { label: "C", text: "Deap Pool, car il est drôle.", profile: "Séducteur" },
      { label: "D", text: "Wolverine, car il fait tout pour ses quelques amis.", profile: "Protecteur" },
    ],
  },
  {
    id: 25,
    text: "Des ados intimident un inconnu, tu…",
    options: [
      { label: "A", text: "Tu chuchotes à l’inconnu de te suivre.", profile: "Protecteur" },
      { label: "B", text: "Les attaquent.", profile: "Combattant" },
      { label: "C", text: "Tu vas chercher de l’aide.", profile: "Indépendant" },
      { label: "D", text: "Tu leur parles en changeant le sujet.", profile: "Séducteur" },
    ],
  },
  {
    id: 26,
    text: "Quand tu imagines ton futur, tu te vois…",
    options: [
      { label: "A", text: "Ressentir des choses fortes.", profile: "Sensible" },
      { label: "B", text: "Essayer plein de choses.", profile: "Libre" },
      { label: "C", text: "Être apprécié.", profile: "Séducteur" },
      { label: "D", text: "Créer quelque chose de nouveau.", profile: "Créatif" },
    ],
  },
  {
    id: 27,
    text: "Sous pression …",
    options: [
      { label: "A", text: "Tu deviens une meilleure version de toi-même.", profile: "Créatif" },
      { label: "B", text: "Tu changes de direction.", profile: "Libre" },
      { label: "C", text: "Tu fonces.", profile: "Combattant" },
      { label: "D", text: "Tu parles à tes amis.", profile: "Sensible" },
    ],
  },
  {
    id: 28,
    text: "Un incendie s’est déclaré chez tes voisins, tu aides en…",
    options: [
      { label: "A", text: "Fonçant dans les flammes.", profile: "Combattant" },
      { label: "B", text: "Organisant une levée de fonds pour les victimes.", profile: "Créatif" },
      { label: "C", text: "Soignant les personnes blessées.", profile: "Protecteur" },
      { label: "D", text: "Passant chaque jour voir les victimes pour leur parler.", profile: "Sensible" },
    ],
  },
  {
    id: 29,
    text: "Après une grande réussite…",
    options: [
      { label: "A", text: "Tu fais une grosse fête.", profile: "Séducteur" },
      { label: "B", text: "Tu penses au prochain projet.", profile: "Créatif" },
      { label: "C", text: "Tu penses à ce que tu aurais pu mieux faire.", profile: "Combattant" },
      { label: "D", text: "Tu veux en parler à tes proches.", profile: "Sensible" },
    ],
  },
  {
    id: 30,
    text: "Pour toi, l’amour c’est…",
    options: [
      { label: "A", text: "Un espace pour que tu te découvres.", profile: "Libre" },
      { label: "B", text: "Des projets communs.", profile: "Créatif" },
      { label: "C", text: "Une relation où tu brilles.", profile: "Séducteur" },
      { label: "D", text: "Un engagement envers l'autre.", profile: "Protecteur" },
    ],
  },
  {
    id: 31,
    text: "La fin de semaine vient d’arriver, pour bien la commencer tu…",
    options: [
      { label: "A", text: "Regardes une série télé au complet.", profile: "Indépendant" },
      { label: "B", text: "Fais de la cuisine avec des amis.", profile: "Créatif" },
      { label: "C", text: "Sors ton/ta copain/copine en tête à tête.", profile: "Protecteur" },
      { label: "D", text: "Fais la fête dans un festival jusqu’au petite heure du matin.", profile: "Combattant" },
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
    text: "Dans l'univers d'Harry Potter, tu serais dans la maison…",
    options: [
      { label: "A", text: "Griffondor.", profile: "Combattant" },
      { label: "B", text: "Poussoufle.", profile: "Libre" },
      { label: "C", text: "Serpentard.", profile: "Séducteur" },
      { label: "D", text: "Serdaigle.", profile: "Leader" },
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
    text: "Si tu pouvais travailler à l'ONU pour régler une chose dans le monde ça serait…",
    options: [
      { label: "A", text: "La faim.", profile: "Protecteur" },
      { label: "B", text: "La maladie.", profile: "Sensible" },
      { label: "C", text: "Les conflits ethniques.", profile: "Leader" },
      { label: "D", text: "La pauvreté.", profile: "Indépendant" },
    ],
  },
  {
    id: 36,
    text: "Comme conseiller municipal tu proposerais à ta ville de travailler sur…",
    options: [
      { label: "A", text: "La sécurité des gens.", profile: "Protecteur" },
      { label: "B", text: "L'allègement des règles pour tous.", profile: "Libre" },
      { label: "C", text: "Des nouvelles constructions", profile: "Créatif" },
      { label: "D", text: "La diminution des taxes pour tous", profile: "Séducteur" },
    ],
  },
  {
    id: 37,
    text: "Quand tu es épuisé mentalement…",
    options: [
      { label: "A", text: "Tu fais une activité pour te changer les idées", profile: "Libre" },
      { label: "B", text: "Tu continues coûte que coûte.", profile: "Leader" },
      { label: "C", text: "Tu sors avec tes amis pour mieux te concentrer après.", profile: "Sensible" },
      { label: "D", text: "Tu prends un repos bien calme et bien mérité.", profile: "Indépendant" },
    ],
  },
  {
    id: 38,
    text: "À quel mammifère tu t’identifies le plus…",
    options: [
      { label: "A", text: "À un chien et sa meute ", profile: "Leader" },
      { label: "B", text: "Au castor et à son ingéniosité", profile: "Créatif" },
      { label: "C", text: "Au lion", profile: "Séducteur" },
      { label: "D", text: "À un éléphant et sa horde", profile: "Protecteur" },
    ],
  },
  {
    id: 39,
    text: "Le métier le plus intéressant serait selon toi…",
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
      { label: "D", text: "Être populaire.", profile: "Séducteur" },
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
    text: "Si un choix que tu prends déplaît à ton entourage…",
    options: [
      { label: "A", text: "Tu les ignores.", profile: "Indépendant" },
      { label: "B", text: "Tu argumentes.", profile: "Séducteur" },
      { label: "C", text: "Tu assumes.", profile: "Leader" },
      { label: "D", text: "Tu adaptes ton choix.", profile: "Libre" },
    ],
  },
  {
    id: 43,
    text: "La saison qui te représente plus c'est",
    options: [
      { label: "A", text: "Le printemps, car c'est ni trop chaud ni trop froid.", profile: "Indépendant" },
      { label: "B", text: "L'automne, car la nature est magnifique.", profile: "Sensible" },
      { label: "C", text: "L'été, car c'est plus facile de te déplacer.", profile: "Libre" },
      { label: "D", text: "L'hiver, car malgré le froid il y a plein de choses à faire.", profile: "Combattant" },
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
      { label: "A", text: "Tu fais ta part... on ne choisit pas sa famille", profile: "Indépendant" },
      { label: "B", text: "Tu aides les autres.", profile: "Protecteur" },
      { label: "C", text: "Tu participes, car les autres mettent des efforts.", profile: "Sensible" },
      { label: "D", text: "Tu organises des activités.", profile: "Leader" },
    ],
  },
  {
    id: 46,
    text: "Le plat qui te représenterait le plus serait…",
    options: [
      { label: "A", text: "Épicé.", profile: "Combattant" },
      { label: "B", text: "Réconfortant.", profile: "Protecteur" },
      { label: "C", text: "Beau.", profile: "Séducteur" },
      { label: "D", text: "Recherché.", profile: "Leader" },
    ],
  },
  {
    id: 47,
    text: "Quand ton choix va à l’encontre des opinions des autres…",
    options: [
      { label: "A", text: "Honnêtement, tu t'en fou.", profile: "Indépendant" },
      { label: "B", text: "Tu fais des compromis.", profile: "Séducteur" },
      { label: "C", text: "Tu assumes.", profile: "Leader" },
      { label: "D", text: "Tu écoutes les autres.", profile: "Sensible" },
    ],
  },
  {
    id: 48,
    text: "Être bien, c’est…",
    options: [
      { label: "A", text: "Ne pas avoir de trop de contraintes.", profile: "Libre" },
      { label: "B", text: "Voir tes proches heureux.", profile: "Protecteur" },
      { label: "C", text: "Te sentir apprécié.", profile: "Séducteur" },
      { label: "D", text: "Faire une différence.", profile: "Leader" },
    ],
  },
  {
    id: 49,
    text: "Ton amoureux/euse est de moins en moins heureux avec toi mais ne t'en parles pas... ",
    options: [
      { label: "A", text: "Tu lui en parles", profile: "Combattant" },
      { label: "B", text: "Tu lui donnes de l'espace.", profile: "Sensible" },
      { label: "C", text: "Tu en parles avec des amis.", profile: "Séducteur" },
      { label: "D", text: "Tu proposes des activités pour renouer la flamme.", profile: "Créatif" },
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
      { label: "A", text: "Tu changes d’environnement.", profile: "Libre" },
      { label: "B", text: "Tu ne t’en fais pas, tu feras des nouveaux amis au pire.", profile: "Leader" },
      { label: "C", text: "Tu t’affirmes.", profile: "Séducteur" },
      { label: "D", text: "Tu le vis fort, personne n'aime être rejetée.", profile: "Sensible" },
    ],
  },
  {
    id: 52,
    text: "Au Moyen Âge tu serais,",
    options: [
      { label: "A", text: "Un/une moine/moinesse, vivant une vie simple en nature sans manquer de bouffe", profile: "Indépendant" },
      { label: "B", text: "Un/une des artistes faisant les vitaux de Notre-Dame de Paris", profile: "Créatif" },
      { label: "C", text: "Un/une juge, au moins tu serais lire et écrire ", profile: "Leader" },
      { label: "D", text: "Un/une mercenaire, payer à faire une vie d'aventure.", profile: "Combattant" },
    ],
  },
  {
    id: 53,
    text: "Ton auto idéale serait…",
    options: [
      { label: "A", text: "Un pickup qui te permettra déplacer n’importe où.", profile: "Libre" },
      { label: "B", text: "Une Toyota qui te durera 20 ans.", profile: "Leader" },
      { label: "C", text: "Un char de sport.", profile: "Séducteur" },
      { label: "D", text: "Une mi-vanne qui pourra te permettre de conduire tous tes amis", profile: "Sensible" },
    ],
  },
  {
    id: 54,
    text: "Comme partenaire de vie, ta force sera…",
    options: [
      { label: "A", text: "De pouvoir t’adapter.", profile: "Libre" },
      { label: "B", text: "De faire des compromis.", profile: "Protecteur" },
      { label: "C", text: "De surmonter les problèmes.", profile: "Combattant" },
      { label: "D", text: "De s'assurer que jamais vous ne deviez plate.", profile: "Leader" },
    ],
  },
  {
    id: 55,
    text: "Le respect se gagne surtout par…",
    options: [
      { label: "A", text: "Les actions.", profile: "Combattant" },
      { label: "B", text: "Des liens d'amitié.", profile: "Sensible" },
      { label: "C", text: "La compétence.", profile: "Leader" },
      { label: "D", text: "Par l'authenticité", profile: "Libre" },
    ],
  },
  {
    id: 56,
    text: "Ta manière d’avancer dans la vie…",
    options: [
      { label: "A", text: "Avec des gens précieux.", profile: "Protecteur" },
      { label: "B", text: "Surmonter les tristesses, profiter de la joie.", profile: "Sensible" },
      { label: "C", text: "Improviser.", profile: "Libre" },
      { label: "D", text: "Prévoir, réaliser, prévoir, etc..", profile: "Leader" },
    ],
  },
];

// --------------------
// ÉTAT
// --------------------
const state = {
  index: 0,

  // answersRank[qIndex] = [0..4, 0..4, 0..4, 0..4]
  // Exemple: [2,0,1,4] => option A=2, B=0, C=1, D=4
  answersRank: Array.from({ length: QUESTIONS.length }, () => [0, 0, 0, 0]),
};

// Barème: rang -> points
const RANK_POINTS = {
  0: 0,
  1: 5,
  2: 4,
  3: 2,
  4: 1,
};

// --------------------
// UTILITAIRES
// --------------------

function assignNextRank(rankArr, optionIndex) {
  const current = rankArr[optionIndex] ?? 0;

   if (current > 0) {
    const removed = current;
    rankArr[optionIndex] = 0;

    for (let i = 0; i < rankArr.length; i++) {
      if (rankArr[i] > removed) rankArr[i] -= 1;
    }
    return rankArr;
  }

   const maxRank = Math.max(0, ...rankArr);
  if (maxRank >= 4) return rankArr; // déjà 4 choix classés → on ignore

  rankArr[optionIndex] = maxRank + 1;
  return rankArr;
}

function clearQuestionRanks(questionId) {
  state.answersRank[questionId] = [0, 0, 0, 0];
}

function getOptionProfile(questionObj, optionIndex) {
  // On suppose que ton objet question ressemble à:
  // { text: "...", options: [{ text:"...", profile:"Leader" }, ...] }
  // sinon adapte ici seulement.
  return questionObj.options[optionIndex].profile;
}

function makeEmptyCounts() {
  const counts = {};
  for (const p of PROFILES) counts[p] = 0;
  return counts;
}

function tallyProfiles() {
  const counts = makeEmptyCounts();

  for (let qi = 0; qi < QUESTIONS.length; qi++) {
    const q = QUESTIONS[qi];
    const ranks = state.answersRank[qi] || [0, 0, 0, 0];

    for (let i = 0; i < q.options.length; i++) {
      const opt = q.options[i];
      const rank = ranks[i] ?? 0;
      const pts = RANK_POINTS[rank] ?? 0;
      if (!pts) continue;

      const profile = opt.profile;
      if (counts[profile] === undefined) counts[profile] = 0;
      counts[profile] += pts;
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

  // IMPORTANT: on stocke par index, pas par q.id
  const ranks = state.answersRank[state.index] || [0, 0, 0, 0];

  app.innerHTML = `
    <div class="card">
      <div class="progress">Question ${state.index + 1} / ${QUESTIONS.length}</div>
      <h2>${q.id}. ${escapeHtml(q.text)}</h2>

      <div id="optionsContainer" class="options">
        ${q.options
          .map((opt, i) => {
            const rank = ranks[i] ?? 0;
            const rankedClass = rank > 0 ? "is-ranked" : "";
            return `
              <button type="button" class="optionBtn option ${rankedClass}" data-idx="${i}">
                <span class="rankBadge">${rank}</span>
                <span class="optionLabel">${escapeHtml(opt.label)}.</span>
                <span class="optionText">${escapeHtml(opt.text)}</span>
              </button>
            `;
          })
          .join("")}
      </div>

      <div class="actions">
        <button id="prevBtn" type="button" ${state.index === 0 ? "disabled" : ""}>Précédent</button>
        <button id="clearBtn" type="button">Effacer</button>
        <button id="nextBtn" type="button">${state.index === QUESTIONS.length - 1 ? "Terminer" : "Suivant"}</button>
      </div>

      <div class="hint">
        Clique sur les options dans l’ordre : <b>1, 2, 3, 4</b>.
        Reclique une option pour l’enlever. Bouton <b>Effacer</b> pour recommencer la question.
      </div>
    </div>
  `;

  document.getElementById("optionsContainer").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-idx]");
    if (!btn) return;

    const optionIndex = Number(btn.dataset.idx);
    const arr = state.answersRank[state.index] || [0, 0, 0, 0];

    assignNextRank(arr, optionIndex);

    state.answersRank[state.index] = arr;
    renderQuestion();
  });

  el("prevBtn").addEventListener("click", () => {
    state.index = Math.max(0, state.index - 1);
    renderQuestion();
  });

  el("nextBtn").addEventListener("click", () => {
    if (state.index >= QUESTIONS.length - 1) {
      renderResults();
    } else {
      state.index += 1;
      renderQuestion();
    }
  });

  el("clearBtn").addEventListener("click", () => {
    state.answersRank[state.index] = [0, 0, 0, 0];
    renderQuestion();
  });
}

function renderResults() {
  const app = el("app");

  const counts = tallyProfiles();
  const [top, second] = pickTopTwoRandomTies(counts);

  const key = resultKey(top.profile, second.profile);
  const mapped = PAIR_RESULTS[key];

  const figure = mapped?.figure ?? "Aucune figure liée";
  const tagline = mapped?.tagline ?? "Cette combinaison n’a pas encore été associée à une figure.";
  const conclusion = mapped?.conclusion ?? `À AJOUTER — clé: ${key}`;
  const imageSrc = mapped?.image; 

  app.innerHTML = `
    <div class="card">
      <h2>Résultat</h2>

      <p><b>Profil dominant :</b> ${escapeHtml(top.profile)} (${top.score})</p>
      <p><b>Profil secondaire :</b> ${escapeHtml(second.profile)} (${second.score})</p>

      <hr/>

      ${imageSrc ? `
      <div class="result-image">
      <img src="${imageSrc}" alt="${escapeHtml(figure)}">
      </div>
      ` : ""}

      <h3>${escapeHtml(figure)}</h3>

         <p style="opacity:.85; margin-top: 6px;">
        ${escapeHtml(tagline)}
        </p>

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
        <button id="restartBtn" type="button">Recommencer</button>
      </div>

      <div class="hint" style="margin-top:10px;">
        Clé utilisée pour la conclusion : <b>${escapeHtml(key)}</b>
      </div>
    </div>
  `;

  el("restartBtn").addEventListener("click", () => {
    state.index = 0;
    state.answersRank = Array.from({ length: QUESTIONS.length }, () => [0, 0, 0, 0]);
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
