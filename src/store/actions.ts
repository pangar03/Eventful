import { Actions } from "../types/store";

export const navigate = (screen: string) => {
    return {
        action: Actions.NAVIGATE,
        payload: screen,
    }
};

export const getPosts = () => {
    // GET POSTS DATA
    return {
        action: Actions.GETPOSTS,
        payload: [
            {
                uid: 1,
                isEvent: false,
                profileImg:
                    "https://plus.unsplash.com/premium_photo-1678703870962-166fe3f1d274?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyZmlsJTIwZGUlMjBob21icmV8ZW58MHx8MHx8fDA%3D",
                username: "Maurice K.",
                postText:
                    "First and last time that I go to an Italian restaurant with white shirt lol... Rookie mistake tbf. At least I got to eat nice lasagna",
                postImg: "",
                likes: 100,
            },
            {
                uid: 2,
                isEvent: false,
                profileImg:
                    "https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png",
                username: "Laura S.",
                postText:
                    "El mejor café que he probado en años. ¡Definitivamente volveré!",
                postImg:
                    "https://plus.unsplash.com/premium_photo-1678901234567-abcdef654321?fm=jpg&q=60&w=3000",
                likes: 75,
            },
            {
                uid: 3,
                isEvent: false,
                profileImg:
                    "https://media.istockphoto.com/id/1200677760/es/foto/retrato-de-apuesto-joven-sonriente-con-los-brazos-cruzados.jpg?s=612x612&w=0&k=20&c=RhKR8pxX3y_YVe5CjrRnTcNFEGDryD2FVOcUT_w3m4w=",
                username: "Javier M.",
                postText:
                    "La experiencia fue increíble, pero la comida no estuvo a la altura.",
                postImg: "",
                likes: 50,
            },
            {
                uid: 18,
                isEvent: true,
                isAttending: false,
                eventTitle: "Carrera de obstáculos",
                eventLocation: "Parque Acuático",
                eventDate: "2024-11-25",
                description:
                    "Pon a prueba tus límites en esta emocionante carrera llena de desafíos.",
                creator: "Club Deportivo",
                eventImg: "https://images.pexels.com/photos/2995476/pexels-photo-2995476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                attendants: 100,
                maxAttendants: 150,
            },
            {
                uid: 19,
                isEvent: true,
                isAttending: true,
                eventTitle: "Cata de vinos",
                eventLocation: "Viñedo local",
                eventDate: "2024-11-29",
                description:
                    "Descubre los sabores y aromas de nuestros vinos más selectos.",
                creator: "Bodega Familiar",
                eventImg: "https://images.pexels.com/photos/2954924/pexels-photo-2954924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                attendants: 50,
                maxAttendants: 70,
            },
            {
                uid: 20,
                isEvent: true,
                isAttending: false,
                eventTitle: "Festival de cine al aire libre",
                eventLocation: "Parque de la Ciudad",
                eventDate: "2024-12-02-03",
                description: "Disfruta de una noche de cine bajo las estrellas.",
                creator: "Cine Club",
                eventImg: "https://images.pexels.com/photos/28583953/pexels-photo-28583953/free-photo-of-bandeja-de-aperitivos-de-verano-al-aire-libre-con-vino-espumoso.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                attendants: 200,
                maxAttendants: 300,
            },
        ], // REPLACE WITH DATA
    }
};

export const openEvent = (uid: number) => {
    return {
        action: Actions.OPENEVENT,
        payload: uid,
    }
};