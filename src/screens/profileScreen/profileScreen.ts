import SideBar from "../../components/rightSidebar/rightSidebar";
import "../../components/rightSidebar/rightSidebar";
import MobileSidebar from "../../components/mobile_rightSidebar/mobile_rightSidebar";
import "../../components/mobile_rightSidebar/mobile_rightSidebar";
import ChatBar from "../../components/chatBar/chatBar";
import "../../components/chatBar/chatBar";

import EventPostCard, { Attribute as EventCardAttribute } from "../../components/eventPostCard/eventPostCard";
import "../../components/eventPostCard/eventPostCard";

import Post, { Attribute as PostAttribute } from "../../components/normal-post/normal-post";
import "../../components/normal-post/normal-post";

import { addObserver, appState, dispatch } from "../../store";
import { getPostsAction } from "../../store/actions";
import { getUser } from "../../utils/firebase";
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
                        <section class="user-posts"></section>
                    </section>
                    <chat-bar></chat-bar>
                </div>
                <div id="mobile-bar">
                    <mobile-bar></mobile-bar>
                </div>
            `;
        }

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
                
                postCard.setAttribute(EventCardAttribute.uid, String(post.userUID) || "");
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
