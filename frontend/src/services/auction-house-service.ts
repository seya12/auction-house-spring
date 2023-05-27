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
export type CustomerForLoginDto = {
    email: string;
    password: string;
};
export type CustomerInfoDto = {
    id: number;
    email: string;
};
export type BidDto = {
    customerId: number;
    bid: number;
};
export type ArticleDto = {
    id: number;
    name?: string;
    description?: string;
    reservePrice?: number;
    hammerPrice?: number;
    auctionStartDate?: string;
    auctionEndDate?: string;
    status?: "LISTED" | "AUCTION_RUNNING" | "SOLD" | "NOT_SOLD";
};
export function login(customerForLoginDto: CustomerForLoginDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: CustomerInfoDto;
    }>("/customers/login", oazapfts.json({
        ...opts,
        method: "POST",
        body: customerForLoginDto
    }));
}
export function makeBid(id: number, bidDto: BidDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 204;
        data: object;
    }>(`/articles/${encodeURIComponent(id)}/bid`, oazapfts.json({
        ...opts,
        method: "POST",
        body: bidDto
    }));
}
export function getArticles({ status }: {
    status?: "LISTED" | "AUCTION_RUNNING" | "SOLD" | "NOT_SOLD";
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ArticleDto[];
    }>(`/articles${QS.query(QS.explode({
        status
    }))}`, {
        ...opts
    });
}
export function getArticle(id: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ArticleDto;
    }>(`/articles/${encodeURIComponent(id)}`, {
        ...opts
    });
}
