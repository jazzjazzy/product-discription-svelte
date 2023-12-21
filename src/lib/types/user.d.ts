export type User = {
    id: string;
    firstname: string;
    surname: string;
    email: string;
    role: string;
    stripe_customer_id?: string
    subscription_id?: string;
    auth_session?: Session[];
    key?: Key[];
    subscription?: Subscription[];
}

export type Session = {
    id: string;
    user_id: string;
    active_expires: BigInt;
    idle_expires: BigInt;
    user: User;
}

export type Key = {
    id: string;
    hashed_password: string;
    user_id: string;
    user: User;
}
