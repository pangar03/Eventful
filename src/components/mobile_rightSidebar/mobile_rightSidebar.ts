import styles from './rightSidebar.css';
import CategoryButton, { Attribute as CategoryAttribute } from '../category/category';

class MobileSidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <section class="container-right">
                <div class="category-container"></div> 
            </section>
            `;

            const categories = [
                { icon: 'https://img.icons8.com/?size=100&id=86527&format=png&color=E8EDFF', text: 'Home' },
                { icon: 'https://img.icons8.com/?size=100&id=59758&format=png&color=E8EDFF', text: 'Events' },
                { icon: 'https://img.icons8.com/ios/50/plus-math--v1.png', text: 'Profile' },
                { icon: '', text: 'Logout' },
            ];

            // Añadir cada CategoryButton al contenedor de categorías
            const categoryContainer = this.shadowRoot.querySelector('.category-container');
            categories.forEach((category, index) => {
                const categoryButton = this.ownerDocument.createElement('category-button') as CategoryButton;
                categoryButton.setAttribute(CategoryAttribute.iconimg, category.icon);
                categoryButton.setAttribute(CategoryAttribute.text, category.text);

                // Agregar clase específica al botón que deseas estilizar
                if (index === 3) { // Por ejemplo, cambiar el color del cuarto botón
                    categoryButton.classList.add('highlight-category');
                }

                categoryContainer?.appendChild(categoryButton);
            });

            const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
        }
    }
}

customElements.define('mobile-side-bar', MobileSidebar);
export default MobileSidebar;