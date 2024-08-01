import { menuItems } from '../js/menu.js';


document.addEventListener('DOMContentLoaded', () => {
    buildHeaderMenu();

    const event = new CustomEvent('CustomLayoutLoaded');
    document.dispatchEvent(event);
});

/**
 * ヘッダーメニューを構築する。
 */
const buildHeaderMenu = () => {
    const headerMenuElement = document.querySelector('#id-header-menu');
    menuItems.forEach((menuItem) => {
        const menuItemElement = document.createElement('div');
        menuItemElement.textContent = menuItem.label;
        menuItemElement.classList.add('l-header-menu__item');
        const submenuContainerElement = document.createElement('div');
        submenuContainerElement.classList.add('l-header-menu__dropdown');

        menuItemElement.appendChild(submenuContainerElement);
        headerMenuElement.appendChild(menuItemElement)
        menuItem.submenuList.forEach((submenuItem) => {
            const submenuItemElement = document.createElement('div');
            submenuContainerElement.appendChild(submenuItemElement);

            submenuItemElement.classList.add('l-header-menu__dropdown-item');
            submenuItemElement.dataset.clickableKey = submenuItem.clickableKey;
            submenuItem.labelList.forEach((label) => {
                const labelElement = document.createElement('div');
                submenuItemElement.appendChild(labelElement);
                labelElement.textContent = label;
            });
        });
    });
};
