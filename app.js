// Complete & Accurate Unicode to Preeti Dictionary
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

  // Half Consonants (Preeti Specific Half-Letter Keys)
  'क्': 'S', 'ख्': 'V', 'ग्': 'U', 'घ्': 'ª',
  'च्': 'R', 'छ्': 'R', 'ज्': 'H', 'झ्': '¥',
  'त्': 't', 'थ्': 'T', 'द्': 'b', 'ध्': 'B', 'न्': 'n',
  'प्': 'K', 'फ्': 'K', 'ब्': 'A', 'भ्': 'A', 'म्': 'E',
  'य्': 'O', 'ल्': 'L', 'व्': 'J', 'श्': 'Z', 'स्': ':', 'ह्': 'X',

  // Special Compounds & Ligatures
  'क्ष': 'IF', 'क्ष्म': 'IFe', 'त्र': 'q', 'ज्ञ': 'j', 
  'द्व': 'å', 'द्य': 'B', 'द्ध': '4', 'ष्ट': 'î', 'ष्ठ': 'ï',
  'श्र': 'z', 'स्र': ':r', 'द्द': 'b',

  // Matras (Vowel Signs)
  'ा': 'f',
  'ी': 'L',
  'ु': '\'',
  'ू': '"',
  'े': ']',
  'ै': '}',
  'ो': 'f]',
  'ौ': 'f\}',
  'ं': 'm',
  'ँ': 'F',
  'ः': ':',
  '्': '\\',

  // Symbols & Punctuation
  '।': 'P', '॥': 'PP', '?': '?'
};

// Professional Transliteration Engine
function convertUnicodeToPreeti(text) {
  if (!text) return "";

  let result = text;

  // Rule 1: Reph (र्) handling - moves Reph symbol '{' after consonant + matra
  result = result.replace(/र्([क-ह])/g, '$1{');
  result = result.replace(/र्([क-ह])([ािीुूेैोौँं]*)/g, '$1$2{');

  // Rule 2: Short 'i' matra (ि) positioning (moves BEFORE consonant or half-consonant cluster)
  result = result.replace(/([क-ह])ि/g, 'i$1');
  result = result.replace(/([क्-ह्][क-ह])ि/g, 'i$1');

  // Rule 3: Re-map specific half-letter rules (e.g. स् + त => :t)
  result = result.replace(/स्/g, ':');
  result = result.replace(/क्/g, 'S');
  result = result.replace(/न्/g, 'n');
  result = result.replace(/म्/g, 'E');

  let converted = "";
  let i = 0;

  while (i < result.length) {
    // Check 3-character compounds first
    if (i < result.length - 2) {
      let trio = result.substring(i, i + 3);
      if (unicodeToPreetiMap[trio]) {
        converted += unicodeToPreetiMap[trio];
        i += 3;
        continue;
      }
    }

    // Check 2-character compounds
    if (i < result.length - 1) {
      let pair = result.substring(i, i + 2);
      if (unicodeToPreetiMap[pair]) {
        converted += unicodeToPreetiMap[pair];
        i += 2;
        continue;
      }
    }

    // Single character match
    let char = result[i];
    if (unicodeToPreetiMap[char] !== undefined) {
      converted += unicodeToPreetiMap[char];
    } else {
      converted += char;
    }
    i++;
  }

  return converted;
}

// DOM Setup
document.addEventListener("DOMContentLoaded", function() {
  const unicodeInput = document.getElementById('unicodeInput');
  const preetiOutput = document.getElementById('preetiOutput');
  const themeToggle = document.getElementById('themeToggle');

  if (unicodeInput && preetiOutput) {
    unicodeInput.addEventListener('input', function() {
      preetiOutput.value = convertUnicodeToPreeti(unicodeInput.value);
      updateStats();
    });
  }

  window.updateStats = function() {
    const inVal = unicodeInput.value.trim();
    const outVal = preetiOutput.value.trim();
    
    document.getElementById('inputStats').innerText = 
      (inVal ? inVal.split(/\s+/).length : 0) + " words | " + unicodeInput.value.length + " chars";
    document.getElementById('outputStats').innerText = 
      (outVal ? outVal.split(/\s+/).length : 0) + " words | " + preetiOutput.value.length + " chars";
  };

  window.copyToClipboard = function() {
    if (!preetiOutput.value) return;
    navigator.clipboard.writeText(preetiOutput.value).then(function() {
      showToast("Preeti text copied!");
    });
  };

  window.downloadTxt = function() {
    if (!preetiOutput.value.trim()) return;
    const blob = new Blob([preetiOutput.value], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "preeti-converted.txt";
    link.click();
  };

  window.clearAll = function() {
    unicodeInput.value = "";
    preetiOutput.value = "";
    updateStats();
  };

  function showToast(msg) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(function() { toast.classList.remove("show"); }, 2000);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function() {
      document.documentElement.classList.toggle("dark");
    });
  }
});
