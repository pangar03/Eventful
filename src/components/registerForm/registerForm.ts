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
                <form id="register-form">
                    <h1 id="title-desktop">Get Started</h1>
                    <h1 id="title-mobile">Sign Up</h1>
                    <h3>Create Your Account</h3>
                    <section id="input-container">
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholder="Username" required>
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Email" required>
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Password" required>
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" placeholder="Confirm Password" required>
                    </section>
                    <button type="submit">Create Account</button>
                    <p>Already have an account? <button class="login-button">Login</button>Z</p>
                </form>                    
            `;

            const form = (this.shadowRoot.getElementById('register-form')) as HTMLFormElement;
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const username = (form.querySelector('#username') as HTMLInputElement).value;
                const email = (form.querySelector('#email') as HTMLInputElement).value;
                const password = (form.querySelector('#password') as HTMLInputElement).value;
                const confirmPassword = (form.querySelector('#confirm-password') as HTMLInputElement).value;

                if(password !== confirmPassword){
                    alert('Passwords do not match');
                    return;
                }
                const credentials = {username, email, password};
                const result = await registerUser(credentials);
                if(result){
                    alert('User registered successfully');
                    form.reset();
                } else {
                    alert('Error registering user');
                }
            });

            const css = document.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot.appendChild(css);
        }
    }
};

customElements.define('register-form', RegisterForm);
export default  RegisterForm;