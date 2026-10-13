const PER_SQM_CLASS = 'njuskalo-price-per-sqm';

// "84.47 m²", "51,42 m2", "12.500 m²" -> 84.47, 51.42, 12500. Only matches if that's the whole text,
// so titles like "dvoetažni apartman 67 m²" are ignored.
function parseSqm(text) {
  const match = text.trim().match(/^([0-9][0-9.,]*)\s*m(²|2)$/);
  if (!match) return null;
  let number = match[1];
  // Dots in groups of three are thousands separators (large land plots), otherwise a decimal point
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(number)) number = number.replace(/\./g, '');
  return parseFloat(number.replace(',', '.'));
}

// The area is shown as a chip ("66.85 m²") — find the first element whose text is just that
function findSqm(listing) {
  for (const el of listing.querySelectorAll('*')) {
    const sqm = parseSqm(el.textContent);
    if (sqm) return sqm;
  }
  return null;
}

// "369.000 €", "1.250.000,00 €" -> 369000, 1250000
function parsePrice(text) {
  const match = text.match(/[0-9][0-9.]*/);
  if (!match) return null;
  return parseInt(match[0].replace(/\./g, ''), 10);
}

function addPricePerSqm(listing) {
  const priceEl = listing.querySelector('.price');
  if (!priceEl || priceEl.querySelector('.' + PER_SQM_CLASS)) return;

  const sqm = findSqm(listing);
  const price = parsePrice(priceEl.textContent);
  if (!sqm || !price) return;

  const pricePerSqm = Math.round(price / sqm).toLocaleString('hr-HR');

  const el = document.createElement('span');
  el.className = PER_SQM_CLASS;
  el.textContent = `${pricePerSqm} €/m²`;
  priceEl.appendChild(el);
}

function run() {
  document.querySelectorAll('li.listing').forEach(addPricePerSqm);
}

// Listings are rendered by Vue and change on pagination/sorting without a full reload
let scheduled = false;
new MutationObserver(() => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    run();
  });
}).observe(document.body, { childList: true, subtree: true });

run();
