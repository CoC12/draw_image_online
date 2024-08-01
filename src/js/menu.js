export const menuItems = [
    {
        label: 'ファイル',
        submenuList: [
            {
                labelList: [
                    '新規作成',
                    'Ctrl+Alt+N',
                ],
                operation: 'newCanvas',
            },
            {
                labelList: [
                    '書き出し',
                    'Ctrl+Alt+E',
                ],
                operation: 'exportCanvas',
            },
        ],
    },
    {
        label: '編集',
        submenuList: [
            {
                labelList: [
                    '元に戻す',
                    'Ctrl+Z',
                ],
                operation: 'undo',
            },
            {
                labelList: [
                    'やり直し',
                    'Ctrl+Shift+Z',
                ],
                operation: 'redo',
            },
        ],
    },
    {
        label: '挿入',
        submenuList: [
            {
                labelList: [
                    '画像',
                    'Alt+I,I',
                ],
                operation: 'insertImage',
            },
        ],
    },
    {
        label: 'ツール',
        submenuList: [
            {
                labelList: [
                    '連番ツール',
                    'Alt+T,S',
                ],
                operation: 'sequenceTool',
            },
        ],
    },
    {
        label: '表示',
        submenuList: [
            {
                labelList: [
                    '50%',
                ],
                operation: null,
            },
            {
                labelList: [
                    '100%',
                ],
                operation: null,
            },
            {
                labelList: [
                    '150%',
                ],
                operation: null,
            },
            {
                labelList: [
                    '画面幅に合わせる',
                ],
                operation: null,
            },
        ],
    },
    {
        label: 'その他',
        submenuList: [
            {
                labelList: [
                    'アップデート履歴',
                ],
                operation: null,
            },
            {
                labelList: [
                    'バージョン: v1.0.0-beta1',
                ],
                operation: null,
            },
        ],
    },
];
