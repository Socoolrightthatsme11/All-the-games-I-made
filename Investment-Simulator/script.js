function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str));
}

function UnicodeDecodeB64(str) {
  return decodeURIComponent(atob(str));
}

const createSaveCode = () => {
  var allValues = [store.get("money"), store.get("stock1Val"), store.get("stock2Val"), store.get("stock3Val"), store.get("stock1Owned"), store.get("stock2Owned"), store.get("stock3Owned")];
  var encryptedArray = [];
  allValues.map(a => encryptedArray.push(b64EncodeUnicode(a)));
  return encryptedArray.toString().replace(/,/g, "+");
}

const decryptSaveCode = (code) => {
  var decryptedArray = [];
  code = code.replace(/\+/g, ",");
  code = code.split(",");
  code = code.map(a => decryptedArray.push(UnicodeDecodeB64(a)))
  store.set("money", parseFloat(decryptedArray[0]));
  store.set("stock1Val", parseFloat(decryptedArray[1]));
  store.set("stock2Val", parseFloat(decryptedArray[2]));
  store.set("stock3Val", parseFloat(decryptedArray[3]));
  store.set("stock1Owned", parseFloat(decryptedArray[4]));
  store.set("stock2Owned", parseFloat(decryptedArray[5]));
  store.set("stock3Owned", parseFloat(decryptedArray[6]));
}

console.log("Don't cheat! Be kind to my game.")

store.get("money") == null ? store.set("money", 500) : console.log("Player has made progress. (Money)")
store.get("stock1Val") == null ? store.set("stock1Val", 100) : console.log("Stock 1 has already been loaded.");
store.get("stock2Val") == null ? store.set("stock2Val", 100) : console.log("Stock 2 has already been loaded.");
store.get("stock3Val") == null ? store.set("stock3Val", 100) : console.log("Stock 3 has already been loaded.");
store.get("stock1Owned") == null ? store.set("stock1Owned", 0) : console.log("Stock 1 has already been owned.");
store.get("stock2Owned") == null ? store.set("stock2Owned", 0) : console.log("Stock 2 has already been owned.");
store.get("stock3Owned") == null ? store.set("stock3Owned", 0) : console.log("Stock 3 has already been owned.");

const showValuesOfEverything = (firstLoad) => {
  $(".money").html(`You have ${store.get("money")} dollars.`);
  $(".stock1Value").html(`This stock is worth \$${store.get("stock1Val")}.`);
  $(".stock2Value").html(`This stock is worth \$${store.get("stock2Val")}.`);
  $(".stock3Value").html(`This stock is worth \$${store.get("stock3Val")}.`);
  $(".stock1Amount").html(`You own ${store.get("stock1Owned")} stocks of this stock.`);
  $(".stock2Amount").html(`You own ${store.get("stock2Owned")} stocks of this stock.`);
  $(".stock3Amount").html(`You own ${store.get("stock3Owned")} stocks of this stock.`);
  firstLoad == true ? console.log("Yay! You have made progress and its been loaded in!") : false
  var curNetworth = store.get("money") + store.get("stock1Val") * store.get("stock1Owned") + store.get("stock2Val") * store.get("stock2Owned") + store.get("stock3Val") * store.get("stock3Owned");
  $("#netWorth").html(`Your networth is: \$${curNetworth}`);
  $(".saveCode").val(createSaveCode());
}
showValuesOfEverything(true);

$(".loadSaveCode").click(() => {
  decryptSaveCode($(".saveCode").val());
  showValuesOfEverything(false);
});

const buyStock1 = n => {
    if (typeof n != "number") throw "You must enter a number.";
    if (n <= 0) throw "The number has to be greater than 0! (You can't buy 0 stocks or negative stocks)";
  var cost = n * store.get("stock1Val");
  if (cost > store.get("money")) {
    $(".err").html(`You can't afford to buy this stock. (You have ${store.get("money")} dollars and you need ${cost - store.get("money")} more to buy it.)`);
    return;
  } else if (cost <= store.get("money")) {
    store.set("money", store.get("money") - cost);
    store.set("stock1Owned", store.get("stock1Owned") + n);
    showValuesOfEverything(false);
  }
}

const buyStock2 = n => {
  try {
    if (typeof n != "number") throw "You must enter a number.";
    if (n <= 0) throw "The number has to be greater than 0! (You can't buy 0 stocks or negative stocks)";
  } catch (err) {
    $(".err").html(err);
    return;
  }
  var cost = n * store.get("stock2Val");
  if (cost > store.get("money")) {
    $(".err").html(`You can't afford to buy this stock. (You have ${store.get("money")} dollars and you need ${cost - store.get("money")} more to buy it.)`);
    return;
  } else if (cost <= store.get("money")) {
    store.set("money", store.get("money") - cost);
    store.set("stock2Owned", store.get("stock2Owned") + n);
    showValuesOfEverything(false);
  }
}

const buyStock3 = n => {
  try {
    if (typeof n != "number") throw "You must enter a number.";
    if (n <= 0) throw "The number has to be greater than 0! (You can't buy 0 stocks or negative stocks)";
  } catch (err) {
    $(".err").html(err);
    return;
  }
  var cost = n * store.get("stock3Val");
  if (cost > store.get("money")) {
    $(".err").html(`You can't afford to buy this stock. (You have ${store.get("money")} dollars and you need ${cost - store.get("money")} more to buy it.)`);
    return;
  } else if (cost <= store.get("money")) {
    store.set("money", store.get("money") - cost);
    store.set("stock3Owned", store.get("stock3Owned") + n);
    showValuesOfEverything(false);
  }
}

