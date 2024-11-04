import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { addPost } from '../../utils/firebase';
import Styles from './createEventForm.css';

class CreateEventForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <form>
                    <label for="event-title">Event Title</label>
                    <input type="text" id="event-title" name="event-title" required placeholder="What is the name of the event?">
                    <div>
                        <h3>Image</h3>
                        <label for="image">Upload an image for your new event!</label>
                        <input type="text" id="image" name="image" placeholder="URL of the image"> <!-- CHANGE AS SOON AS STORAGE ISSUE IS RESOLVED -->
                    </div>
                    <label for="description">Description</label>
                    <input type="text" id="description" name="description" required placeholder="Type here what is the event about...">
                    <label for="location">Location</label>
                    <input type="text" id="location" name="location" required placeholder="Where will the event take place?">
                    <div class="date-time">
                        <div class="date">
                            <label for="date">Date</label>
                            <input type="date" id="date" name="date" required>
                        </div>
                        <div class="time">
                            <label for="time">Time</label>
                            <input type="time" id="time" name="time" required>
                        </div>
                    </div>
                    <label for="participants">Max. Participants</label>
                    <input type="number" id="participants" name="participants" required placeholder="How many people can join?" min="2">
                    <button type="submit">Publish</button>
                </form>
            `;

            const form = this.shadowRoot.querySelector('form')!;
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const title = form['event-title'].value;
                const image = form.image.value;
                const description = form.description.value;
                const location = form.location.value;
                const date = form.date.value;
                const time = form.time.value;
                const participants = form.participants.value;

                const post = {
                    uid: new Date().getTime(),
                    isEvent: true,
                    attendees: [],
                    eventTitle: title,
                    eventLocation: location,
                    eventDate: `${date} ${time}`,
                    description,
                    creator: "Default User",
                    eventImg: image,
                    attendants: 0,
                    maxAttendants: participants,                    
                }

                await addPost(post);
                dispatch(navigate(Screens.DASHBOARD));
            });

            const css = this.ownerDocument.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot.appendChild(css);
        }
    }
}

customElements.define('create-event-form', CreateEventForm);
export default CreateEventForm;