(function () {
  var s = document.currentScript || document.querySelector('script[src*="embed.js"]');
  var base = s ? s.src.replace(/embed\.js(\?.*)?$/, "") : "";
  document.querySelectorAll("[data-daymeter]").forEach(function (el) {
    if (el.dataset.daymeterMounted) return;
    el.dataset.daymeterMounted = "1";
    var f = document.createElement("iframe");
    f.src = base + "widget.html?src=" + encodeURIComponent(el.getAttribute("data-daymeter") || "data/bot5.json");
    f.title = "DayMeter progress";
    f.loading = "lazy";
    f.style.cssText = "width:100%;max-width:420px;height:110px;border:0;display:block";
    el.appendChild(f);
  });
})();
