// ---------------------------------------------------------------
// CONTACT FORM  (FormSubmit.co, no backend needed)
//
// The success message is shown ONLY when FormSubmit confirms it received
// the message. If anything fails (no internet, server error) an alert is
// shown instead and the typed message stays in the form.
//
// Note: the first time ever, FormSubmit emails prudentndeba@gmail.com a
// one-time "Activate" link. Click it once, then messages arrive normally.
// ---------------------------------------------------------------

// Picks the French text when the visitor chose FR (set by i18n.js)
function L(en, fr) {
  return (window.siteLang && window.siteLang() === "fr") ? fr : en;
}

var form = document.getElementById("f");

if (form) {
  var statusEl = document.getElementById("st");
  var sendBtn = form.querySelector('button[type="submit"]');
  var hideTimer = null;

  // No thank-you message before a message is really sent (also on reload)
  statusEl.style.display = "none";
  statusEl.textContent = "";

  // FormSubmit's AJAX address: same address as the form's action, with /ajax/
  var ajaxUrl = form.action.replace("formsubmit.co/", "formsubmit.co/ajax/");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stay on the page, nothing opens (no mailto)

    clearTimeout(hideTimer);
    statusEl.style.display = "none";
    statusEl.textContent = "";

    // Change the text of the same node, so the EN/FR switch keeps working
    var label = sendBtn.firstChild;
    var oldLabel = label.nodeValue;
    label.nodeValue = L("Sending...", "Envoi en cours...");
    sendBtn.disabled = true;

    fetch(ajaxUrl, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          var failed = data && (data.success === false || data.success === "false");
          if (!res.ok || failed) throw new Error("Not sent");
        });
      })
      .then(function () {
        // Only here, after FormSubmit said OK
        statusEl.textContent = L(
          "\u2705 Your message has been successfully submitted! I will reply soon.",
          "\u2705 Votre message a bien \u00e9t\u00e9 envoy\u00e9 ! Je r\u00e9pondrai bient\u00f4t."
        );
        statusEl.style.display = "block";
        form.reset();
        hideTimer = setTimeout(function () {
          statusEl.style.display = "none";
          statusEl.textContent = "";
        }, 6000);
      })
      .catch(function () {
        alert(L(
          "Sorry, your message could not be sent. Please check your internet connection and try again.",
          "D\u00e9sol\u00e9, votre message n'a pas pu \u00eatre envoy\u00e9. V\u00e9rifiez votre connexion internet et r\u00e9essayez."
        ));
      })
      .then(function () {
        label.nodeValue = oldLabel;
        sendBtn.disabled = false;
      });
  });
}
