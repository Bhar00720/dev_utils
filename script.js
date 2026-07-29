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
});
