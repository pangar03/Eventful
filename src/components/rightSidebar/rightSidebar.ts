import styles from './rightSidebar.css';
import CategoryButton, { Attribute as CategoryAttribute } from '../category/category';
import { signOut } from '../../utils/firebase';
import { navigate } from '../../store/actions';
import { dispatch } from '../../store';
import { Screens } from '../../types/store';

export enum Attribute {
    'profileimg' = 'profileimg',
    'username' = 'username',
    'numpost' = 'numpost',
    'friends' = 'friends',
}

class sideBar extends HTMLElement {
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
                <h1 class="eventful">Eventful</h1>
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
                    </div>
                    <button class="new-post-button">+ New</button>
                </div>
                <div class="category-container"></div> 
            </section>
            `;

            const categories = [
                { icon: 'https://img.icons8.com/?size=100&id=86527&format=png&color=4469FE', text: 'Home', id: 'home' },
                { icon: 'https://img.icons8.com/?size=100&id=59758&format=png&color=7F98FF', text: 'Events', id: 'events' },
                { icon: 'https://img.icons8.com/?size=100&id=98957&format=png&color=535768', text: 'Profile', id: 'profile' },
                { icon: 'https://img.icons8.com/?size=100&id=BdksXmxLaK8r&format=png&color=DA4646', text: 'Logout', id: 'logout' },
            ];

            // Añadir cada CategoryButton al contenedor de categorías
            const categoryContainer = this.shadowRoot.querySelector('.category-container');
            categories.forEach((category, index) => {
                const categoryButton = this.ownerDocument.createElement('category-button') as CategoryButton;
                categoryButton.setAttribute(CategoryAttribute.iconimg, category.icon);
                categoryButton.setAttribute(CategoryAttribute.text, category.text);
                categoryButton.classList.add(category.id);

                // Agregar clase específica al botón que deseas estilizar
                if (index === 3) { // Por ejemplo, cambiar el color del cuarto botón
                    categoryButton.classList.add('highlight-category');
                }

                categoryContainer?.appendChild(categoryButton);
            });

            // Event listeners
            const newButton = this.shadowRoot.querySelector('.new-post-button');
            newButton?.addEventListener('click', () => {
                console.log('New Post');
                dispatch(navigate(Screens.POSTCREATION));
            });

            const home = this.shadowRoot.querySelector('.home');
            home?.addEventListener('click', () => {
                console.log('Home');
                dispatch(navigate(Screens.DASHBOARD));
            });

            const events = this.shadowRoot.querySelector('.events');
            events?.addEventListener('click', () => {
                console.log('Events');
                dispatch(navigate(Screens.DASHBOARDEVENTS));
            });

            const profile = this.shadowRoot.querySelector('.profile');
            profile?.addEventListener('click', () => {
                console.log('Profile');
                dispatch(navigate(Screens.PROFILE));
            });

            const logout = this.shadowRoot.querySelector('.logout');
            logout?.addEventListener('click', () => {
                console.log('Logout');
                signOut();
            });

            const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
        }
    }
}

customElements.define('side-bar', sideBar);
export default sideBar;
