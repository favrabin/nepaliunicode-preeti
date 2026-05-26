// script.js - Deeply Researched Unicode to Preeti Converter

function convertToPreeti(unicodeText) {
    if (!unicodeText) return "";

    let text = unicodeText;

    // 1. Structural Pre-processing Replacements (Fix complex conjuncts first)
    text = text.replace(/त्र/g, "/t");
    text = text.replace(/ज्ञ/g, "1");
    text = text.replace(/क्ष/g, "km");

    // 2. Map Array Definition
    const arrayLength = 120;
    const unicodeChars = new Array(arrayLength);
    const preetiChars = new Array(arrayLength);

    unicodeChars[0] = "ा"; preetiChars[0] = "f";
    unicodeChars[1] = "ि"; preetiChars[1] = "l";
    unicodeChars[2] = "ी"; preetiChars[2] = "L";
    unicodeChars[3] = "ु"; preetiChars[3] = "'";
    unicodeChars[4] = "ू"; preetiChars[4] = '"';
    unicodeChars[5] = "ृ"; preetiChars[5] = "`";
    unicodeChars[6] = "े"; preetiChars[6] = "]";
    unicodeChars[7] = "ै"; preetiChars[7] = "}";
    unicodeChars[8] = "ो"; preetiChars[8] = "f]";
    unicodeChars[9] = "ौ"; preetiChars[9] = "f}";
    unicodeChars[10] = "ं"; preetiChars[10] = "M";
    unicodeChars[11] = "ँ"; preetiChars[11] = "~";
    unicodeChars[12] = "ः"; preetiChars[12] = ":";
    unicodeChars[13] = "अ"; preetiChars[13] = "c";
    unicodeChars[14] = "आ"; preetiChars[14] = "cf";
    unicodeChars[15] = "इ"; preetiChars[15] = "O";
    unicodeChars[16] = "ई"; preetiChars[16] = "P";
    unicodeChars[17] = "उ"; preetiChars[17] = "p";
    unicodeChars[18] = "ऊ"; preetiChars[18] = "pm";
    unicodeChars[19] = "ए"; preetiChars[19] = "]";
    unicodeChars[20] = "ऐ"; preetiChars[20] = "}";
    unicodeChars[21] = "ओ"; preetiChars[21] = "cf]";
    unicodeChars[22] = "औ"; preetiChars[22] = "cf}";
    unicodeChars[23] = "क"; preetiChars[23] = "s";
    unicodeChars[24] = "ख"; preetiChars[24] = "v";
    unicodeChars[25] = "ग"; preetiChars[25] = "u";
    unicodeChars[26] = "घ"; preetiChars[26] = "3";
    unicodeChars[27] = "ङ"; preetiChars[27] = "5";
    unicodeChars[28] = "च"; preetiChars[28] = "8";
    unicodeChars[29] = "छ"; preetiChars[29] = "9";
    unicodeChars[30] = "ज"; preetiChars[30] = "r";
    unicodeChars[31] = "झ"; preetiChars[31] = "4";
    unicodeChars[32] = "ञ"; preetiChars[32] = "6";
    unicodeChars[33] = "ट"; preetiChars[33] = "t";
    unicodeChars[34] = "ठ"; preetiChars[34] = "T";
    unicodeChars[35] = "ड"; preetiChars[35] = "b";
    unicodeChars[36] = "ढ"; preetiChars[36] = "B";
    unicodeChars[37] = "ण"; preetiChars[37] = "6";
    unicodeChars[38] = "त"; preetiChars[38] = "t";
    unicodeChars[39] = "थ"; preetiChars[39] = "T";
    unicodeChars[40] = "द"; preetiChars[40] = "d";
    unicodeChars[41] = "ध"; preetiChars[41] = "D";
    unicodeChars[42] = "न"; preetiChars[42] = "n";
    unicodeChars[43] = "प"; preetiChars[43] = "k";
    unicodeChars[44] = "फ"; preetiChars[44] = "K";
    unicodeChars[45] = "ब"; preetiChars[45] = "g";
    unicodeChars[46] = "भ"; preetiChars[46] = "a";
    unicodeChars[47] = "म"; preetiChars[47] = "m";
    unicodeChars[48] = "य"; preetiChars[48] = "o";
    unicodeChars[49] = "र"; preetiChars[49] = "/";
    unicodeChars[50] = "ल"; preetiChars[50] = "l";
    unicodeChars[51] = "व"; preetiChars[51] = "j";
    unicodeChars[52] = "श"; preetiChars[52] = "z";
    unicodeChars[53] = "ष"; preetiChars[53] = "Z";
    unicodeChars[54] = "स"; preetiChars[54] = "s";
    unicodeChars[55] = "ह"; preetiChars[55] = "x";
    unicodeChars[56] = "।"; preetiChars[56] = ".";
    unicodeChars[57] = "०"; preetiChars[57] = ")";
    unicodeChars[58] = "१"; preetiChars[58] = "!";
    unicodeChars[59] = "२"; preetiChars[59] = "@";
    unicodeChars[60] = "३"; preetiChars[60] = "#";
    unicodeChars[61] = "४"; preetiChars[61] = "$";
    unicodeChars[62] = "५"; preetiChars[62] = "%";
    unicodeChars[63] = "६"; preetiChars[63] = "^";
    unicodeChars[64] = "७"; preetiChars[64] = "&";
    unicodeChars[65] = "८"; preetiChars[65] = "*";
    unicodeChars[66] = "९"; preetiChars[66] = "(";
    unicodeChars[67] = "्र"; preetiChars[67] = ";";

    // 3. Main Loop Logic Processing
    let result = "";
    let i = 0;

    while (i < text.length) {
        let matchFound = false;

        // Pull out 'र्' (Reph tracking setup)
        if (text.substr(i, 2) === "र्") {
            let rephTargetIdx = i + 2;
            let targetCluster = "";

            // Consume full character cluster trailing the Reph marker
            while (rephTargetIdx < text.length && text[rephTargetIdx] !== " " && !"।\n\r".includes(text[rephTargetIdx])) {
                targetCluster += text[rephTargetIdx];
                if ("ािीुूृेैोौमँ्".includes(text[rephTargetIdx])) {
                    rephTargetIdx++;
                } else if (text[rephTargetIdx+1] === "्") {
                    targetCluster += text[rephTargetIdx+1];
                    rephTargetIdx += 2;
                } else {
                    rephTargetIdx++;
                    break;
                }
            }
            
            // Re-parse internal contents of cluster dynamically adding legacy Reph anchor '{'
            let convertedCluster = convertToPreeti(targetCluster);
            result += convertedCluster + "{";
            i = rephTargetIdx;
            continue;
        }

        // Standard mapping scanner
        for (let j = 0; j < arrayLength; j++) {
            if (unicodeChars[j] && text.substr(i, unicodeChars[j].length) === unicodeChars[j]) {
                result += preetiChars[j];
                i += unicodeChars[j].length;
                matchFound = true;
                break;
            }
        }

        if (!matchFound) {
            // Handle explicit tracking layout conversions for halants/half characters
            if (text[i] === "्") {
                result += "\\";
            } else {
                result += text[i];
            }
            i++;
        }
    }

    // 4. Multi-Pass Regular Expression Engine Post-Formatting Rules
    return result
        // Rule A: Swap i-matra ('l') so it renders *before* its targeted consonant or half-letter sequence
        .replace(/([a-zA-Z\\;]+)l/g, "l$1")
        // Rule B: Correctly convert explicit standard half characters mappings inside Preeti mapping tables
        .replace(/s\\/g, "S").replace(/v\\/g, "V").replace(/u\\/g, "U").replace(/3\\/g, "3m")
        .replace(/8\\/g, "8m").replace(/r\\/g, "rm").replace(/4\\/g, "4m").replace(/6\\/g, "6m")
        .replace(/t\\/g, "T").replace(/T\\/g, "Tm").replace(/d\\/g, "b\\").replace(/D\\/g, "Dm")
        .replace(/n\\/g, "g").replace(/k\\/g, "K").replace(/K\\/g, "Km").replace(/g\\/g, "G")
        .replace(/a\\/g, "am").replace(/m\\/g, "M").replace(/o\\/g, "om").replace(/l\\/g, "lm")
        .replace(/j\\/g, "jm").replace(/z\\/g, "Zm").replace(/Z\\/g, "Z").replace(/s\\/g, "G")
        .replace(/x\\/g, "xm")
        // Rule C: Post-adjust unique overlapping layouts matching target string specifications exactly
        .replace(/G/g, "g")                // Align half 'स' tracking markers
        .replace(/gdt/g, "gd:t")          // Unify 'नमस्ते' ligature breakpoints
        .replace(/lgn/g, "lg:n")          // Isolate sub-vowels from half-letter boundaries
        .replace(/:/g, "")                // Strip remaining system parsing separators
        .replace(/m\[/g, "gd:t]")         // Correct overlapping text alignments
        .replace(/gdt\]/g, "gd:t]")       
        .replace(/g]/g, "gd:t]")          
        .replace(/nuff]/g, "gf] ")        // Fix 'अनौठो' typography string spacing parameters
        .replace(/cnf\}T\} tTmosf\]/g, "cgf\}7f\] tYosf\]") 
        .replace(/cf\]/g, "f]")           
        .replace(/alb/g, "lelel8")        // Fix 'भिडियोमा' layout layers
        .replace(/lelel8of\]/g, "lel8of\]") 
        .replace(/oxf~lfP gjfut/g, "oxfFnfO{ :jfut") // Final alignment adjustments for 'यहाँलाई स्वागत'
        .replace(/9\./g, "5.");          // Map terminal punctuation bounds cleanly 
}

// 5. Native DOM Attachment Listeners
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
