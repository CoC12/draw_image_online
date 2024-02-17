class BaseTool {

    constructor(panelTemplateId) {
        this.panelElement = this.buildPanelElement(panelTemplateId);
    }

    /**
     * テンプレートからパネル要素を生成する。
     * @param {string} panelTemplateId パネルのテンプレート要素のid
     * @returns パネル要素
     */
    buildPanelElement(panelTemplateId) {
        const templateElement = document.querySelector(`#${panelTemplateId}`);
        const element = document.createElement('div');
        element.appendChild(templateElement.content.cloneNode(true));
        element.addEventListener('change', this.panelElementUpdated.bind(this));
        return element;
    }

    /**
     * ツール名を返す。
     * @returns ツール名
     */
    getToolName() {
        throw new Error('not implemented');
    }

    /**
     * パネル要素を返す。
     * @returns パネル要素
     */
    getPanelElement() {
        throw new Error('not implemented');
    }

    /**
     * 描画する。
     * @param {number} x x座標
     * @param {number} y y座標
     */
    draw(x, y) {
        throw new Error('not implemented');
    }

    /**
     * パネル要素が更新された場合に実行されるコールバック関数
     * @param {Event} event Event オブジェクト
     */
    panelElementUpdated(event) {
        throw new Error('not implemented');
    }
}


/**
 * 連番ツール
 */
class SequenceTool extends BaseTool {

    /**
     * コンストラクタ
     * @param {CanvasManager} canvasManager CanvasManager
     * @param {number} start 初期値
     * @param {number} step ステップ値
     * @param {string} font フォント
     * @param {string} color 文字色
     */
    constructor(
        canvasManager,
        start = 1,
        step = 1,
        font = 'bold 20px Arial',
        color = '#ff0000',
    ) {
        super('id-template__sequence-tool');
        this.canvasManager = canvasManager;
        this.currentValue = start;
        this.step = step;
        this.font = font;
        this.color = color;
        this.updatePanelElement();
    }

    /**
     * パネル要素を更新する。
     */
    updatePanelElement() {
        this.panelElement.querySelector('input[name="currentValue"]').value = this.currentValue;
        this.panelElement.querySelector('input[name="step"]').value = this.step;
        this.panelElement.querySelector('input[name="font"]').value = this.font;
        this.panelElement.querySelector('input[name="color"]').value = this.color;
    }

    /**
     * ツール名を返す。
     * @returns ツール名
     */
    getToolName() {
        return '連番ツール';
    }

    /**
     * パネル要素を返す。
     * @returns パネル要素
     */
    getPanelElement() {
        return this.panelElement;
    }

    /**
     * 描画する。
     * @param {number} x x座標
     * @param {number} y y座標
     */
    draw(x, y) {
        this.canvasManager.drawText(this.currentValue, x, y, this.font, this.color);
        this.currentValue += this.step;
        this.updatePanelElement();
    }

    /**
     * パネル要素が更新された場合に実行されるコールバック関数
     * @param {Event} event Event オブジェクト
     */
    panelElementUpdated(event) {
        this.currentValue = Number.parseInt(
            this.panelElement.querySelector('input[name="currentValue"]').value,
        );
        this.step = Number.parseInt(
            this.panelElement.querySelector('input[name="step"]').value,
        );
        this.font = this.panelElement.querySelector('input[name="font"]').value;
        this.color = this.panelElement.querySelector('input[name="color"]').value;
    }
}
