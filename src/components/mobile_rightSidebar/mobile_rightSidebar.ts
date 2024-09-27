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
                <div class="category-container">
                    <img src="https://img.icons8.com/?size=100&id=86527&format=png&color=E8EDFF" class="normal-icon">
                    <img src="https://img.icons8.com/?size=100&id=59758&format=png&color=E8EDFF" class="normal-icon">
                    <img src="https://img.icons8.com/?size=100&id=11153&format=png&color=E8EDFF" class="add-icon">
                    <img src="https://img.icons8.com/?size=100&id=98957&format=png&color=E8EDFF" class="normal-icon">
                </div> 
            </section>
            `;
            const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
        }
    }
}

customElements.define('mobile-side-bar', MobileSidebar);
export default MobileSidebar;