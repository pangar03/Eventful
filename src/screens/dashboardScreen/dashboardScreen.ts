import Dashboard from "../../components/dashboard/dashboard";
import "../../components/dashboard/dashboard"

import SideBar from "../../components/rightSidebar/rightSidebar";
import "../../components/rightSidebar/rightSidebar"

import MobileSidebar from "../../components/mobile_rightSidebar/mobile_rightSidebar";
import "../../components/mobile_rightSidebar/mobile_rightSidebar"

import ChatBar from "../../components/chatBar/chatBar";
import "../../components/chatBar/chatBar";

class DashboardScreen extends HTMLElement {
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
                <div>
                    <side-bar></side-bar>
                    <dashboard-component></dashboard-component>
                    <chat-bar></chat-bar>
                </div>
                <div id="mobile-bar">
                    <mobile-bar></mobile-bar>
                </div>
            `;
        }
    }
};

customElements.define('dashboard-screen', DashboardScreen);
export default DashboardScreen;