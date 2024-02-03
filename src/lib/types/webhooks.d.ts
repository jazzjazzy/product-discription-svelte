export type customerSubscriptionUpdateObj = {
    id: string;
    customer: string;
    status: string; // cuttent status of the subscription
    cancel_at: number | null;
    cancel_at_period_end: boolean;
    canceled_at: number | null;
    current_period_end: number | null;
}

export type trialPeriod = {
    isTrial: boolean;
    days: number;
    endDate: Date;
}