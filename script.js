// script.js - Better Unicode to Preeti Converter

// Make functions globally available for onclick
window.convertToPreeti = convertToPreeti;
window.clearAll = clearAll;
const unicodeToPreeti = {
    
    "अ": "c", "आ": "cf", "इ": "O", "ई": "P", "उ": "p", "ऊ": "pm",
    "ए": "]", "ऐ": "}", "ओ": "]", "औ": "}",
    "क": "s", "ख": "v", "ग": "u", "घ": "3", "ङ": "5",
    "च": "8", "छ": "9", "ज": "r", "झ": "4", "ञ": "6",
    "ट": "t", "ठ": "T", "ड": "b", "ढ": "B", "ण": "6",
    "त": "t", "थ": "T", "द": "d", "ध": "D", "न": "n",
    "प": "k", "फ": "K", "ब": "g", "भ": "a", "म": "m",
    "य": "o", "र": "/", "ल": "l", "व": "j", "श": "z",
    "ष": "Z", "स": "s", "ह": "x",
    "क्ष": "km", "त्र": "/t", "ज्ञ": "1",

    // Matras
    "ा": "f", "ि": "l", "ी": "L", "ु": "'", "ू": "\"", "ृ": "`",
    "े": "]", "ै": "}", "ो": "}", "ौ": "}",

    // Others
    "ं": "M", "ँ": "~", "्": "\\", "।": ".", " ": " ", "\n": "\n"
};

function convertToPreeti(text) {
    let result = "";
    let i = 0;

    while (i < text.length) {
        const ch = text[i];
        const next1 = text[i + 1] || '';
        const next2 = text[i + 2] || '';

        // Handle ि matra (very important)
        if (next1 === 'ि') {
            result += 'l' + (unicodeToPreeti[ch] || ch);
            i += 2;
            continue;
        }

        // Handle Reph (र्)
        if (ch === 'र' && next1 === '्') {
            result += "/";
            i += 2;
            continue;
        }

        // Handle common conjuncts
        if (next1 === '्' && next2) {
            const conj = ch + next1 + next2;
            switch (conj) {
                case "म्प": result += "mk"; break;
                case "र्ण": result += "6m"; break;
                case "ठो": result += "To"; break;
                case "डि": result += "bi"; break;
                case "यो": result += "oM"; break;
                case "हाँ": result += "xM"; break;
                case "स्व": result += "sj"; break;
                default:
                    result += (unicodeToPreeti[ch] || ch) + "\\";
            }
            i += 3;
            continue;
        }

        result += unicodeToPreeti[ch] || ch;
        i++;
    }

    // Final fixes
    return result
        .replace(/l([a-zA-Z])/g, '$1l')   // fix i-matra position
        .replace(/\\\\/g, '\\');
}

function convertToPreetiUI() {
    const input = document.getElementById("unicode").value;
    document.getElementById("preeti").value = convertToPreeti(input);
}

function clearAll() {
    document.getElementById("unicode").value = "";
    document.getElementById("preeti").value = "";
}

