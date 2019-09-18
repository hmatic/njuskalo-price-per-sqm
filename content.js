listings = document.querySelectorAll('.EntityList-item--Regular, .EntityList-item--VauVau');

for (var i = listings.length - 1; i >= 0; i--) {
  listing = listings[i]

  // Calculate sqm
  var adDescription = listing.getElementsByClassName('entity-description-main')[0].textContent;
  var sqm = parseFloat(adDescription.match(/Stambena površina: ([0-9.]+) m2/)[1]);

  // Calculate price
  var adPrice = listing.getElementsByClassName('price price--eur')[0].textContent;
  var price = parseInt(adPrice.match(/[0-9.]+/)[0].replace(".", ""))

  var pricePerSqmCalculated = Math.round(price/sqm);

  // Modify UI:
  var priceList = listing.getElementsByClassName("price-items cf")[0];

  var pricePerSqm = document.createElement("li");
  pricePerSqm.setAttribute("class", "price-item")

  var amount = document.createElement("strong")
  amount.appendChild(document.createTextNode(pricePerSqmCalculated))
  amount.setAttribute("class","price")

  var unit = document.createElement("span")
  unit.appendChild(document.createTextNode(" eur/m2"))
  unit.setAttribute("class", "currency")

  pricePerSqm.appendChild(amount);
  pricePerSqm.appendChild(unit);

  priceList.appendChild(pricePerSqm);
}
