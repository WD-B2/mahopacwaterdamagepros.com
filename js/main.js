(function () {
  "use strict";
  var BP = "(max-width:980px)";
  var root = document.documentElement;
  root.classList.remove("no-js");

  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var burger = document.getElementById("burger");
  var closeBtn = document.getElementById("mob-close");

  function setDrawer(open) {
    if (!drawer || !overlay || !burger) { return; }
    drawer.classList.toggle("open", open);
    overlay.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    root.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) { closeBtn.focus(); } else if (!open) { burger.focus({ preventScroll: true }); }
  }
  if (burger) { burger.addEventListener("click", function () { setDrawer(true); }); }
  if (closeBtn) { closeBtn.addEventListener("click", function () { setDrawer(false); }); }
  if (overlay) { overlay.addEventListener("click", function () { setDrawer(false); }); }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      setDrawer(false);
      var open = document.querySelectorAll(".dd.open");
      for (var i = 0; i < open.length; i++) { open[i].classList.remove("open"); open[i].querySelector(".dd-btn").setAttribute("aria-expanded", "false"); }
    }
  });
  if (window.matchMedia) {
    var mq = window.matchMedia(BP);
    var onChange = function () { if (!mq.matches) { setDrawer(false); } };
    if (mq.addEventListener) { mq.addEventListener("change", onChange); } else if (mq.addListener) { mq.addListener(onChange); }
  }

  var dds = document.querySelectorAll(".dd");
  Array.prototype.forEach.call(dds, function (dd) {
    var btn = dd.querySelector(".dd-btn");
    if (!btn) { return; }
    btn.addEventListener("click", function () {
      var willOpen = !dd.classList.contains("open");
      Array.prototype.forEach.call(dds, function (o) { o.classList.remove("open"); var b = o.querySelector(".dd-btn"); if (b) { b.setAttribute("aria-expanded", "false"); } });
      dd.classList.toggle("open", willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest || e.target.closest(".dd")) { return; }
    Array.prototype.forEach.call(dds, function (o) { o.classList.remove("open"); var b = o.querySelector(".dd-btn"); if (b) { b.setAttribute("aria-expanded", "false"); } });
  });

  var qs = document.querySelectorAll(".faq-q");
  Array.prototype.forEach.call(qs, function (q) {
    q.addEventListener("click", function () {
      var a = document.getElementById(q.getAttribute("aria-controls"));
      var open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", open ? "false" : "true");
      if (a) { a.style.maxHeight = open ? "0px" : a.scrollHeight + "px"; }
    });
  });
  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(qs, function (q) {
      if (q.getAttribute("aria-expanded") === "true") {
        var a = document.getElementById(q.getAttribute("aria-controls"));
        if (a) { a.style.maxHeight = a.scrollHeight + "px"; }
      }
    });
  });
})();
