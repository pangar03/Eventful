import { registerUser } from "../../utils/firebase";
import Styles from "./registerForm.css";

class RegisterForm extends HTMLElement {
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

            `;

            const css = document.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot.appendChild(css);
        }
    }
};

customElements.define('register-form', RegisterForm);
export default  RegisterForm;