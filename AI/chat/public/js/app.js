/**
 * 主入口 - 初始化所有模块
 */
import Chat from './chat.js';
import Session from './session.js';
import Upload from './upload.js';

const App = {
    init() {
        Session.init();

        Upload.init({
            previewContainer: document.getElementById('imagePreviews'),
            fileInput: document.getElementById('fileInput'),
            uploadBtn: document.getElementById('btnUpload'),
            textarea: document.getElementById('chatInput'),
        });

        Chat.init({
            container: document.getElementById('chatMessages'),
            input: document.getElementById('chatInput'),
            sendBtn: document.getElementById('btnSend'),
        });

        this._renderList();
        this._loadSession();
        this._bindEvents();
        this._initTheme();
    },

    _bindEvents() {
        document.getElementById('btnNewChat').addEventListener('click', () => {
            Session.create();
            this._renderList();
            Chat.loadMessages([]);
            document.getElementById('chatTitle').textContent = '新对话';
            const w = document.getElementById('welcomeScreen');
            if (w) w.style.display = '';
        });

        document.getElementById('btnToggleSidebar').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('collapsed');
        });

        document.getElementById('btnToggleTheme').addEventListener('click', () => {
            const html = document.documentElement;
            const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            document.getElementById('btnToggleTheme').textContent = next === 'dark' ? '☀️' : '🌙';
            localStorage.setItem('ai_chat_theme', next);
        });
    },

    _renderList() {
        const list = document.getElementById('chatList');
        const sessions = Session.getAll();
        if (!sessions.length) {
            list.innerHTML = '<li class="chat-list-empty">暂无对话<br>点击上方开始新对话</li>';
            return;
        }

        list.innerHTML = sessions
            .map((s) => `<li class="chat-list-item ${s.id === Session.currentId ? 'active' : ''}" data-id="${s.id}">
        <span class="chat-list-title">${this._esc(s.title)}</span>
        <button class="delete-btn" data-delete="${s.id}">🗑</button>
      </li>`)
            .join('');

        list.querySelectorAll('.chat-list-item').forEach((item) => {
            item.addEventListener('click', (e) => {
                if (e.target.closest('.delete-btn')) return;
                Session.switchTo(item.dataset.id);
                this._loadSession();
                this._renderList();
            });
        });

        list.querySelectorAll('.delete-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('确定删除？')) {
                    Session.delete(btn.dataset.delete);
                    this._renderList();
                    if (Session.currentId) this._loadSession();
                    else {
                        Chat.loadMessages([]);
                        document.getElementById('chatTitle').textContent = '新对话';
                        const w = document.getElementById('welcomeScreen');
                        if (w) w.style.display = '';
                    }
                }
            });
        });
    },

    _loadSession() {
        const s = Session.getCurrent();
        document.getElementById('chatTitle').textContent = s ? s.title : '新对话';
        Chat.loadMessages(s ? s.messages : []);
    },

    _initTheme() {
        const saved = localStorage.getItem('ai_chat_theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = saved || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
        document.getElementById('btnToggleTheme').textContent = theme === 'dark' ? '☀️' : '🌙';
    },

    _esc(s) {
        return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    },
};

document.addEventListener('DOMContentLoaded', () => App.init());