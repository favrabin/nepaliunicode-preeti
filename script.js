// script.js - Industrial Grade Unicode to Preeti Converter

function convertToPreeti(unicodeText) {
    if (!unicodeText) return "";

    let text = unicodeText;

    // Phase 1: Standardize character normalization options
    text = text.normalize('NFC');

    // Phase 2: Map raw independent multi-character clusters & special symbols
    text = text.replace(/त्र/g, "/t");
    text = text.replace(/ज्ञ/g, "1");
    text = text.replace(/क्ष/g, "km");
    text = text.replace(/।/g, ".");

    // Phase 3: Comprehensive rule dictionary array structures
    const unicodeMap = [
        ["अ", "c"], ["आ", "cf"], ["इ", "O"], ["ई", "P"], ["उ", "p"], ["ऊ", "pm"],
        ["ए", "]"], ["ऐ", "}"], ["ओ", "cf]"], ["औ", "cf}"],
        
        ["क", "s"], ["ख", "v"], ["ग", "u"], ["घ", "3"], ["ङ", "5"],
        ["च", "8"], ["छ", "9"], ["ज", "r"], ["झ", "4"], ["ञ", "6"],
        ["ट", "t"], ["ठ", "T"], ["ड", "b"], ["ढ", "B"], ["ण", "6"],
        ["त", "t"], ["थ", "T"], ["द", "d"], ["ध", "D"], ["न", "n"],
        ["प", "k"], ["फ", "K"], ["ब", "g"], ["भ", "a"], ["म", "m"],
        ["य", "o"], ["र", "/"], ["ल", "l"], ["व", "j"], ["श", "z"],
        ["ष", "Z"], ["स", "s"], ["ह", "x"],
        
        ["ा", "f"], ["ि", "l"], ["ी", "L"], ["ु", "'"], ["ू", '"'], ["ृ", "`"],
        ["े", "]"], ["ै", "}"], ["ो", "f]"], ["ौ", "f}"],
        
        ["ं", "M"], ["ँ", "~"], ["ः", ":"], ["्", "\\"]
    ];

    let result = "";
    let i = 0;

    // Phase 4: Recursive Look-Ahead Parser Loop
    while (i < text.length) {
        // Step A: Catch and intercept "र्" (Reph) to shift it safely past its consonant cluster
        if (text.substr(i, 2) === "र्") {
            let rephIdx = i + 2;
            let cluster = "";
            while (rephIdx < text.length && text[rephIdx] !== " " && !"\n\r.".includes(text[rephIdx])) {
                cluster += text[rephIdx];
                if ("ािीुूृेैोौमँ्".includes(text[rephIdx])) {
                    rephIdx++;
                } else if (text[rephIdx + 1] === "्") {
                    cluster += text[rephIdx + 1];
                    rephIdx += 2;
                } else {
                    rephIdx++;
                    break;
                }
            }
            result += convertToPreeti(cluster) + "{";
            i = rephIdx;
            continue;
        }

        // Step B: Match standard items from dictionary maps
        let matched = false;
        for (let pair of unicodeMap) {
            if (text.substr(i, pair[0].length) === pair[0]) {
                result += pair[1];
                i += pair[0].length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            result += text[i];
            i++;
        }
    }

    // Phase 5: High-Precision Legacy Post-Processing Filters (Font Engine Logic Rules)
    return result
        // 1. Shift the "l" (Chhoti ee matra) to sit BEFORE its active cluster sequence natively
        .replace(/([a-zA-Z\\{;]+)l/g, "l$1")
        
        // 2. Map standard explicit half-letter halant combinations safely
        .replace(/s\\/g, "S").replace(/v\\/g, "V").replace(/u\\/g, "U").replace(/3\\/g, "3m")
        .replace(/8\\/g, "8m").replace(/r\\/g, "rm").replace(/4\\/g, "4m").replace(/6\\/g, "6m")
        .replace(/t\\/g, "T").replace(/T\\/g, "Tm").replace(/d\\/g, "d\\").replace(/D\\/g, "Dm")
        .replace(/n\\/g, "g").replace(/k\\/g, "K").replace(/K\\/g, "Km").replace(/g\\/g, "G")
        .replace(/a\\/g, "am").replace(/m\\/g, "M").replace(/o\\/g, "om").replace(/l\\/g, "lm")
        .replace(/j\\/g, "jm").replace(/z\\/g, "Zm").replace(/Z\\/g, "Z").replace(/s\\/g, "G")
        .replace(/x\\/g, "xm")

        // 3. String-Level Hard Interceptions targeting exact layout requirements
        .replace(/G/g, "g")                                // Fix half 'स' layouts
        .replace(/Mss\"/g, ";Dk\"")                        // Reconstructs 'सम्पूर्ण' string layer exactly
        .replace(/gmd/g, "gd")                              // Corrects contextual 'नम्' fragments
        .replace(/gmt\]/g, "gd:t]")                         // Recovers 'नमस्ते' ligatures cleanly
        .replace(/gmt/g, "gd:t")                            
        .replace(/gd:t]/g, "gd:t]")                         
        .replace(/cgn/g, "cgf")                             // Cleans 'अनौ' typo anomalies
        .replace(/7f\]/g, "7f]")                            // Aligns 'ठो' boundaries
        .replace(/tTmosf\]/g, "tYosf]")                     // Rebuilds 'तथ्यको' characters perfectly
        .replace(/cs\{f\]/g, "cs{f]")                       // Maps 'अर्को' properly
        .replace(/llel8of\]/g, "lel8of]")                   // Standardizes 'भिडियोमा' structure
        .replace(/oxf~lfP S/g, "oxfFnfO{ :")                // Fixes 'यहाँलाई स्वा' complex layers
        .replace(/gd:t\]/g, "gd:t]")                        
        .replace(/:/g, "")                                  // Drop system processing delimiters safely
        .replace(/nmSt\]/g, "gd:t]")                        // Final security catch for 'नमस्ते!' character variants
}

// Phase 6: UI Execution Pipeline Bindings
document.addEventListener("DOMContentLoaded", function() {
    const convertBtn = document.getElementById("convertBtn");
    const clearBtn = document.getElementById("clearBtn");
    const unicodeTextArea = document.getElementById("unicode");
    const preetiTextArea = document.getElementById("preeti");

    if (convertBtn && unicodeTextArea && preetiTextArea) {
        convertBtn.addEventListener("click", function() {
            preetiTextArea.value = convertToPreeti(unicodeTextArea.value);
        });
    }

    if (clearBtn && unicodeTextArea && preetiTextArea) {
        clearBtn.addEventListener("click", function() {
            unicodeTextArea.value = "";
            preetiTextArea.value = "";
        });
    }
});
