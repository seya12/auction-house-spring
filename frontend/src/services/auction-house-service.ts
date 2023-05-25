/**
 * OpenAPI definition
 * v0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "oazapfts/lib/runtime";
import * as QS from "oazapfts/lib/runtime/query";
export const defaults: Oazapfts.RequestOpts = {
    baseUrl: "http://localhost:8080",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    generatedServerUrl: "http://localhost:8080"
};
export type Address = {
    zipCode?: string;
    city?: string;
    street?: string;
};
export type PaymentOption = {
    id?: number;
    owner?: Customer;
};
export type Bid = {
    id?: number;
    bid?: number;
    date?: string;
    customer?: Customer;
    article?: Article;
};
export type Article = {
    id?: number;
    name?: string;
    description?: string;
    reservePrice?: number;
    hammerPrice?: number;
    auctionStartDate?: string;
    auctionEndDate?: string;
    seller?: Customer;
    buyer?: Customer;
    bids?: Bid[];
    status?: "LISTED" | "AUCTION_RUNNING" | "SOLD" | "NOT_SOLD";
};
export type Customer = {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    shippingAddress?: Address;
    paymentAddress?: Address;
    paymentOptions?: PaymentOption[];
    boughtArticles?: Article[];
    soldArticles?: Article[];
    bids?: Bid[];
};
export function getCustomers(opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Customer[];
    }>("/customers", {
        ...opts
    });
}
export function login(email: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 204;
        data: object;
    }>(`/customers${QS.query(QS.explode({
        email
    }))}`, {
        ...opts,
        method: "POST"
    });
}
export function getArticles({ status }: {
    status?: "LISTED" | "AUCTION_RUNNING" | "SOLD" | "NOT_SOLD";
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Article[];
    }>(`/articles${QS.query(QS.explode({
        status
    }))}`, {
        ...opts
    });
}
export function getArticle(id: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Article;
    }>(`/articles/${encodeURIComponent(id)}`, {
        ...opts
    });
}
