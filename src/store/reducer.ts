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
			return {
				...currentState,
				products: payload,
			};

        case Actions.OPENPOST:
            return {
                ...currentState,
                screens: Screens.EVENTDETAILS,
                eventUID: payload,
            };

		default:
			return currentState;
	}
};