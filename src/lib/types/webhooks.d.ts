export type customerSubscriptionUpdateObj = {
    id: string;
    customer: string;
    status: string;
    cancel_at: number | null;
    cancel_at_period_end: boolean;
    canceled_at: number | null;
}