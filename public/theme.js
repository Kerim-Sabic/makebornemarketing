// Applies the saved colour theme before first paint (kept external so the page CSP can forbid inline scripts).
try {
  var t = JSON.parse(localStorage.getItem('mb-war-room:theme') || '"system"');
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
