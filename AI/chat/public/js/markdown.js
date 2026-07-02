/**
 * Markdown 渲染（marked + highlight.js）
 */
const Markdown = {
    _ready: false,

    init() {
        if (this._ready || typeof marked === 'undefined') return;
        this._ready = true;

        if (typeof hljs !== 'undefined') {
            marked.setOptions({
                highlight: function (code, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try { return hljs.highlight(code, { language: lang }).value; } catch { }
                    }
                    try { return hljs.highlightAuto(code).value; } catch { return code; }
                },
                langPrefix: 'hljs language-',
            });
        }

        const renderer = new marked.Renderer();
        renderer.link = function ({ href, title, text }) {
            const t = title ? ` title="${title}"` : '';
            return `<a href="${href}" target="_blank" rel="noopener noreferrer"${t}>${text}</a>`;
        };
        renderer.image = function ({ href, title, text }) {
            const t = title ? ` title="${title}"` : '';
            return `<img src="${href}" alt="${text}" class="message-image"${t} />`;
        };
        marked.use({ renderer });
    },

    render(text) {
        this.init();
        if (typeof marked === 'undefined') {
            return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
                .replace(/\n/g, '<br>');
        }
        return marked.parse(text);
    },
};

export default Markdown;