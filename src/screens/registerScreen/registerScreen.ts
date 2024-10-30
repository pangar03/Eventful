import RegisterForm from "../../components/registerForm/registerForm";
import "../../components/registerForm/registerForm";

import Styles from "./registerScreen.css";

class RegisterScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <section>
                    <div>
                        <h1>Eventful</h1>
                        <h2 id="subtitle-bold">Join today and discover a new way to be in a community</h2>
                        <h2 id="subtitle-light">Create, join and discuss about new events today!</h2>
                    </div>
                    <register-form></register-form>
                </section>
            `;

            const style = this.ownerDocument.createElement('style');
            style.innerHTML = Styles;
            this.shadowRoot.appendChild(style);
        }
    }
}

customElements.define('register-screen', RegisterScreen);
export default RegisterScreen;