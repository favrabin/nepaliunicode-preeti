// REAL PREETI FONT ASCII MAPPING DICTIONARY
const unicodeToPreetiMap = {
  // Digits
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
  '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',

  // Standalone Vowels
  'अ': 'c', 'आ': 'cf', 'इ': 'O', 'ई': 'P', 'उ': 'p', 'ऊ': 'P]',
  'ऋ': 'C', 'ए': 'P', 'ऐ': 'P}', 'ओ': 'cf]', 'औ': 'cf\}',

  // Consonants
  'क': 's', 'ख': 'v', 'ग': 'u', 'घ': 'U', 'ङ': 'ª',
  'च': 'r', 'छ': '\'', 'ज': 'h', 'झ': 'H', 'ञ': '¥',
  'ट': 'y', 'ठ': 'Y', 'ड': 'd', 'ढ': 'D', 'ण': '0',
  'त': 't', 'थ': 'y', 'द': 'b', 'ध': 'B', 'न': 'l',
  'प': 'k', 'फ': 'K', 'ब': 'a', 'भ': 'e', 'म': 'm',
  'य': 'o', 'र': 'r', 'ल': 'n', 'व': 'j', 'श': 'z',
  'ष': 'Z', 'स': 's', 'ह': 'x',

  // Half Consonants (Preeti ASCII exact keys)
  'क्': 'S', 'ख्': 'V', 'ग्': 'U', 'घ्': 'ª',
  'च्': 'R', 'छ्': 'R', 'ज्': 'H', 'झ्': '¥',
  'त्': 't', 'थ्': 'Y', 'द्': 'b', 'ध्': 'B', 'न्': 'L',
  'प्': 'K', 'फ्': 'K', 'ब्': 'A', 'भ्': 'E', 'म्': 'M',
  'य्': 'O', 'ल्': 'N', 'व्': 'J', 'श्': 'Z', 'स्': ':', 'ह्': 'X',

  // Special Ligatures
  'क्ष': 'IF', 'क्ष्म': 'IFm', 'त्र': 'q', 'ज्ञ': 'j', 
  'द्व': 'å', 'द्य': 'B', 'द्ध': '4', 'ष्ट': 'î', 'ष्ठ': 'ï',
  'श्र': 'z', 'स्र': ':r', 'द्द': 'b',

  // Matras (Vowel Signs)
  'ा': 'f', 'ी': 'L', 'ु': '\'', 'ू': '"', 'े': ']',
  'ै': '}', 'ो': 'f]', 'ौ': 'f\}', 'ं': 'M', 'ँ': 'F',
  'ः': ':', '्': '\\',

  // Punctuation
  '।': 'P', '॥': 'PP', '?': '?'
};

// Core Transliteration Engine
function convertUnicodeToPreeti(text) {
  if (!text) return "";

  let result = text;

  // Rule 1: Handle Reph (र्) positioning
  result = result.replace(/\u0930\u094d([\u0905-\u0939])/g, '$1{');
  result = result.replace(/\u0930\u094d([\u0905-\u0939])([\u093e-\u094c\u0901\u0902]*)/g, '$1$2{');

  // Rule 2: Short 'i' matra (ि) reordering (moves BEFORE consonant)
  result = result.replace(/([\u0905-\u0939])\u093f/g, 'i$1');
  result = result.replace(/([\u0905-\u0939]\u094d[\u0905-\u0939])\u093f/g, 'i$1');

  // Rule 3: Exact Half-letter shortcuts
  result = result.replace(/स्/g, ':');
  result = result.replace(/क्/g, 'S');
  result = result.replace(/न्/g, 'L');
  result = result.replace(/म्/g, 'M');

  let converted = "";
  let i = 0;

  while (i < result.length) {
    if (i < result.length - 2) {
      let trio = result.substring(i, i + 3);
      if (unicodeToPreetiMap[trio]) {
        converted += unicodeToPreetiMap[trio];
        i += 3;
        continue;
      }
    }

    if (i < result.length - 1) {
      let pair = result.substring(i, i + 2);
      if (unicodeToPreetiMap[pair]) {
        converted += unicodeToPreetiMap[pair];
        i += 2;
        continue;
      }
    }

    let char = result[i];
    converted += (unicodeToPreetiMap[char] !== undefined) ? unicodeToPreetiMap[char] : char;
    i++;
  }

  return converted;
}

// Window functions
window.convertNow = function() {
  const input = document.getElementById('unicodeInput');
  const output = document.getElementById('preetiOutput');
  if (input && output) {
    output.value = convertUnicodeToPreeti(input.value);
    updateStats();
  }
};

window.updateStats = function() {
  const input = document.getElementById('unicodeInput');
  const output = document.getElementById('preetiOutput');
  
  if (input) {
    const inVal = input.value.trim();
    document.getElementById('inputStats').innerText = 
      (inVal ? inVal.split(/\s+/).length : 0) + " words | " + input.value.length + " chars";
  }
  if (output) {
    const outVal = output.value.trim();
    document.getElementById('outputStats').innerText = 
      (outVal ? outVal.split(/\s+/).length : 0) + " words | " + output.value.length + " chars";
  }
};

window.changeFontSize = function(delta) {
  const input = document.getElementById('unicodeInput');
  const output = document.getElementById('preetiOutput');
  [input, output].forEach(el => {
    if (el) {
      const currentSize = parseFloat(window.getComputedStyle(el).fontSize) || 16;
      el.style.fontSize = Math.max(12, Math.min(32, currentSize + delta)) + 'px';
    }
  });
};

window.copyToClipboard = function() {
  const output = document.getElementById('preetiOutput');
  if (!output || !output.value) {
    showToast("Nothing to copy!");
    return;
  }
  navigator.clipboard.writeText(output.value).then(() => {
    showToast("Preeti text copied!");
  });
};

window.downloadTxt = function() {
  const output = document.getElementById('preetiOutput');
  if (!output || !output.value.trim()) {
    showToast("Nothing to download!");
    return;
  }
  const blob = new Blob([output.value], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "preeti-converted.txt";
  link.click();
  showToast("Downloaded .txt file!");
};

window.clearAll = function() {
  const input = document.getElementById('unicodeInput');
  const output = document.getElementById('preetiOutput');
  if (input) input.value = "";
  if (output) output.value = "";
  updateStats();
  if (input) input.focus();
};

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => { toast.classList.remove("show"); }, 2500);
}

document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById('unicodeInput');
  const themeToggle = document.getElementById('themeToggle');

  if (input) {
    input.addEventListener('input', window.convertNow);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function() {
      document.documentElement.classList.toggle("dark");
      const isDark = document.documentElement.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
});
