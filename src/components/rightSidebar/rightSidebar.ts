import styles from './rightSidebar.css';
import CategoryButton, { Attribute as CategoryAttribute } from '../category/category';

export enum Attribute {
    'eventful' = 'eventful',
    'profileimg' = 'profileimg',
    'username' = 'username',
    'numpost' = 'numpost',
    'friends' = 'friends',
}

class sideBar extends HTMLElement {
    eventful?: string;
    profileimg?: string;
    username?: string;
    numpost?: number;
    friends?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case Attribute.numpost:
                this.numpost = newValue ? Number(newValue) : undefined;
                break;
            default:
                this[propName] = newValue;
                break;
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <section class="container-right">
                <h1 class="eventful">${this.eventful}</h1>
                <div class="container-user">
                    <div class="circle">
                        <img src="${this.profileimg}" alt="profileimg">
                    </div>
                    <h3>${this.username}</h3>
                    <div class="containerinfo">
                        <div class="div-cont">
                            <p>${this.numpost}</p>
                            <p id="text-opacity">Posts</p>
                        </div>
                        <div class="div-cont">
                            <p>${this.friends}</p>
                            <p id="text-opacity">Friends</p>
                        </div>
                    </div>
                    <button class="new-post-button">+ New</button>
                </div>
                <div class="category-container"></div> 
            </section>
            `;

            const categories = [
                { icon: 'https://img.icons8.com/?size=100&id=86527&format=png&color=4469FE', text: 'Home' },
                { icon: 'https://img.icons8.com/?size=100&id=59758&format=png&color=7F98FF', text: 'Events' },
                { icon: 'https://img.icons8.com/?size=100&id=98957&format=png&color=535768', text: 'Profile' },
                { icon: 'https://img.icons8.com/?size=100&id=BdksXmxLaK8r&format=png&color=DA4646', text: 'Logout' },
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

customElements.define('side-bar', sideBar);
export default sideBar;
