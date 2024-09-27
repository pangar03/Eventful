import * as components from './components/indexPadre';
import sideBar, { Attribute } from './components/rightSidebar/rightSidebar';
import CategoryButton, { Attribute as CategoryAttribute } from './components/category/category';

class AppContainer extends HTMLElement {
    rightSidebar: sideBar[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const rightSidebar = this.ownerDocument.createElement('side-bar') as sideBar; // Cambiado a 'side-bar'
        rightSidebar.setAttribute(Attribute.eventful, 'Eventful');
        rightSidebar.setAttribute(Attribute.profileimg, 'https://curicum.de/wp-content/uploads/2019/08/curicum_26_3.jpg');
        rightSidebar.setAttribute(Attribute.username, 'James Robertson');
        rightSidebar.setAttribute(Attribute.numpost, '12');
        rightSidebar.setAttribute(Attribute.friends, '132'); // Asegúrate de que este valor sea correcto
        this.rightSidebar.push(rightSidebar);

        const category = this.ownerDocument.createElement('category-button') as CategoryButton;
        category.setAttribute(CategoryAttribute.iconimg, 'https://example.com/icon.png'); // Reemplaza con una URL válida
        category.setAttribute(CategoryAttribute.text, 'Categoría'); // Asegúrate de que este valor sea correcto

        this.shadowRoot?.appendChild(rightSidebar);
        this.shadowRoot?.appendChild(category);

    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.rightSidebar.forEach((card) => {
                this.shadowRoot?.appendChild(card);
            
            });
        }
    }
}

customElements.define('app-container', AppContainer);
