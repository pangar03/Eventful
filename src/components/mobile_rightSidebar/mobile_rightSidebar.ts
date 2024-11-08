import styles from './mobile_rightSidebar.css';
import CategoryButton, { Attribute as CategoryAttribute } from '../category/category';
import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

class MobileSidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        console.log('rendering mobile sidebar');
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <section class="mobile-container-right">
                <div class="category-container">
                    <img src="https://img.icons8.com/?size=100&id=86527&format=png&color=E8EDFF" class="normal-icon home">
                    <img src="https://img.icons8.com/?size=100&id=59758&format=png&color=E8EDFF" class="normal-icon events">
                    <img src="https://img.icons8.com/?size=100&id=11153&format=png&color=E8EDFF" class="add-icon create">
                    <img src="https://img.icons8.com/?size=100&id=98957&format=png&color=E8EDFF" class="normal-icon profile">
                </div> 
            </section>
            `;

            // Functionality
            const newButton = this.shadowRoot.querySelector('.create');
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
            });

            const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
        }
    }
}

customElements.define('mobile-bar', MobileSidebar);
export default MobileSidebar;