@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');

/* Color System - Himalayan Clarity */
:root {
  --bg-primary: #F7F6F3;
  --bg-secondary: #FFFFFF;
  --bg-input: #F1F0EC;
  
  --text-primary: #1A1A1A;
  --text-secondary: #5C5A55;
  --text-muted: #8A8780;
  
  --accent: #C8102E;
  --accent-hover: #A50D25;
  --accent-soft: rgba(200, 16, 46, 0.08);
  
  --border: #E5E3DE;
  --border-strong: #D6D3CC;
  
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.08);
  
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}

html.dark, [data-theme="dark"] {
  --bg-primary: #121110;
  --bg-secondary: #1C1B19;
  --bg-input: #252422;
  
  --text-primary: #F5F4F0;
  --text-secondary: #B8B5AE;
  --text-muted: #7A7772;
  
  --accent: #E83A4E;
  --accent-hover: #F05264;
  --accent-soft: rgba(232, 58, 78, 0.12);
  
  --border: #2E2C29;
  --border-strong: #403D39;
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.2s ease, color 0.2s ease;
  -webkit-font-smoothing: antialiased;
}

header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--text-primary);
  text-decoration: none;
}

.logo-badge {
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 99px;
  text-transform: uppercase;
}

.theme-btn {
  background: var(--bg-input);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
}

.theme-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
}

main {
  max-width: 1200px;
  width: 100%;
  margin: 2.5rem auto;
  padding: 0 1.5rem;
  flex: 1;
}

.page-title {
  text-align: center;
  margin-bottom: 2.5rem;
}

.page-title h1 {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.page-title p {
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.editor-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 850px) {
  .editor-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.panel {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.panel-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.toolbar {
  display: flex;
  gap: 0.4rem;
}

.tool-btn {
  background: var(--bg-input);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.35rem 0.7rem;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: 500;
}

.tool-btn:hover {
  background: var(--bg-primary);
  color: var(--text-primary);
}

.tool-btn-primary {
  background: var(--accent);
  color: #ffffff;
  border: none;
}

.tool-btn-primary:hover {
  background: var(--accent-hover);
  color: #ffffff;
}

textarea {
  width: 100%;
  height: 320px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  padding: 1.1rem;
  font-size: 1.05rem;
  resize: vertical;
  outline: none;
  line-height: 1.65;
}

#unicodeInput {
  font-family: 'Noto Sans Devanagari', 'Inter', sans-serif;
}

#preetiOutput {
  font-family: monospace, sans-serif;
}

textarea:focus {
  border-color: var(--accent);
  background: var(--bg-secondary);
}

.panel-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.85rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.guide-section {
  margin-top: 2.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.guide-item {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.guide-item code {
  background: var(--bg-input);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  color: var(--accent);
}

.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--text-primary);
  color: var(--bg-primary);
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0;
  transform: translateY(12px);
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 100;
}

.toast.show {
  opacity: 1;
  transform: translateY(0);
}

footer {
  border-top: 1px solid var(--border);
  background: var(--bg-secondary);
  padding: 1.75rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 3rem;
}
