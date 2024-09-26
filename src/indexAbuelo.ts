import * as components from './components/indexPadre';
import sideBar, {Attribute} from './components/rightSidebar/rightSidebar';
class AppContainer extends HTMLElement {

    rightSidebar: sideBar[] =[];

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
            <h1>Holisss</h1>`;
            
        }
    }
    
}

customElements.define('app-container', AppContainer);
