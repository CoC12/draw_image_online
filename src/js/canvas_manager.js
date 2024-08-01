class CanvasManager {

    /**
     * コンストラクタ
     * @param {HTMLCanvasElement} canvas 描画するCanvas
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
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
     * 画像を描画する。
     * @param {string} dataURL 画像のデータURL
     */
    drawImage(dataURL) {
        const image = new Image();
        image.onload = () => {
            this.context.drawImage(image, 0, 0, image.width, image.height);
        }
        image.src = dataURL;
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
        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(text, x, y);
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
