class RegisterScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {

    }
}

customElements.define('register-screen', RegisterScreen);
export default RegisterScreen;