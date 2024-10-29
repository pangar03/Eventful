import { Actions, Screens } from "../types/store";

export const reducer = (currentAction: any, currentState: any) => {
	const { action, payload } = currentAction;

	switch (action) {
		case Actions.NAVIGATE:
			return {
				...currentState,
				screen: payload,
			};

		case Actions.GETPOSTS:
            const normalPosts = payload.filter((post: any) => !post.isEvent);
            const eventPosts = payload.filter((post: any) => post.isEvent);
			return {
				...currentState,
				normalPosts,
                eventPosts,
			};

        case Actions.OPENEVENT:
            return {
                ...currentState,
                screen: Screens.EVENTDETAILS,
                eventUID: payload,
            };

		default:
			return currentState;
	}
};