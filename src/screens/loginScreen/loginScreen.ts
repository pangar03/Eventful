import LoginForm from "../../components/loginForm/loginForm";
import "../../components/loginForm/loginForm";
import { addObserver } from "../../store";

import Styles from "./loginScreen.css";

class LoginScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        console.log('LoginForm connected');
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <section>
                    <div>
                        <h1>Eventful</h1>
                        <div id="div-titles">
                            <h2 id="subtitle-bold">Welcome Back!</h2>
                            <h2 id="subtitle-bold">We missed you</h2>
                        </div>
                        
                        <h2 id="subtitle-light">Hop on and discover what's new on your network.</h2>
                    </div>
                    <login-form></login-form>
                </section>
            `;

            const style = this.ownerDocument.createElement('style');
            style.innerHTML = Styles;
            this.shadowRoot.appendChild(style);
        }
    }
}

customElements.define('login-screen', LoginScreen);
export default LoginScreen;