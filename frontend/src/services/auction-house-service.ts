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
    bid: number;
    date?: string;
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
    bids?: BidDto[];
    sellerId?: number;
};
export type ArticleForCreationDto = {
    name?: string;
    description?: string;
    reservePrice?: number;
    auctionStartDate?: string;
    customerId: number;
};
export type BidForCreationDto = {
    customerId: number;
    bid: number;
};
export function stopAuction(id: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 204;
        data: object;
    }>(`/articles/${encodeURIComponent(id)}/stop`, {
        ...opts,
        method: "PUT"
    });
}
export function startAuction(id: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 204;
        data: object;
    }>(`/articles/${encodeURIComponent(id)}/start`, {
        ...opts,
        method: "PUT"
    });
}
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
export function createArticle(articleForCreationDto: ArticleForCreationDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 201;
        data: ArticleDto;
    }>("/articles", oazapfts.json({
        ...opts,
        method: "POST",
        body: articleForCreationDto
    }));
}
export function makeBid(id: number, bidForCreationDto: BidForCreationDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 204;
        data: object;
    }>(`/articles/${encodeURIComponent(id)}/bid`, oazapfts.json({
        ...opts,
        method: "POST",
        body: bidForCreationDto
    }));
}
export function getArticle(id: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ArticleDto;
    }>(`/articles/${encodeURIComponent(id)}`, {
        ...opts
    });
}
export function deleteArticle(id: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 204;
        data: object;
    }>(`/articles/${encodeURIComponent(id)}`, {
        ...opts,
        method: "DELETE"
    });
}
