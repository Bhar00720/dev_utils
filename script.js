document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.tool-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
        });
    });

    // Toast Function
    const toast = document.getElementById('toast');
    function showToast(msg, isError = false) {
        toast.innerText = msg;
        toast.style.backgroundColor = isError ? 'var(--error-color)' : 'var(--success-color)';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function updateStatus(elId, msg, type = 'ready') {
        const el = document.getElementById(elId);
        el.innerText = msg;
        el.className = 'status-indicator'; // reset
        if (type === 'success') el.classList.add('success');
        if (type === 'error') el.classList.add('error');
    }

    // JSON Tool Logic
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');

    document.getElementById('btn-format').addEventListener('click', () => {
        try {
            const val = jsonInput.value.trim();
            if (!val) return;
            const parsed = JSON.parse(val);
            jsonOutput.value = JSON.stringify(parsed, null, 4);
            updateStatus('json-status', 'Valid JSON', 'success');
        } catch (e) {
            jsonOutput.value = e.message;
            updateStatus('json-status', 'Invalid JSON', 'error');
        }
    });

    document.getElementById('btn-minify').addEventListener('click', () => {
        try {
            const val = jsonInput.value.trim();
            if (!val) return;
            const parsed = JSON.parse(val);
            jsonOutput.value = JSON.stringify(parsed);
            updateStatus('json-status', 'Valid JSON', 'success');
        } catch (e) {
            jsonOutput.value = e.message;
            updateStatus('json-status', 'Invalid JSON', 'error');
        }
    });

    document.getElementById('btn-clear-json').addEventListener('click', () => {
        jsonInput.value = '';
        jsonOutput.value = '';
        updateStatus('json-status', 'Ready');
    });

    document.getElementById('btn-copy-json').addEventListener('click', () => {
        if (!jsonOutput.value) return;
        navigator.clipboard.writeText(jsonOutput.value).then(() => {
            showToast('JSON copied to clipboard!');
        });
    });

    // Base64 Tool Logic
    const b64Input = document.getElementById('base64-input');
    const b64Output = document.getElementById('base64-output');

    document.getElementById('btn-encode').addEventListener('click', () => {
        try {
            const val = b64Input.value;
            if (!val) return;
            b64Output.value = btoa(unescape(encodeURIComponent(val)));
            updateStatus('base64-status', 'Encoded Successfully', 'success');
        } catch (e) {
            b64Output.value = e.message;
            updateStatus('base64-status', 'Encoding Error', 'error');
        }
    });

    document.getElementById('btn-decode').addEventListener('click', () => {
        try {
            const val = b64Input.value.trim();
            if (!val) return;
            b64Output.value = decodeURIComponent(escape(atob(val)));
            updateStatus('base64-status', 'Decoded Successfully', 'success');
        } catch (e) {
            b64Output.value = e.message;
            updateStatus('base64-status', 'Invalid Base64', 'error');
        }
    });

    document.getElementById('btn-clear-b64').addEventListener('click', () => {
        b64Input.value = '';
        b64Output.value = '';
        updateStatus('base64-status', 'Ready');
    });

    document.getElementById('btn-copy-b64').addEventListener('click', () => {
        if (!b64Output.value) return;
        navigator.clipboard.writeText(b64Output.value).then(() => {
            showToast('Output copied to clipboard!');
        });
    });

    // URL Tool Logic
    const urlInput = document.getElementById('url-input');
    const urlOutput = document.getElementById('url-output');

    document.getElementById('btn-url-encode').addEventListener('click', () => {
        try {
            const val = urlInput.value;
            if (!val) return;
            urlOutput.value = encodeURIComponent(val);
            updateStatus('url-status', 'Encoded Successfully', 'success');
        } catch (e) {
            urlOutput.value = e.message;
            updateStatus('url-status', 'Encoding Error', 'error');
        }
    });

    document.getElementById('btn-url-decode').addEventListener('click', () => {
        try {
            const val = urlInput.value;
            if (!val) return;
            urlOutput.value = decodeURIComponent(val);
            updateStatus('url-status', 'Decoded Successfully', 'success');
        } catch (e) {
            urlOutput.value = e.message;
            updateStatus('url-status', 'Decoding Error', 'error');
        }
    });

    document.getElementById('btn-clear-url').addEventListener('click', () => {
        urlInput.value = '';
        urlOutput.value = '';
        updateStatus('url-status', 'Ready');
    });

    document.getElementById('btn-copy-url').addEventListener('click', () => {
        if (!urlOutput.value) return;
        navigator.clipboard.writeText(urlOutput.value).then(() => {
            showToast('Output copied to clipboard!');
        });
    });

    // UUID Tool Logic
    const uuidCountInput = document.getElementById('uuid-count');
    const uuidOutput = document.getElementById('uuid-output');

    document.getElementById('btn-gen-uuid').addEventListener('click', () => {
        let count = parseInt(uuidCountInput.value, 10);
        if (isNaN(count) || count < 1) count = 1;
        if (count > 100) count = 100;
        
        let uuids = [];
        for (let i = 0; i < count; i++) {
            uuids.push(crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }));
        }
        
        uuidOutput.value = uuids.join('\n');
        updateStatus('uuid-status', `Generated ${count} UUID(s)`, 'success');
    });

    document.getElementById('btn-clear-uuid').addEventListener('click', () => {
        uuidOutput.value = '';
        updateStatus('uuid-status', 'Ready');
    });

    document.getElementById('btn-copy-uuid').addEventListener('click', () => {
        if (!uuidOutput.value) return;
        navigator.clipboard.writeText(uuidOutput.value).then(() => {
            showToast('UUIDs copied to clipboard!');
        });
    });

    // Hash Tool Logic
    const hashInput = document.getElementById('hash-input');
    const hashOutput = document.getElementById('hash-output');

    document.getElementById('btn-hash-md5').addEventListener('click', () => {
        try {
            const val = hashInput.value;
            if (!val) return;
            hashOutput.value = CryptoJS.MD5(val).toString();
            updateStatus('hash-status', 'MD5 Generated', 'success');
        } catch (e) {
            hashOutput.value = e.message;
            updateStatus('hash-status', 'Error', 'error');
        }
    });

    document.getElementById('btn-hash-sha256').addEventListener('click', () => {
        try {
            const val = hashInput.value;
            if (!val) return;
            hashOutput.value = CryptoJS.SHA256(val).toString();
            updateStatus('hash-status', 'SHA-256 Generated', 'success');
        } catch (e) {
            hashOutput.value = e.message;
            updateStatus('hash-status', 'Error', 'error');
        }
    });

    document.getElementById('btn-clear-hash').addEventListener('click', () => {
        hashInput.value = '';
        hashOutput.value = '';
        updateStatus('hash-status', 'Ready');
    });

    document.getElementById('btn-copy-hash').addEventListener('click', () => {
        if (!hashOutput.value) return;
        navigator.clipboard.writeText(hashOutput.value).then(() => {
            showToast('Hash copied to clipboard!');
        });
    });

    // JSON to TS Converter Logic
    const jsonTsInput = document.getElementById('json-ts-input');
    const jsonTsOutput = document.getElementById('json-ts-output');

    function jsonToTs(obj, interfaceName = 'RootObject') {
        let interfaces = [];
        
        function parseObject(obj, name) {
            let output = `export interface ${name} {\n`;
            for (let key in obj) {
                const value = obj[key];
                const type = typeof value;
                
                let tsType = 'any';
                if (value === null) {
                    tsType = 'null';
                } else if (Array.isArray(value)) {
                    if (value.length > 0) {
                        const firstElementType = typeof value[0];
                        if (firstElementType === 'object' && value[0] !== null) {
                            const subName = capitalize(key) + 'Item';
                            parseObject(value[0], subName);
                            tsType = `${subName}[]`;
                        } else {
                            tsType = `${firstElementType}[]`;
                        }
                    } else {
                        tsType = 'any[]';
                    }
                } else if (type === 'object') {
                    const subName = capitalize(key);
                    parseObject(value, subName);
                    tsType = subName;
                } else {
                    tsType = type;
                }
                
                // Add quotes if key contains invalid identifier characters
                const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
                output += `    ${safeKey}: ${tsType};\n`;
            }
            output += `}\n`;
            interfaces.push(output);
        }
        
        function capitalize(str) {
            if (!str) return 'Unknown';
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        
        if (Array.isArray(obj)) {
            if (obj.length > 0 && typeof obj[0] === 'object' && obj[0] !== null) {
                parseObject(obj[0], interfaceName);
            } else {
                return `export type ${interfaceName} = ${typeof obj[0]}[];\n`;
            }
        } else if (typeof obj === 'object' && obj !== null) {
            parseObject(obj, interfaceName);
        } else {
            return `export type ${interfaceName} = ${typeof obj};\n`;
        }
        
        return interfaces.reverse().join('\n');
    }

    document.getElementById('btn-convert-ts').addEventListener('click', () => {
        try {
            const val = jsonTsInput.value.trim();
            if (!val) return;
            const parsed = JSON.parse(val);
            jsonTsOutput.value = jsonToTs(parsed);
            updateStatus('json-ts-status', 'Converted successfully', 'success');
        } catch (e) {
            jsonTsOutput.value = e.message;
            updateStatus('json-ts-status', 'Invalid JSON', 'error');
        }
    });

    document.getElementById('btn-clear-json-ts').addEventListener('click', () => {
        jsonTsInput.value = '';
        jsonTsOutput.value = '';
        updateStatus('json-ts-status', 'Ready');
    });

    document.getElementById('btn-copy-json-ts').addEventListener('click', () => {
        if (!jsonTsOutput.value) return;
        navigator.clipboard.writeText(jsonTsOutput.value).then(() => {
            showToast('TypeScript code copied to clipboard!');
        });
    });
});
