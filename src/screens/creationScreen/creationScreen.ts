import CreatePostForm from '../../components/createPostForm/createPostForm';
import '../../components/createPostForm/createPostForm';

import CreateEventForm from '../../components/createEventForm/createEventForm';
import '../../components/createEventForm/createEventForm';

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
                <section>
                    <div>
                        <h1>New Post</h1>
                        <p> Want to post something new today? Want to create a new event? Select one of the options below</p>
                        <div class="post-options">
                            <button id="create-event">New Event</button>
                            <button id="create-post">Regular Post</button>
                        </div>
                    </div>
                    <div class="creation-form"></div>
                </section>
            `;

            const formContainer = this.shadowRoot.querySelector('.creation-form');

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

            const css = this.ownerDocument.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot.appendChild(css);
        }
    }
}

customElements.define('creation-screen', CreationScreen);
export default CreationScreen;