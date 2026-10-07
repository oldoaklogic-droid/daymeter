(function (g) {
  const usd = (n) => "$" + Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function normalize(p) {
    const start = Number(p.starting_capital_usd || 0), earned = Number(p.earned_usd || 0), spent = Number(p.spent_usd || 0);
    const total = Number(p.total_days || 100);
    const day = Number(p.day || 1);
    const goal = Number(p.goal_usd || 0);
    const remaining = p.remaining_usd !== undefined ? Number(p.remaining_usd) : start + earned - spent;
    return { ...p, day, total, earned, spent, remaining, goal, start,
      goalPct: goal ? Math.min(100, (earned / goal) * 100) : 0,
      dayPct: Math.min(100, (day / total) * 100), log: Array.isArray(p.log) ? p.log : [] };
  }
  async function load(src) {
    const r = await fetch(src, { cache: "no-store" });
    if (!r.ok) throw new Error("Could not load " + src + " (HTTP " + r.status + ")");
    return normalize(await r.json());
  }
  function srcFromQuery(def) {
    const q = new URLSearchParams(location.search).get("src");
    if (q && /^[\w\-./]+\.json$/.test(q) && !q.includes("..")) return q;
    return def;
  }
  g.DayMeter = { load, normalize, usd, esc, srcFromQuery };
})(window);
