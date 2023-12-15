
export type User = {
    id: String;
    firstname: String;
    surname: String;
    email: String;
    auth_session?: Session[];
    key?: Key[];
    subscription?: Subscription[];
}

export type Session = {
    id: String;
    user_id: String;
    active_expires: BigInt;
    idle_expires: BigInt;
    user: User;
}

export type Key = {
    id: String;
    hashed_password: String;
    user_id: String;
    user: User;
}
