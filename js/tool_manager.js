class ToolManager {

    /**
     * コンストラクタ
     * @param {Element} toolPanelHeader ツールパネルのヘッダー要素
     * @param {Element} toolPanelBody ツールパネルのボディ要素
     */
    constructor(toolPanelHeader, toolPanelBody) {
        this.currentTool = null;
        this.toolPanelHeader = toolPanelHeader;
        this.toolPanelBody = toolPanelBody;
    }

    /**
     * ツールをセットする。
     * @param {BaseTool | null} tool ツール
     */
    setTool(tool) {
        this.currentTool = tool;
        this.toolPanelHeader.innerHTML = this.getToolName();
        this.toolPanelBody.replaceChildren(this.getPanelElement());
    }

    /**
     * 現在セットされているツールのツール名を返す。
     * @returns ツール名
     */
    getToolName() {
        if (this.currentTool) {
            return this.currentTool.getToolName();
        }
        return '';
    }

    /**
     * 現在セットされているツールのパネル要素を返す。
     * @returns パネル要素
     */
    getPanelElement() {
        if (this.currentTool) {
            return this.currentTool.getPanelElement();
        }
        return document.createElement('div');
    }

    /**
     * 現在セットされているツールで描画する。
     * @param {number} x x座標
     * @param {number} y y座標
     */
    draw(x, y) {
        if (this.currentTool) {
            this.currentTool.draw(x, y);
        }
    }
}
