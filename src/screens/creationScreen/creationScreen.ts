import CreatePostForm from '../../components/createPostForm/createPostForm';
import '../../components/createPostForm/createPostForm';

import CreateEventForm from '../../components/createEventForm/createEventForm';
import '../../components/createEventForm/createEventForm';

import SideBar from '../../components/rightSidebar/rightSidebar';
import '../../components/rightSidebar/rightSidebar';

import ChatBar from '../../components/chatBar/chatBar';
import '../../components/chatBar/chatBar';

import MobileBar from '../../components/mobile_rightSidebar/mobile_rightSidebar';
import '../../components/mobile_rightSidebar/mobile_rightSidebar';

import { addObserver } from '../../store';
import Styles from './creationScreen.css';

class CreationScreen extends HTMLElement {
    isEvent: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <div class="app-container">
                    <side-bar></side-bar>
                    <section>
                        <div class="header-container">
                            <h1>New Post</h1>
                            <p> Want to post something new today? Want to create a new event? Select one of the options below</p>
                            <div class="post-options">
                                <button class="switch-button create-event">New Event</button>
                                <button class="switch-button create-post switch-button--inactive">Regular Post</button>
                            </div>
                        </div>
                        <div class="creation-form">
                            <create-post-form></create-post-form>
                        </div>
                    </section>
                    <chat-bar></chat-bar>
                </div>
                <div id="mobile-bar">
                    <mobile-bar></mobile-bar>
                </div>          
            `;

            // Switch Buttons Functionality
            const createPostButton = this.shadowRoot.querySelector('.create-post');
            const createEventButton = this.shadowRoot.querySelector('.create-event');

            if(createPostButton && createEventButton){
                createPostButton.addEventListener('click', () => {
                    if(this.isEvent) {
                        this.isEvent = !this.isEvent;
                        createPostButton.classList.toggle('switch-button--inactive');
                        createEventButton.classList.toggle('switch-button--inactive');
                        this.renderForm();
                    }
                });

                createEventButton.addEventListener('click', () => {
                    if(!this.isEvent) {
                        this.isEvent = !this.isEvent;
                        createPostButton.classList.toggle('switch-button--inactive');
                        createEventButton.classList.toggle('switch-button--inactive');
                        this.renderForm();
                    }
                });
            }

            const css = this.ownerDocument.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot.appendChild(css);
        }
    }

    renderForm() {
        const formContainer = this.shadowRoot?.querySelector('.creation-form');

        if(formContainer){        
            if(this.isEvent){
                formContainer.innerHTML = `
                    <create-event-form></create-event-form>
                `;
            } else {
                formContainer.innerHTML = `
                    <create-post-form></create-post-form>
                `;
            }
        }
    }
}

customElements.define('creation-screen', CreationScreen);
export default CreationScreen;