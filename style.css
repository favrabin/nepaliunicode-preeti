// Comprehensive Unicode to Preeti Mapping Dictionary
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

  // Joint / Compound Characters
  'क्ष': 'IF', 'त्र': 'q', 'ज्ञ': 'j', 'द्व': 'å', 'द्य': 'B',

  // Matras (Vowel signs attached to consonants)
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

  // Symbols
  '।': 'P', '॥': 'PP', '?': '?'
};

// Core Transliteration Engine
function convertUnicodeToPreeti(text) {
  if (!text) return "";
  
  let result = text;

  // Rule 1: Handle Reph (half-R 'र्') preceding consonants -> convert to '{' typed AFTER the letter
  result = result.replace(/र्([क-ह])/g, '$1{');

  // Rule 2: Handle Short 'i' matra (ि) positioning (moves BEFORE the preceding consonant)
  result = result.replace(/([क-ह])ि/g, 'i$1');
  result = result.replace(/([क-ह]\\[क-ह])ि/g, 'i$1'); // Joined consonants + short i

  // Rule 3: Map remaining characters
  let converted = "";
  for (let i = 0; i < result.length; i++) {
    let char = result[i];
    
    // Check two-character combinations first (e.g., क्ष, त्र, ज्ञ)
    if (i < result.length - 1) {
      let pair = char + result[i + 1];
      if (unicodeToPreetiMap[pair]) {
        converted += unicodeToPreetiMap[pair];
        i++; // skip next char
        continue;
      }
    }

    // Single character lookup
    if (unicodeToPreetiMap[char] !== undefined) {
      converted += unicodeToPreetiMap[char];
    } else {
      converted += char; // Keep original if no match (e.g. space, English text)
    }
  }

  return converted;
}

// DOM Event Handlers
document.addEventListener("DOMContentLoaded", function() {
  const unicodeInput = document.getElementById('unicodeInput');
  const preetiOutput = document.getElementById('preetiOutput');
  const themeToggle = document.getElementById('themeToggle');
  let currentFontSize = 18;

  // Real-time translation on key input
  unicodeInput.addEventListener('input', function() {
    preetiOutput.value = convertUnicodeToPreeti(unicodeInput.value);
    updateStats();
  });

  // Word & Character counter
  window.updateStats = function() {
    const inVal = unicodeInput.value.trim();
    const outVal = preetiOutput.value.trim();
    
    document.getElementById('inputStats').innerText = 
      (inVal ? inVal.split(/\s+/).length : 0) + " words | " + unicodeInput.value.length + " chars";
    document.getElementById('outputStats').innerText = 
      (outVal ? outVal.split(/\s+/).length : 0) + " words | " + preetiOutput.value.length + " chars";
  };

  // Font Resizer
  window.changeFontSize = function(delta) {
    currentFontSize = Math.min(Math.max(14, currentFontSize + delta), 32);
    unicodeInput.style.fontSize = currentFontSize + "px";
    preetiOutput.style.fontSize = currentFontSize + "px";
  };

  // Copy to Clipboard
  window.copyToClipboard = function() {
    if (!preetiOutput.value) return;
    navigator.clipboard.writeText(preetiOutput.value).then(function() {
      showToast("Preeti text copied to clipboard!");
    });
  };

  // Download .txt with promotional footer
  window.downloadTxt = function() {
    if (!preetiOutput.value.trim()) {
      showToast("Nothing to download!");
      return;
    }

    const siteUrl = "https://unicode.rabinthapa9.com.np";
    const header = `====================================================================\n` +
                   `Converted using Unicode to Preeti Pro — ${siteUrl}\n` +
                   `====================================================================\n\n`;

    const fileContent = header + preetiOutput.value;
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const downloadLink = document.createElement("a");
    
    const dateStamp = new Date().toISOString().split('T')[0];
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `preeti-export-${dateStamp}.txt`;
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);

    showToast("Downloaded .txt file!");
  };

  // Clear text
  window.clearAll = function() {
    unicodeInput.value = "";
    preetiOutput.value = "";
    updateStats();
    unicodeInput.focus();
  };

  // Toast feedback
  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(function() { toast.classList.remove("show"); }, 2500);
  }

  // Dark Mode Toggle
  themeToggle.addEventListener("click", function() {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  });

  if (localStorage.getItem("theme") === "dark" || 
     (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
