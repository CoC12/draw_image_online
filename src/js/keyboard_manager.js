export class KeyboardManager {

    /**
     * コンストラクタ
     */
    constructor() {
        this.invalidKeyCodeList = ['Shift', 'Control', 'Alt'];
        this.previousKeyCode = null;
        this.keyMap = {
            'ctrl-alt-n': 'newCanvas',
            'ctrl-alt-e': 'exportCanvas',
            'ctrl-z': 'undo',
            'ctrl-Z': 'redo',
            'alt-i alt-i': 'insertImage',
            'alt-t alt-s': 'sequenceTool',
        };
    }

    /**
     * イベントリスナを初期化する。
     */
    init() {
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    /**
     * キーボード押下時のハンドラ
     * @param {KeyboardEvent} event KeyboardEvent オブジェクト
     */
    handleKeydown(event) {
        const currentKeyCode = this.buildKeyCode(event);
        const keyCodeList = [currentKeyCode];
        if (this.previousKeyCode) {
            keyCodeList.unshift(this.previousKeyCode);
        }

        const keyCode = keyCodeList.join(' ');
        const operation = this.keyMap[keyCode];
        if (!operation) {
            this.previousKeyCode = currentKeyCode;
            return;
        }

        this.previousKeyCode = null;
        const customOperationEvent = new CustomEvent('CustomOperation', {
            detail: {
                operation: operation,
            },
        });
        document.dispatchEvent(customOperationEvent);
    }

    /**
     * キーコードを構築する。
     * @param {KeyboardEvent} event KeyboardEvent オブジェクト
     * @returns {string} キーコード
     */
    buildKeyCode(event) {
        if (this.previousKey === null) {
            return null;
        }
        if (this.invalidKeyCodeList.includes(event.key)) {
            return null;
        }

        const keyCodeList = [];
        if (event.ctrlKey) {
            keyCodeList.push('ctrl');
        }
        if (event.altKey) {
            keyCodeList.push('alt');
        }
        keyCodeList.push(event.key);
        return keyCodeList.join('-');
    }
}
