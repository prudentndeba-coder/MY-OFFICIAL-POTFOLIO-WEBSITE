// ---------------------------------------------------------------
// CONTACT FORM
//
// To receive messages reliably, create a free form at https://formspree.io
// (use your email prudentndeba@gmail.com), then paste your form link below,
// for example: "https://formspree.io/f/abcdwxyz"
//
// While FORM_ENDPOINT is empty, the form falls back to opening the
// visitor's own email app (they must press Send there for you to get it).
// ---------------------------------------------------------------
var FORM_ENDPOINT = "";

// Picks the French text when the visitor chose FR (set by i18n.js)
function L(en, fr) {
  return (window.siteLang && window.siteLang() === "fr") ? fr : en;
}

var form = document.getElementById("f");

if (form) {
  var statusEl = document.getElementById("st");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var d = new FormData(form);

    var name = d.get("name");
    var email = d.get("email");
    var kind = d.get("kind");
    var msg = d.get("msg");

    if (FORM_ENDPOINT) {
      // Sends the message straight to your inbox
      statusEl.textContent = L("Sending...", "Envoi en cours...");

      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: d,
        headers: { "Accept": "application/json" }
      }).then(function (res) {
        if (res.ok) {
          statusEl.textContent = L("Thanks, " + name + "! Your message was sent. I will reply soon.", "Merci, " + name + " ! Votre message a été envoyé. Je répondrai bientôt.");
          form.reset();
        } else {
          throw new Error("Request failed");
        }
      }).catch(function () {
        statusEl.textContent = L("Sorry, your message could not be sent. Please email prudentndeba@gmail.com or call +256 761 013 170.", "Désolé, votre message n'a pas pu être envoyé. Écrivez à prudentndeba@gmail.com ou appelez le +256 761 013 170.");
      });
      return;
    }

    // Fallback: opens the visitor's email app with the message filled in
    var subjectText = kind + " from " + name;

    var bodyText = "Name: " + name + "\n" +
                   "Email: " + email + "\n" +
                   "Type: " + kind + "\n\n" +
                   msg;

    window.location.href = "mailto:prudentndeba@gmail.com" +
      "?subject=" + encodeURIComponent(subjectText) +
      "&body=" + encodeURIComponent(bodyText);

    statusEl.textContent = L(
      "Thanks for submitting your message! Your email app should open now\u2014press send there to finish. I will reply soon.",
      "Merci pour votre message ! Votre application e-mail va s'ouvrir\u2014appuyez sur Envoyer pour terminer. Je répondrai bientôt.");
  });
}
