// ─────────────────────────────────────────────
// Zsu Therapy — shared core
// mr-nic / zsutherapy · github.com/mr-nic
// ─────────────────────────────────────────────

// ── CONFIG ── change these two lines only ────
const ZSU_PWD   = btoa('ZSU2026');          // btoa('yournewpassword') to change
const GIST_ID   = 'fbda0367d0b870cc57cc74ca7a644f7f';     // replace after creating Gist (see SETUP.md)
const GH_TOKEN  = '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';     // replace with your GitHub Personal Access Token
// ─────────────────────────────────────────────

const ZSU = {

  // ── Password ─────────────────────────────
  auth() {
    if (sessionStorage.getItem('zsu-auth') === ZSU_PWD) return true;
    const input = prompt('Password');
    if (input && btoa(input) === ZSU_PWD) {
      sessionStorage.setItem('zsu-auth', ZSU_PWD);
      return true;
    }
    document.body.innerHTML = '<p style="font-family:sans-serif;padding:40px;color:#666">Incorrect password.</p>';
    return false;
  },

  // ── Gist: save page state ─────────────────
  async save(pageKey, state) {
    if (GIST_ID === 'YOUR_GIST_ID_HERE') return; // not yet configured
    const files = {};
    files[pageKey + '.json'] = { content: JSON.stringify(state) };
    try {
      await fetch('https://api.github.com/gists/' + GIST_ID, {
        method: 'PATCH',
        headers: {
          'Authorization': 'token ' + GH_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ files })
      });
    } catch(e) { console.warn('Gist save failed', e); }
  },

  // ── Gist: load page state ─────────────────
  async load(pageKey) {
    if (GIST_ID === 'YOUR_GIST_ID_HERE') return null;
    try {
      const res  = await fetch('https://api.github.com/gists/' + GIST_ID,
        { headers: { 'Authorization': 'token ' + GH_TOKEN } });
      const gist = await res.json();
      const file = gist.files && gist.files[pageKey + '.json'];
      return file ? JSON.parse(file.content) : null;
    } catch(e) { console.warn('Gist load failed', e); return null; }
  },

  // ── Gist: clear page state ────────────────
  async clear(pageKey) {
    if (GIST_ID === 'YOUR_GIST_ID_HERE') return;
    const files = {};
    files[pageKey + '.json'] = { content: '[]' };
    try {
      await fetch('https://api.github.com/gists/' + GIST_ID, {
        method: 'PATCH',
        headers: {
          'Authorization': 'token ' + GH_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ files })
      });
    } catch(e) { console.warn('Gist clear failed', e); }
  },

  // ── Checklist: wire up items ──────────────
  initChecklist(pageKey, onUpdate) {
    if (!this.auth()) return;

    const items  = document.querySelectorAll('.item');
    const fill   = document.getElementById('fill');
    const prog   = document.getElementById('prog');
    const total  = items.length;
    if (prog) prog.textContent = '0 / ' + total;

    const update = () => {
      const done = document.querySelectorAll('.item.checked').length;
      if (fill) fill.style.width = (done / total * 100) + '%';
      if (prog) prog.textContent = done + ' / ' + total;
      const state = [...items].map(i => i.classList.contains('checked') ? 1 : 0);
      ZSU.save(pageKey, state);
      if (onUpdate) onUpdate(done, total);
    };

    items.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('checked');
        const cb  = item.querySelector('.checkbox');
        const col = item.dataset.color;
        if (cb) {
          cb.textContent     = item.classList.contains('checked') ? '✓' : '';
          cb.style.background   = item.classList.contains('checked') ? col : 'transparent';
          cb.style.borderColor  = item.classList.contains('checked') ? col : 'var(--border)';
        }
        update();
      });
    });

    // Load saved state
    ZSU.load(pageKey).then(saved => {
      if (saved && saved.length === total) {
        items.forEach((item, i) => {
          if (saved[i]) {
            item.classList.add('checked');
            const cb  = item.querySelector('.checkbox');
            const col = item.dataset.color;
            if (cb) {
              cb.textContent    = '✓';
              cb.style.background  = col;
              cb.style.borderColor = col;
            }
          }
        });
      }
      update();
    });

    // Reset button
    const btn = document.querySelector('.reset-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        items.forEach(i => {
          i.classList.remove('checked');
          const cb = i.querySelector('.checkbox');
          if (cb) {
            cb.textContent    = '';
            cb.style.background  = 'transparent';
            cb.style.borderColor = 'var(--border)';
          }
        });
        ZSU.clear(pageKey);
        update();
      });
    }
  }
};
