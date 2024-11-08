import SideBar from '../../components/rightSidebar/rightSidebar';
import '../../components/rightSidebar/rightSidebar';

import ChatBar from '../../components/chatBar/chatBar';
import '../../components/chatBar/chatBar';

import MobileBar from '../../components/mobile_rightSidebar/mobile_rightSidebar';
import '../../components/mobile_rightSidebar/mobile_rightSidebar';

import { addObserver } from '../../store';
import Styles from './profileScreen.css';
import { getPostsByUser, getUser } from '../../utils/firebase';
import { getAuth } from 'firebase/auth';


class ProfileScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        addObserver(this);
    }

    async connectedCallback() {
    this.render();
    }

    async render() {
        const currentUser = await getUser();
        const userPosts = await getPostsByUser(currentUser?.uid);

         if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <div class="app-container">
                    <side-bar profileimg="${currentUser?.profileImg}" username="${currentUser?.username}" numpost="${userPosts?.length}"></side-bar>
                    <section>
                        
                    
                    </section>
                    <chat-bar></chat-bar>
                </div>
                <div id="mobile-bar">
                    <mobile-bar></mobile-bar>
                </div>     
            `;
        }
    }
};

customElements.define('profile-screen', ProfileScreen);
export default ProfileScreen;