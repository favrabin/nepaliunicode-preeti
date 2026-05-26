// script.js - Advanced Unicode to Preeti
const map = {
  "अ":"c","आ":"cf","इ":"O","ई":"P","उ":"p","ऊ":"pm","ए":"]","ऐ":"}","ओ":"]","औ":"}",
  "क":"s","ख":"v","ग":"u","घ":"3","ङ":"5","च":"8","छ":"9","ज":"r","झ":"4","ञ":"6",
  "ट":"t","ठ":"T","ड":"b","ढ":"B","ण":"6","त":"t","थ":"T","द":"d","ध":"D","न":"n",
  "प":"k","फ":"K","ब":"g","भ":"a","म":"m","य":"o","र":"/","ल":"l","व":"j","श":"z",
  "ष":"Z","स":"s","ह":"x","क्ष":"km","त्र":"/t","ज्ञ":"1",
  "ा":"f","ि":"l","ी":"L","ु":"'","ू":"\"","ृ":"`","े":"]","ै":"}","ो":"}","ौ":"}",
  "ं":"M","ँ":"~","्":"\\","।":"."," ":" ","\n":"\n"
};

function toPreeti(text) {
  let result = "";
  let i = 0;

  while (i < text.length) {
    let ch = text[i];
    let n1 = text[i+1] || '';
    let n2 = text[i+2] || '';

    if (n1 === 'ि') {
      result += 'l' + (map[ch] || ch);
      i += 2; continue;
    }
    if (ch === 'र' && n1 === '्') {
      result += "/"; i += 2; continue;
    }
    if (n1 === '्' && n2) {
      let conj = ch + '्' + n2;
      if (conj === "म्प") { result += "mk"; i += 3; continue; }
      if (conj === "र्ण") { result += "6m"; i += 3; continue; }
      if (conj === "ठो") { result += "To"; i += 3; continue; }
      if (conj === "डि") { result += "bi"; i += 3; continue; }
      if (conj === "यो") { result += "oM"; i += 3; continue; }
      if (conj === "हाँ") { result += "xM"; i += 3; continue; }
      result += (map[ch] || ch) + "\\";
      i += 2; continue;
    }
    result += map[ch] || ch;
    i++;
  }

  return result.replace(/l([a-zA-Z])/g, '$1l');
}

function convertToPreeti() {
  const input = document.getElementById("unicode").value;
  document.getElementById("preeti").value = toPreeti(input);
}

function clearAll() {
  document.getElementById("unicode").value = "";
  document.getElementById("preeti").value = "";
}
