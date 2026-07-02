/**
 * 图片上传：选择/拖拽/粘贴 → 压缩 → base64
 */
const Upload = {
    images: [],
    _preview: null,

    init({ previewContainer, fileInput, uploadBtn, textarea }) {
        this._preview = previewContainer;

        uploadBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            this._handleFiles(e.target.files);
            fileInput.value = '';
        });

        textarea.addEventListener('dragover', (e) => { e.preventDefault(); });
        textarea.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) this._handleFiles(e.dataTransfer.files);
        });

        textarea.addEventListener('paste', (e) => {
            const items = e.clipboardData?.items;
            if (!items) return;
            const files = [];
            for (const item of items) {
                if (item.type.startsWith('image/')) files.push(item.getAsFile());
            }
            if (files.length) { e.preventDefault(); this._handleFiles(files); }
        });
    },

    _handleFiles(files) {
        Array.from(files).forEach((file) => {
            if (!file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                this._compress(e.target.result, 1024, 0.8).then((dataUrl) => {
                    this.images.push(dataUrl);
                    this._render();
                });
            };
            reader.readAsDataURL(file);
        });
    },

    _compress(dataUrl, maxWidth, quality) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                if (img.width <= maxWidth) { resolve(dataUrl); return; }
                const canvas = document.createElement('canvas');
                canvas.width = maxWidth;
                canvas.height = img.height * (maxWidth / img.width);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = () => resolve(dataUrl);
            img.src = dataUrl;
        });
    },

    _render() {
        if (!this._preview) return;
        this._preview.innerHTML = this.images
            .map((url, i) => `<div class="image-preview-item">
        <img src="${url}" alt="preview" />
        <button class="remove-btn" data-index="${i}">✕</button>
      </div>`)
            .join('');

        this._preview.querySelectorAll('.remove-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                this.images.splice(parseInt(btn.dataset.index), 1);
                this._render();
            });
        });
    },

    clear() { this.images = []; this._render(); },
    getImages() { return [...this.images]; },
};

export default Upload;