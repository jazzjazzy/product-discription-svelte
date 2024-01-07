import type { User } from './user';

export type Pricing = {
    id: string;
    name: string;
    price: number;
    limit: number;
    description?: string;
    list: string;
    stripe_price_id: string;
    visable: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    subscription?: Subscription[];
}

export type Subscription = {
    id: string;
    type: string;
    user_id: string;
    price_id: string;
    stripe_subscription_id: string;
    stripe_status: string;
    stripe_price_id: string;
    stripe_customer_id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    User: User[];
    Pricing: Pricing[];
}
