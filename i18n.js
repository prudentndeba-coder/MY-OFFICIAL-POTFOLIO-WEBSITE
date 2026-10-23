(function () {
  var FR = {
    "Home": "Accueil", "About": "À propos", "Skills": "Compétences", "Contact": "Contact",
    "Back to Home": "Retour à l'accueil", "About Me": "À propos de moi",
    "Hi, It's": "Salut, c'est", "I am a": "Je suis",
    "Web Developer & GRAPHIC DESIGNER": "Développeur web & DESIGNER GRAPHIQUE",
    "Crafting clean code and compelling visual experiences.": "Du code propre et des expériences visuelles percutantes.",
    "I create visual content, logo, poster, flyer, Websites and bring ideas into reality": "Je crée du contenu visuel, des logos, des affiches, des flyers et des sites web, et je donne vie aux idées.",
    "Here me": "Contactez-moi",
    "I am a passionate and results-driven": "Je suis un",
    "Web Developer and Graphic Designer": "développeur web et graphiste",
    "with a strong eye for aesthetics and functionality. I specialize in building responsive, user-friendly websites and creating compelling visual designs that communicate brand identity effectively.": "passionné, axé sur les résultats, avec un sens aigu de l'esthétique et de la fonctionnalité. Je me spécialise dans la création de sites web responsives et conviviaux, et de designs visuels percutants qui communiquent efficacement l'identité d'une marque.",
    "With expertise in HTML, CSS, JavaScript, Figma, Photoshop and Illustrator, I combine technical skills with creative vision to deliver high-quality digital solutions that help businesses grow. I am committed to clean code, modern design, and exceptional user experience.": "Avec mon expertise en HTML, CSS, JavaScript, Figma, Photoshop et Illustrator, j'associe compétences techniques et vision créative pour offrir des solutions numériques de haute qualité qui aident les entreprises à se développer. Je m'engage pour un code propre, un design moderne et une expérience utilisateur exceptionnelle.",
    "I'm a Web Developer and Graphic Designer who enjoys turning ideas into creative, functional, and visually engaging digital experiences. I work with web technologies to build clean, responsive websites, while also using graphic design to create posters, logos, social media graphics, and other visual content.": "Je suis développeur web et graphiste, et j'aime transformer les idées en expériences numériques créatives, fonctionnelles et visuellement attrayantes. J'utilise les technologies web pour créer des sites propres et responsives, et le design graphique pour réaliser des affiches, des logos, des visuels pour les réseaux sociaux et d'autres contenus visuels.",
    "I'm always learning and improving my skills in web development, graphic design, UI/UX, and digital technology. My goal is to combine creativity and technology to solve problems, communicate ideas clearly, and create meaningful digital experiences.": "J'apprends et je progresse sans cesse en développement web, design graphique, UI/UX et technologies numériques. Mon objectif est d'allier créativité et technologie pour résoudre des problèmes, communiquer clairement les idées et créer des expériences numériques porteuses de sens.",
    "I believe that good design is not only about how something looks\u2014it's also about how well it works and how effectively it communicates.": "Je crois qu'un bon design ne se limite pas à son apparence : il s'agit aussi de son bon fonctionnement et de l'efficacité avec laquelle il communique.",
    "What I do": "Ce que je fais", "Web development": "Développement web", "Web Development": "Développement web",
    "Graphic design": "Design graphique", "Graphic Design": "Design graphique",
    "Responsive layouts": "Mises en page responsives", "Git and GitHub": "Git et GitHub",
    "Logos and branding": "Logos et identité visuelle", "Posters and flyers": "Affiches et flyers",
    "Social media graphics": "Visuels pour réseaux sociaux", "Layout and typography": "Mise en page et typographie",
    "Selected work": "Réalisations choisies", "Brand": "Marque", "Print": "Impression",
    "Business website": "Site web d'entreprise",
    "A responsive site for a local business, built to load fast on mobile.": "Un site responsive pour une entreprise locale, conçu pour se charger rapidement sur mobile.",
    "Logo and identity": "Logo et identité",
    "A logo, colour palette and type system for a new brand.": "Un logo, une palette de couleurs et un système typographique pour une nouvelle marque.",
    "Event and promotion designs made for print and social media.": "Des designs d'événements et de promotions pour l'impression et les réseaux sociaux.",
    "More projects on": "Plus de projets sur",
    "Let's work together": "Travaillons ensemble", "Your name": "Votre nom", "Your email": "Votre e-mail",
    "This message is a": "Ce message est", "Project inquiry": "Demande de projet", "Feedback": "Avis",
    "Other": "Autre", "Message": "Message", "Send message": "Envoyer le message",
    "Call or WhatsApp": "Appeler ou WhatsApp",
    "Pridance Tambwe | Web Developer & Graphic Designer": "Pridance Tambwe | Développeur web & graphiste"
  };

  var ATTR = {
    "Open menu": "Ouvrir le menu", "Close menu": "Fermer le menu",
    "Show skills menu": "Afficher le menu des compétences", "Main": "Principale",
    "Portrait of Pridance Tambwe": "Portrait de Pridance Tambwe",
    "Language / Langue": "Language / Langue"
  };
  var current = "en";
  var aorig = new WeakMap();

  function applyAttrs(lang) {
    var els = document.querySelectorAll("[aria-label],[alt]");
    for (var i = 0; i < els.length; i++) {
      ["aria-label", "alt"].forEach(function (a) {
        var el = els[i];
        if (!el.hasAttribute(a) || el.closest(".lang-switch")) return;
        var store = aorig.get(el) || {};
        var v = el.getAttribute(a);
        if (!(a in store)) store[a] = v;
        if (store[a] in ATTR) el.setAttribute(a, lang === "fr" ? ATTR[store[a]] : store[a]);
        aorig.set(el, store);
      });
    }
  }

  // nav.js changes the menu button's label when it opens/closes; keep it translated
  var busy = false;
  var mo = new MutationObserver(function (muts) {
    if (busy) return;
    busy = true;
    muts.forEach(function (m) {
      var el = m.target, v = el.getAttribute("aria-label");
      var store = aorig.get(el) || {};
      if (current === "fr" && v in ATTR) { store["aria-label"] = v; aorig.set(el, store); el.setAttribute("aria-label", ATTR[v]); }
      else if (current === "en") { store["aria-label"] = v; aorig.set(el, store); }
    });
    busy = false;
  });

  window.siteLang = function () { return current; };

  var KEY = "site-lang";
  var orig = new WeakMap();
  var title0 = document.title;

  function norm(s) { return s.replace(/\s+/g, " ").trim(); }

  function apply(lang) {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = w.nextNode())) {
      var tag = n.parentNode.nodeName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "TEXTAREA") continue;
      if (!orig.has(n)) {
        var k = norm(n.nodeValue);
        if (!k || !Object.prototype.hasOwnProperty.call(FR, k)) continue;
        orig.set(n, { raw: n.nodeValue, key: k });
      }
      var o = orig.get(n);
      if (lang === "fr") {
        n.nodeValue = o.raw.match(/^\s*/)[0] + FR[o.key] + o.raw.match(/\s*$/)[0];
      } else {
        n.nodeValue = o.raw;
      }
    }
    current = lang;
    applyAttrs(lang);
    document.documentElement.lang = lang;
    document.title = (lang === "fr" && FR[norm(title0)]) ? FR[norm(title0)] : title0;
    var btns = document.querySelectorAll(".lang-switch button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", String(btns[i].getAttribute("data-lang") === lang));
    }
  }

  // Keep the form's "kind" values in English so emails arrive in English
  var opts = document.querySelectorAll("select option");
  for (var i = 0; i < opts.length; i++) opts[i].setAttribute("value", opts[i].textContent.trim());

  var inner = document.querySelector(".nav-inner");
  if (inner) {
    var box = document.createElement("div");
    box.className = "lang-switch";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Language / Langue");
    [["en", "EN", "English"], ["fr", "FR", "Français"]].forEach(function (l) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = l[1];
      b.setAttribute("data-lang", l[0]);
      b.setAttribute("lang", l[0]);
      b.setAttribute("aria-label", l[2]);
      b.addEventListener("click", function () {
        try { localStorage.setItem(KEY, l[0]); } catch (e) {}
        apply(l[0]);
      });
      box.appendChild(b);
    });
    inner.appendChild(box);
  }

  var toggles = document.querySelectorAll(".nav-toggle");
  for (var t = 0; t < toggles.length; t++) mo.observe(toggles[t], { attributes: true, attributeFilter: ["aria-label"] });

  var lang = "en";
  try { lang = localStorage.getItem(KEY) || "en"; } catch (e) {}
  apply(lang === "fr" ? "fr" : "en");
})();
