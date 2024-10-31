import { loginUser } from "../../utils/firebase";
import Styles from "./loginForm.css";

import { dispatch } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";

class LoginForm extends HTMLElement {
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
                <form id="login-form">
                    <h1 id="title-desktop">LOGIN</h1>
                    <h1 id="title-mobile">Login</h1>
                    <h3>Get back to where you let if</h3>
                    <section id="input-container">
                        
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Email" required>
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Password" required>
                        
                    </section>
                    <button class="login-button" type="submit">Login</button>
                    <p>New around here? <button class="register-button">Create an account</button></p>
                </form>                    
            `;

            const form = (this.shadowRoot.getElementById('login-form')) as HTMLFormElement;
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = (form.querySelector('#email') as HTMLInputElement).value;
                const password = (form.querySelector('#password') as HTMLInputElement).value;

                // if(password !== confirmPassword){
                //     alert('Passwords do not match');
                //     return;
                // }
                const credentials = {email, password};
                const result = loginUser(email, password);
            });

            // Login Button
            

            const loginButton = (this.shadowRoot.querySelector('.register-button')) as HTMLButtonElement;
            loginButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir comportamiento por defecto, si es necesario
            dispatch(navigate(Screens.REGISTER));
});
            const css = document.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot.appendChild(css);
        }
    }
};

customElements.define('login-form', LoginForm);
export default  LoginForm;