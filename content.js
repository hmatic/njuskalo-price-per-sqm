const listings = document.querySelectorAll('.EntityList-item--Regular, .EntityList-item--VauVau');

for (var i = listings.length - 1; i >= 0; i--) {
  listing = listings[i];

  // Calculate sqm
  const adDescription = listing.getElementsByClassName('entity-description-main')[0].textContent;
  const sqm = parseFloat(adDescription.match(/Stambena površina: ([0-9.]+) m2/)[1]);

  // Calculate price
  const adPrice = listing.getElementsByClassName('price price--hrk')[0].textContent;
  const price = parseInt(adPrice.match(/[0-9.]+/)[0].replace(".", ""));

  const pricePerSqmCalculated = Math.round(price/sqm);

  // Modify UI:
  let priceList = listing.getElementsByClassName("price-items cf")[0];

  let pricePerSqm = document.createElement("li");
  pricePerSqm.setAttribute("class", "price-item");

  pricePerSqm.innerHTML = `<strong class="price">${pricePerSqmCalculated}</strong><span class="currency"> eur/m2</span>`;

  priceList.appendChild(pricePerSqm);
}
