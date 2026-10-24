(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  var dd = document.querySelector(".has-dropdown");
  var ddBtn = document.querySelector(".dd-toggle");

  function closeDropdown() {
    if (!dd) return;
    dd.classList.remove("open");
    if (ddBtn) ddBtn.setAttribute("aria-expanded", "false");
  }

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    closeDropdown();
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (!open) closeDropdown();
  });

  if (dd && ddBtn) {
    ddBtn.addEventListener("click", function () {
      var open = dd.classList.toggle("open");
      ddBtn.setAttribute("aria-expanded", String(open));
    });
  }

  document.addEventListener("click", function (e) {
    if (dd && !dd.contains(e.target)) closeDropdown();
    if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest(".dropdown a")) closeMenu();
  });
})();
