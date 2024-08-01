export const menuItems = [
    {
        label: 'ファイル',
        submenuList: [
            {
                labelList: [
                    '新規',
                    'Ctrl+N',
                ],
                clickableKey: 'newCanvas',
            },
            {
                labelList: [
                    '書き出し',
                    'Ctrl+E',
                ],
                clickableKey: 'exportCanvas',
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
                clickableKey: 'insertImage',
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
                clickableKey: 'sequenceTool',
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
                clickableKey: null,
            },
            {
                labelList: [
                    '100%',
                ],
                clickableKey: null,
            },
            {
                labelList: [
                    '150%',
                ],
                clickableKey: null,
            },
            {
                labelList: [
                    '画面幅に合わせる',
                ],
                clickableKey: null,
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
                clickableKey: null,
            },
            {
                labelList: [
                    'バージョン: v1.0.0-beta1',
                ],
                clickableKey: null,
            },
        ],
    },
];
