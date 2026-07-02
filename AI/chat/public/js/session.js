/**
 * 会话管理 - localStorage 持久化
 */
const SESSIONS_KEY = 'ai_chat_sessions';
const CURRENT_KEY = 'ai_chat_current';

const Session = {
    sessions: [],
    currentId: null,

    init() {
        try {
            this.sessions = JSON.parse(localStorage.getItem(SESSIONS_KEY)) || [];
            this.currentId = localStorage.getItem(CURRENT_KEY) || null;
            if (this.currentId && !this.sessions.find((s) => s.id === this.currentId)) {
                this.currentId = null;
            }
        } catch {
            this.sessions = [];
            this.currentId = null;
        }
    },

    _save() {
        try {
            localStorage.setItem(SESSIONS_KEY, JSON.stringify(this.sessions));
            localStorage.setItem(CURRENT_KEY, this.currentId || '');
        } catch (e) { console.warn('localStorage full:', e); }
    },

    create(title = '新对话') {
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        this.sessions.unshift({ id, title, messages: [], createdAt: Date.now() });
        this.currentId = id;
        this._save();
        return id;
    },

    switchTo(id) {
        if (this.sessions.find((s) => s.id === id)) {
            this.currentId = id;
            this._save();
        }
    },

    delete(id) {
        const idx = this.sessions.findIndex((s) => s.id === id);
        if (idx === -1) return;
        this.sessions.splice(idx, 1);
        if (this.currentId === id) {
            this.currentId = this.sessions[0]?.id || null;
        }
        this._save();
    },

    getCurrent() {
        return this.currentId ? this.sessions.find((s) => s.id === this.currentId) || null : null;
    },

    getAll() { return [...this.sessions]; },

    addMessage(msg) {
        const session = this.getCurrent();
        if (!session) return;
        session.messages.push(msg);

        // 自动生成标题：取第一条用户消息前 30 字
        if (
            session.title === '新对话' &&
            msg.role === 'user' &&
            session.messages.filter((m) => m.role === 'user').length === 1
        ) {
            const text = typeof msg.content === 'string' ? msg.content : '';
            session.title = text.slice(0, 30) + (text.length > 30 ? '...' : '');
        }
        session.updatedAt = Date.now();
        this._save();
    },

    getMessagesForApi() {
        const session = this.getCurrent();
        if (!session) return [];
        return session.messages.map(({ role, content, images }) => {
            if (images && images.length > 0) {
                return {
                    role,
                    content: [
                        { type: 'text', text: typeof content === 'string' ? content : '' },
                        ...images.map((url) => ({ type: 'image_url', image_url: { url } })),
                    ],
                };
            }
            return { role, content };
        });
    },

    getMessages() {
        return this.getCurrent()?.messages || [];
    },
};

export default Session;