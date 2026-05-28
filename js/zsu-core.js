// ─────────────────────────────────────────────
// Zsu Therapy — shared core
// mr-nic / zsutherapy · github.com/mr-nic
// ─────────────────────────────────────────────

// ── CONFIG ── change these lines only ────────
const ZSU_PWD = btoa('ZSU2026');              // btoa('yournewpassword') to change
const BIN_ID  = '6a186586ddf5aa59f7707c87';  // JSONBin bin ID
const BIN_KEY = '$2a$10$OdYA/kh8jDj.Qe9Mf3vquOoVxDjF2.nr2M7mtW39Z0C1rL1sqtwie';  // your JSONBin API key
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

  // ── JSONBin: load full state ──────────────
  async _load() {
    try {
      const res  = await fetch('https://api.jsonbin.io/v3/b/' + BIN_ID + '/latest', {
        headers: { 'X-Access-Key': BIN_KEY }
      });
      const data = await res.json();
      return data.record || {};
    } catch(e) { console.warn('JSONBin load failed', e); return {}; }
  },

  // ── JSONBin: save full state ──────────────
  async _save(state) {
    try {
      await fetch('https://api.jsonbin.io/v3/b/' + BIN_ID, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': BIN_KEY
        },
        body: JSON.stringify(state)
      });
    } catch(e) { console.warn('JSONBin save failed', e); }
  },

  // ── Save page state ───────────────────────
  async save(pageKey, pageState) {
    if (BIN_KEY === 'YOUR_JSONBIN_API_KEY_HERE') return;
    const all = await this._load();
    all[pageKey] = pageState;
    await this._save(all);
  },

  // ── Load page state ───────────────────────
  async load(pageKey) {
    if (BIN_KEY === 'YOUR_JSONBIN_API_KEY_HERE') return null;
    const all = await this._load();
    return all[pageKey] || null;
  },

  // ── Clear page state ──────────────────────
  async clear(pageKey) {
    if (BIN_KEY === 'YOUR_JSONBIN_API_KEY_HERE') return;
    const all = await this._load();
    all[pageKey] = [];
    await this._save(all);
  },

  // ── Checklist: wire up items ──────────────
  initChecklist(pageKey, onUpdate) {
    if (!this.auth()) return;

    const items = document.querySelectorAll('.item');
    const fill  = document.getElementById('fill');
    const prog  = document.getElementById('prog');
    const total = items.length;
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
          cb.textContent       = item.classList.contains('checked') ? '✓' : '';
          cb.style.background  = item.classList.contains('checked') ? col : 'transparent';
          cb.style.borderColor = item.classList.contains('checked') ? col : 'var(--border)';
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
              cb.textContent       = '✓';
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
            cb.textContent       = '';
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
