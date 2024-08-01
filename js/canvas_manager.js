class HistoryManager {

    /**
     * コンストラクタ
     */
    constructor() {
        this._objects = [];
        this._history = [];
        this._redoStack = [];
    }

    /**
     * オブジェクトを追加する。
     */
    addObjects(type, options) {
        this._objects.push({ type, options });
        this._history.push([...this._objects]);
        this._redoStack = [];
    }

    /**
     * 操作を元に戻す。
     */
    undo() {
        const objects = this._history.pop();
        if (objects) {
            this._redoStack.push(objects);
            this._objects = this._history.length === 0 ? [] : [...this._history.slice(-1)[0]];
        }
    }

    /**
     * 操作をやり直す。
     */
    redo() {
        const objects = this._redoStack.pop();
        if (objects) {
            this._history.push(objects);
            this._objects = [...objects];
        }
    }

    /**
     * 現在のオブジェクトを返す。
     */
    get objects() {
        return this._objects;
    }
}


class BufferCanvas {

    /**
     * コンストラクタ
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.context = canvas.getContext('2d', { willReadFrequently: true });
    }

    /**
     * オブジェクトを描画する。
     * @param {object} objects 画面に表示する { type: string, options: object } 形式のオブジェクトの配列
     */
    async draw(objects) {
        this.#reset();
        for (const { type, options } of objects) {
            const func = this[type].bind(this);
            await func(options);
        }
    }

    /**
     * 画像を描画する。
     * @param {string} dataURL 画像のデータURL
     */
    async __drawImage({dataURL}) {
        const promise = new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = (error) => reject(error);
            image.src = dataURL;
        });
        await promise.then((image) => {
            this.context.drawImage(image, 0, 0, image.width, image.height);
        });
    }

    /**
     * 文字列を描画する。
     * @param {string} text 文字列を描画する。
     * @param {number} x x座標
     * @param {number} y y座標
     * @param {string} font フォント
     * @param {string} color 文字色
     */
    async __drawText({text, x, y, font, color}) {
        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(text, x, y);
    }

    /**
     * イメージデータを返す。
     * @returns {ImageData} imageData canvasのイメージデータ
     */
    getImageData() {
        const imageData = this.context.getImageData(0, 0, this.width, this.height);
        return imageData;
    }

    /**
     * canvasをクリアする。
     */
    #reset() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}


export class CanvasManager {

    /**
     * コンストラクタ
     * @param {HTMLCanvasElement} canvas 描画するCanvas
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.historyManager = new HistoryManager();
        this.bufferCanvas = new BufferCanvas(canvas.width, canvas.height);
    }

    /**
     * Canvasクリック時に実行されるコールバック関数を登録する。
     * @param {Function} callback クリックされた x座標, y座標 を受け取るコールバック関数
     */
    setClickListener(callback) {
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            callback(x, y);
        });
    }

    /**
     * 操作を元に戻す。
     */
    undo() {
        this.historyManager.undo();
        this.#draw();
    }

    /**
     * 操作をやり直す。
     */
    redo() {
        this.historyManager.redo();
        this.#draw();
    }

    /**
     * 画像を描画する。
     * @param {string} dataURL 画像のデータURL
     */
    drawImage(dataURL) {
        this.historyManager.addObjects(
            '__drawImage',
            { dataURL },
        );
        this.#draw();
    }

    /**
     * 文字列を描画する。
     * @param {string} text 文字列を描画する。
     * @param {number} x x座標
     * @param {number} y y座標
     * @param {string} font フォント
     * @param {string} color 文字色
     */
    drawText(text, x, y, font, color) {
        this.historyManager.addObjects(
            '__drawText',
            { text, x, y, font, color },
        );
        this.#draw();
    }

    /**
     * 画面を描画する。
     */
    async #draw() {
        const promise = this.bufferCanvas.draw(this.historyManager.objects);
        promise.then(() => {
            const imageData = this.bufferCanvas.getImageData();
            this.context.putImageData(imageData, 0, 0);
        });
    }

    /**
     * canvasをクリアする。
     */
    reset() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * データURLを返す。
     */
    getDataURL() {
        return this.canvas.toDataURL();
    }
}
