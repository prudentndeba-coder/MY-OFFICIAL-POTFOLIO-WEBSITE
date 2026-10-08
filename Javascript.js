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
      statusEl.textContent = "Sending...";

      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: d,
        headers: { "Accept": "application/json" }
      }).then(function (res) {
        if (res.ok) {
          statusEl.textContent = "Thanks, " + name + "! Your message was sent. I will reply soon.";
          form.reset();
        } else {
          throw new Error("Request failed");
        }
      }).catch(function () {
        statusEl.textContent = "Sorry, your message could not be sent. Please email prudentndeba@gmail.com or call +256 761 013 170.";
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

    statusEl.textContent =
      "Thanks for submitting your message! Your email app should open now\u2014press send there to finish. I will reply soon.";
  });
}
