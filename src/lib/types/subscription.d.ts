import type { User } from './user';

export type Pricing = {
    id: string;
    name: String;
    price: Number;
    description?: String;
    list: string;
    stripe_price_id: String;
    visable: Boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    subscription?: Subscription[];
}

export type Subscription = {
    id: String;
    type: String;
    user_id: String;
    price_id: String;
    stripe_subscription_id: String;
    stripe_status: String;
    stripe_price_id: String;
    stripe_customer_id: String;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    User: User[];
    Pricing: Pricing[];
}
