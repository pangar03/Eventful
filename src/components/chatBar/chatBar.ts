import styles from './chatBar.css';
import userChat, { Attribute as chatAttribute } from '../userChat/userChat';

export enum Attribute {
    'messages' = 'messages',
    'editicon' = 'editicon',
}

class chatBar extends HTMLElement {
    messages?: string;
    editicon?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
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
            <section class="container-left">
                <div class="container-left-header">
                    <div class="tittle">
                        <h2>Messages</h2>
                        <img class="editicon" src="${this.editicon}" alt="editicon">
                    </div>
                    
                    <div class="search-container">
                        <img id="imglupa" src="https://img.icons8.com/?size=100&id=83218&format=png&color=E8EDFF8F" alt="">
                        <input type="text" placeholder="Search..." class="search-input">
                    </div>
                </div>
            <hr class="divider"> <!-- Línea horizontal -->
                <div class="user-chat-container"></div> <!-- Contenedor para userChat -->
            </section>
            `;

            const users = [
                {
                    profileimg: "https://plus.unsplash.com/premium_photo-1678703870962-166fe3f1d274?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyZmlsJTIwZGUlMjBob21icmV8ZW58MHx8MHx8fDA%3D",
                    username: "Maurice K."
                },
                {
                    profileimg: "https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png",
                    username: "Laura S."
                },
                {
                    profileimg: "https://www.shutterstock.com/image-photo/beauty-black-woman-profile-skincare-600nw-2260382807.jpg",
                    username: "Sofia R."
                }
            ];

            // Agregar los usuarios al contenedor de usuarios
            const userContainer = this.shadowRoot.querySelector('.user-chat-container');
            users.forEach((user) => {
                const userChatCont = this.ownerDocument.createElement('user-chat') as userChat;
                userChatCont.setAttribute(chatAttribute.profileimg, user.profileimg);
                userChatCont.setAttribute(chatAttribute.username, user.username);
                userChatCont.setAttribute(chatAttribute.iconmessage, 'https://img.icons8.com/?size=100&id=108787&format=png&color=535768');

                userContainer?.appendChild(userChatCont);
            });

            const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
        }
    }
}

customElements.define('chat-bar', chatBar);
export default chatBar;
