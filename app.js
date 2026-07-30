// Unicode to Preeti Master Dictionary
const unicodeToPreetiMap = {
  // Numbers
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
  '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',

  // Standalone Vowels
  'अ': 'a', 'आ': 'cf', 'इ': 'O', 'ई': 'P', 'उ': 'p', 'ऊ': 'P',
  'ऋ': 'C', 'ए': 'P', 'ऐ': 'P}', 'ओ': 'cf]', 'औ': 'cf\}',

  // Consonants
  'क': 's', 'ख': 'v', 'ग': 'u', 'घ': 'U', 'ङ': 'ª',
  'च': 'r', 'छ': 'R', 'ज': 'h', 'झ': 'H', 'ञ': '¥',
  'ट': 'y', 'ठ': 'Y', 'ड': 'd', 'ढ': 'D', 'ण': '0',
  'त': 't', 'थ': 'T', 'द': 'b', 'ध': 'B', 'न': 'n',
  'प': 'k', 'फ': 'K', 'ब': 'a', 'भ': 'A', 'म': 'e',
  'य': 'o', 'र': 'r', 'ल': 'l', 'व': 'j', 'श': 'z',
  'ष': 'Z', 'स': 's', 'ह': 'x',

  // Half Consonants (Preeti ASCII specific)
  'क्': 'S', 'ख्': 'V', 'ग्': 'U', 'घ्': 'ª',
  'च्': 'R', 'छ्': 'R', 'ज्': 'H', 'झ्': '¥',
  'त्': 't', 'थ्': 'T', 'द्': 'b', 'ध्': 'B', 'न्': 'n',
  'प्': 'K', 'फ्': 'K', 'ब्': 'A', 'भ्': 'A', 'म्': 'E',
  'य्': 'O', 'ल्': 'L', 'व्': 'J', 'श्': 'Z', 'स्': ':', 'ह्': 'X',

  // Compounds & Special Characters
  'क्ष': 'IF', 'क्ष्म': 'IFe', 'त्र': 'q', 'ज्ञ': 'j', 
  'द्व': 'å', 'द्य': 'B', 'द्ध': '4', 'ष्ट': 'î', 'ष्ठ': 'ï',
  'श्र': 'z', 'स्र': ':r', 'द्द': 'b',

  // Matras (Vowel Signs)
  'ा': 'f', 'ी': 'L', 'ु': '\'', 'ू': '"', 'े': ']',
  'ै': '}', 'ो': 'f]', 'ौ': 'f\}', 'ं': 'm', 'ँ': 'F',
  'ः': ':', '्': '\\',

  // Punctuation
  '।': 'P', '॥': 'PP', '?': '?'
};

// Conversion Algorithm
function convertUnicodeToPreeti(text) {
  if (!text) return "";

  let result = text;

  // Rule 1: Reph (र्) shifting
  result = result.replace(/र्([क-ह])/g, '$1{');
  result = result.replace(/र्([क-ह])([ािीुूेैोौँं]*)/g, '$1$2{');

  // Rule 2: Short 'i' matra positioning
  result = result.replace(/([क-ह])ि/g, 'i$1');
  result = result.replace(/([क्-ह्][क-ह])ि/g, 'i$1');

  // Rule 3: Common half-letter replacements
  result = result.replace(/स्/g, ':');
  result = result.replace(/क्/g, 'S');
  result = result.replace(/न्/g, 'n');
  result = result.replace(/म्/g, 'E');

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

// Global Actions triggered by buttons
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
      const currentSize = parseFloat(window.getComputedStyle(el).fontSize);
      el.style.fontSize = Math.max(12, Math.min(32, currentSize + delta)) + 'px';
    }
  });
};

window.copyToClipboard = function() {
  const output = document.getElementById('preetiOutput');
  if (!output || !output.value) return;
  navigator.clipboard.writeText(output.value).then(() => alert("Preeti text copied!"));
};

window.downloadTxt = function() {
  const output = document.getElementById('preetiOutput');
  if (!output || !output.value.trim()) return;
  const blob = new Blob([output.value], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "preeti-converted.txt";
  link.click();
};

window.clearAll = function() {
  const input = document.getElementById('unicodeInput');
  const output = document.getElementById('preetiOutput');
  if (input) input.value = "";
  if (output) output.value = "";
  updateStats();
};

// Event Listeners for real-time conversion & theme toggle
document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById('unicodeInput');
  const themeToggle = document.getElementById('themeToggle');

  if (input) {
    input.addEventListener('input', window.convertNow);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function() {
      document.documentElement.classList.toggle("dark");
    });
  }
});
