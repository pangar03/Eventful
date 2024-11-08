import SideBar from "../../components/rightSidebar/rightSidebar";
import "../../components/rightSidebar/rightSidebar";
import MobileSidebar from "../../components/mobile_rightSidebar/mobile_rightSidebar";
import "../../components/mobile_rightSidebar/mobile_rightSidebar";
import ChatBar from "../../components/chatBar/chatBar";
import "../../components/chatBar/chatBar";

import categoryButton, {Attribute as CategoryAttribute}  from "../../components/category/category";

import EventPostCard, { Attribute as EventCardAttribute } from "../../components/eventPostCard/eventPostCard";
import "../../components/eventPostCard/eventPostCard";

import Post, { Attribute as PostAttribute } from "../../components/normal-post/normal-post";
import "../../components/normal-post/normal-post";

import { addObserver, appState, dispatch } from "../../store";
import { getPostsAction } from "../../store/actions";
import { getUser, signOut } from "../../utils/firebase";
import Styles from "./profileScreen.css";

class ProfileScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        addObserver(this);
    }
    async connectedCallback() {
        if (
            appState.normalPosts.length === 0 &&
            appState.eventPosts.length === 0
        ) {
            const action = await getPostsAction();
            dispatch(action);
        } else {
            this.render();
        }
    }
    async render() {
        const currentUser = await getUser(appState.user);
        const userPosts = this.getPostsByUser();
        console.log("USER POSTS", userPosts);
        const buttonData = { icon: 'https://img.icons8.com/?size=100&id=BdksXmxLaK8r&format=png&color=DA4646', text: 'Logout', id: 'logout' };
        
        const logoutButton = this.ownerDocument.createElement('category-button') as categoryButton;
        
        logoutButton.setAttribute(CategoryAttribute.iconimg, buttonData.icon);
        logoutButton.setAttribute(CategoryAttribute.text, buttonData.text);
        logoutButton.classList.add(buttonData.id);
        
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <div>
                    <side-bar profileimg="${currentUser?.profileImg}" username="${currentUser?.username}" numpost="${userPosts?.length}"></side-bar>
                    <section class="profile-container">
                        <div class="profile-picture"></div>
                        <h2>${currentUser?.username}</h2>
                        <div class="profile-info">
                            <label for="username">Username</label>
                            <input type="text" placeholder="" id="username">
                            <label for="username">Email</label>
                            <input type="email" placeholder="" id="email">
                            <label for="username">Current Password</label>
                            <input type="password" placeholder="" id="current-password">
                            <label for="username">New Password</label>
                            <input type="password" placeholder="" id="new-password">
                            <label for="username">Confirm New Password</label>
                            <input type="password" placeholder="" id="new-password">
                        </div>
                        <button>Save Changes</button>
                        <div class="logout-button">
                            <h3>Logout</h3>
                        </div>
                        <section class="user-posts"></section>
                    </section>
                    <chat-bar></chat-bar>
                </div>
                <div id="mobile-bar">
                    <mobile-bar></mobile-bar>
                </div>
            `;
        }

        const logoutButtonContainer = this.shadowRoot?.querySelector(".logout-button");
        logoutButtonContainer?.appendChild(logoutButton);

        const logout = this.shadowRoot?.querySelector(".logout");

        logout?.addEventListener('click', () => {
            console.log('Logout');
            signOut();
        });

        const userPostsContainer = this.shadowRoot?.querySelector(".user-posts");

        this.renderPosts(userPostsContainer as HTMLElement, userPosts);

        const css = this.ownerDocument.createElement("style");
        css.innerHTML = Styles;
        this.shadowRoot?.appendChild(css);
    }

    renderPosts(container: HTMLElement, posts: any) {
        posts.forEach(async (post: any) => {
            if(post.isEvent){
                const postCard = this.ownerDocument.createElement('event-post-card') as EventPostCard;
                
                postCard.setAttribute(EventCardAttribute.uid, String(post.uid) || "");
                postCard.setAttribute(EventCardAttribute.image, post.eventImg || "");
                postCard.setAttribute(EventCardAttribute.eventtitle, post.eventTitle || "");
                postCard.setAttribute(EventCardAttribute.location, post.eventLocation || "");
                postCard.setAttribute(EventCardAttribute.date, post.eventDate || "");
                postCard.setAttribute(EventCardAttribute.description, post.description || "");

                container.appendChild(postCard);
            } else {
                const postCard = this.ownerDocument.createElement('normal-post') as Post;

                const user = await getUser(post.userUID);

                postCard.setAttribute(PostAttribute.uid, String(post.uid) || "");
                postCard.setAttribute(PostAttribute.profileimg, user?.profileImg || "");
                postCard.setAttribute(PostAttribute.username, user?.username || "");
                postCard.setAttribute(PostAttribute.posttext, post.postText || "");
                postCard.setAttribute(PostAttribute.postimg, post.postImg || "");

                container.appendChild(postCard);
            }
        });
    }

    getPostsByUser() {
        const posts = appState.normalPosts.filter((post: any) => {
            return post.userUID === appState.user;
        });
        
        const events = appState.eventPosts.filter((post: any) => {
            return post.userUID === appState.user;
        });

        return [...posts, ...events];
    }
}
customElements.define("profile-screen", ProfileScreen);
export default ProfileScreen;
