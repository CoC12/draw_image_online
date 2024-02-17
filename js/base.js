document.addEventListener('DOMContentLoaded', () => {
    const canvasElement = document.querySelector('#id-canvas');
    canvasElement.scrollIntoView({ block: 'center' });

    // CanvasManager のセットアップ
    const canvasManager = new CanvasManager(canvasElement);
    document.querySelectorAll('[data-clickable-key]').forEach((clickableElement) => {
        const clickableKey = clickableElement.dataset.clickableKey;
        clickableElement.addEventListener('click', () => {
            // [ファイル] -> [新規]
            if (clickableKey === 'newCanvas') {
                canvasManager.reset();
                toolManager.setTool(null);
                return;
            }
            // [ファイル] -> [書き出し]
            if (clickableKey === 'exportCanvas') {
                exportCanvas(canvasManager.getDataURL());
                return;
            }
            // [挿入] -> [画像]
            if (clickableKey === 'insertImage') {
                loadImage().then(dataURL => {
                    canvasManager.drawImage(dataURL);
                });
                return;
            }
            // [ツール] -> [連番ツール]
            if (clickableKey === 'sequenceTool') {
                toolManager.setTool(new SequenceTool(canvasManager));
            }
        });
    });
    // ToolManager のセットアップ
    const toolManager = new ToolManager(
        document.querySelector('#tool-panel-header'),
        document.querySelector('#tool-panel-body'),
    );
    canvasManager.setClickListener((x, y) => {
        toolManager.draw(x, y);
    });
});


/**
 * 画像をダウンロードする。
 * @param {string} dataURL 画像データURL
 */
const exportCanvas = (dataURL) => {
    const tempLink = document.createElement('a');
    tempLink.download = 'output-image.png';
    tempLink.href = dataURL;
    tempLink.click();
}


/**
 * 画像を読み込む。
 * @returns {Promise<string>} 画像データURL
 */
const loadImage = () => {
    promise = new Promise((resolve, reject) => {
        const tempFileInput = document.createElement('input');
        tempFileInput.type = 'file';
        tempFileInput.addEventListener('change', () => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(tempFileInput.files[0]);
        });
        tempFileInput.click();
    });
    return promise;
};
