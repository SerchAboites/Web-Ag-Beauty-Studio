const fs = require('fs');
const path = 'C:\\Users\\sergi\\.gemini\\antigravity\\brain\\0b0f4785-e8c5-40f2-8e77-586b80b15cfa\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(path, 'utf-8').split('\n');

const cssMap = new Map();

for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.content && obj.content.includes('style.css') && obj.content.includes('Total Bytes: 44090')) {
            const outputLines = obj.content.split('\n');
            for (const ol of outputLines) {
                const text = ol.trimEnd(); // remove \r if present
                const m = text.match(/^(\d+):\s(.*)$/);
                if (m) {
                    cssMap.set(parseInt(m[1]), m[2]);
                } else {
                    const m2 = text.match(/^(\d+):$/);
                    if (m2) {
                        cssMap.set(parseInt(m2[1]), '');
                    }
                }
            }
        }
    } catch (e) {}
}

const sortedKeys = Array.from(cssMap.keys()).sort((a,b) => a - b);
const finalCss = sortedKeys.map(k => cssMap.get(k)).join('\n');
fs.writeFileSync('style.css', finalCss, 'utf-8');
console.log('Recovered ' + sortedKeys.length + ' lines.');