const sellStock1 = n => {
  try {
    if (typeof n!= "number") throw "You must enter a number.";
    if (n <= 0) throw "The number has to be greater than 0! (You can't sell 0 stocks or negative stocks)";
    if (store.get("stock1Owned") < n) throw "You can't sell this stock. (You don't own this stock)";
  } catch (err) {
    $(".err").html(err);
    return;
  }
  var earnings = n * store.get("stock1Val");
  store.set("money", store.get("money") + earnings);
  store.set("stock1Owned", store.get("stock1Owned") - n);
  showValuesOfEverything(false);
}


const sellStock2 = n => {
  try {
    if (typeof n!= "number") throw "You must enter a number.";
    if (n <= 0) throw "The number has to be greater than 0! (You can't sell 0 stocks or negative stocks)";
    if (store.get("stock2Owned") < n) throw "You can't sell this stock. (You don't own this stock)";
  } catch (err) {
    $(".err").html(err);
    return;
  }
  var earnings = n * store.get("stock2Val");
  store.set("money", store.get("money") + earnings);
  store.set("stock2Owned", store.get("stock2Owned") - n);
  showValuesOfEverything(false);
}


const sellStock3 = n => {
  try {
    if (typeof n!= "number") throw "You must enter a number.";
    if (n <= 0) throw "The number has to be greater than 0! (You can't sell 0 stocks or negative stocks)";
    if (store.get("stock3Owned") < n) throw "You can't sell this stock. (You don't own this stock)";
  } catch (err) {
    $(".err").html(err);
    return;
  }
  var earnings = n * store.get("stock3Val");
  store.set("money", store.get("money") + earnings);
  store.set("stock3Owned", store.get("stock3Owned") - n);
  showValuesOfEverything(false);
}

const startRandomChangeStock1 = () => {
  setInterval(() => {
    //This function aims to randomly change the stock 1 value.
    var negOrPos = Math.random() < 0.5 ? "-" : "+"; //Chooses whether it will be a negative or positive change.
    var change = Math.floor(Math.random() * 25);
    if (store.get("stock1Val") > 0 || store.get("stock1Val") - change > 0) {
      store.set('stock1Val', negOrPos == "-" ? store.get('stock1Val') - change : store.get('stock1Val') + change);
      showValuesOfEverything(false)
    } else {
      store.set('stock1Val', store.get('stock1Val') + change);
    }
  }, 500);
}

const startRandomChangeStock2 = () => {
  setInterval(() => {
    //This function aims to randomly change the stock 2 value.
    var negOrPos2 = Math.random() < 0.5 ? "-" : "+"; //Chooses whether it will be a negative or positive change.
    var change2 = Math.floor(Math.random() * 25);
    if (store.get("stock2Val") > 0 || store.get("stock2Val") - change2 > 0) {
      store.set('stock2Val', negOrPos2 == "-" ? store.get('stock2Val') - change2 : store.get('stock2Val') + change2);
      showValuesOfEverything(false)
    } else {
      store.set('stock2Val', store.get('stock2Val') + change2);
    }
  }, 500);
}

const startRandomChangeStock3 = () => {
  setInterval(() => {
    //This function aims to randomly change the stock 3 value.
    var negOrPos3 = Math.random() < 0.5 ? "-" : "+"; //Chooses whether it will be a negative or positive change.
    var change3 = Math.floor(Math.random() * 25);
    if (store.get("stock3Val") > 0 || store.get("stock3Val") - change3 > 0) {
      store.set('stock3Val', negOrPos3 == "-" ? store.get('stock1Val') - change3 : store.get('stockVal3') + change3);
      showValuesOfEverything(false)
    } else {
      store.set('stock3Val', store.get('stock3Val') + change3);
    }
  }, 500);
}

startRandomChangeStock1();
startRandomChangeStock2();
startRandomChangeStock3();

$(document).on("click", ".addInvest1", () => {
  var valueOfBox = $(".invest1").val();
  buyStock1(parseFloat(valueOfBox));
});

$(document).on("click", ".addInvest2", () => {
  var valueOfBox = $(".invest2").val();
  buyStock2(parseFloat(valueOfBox));
});

$(document).on("click", ".addInvest3", () => {
  var valueOfBox = $(".invest3").val();
  buyStock3(parseFloat(valueOfBox));
});

$(document).on("click", ".sellInvest1", () => {
  var valBox = $('.sellStock1').val();
  sellStock1(parseFloat(valBox));
});

$(document).on("click", ".sellInvest2", () => {
  var valBox = $('.sellStock2').val();
  sellStock2(parseFloat(valBox));
});

$(document).on("click", ".sellInvest3", () => {
  var valBox = $('.sellStock3').val();
  sellStock3(parseFloat(valBox));
});

const resetProgress = () => {
  store.set("money", 500);
  store.set("stock1Val", 100);
  store.set("stock2Val", 100);
  store.set("stock3Val", 100);
  store.set("stock1Owned", 0);
  store.set("stock2Owned", 0);
  store.set("stock3Owned", 0);
  console.log("Reset progress.")
  showValuesOfEverything(false);
}

Array.prototype.sample = () => {
  return this[Math.floor(Math.random() * this.length)];
}





