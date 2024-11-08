export type NormalPost = {
    uid: number,
    isEvent: boolean,
    profileImg: string, 
    username: string,
    postText: string,
    postImg: string,
    likes: number,
    isLiked: boolean,
};

export type EventPost = {
    uid: number,
    firebaseid: string,
    isEvent: boolean,
    isAttending: boolean,
    eventTitle: string,
    eventLocation: string,
    eventDate: string,
    description: string,
    creator: string,
    eventImg: string,
    attendants: number,
    maxAttendants: number,
}