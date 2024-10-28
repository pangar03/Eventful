import { Actions } from "../types/store";

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

		default:
			return currentState;
	}
};