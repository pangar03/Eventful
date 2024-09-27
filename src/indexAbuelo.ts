import * as components from './components/indexPadre';
import chatBar, { Attribute } from './components/chatBar/chatBar';
class AppContainer extends HTMLElement {
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
            <section class="chat-container"></section>`;

            const chatBarInstance = this.ownerDocument.createElement('chat-bar') as chatBar;
            console.log("chatBarInstance creado", chatBarInstance);

            // Establecer el atributo editicon
            chatBarInstance.setAttribute(Attribute.editicon, 'https://img.icons8.com/?size=100&id=86376&format=png&color=E8EDFF8F');

            // Agregar el chatBar al contenedor
            const chatContainer = this.shadowRoot.querySelector('.chat-container');
            chatContainer?.appendChild(chatBarInstance);
        }
    }
}

customElements.define('app-container', AppContainer);
