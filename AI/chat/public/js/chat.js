/**
 * 聊天核心 - 发送消息、流式渲染、气泡管理
 */
import Api from './api.js';
import Markdown from './markdown.js';
import Session from './session.js';
import Upload from './upload.js';

const Chat = {
    _container: null,
    _input: null,
    _sendBtn: null,
    _ctrl: null,
    _streaming: false,

    init({ container, input, sendBtn }) {
        this._container = container;
        this._input = input;
        this._sendBtn = sendBtn;

        sendBtn.addEventListener('click', () => this.send());
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
        });
        input.addEventListener('input', () => {
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 150) + 'px';
            this._updateBtn();
        });

        // 快捷提示点击
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.quick-prompt');
            if (btn?.dataset.prompt) {
                input.value = btn.dataset.prompt;
                this._updateBtn();
                this.send();
            }
        });
    },

    _updateBtn() {
        const ok = this._input.value.trim().length > 0 || Upload.getImages().length > 0;
        this._sendBtn.classList.toggle('active', ok || this._streaming);
        this._sendBtn.disabled = !ok && !this._streaming;
        this._sendBtn.textContent = this._streaming ? '■' : '➤';
    },

    async send() {
        if (this._streaming) { this.stop(); return; }

        const text = this._input.value.trim();
        const images = Upload.getImages();
        if (!text && images.length === 0) return;

        if (!Session.getCurrent()) Session.create();

        const welcome = document.getElementById('welcomeScreen');
        if (welcome) welcome.style.display = 'none';

        // 1. Render user message
        const localImages = [...images];
        this._renderBubble('user', text, localImages);
        Session.addMessage({ role: 'user', content: text, images: localImages });

        // 2. Clear input
        this._input.value = '';
        this._input.style.height = 'auto';
        Upload.clear();
        this._updateBtn();

        // 3. Create AI placeholder
        const bubble = this._createAiBubble();
        this._container.appendChild(bubble);
        this._scroll();

        // 4. Stream
        this._streaming = true;
        this._updateBtn();

        const thinkHeader = bubble.querySelector('.reasoning-header');
        const thinkContent = bubble.querySelector('.reasoning-content');
        const thinkBlock = bubble.querySelector('.reasoning-block');
        const textBlock = bubble.querySelector('.message-content');
        let reasoning = '', content = '';

        this._ctrl = await Api.sendMessage(
            Session.getMessagesForApi(),
            images,
            {
                onReasoning: (d) => {
                    reasoning += d;
                    thinkBlock.style.display = 'block';
                    thinkContent.textContent = reasoning;
                    thinkHeader?.classList.remove('collapsed');
                    this._scroll();
                },
                onContent: (d) => {
                    // first token: auto-collapse reasoning
                    if (content.length === 0 && reasoning && thinkHeader) {
                        thinkHeader.classList.add('collapsed');
                        const s = thinkHeader.querySelector('.reasoning-summary');
                        if (s) s.textContent = '已深度思考 (' + reasoning.length + ' 字)';
                    }
                    content += d;
                    textBlock.innerHTML = Markdown.render(content);
                    textBlock.classList.add('typing-cursor');
                    this._scroll();
                },
                onDone: () => {
                    textBlock.classList.remove('typing-cursor');
                    textBlock.innerHTML = content ? Markdown.render(content) : '<span style="color:var(--text-tertiary)">无响应</span>';
                    if (typeof hljs !== 'undefined') {
                        textBlock.querySelectorAll('pre code').forEach((b) => hljs.highlightElement(b));
                    }
                    if (!reasoning) thinkBlock.style.display = 'none';
                    Session.addMessage({ role: 'assistant', content: content || '(无响应)', reasoning: reasoning || undefined });
                    this._streaming = false;
                    this._updateBtn();
                    this._ctrl = null;
                },
                onError: (err) => {
                    textBlock.innerHTML = `<span style="color:#e05555">❌ ${this._esc(err)}</span>`;
                    Session.addMessage({ role: 'assistant', content: '[Error] ' + err });
                    this._streaming = false;
                    this._updateBtn();
                    this._ctrl = null;
                },
            }
        );
    },

    stop() {
        if (this._ctrl) { this._ctrl.abort(); this._ctrl = null; }
        this._streaming = false;
        this._updateBtn();
        this._container.querySelectorAll('.typing-cursor').forEach((el) => el.classList.remove('typing-cursor'));
    },

    _renderBubble(role, text, images) {
        const div = document.createElement('div');
        div.className = `message ${role}`;
        let html = '';
        if (images?.length) html += images.map((u) => `<img src="${u}" class="message-image" />`).join('');
        if (text) html += `<p>${this._esc(text)}</p>`;
        div.innerHTML = `<div class="message-avatar">${role === 'user' ? '🧑' : '🤖'}</div>
      <div class="message-body"><div class="message-content">${html}</div></div>`;
        this._container.appendChild(div);
        this._scroll();
    },

    _createAiBubble() {
        const div = document.createElement('div');
        div.className = 'message assistant';
        div.innerHTML = `<div class="message-avatar">🤖</div>
      <div class="message-body">
        <div class="reasoning-block" style="display:none;">
          <div class="reasoning-header collapsed">
            <span class="arrow">▼</span><span>💭 深度思考中...</span><span class="reasoning-summary"></span>
          </div>
          <div class="reasoning-content" style="display:none;"></div>
        </div>
        <div class="message-content typing-cursor"></div>
      </div>`;
        const hdr = div.querySelector('.reasoning-header');
        const cnt = div.querySelector('.reasoning-content');
        hdr.addEventListener('click', () => {
            hdr.classList.toggle('collapsed');
            cnt.style.display = hdr.classList.contains('collapsed') ? 'none' : 'block';
        });
        return div;
    },

    loadMessages(messages) {
        const welcome = document.getElementById('welcomeScreen');
        if (welcome) welcome.style.display = messages.length ? 'none' : '';
        this._container.querySelectorAll('.message').forEach((m) => m.remove());

        messages.forEach((msg) => {
            if (msg.role === 'user') {
                this._renderBubble('user', msg.content, msg.images);
            } else {
                const bubble = this._createAiBubble();
                const thinkBlock = bubble.querySelector('.reasoning-block');
                const textBlock = bubble.querySelector('.message-content');
                textBlock.classList.remove('typing-cursor');

                if (msg.reasoning) {
                    thinkBlock.style.display = 'block';
                    const hdr = bubble.querySelector('.reasoning-header');
                    hdr.classList.add('collapsed');
                    const s = hdr.querySelector('.reasoning-summary');
                    if (s) s.textContent = '已深度思考 (' + msg.reasoning.length + ' 字)';
                    bubble.querySelector('.reasoning-content').textContent = msg.reasoning;
                }
                textBlock.innerHTML = Markdown.render(msg.content);
                if (typeof hljs !== 'undefined') {
                    textBlock.querySelectorAll('pre code').forEach((b) => hljs.highlightElement(b));
                }
                this._container.appendChild(bubble);
            }
        });
        this._scroll();
    },

    _scroll() {
        requestAnimationFrame(() => {
            const el = document.getElementById('chatMessages');
            if (el) el.scrollTop = el.scrollHeight;
        });
    },

    _esc(s) {
        return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    },
};

export default Chat;