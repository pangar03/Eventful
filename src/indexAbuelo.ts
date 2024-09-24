import * as components from './components/indexPadre.js';
import Post from './components/normal-post/normal-post.js';
class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
             <h1>Hola</h1>
            `
    }

    }
}

customElements.define('app-container', AppContainer);
