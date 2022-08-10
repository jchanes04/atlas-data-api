import type { Filter, FindOptions, Sort, UpdateFilter, Document } from 'mongodb'
import Cluster from './Cluster'

export { Filter, FindOptions, Sort, UpdateFilter, Document }

export enum Region {
    Virginia = 'us-east-1',
    Oregon = 'us-west-2',
    Ireland = 'eu-west-1',
    Sydney = 'ap-southeast-2'
}

type IncludeProjection<T = Document> = {
    [K in keyof T]?: K extends Document ? IncludeProjection<K> : 1
}

type ExcludeProjection<T = Document> = {
    [K in keyof T]?: K extends Document ? ExcludeProjection<K> : 0
}

export type Projection<T = Document> = IncludeProjection<T> | ExcludeProjection<T>

interface APIBaseOptions {
    key: string,
    responseType?: 'json' | 'ejson'
}

interface APIOptionsWithoutURL extends APIBaseOptions {
    id: string,
    region?: Region,
    url?: never
}

interface APIOptionsWithURL extends APIBaseOptions {
    id?: never,
    region?: never,
    url: string
}

export type APIOptions = APIOptionsWithoutURL | APIOptionsWithURL

export default class MongoDataAPI {
    readonly region?: string
    readonly key: string
    readonly url: string
    readonly options: APIOptions

    constructor(options: APIOptions) {
        const { key, id, url, region, responseType = "json" } = options
        if (typeof key !== "string") throw new Error("API Key must be a string")

        this.key = key

        if (typeof id !== "string" && typeof id !== "undefined") throw new Error("ID must be a string")
        if (typeof url !== "string" && typeof url !== "undefined") throw new Error("URL must be a string")
        if (typeof region !== "string" && typeof region !== "undefined") throw new Error("Region must be one of the following: " + Object.values(Region).join(", "))
        if (typeof region === "string" && !Object.values(Region).includes(region)) throw new Error("Region must be one of the following: " + Object.values(Region).join(", "))

        if (typeof id !== "string" && typeof url !== "string") throw new Error("Either ID or URL is required")
        if (typeof id === "string" && typeof url === "string") throw new Error("ID cannot be used with URL")
        if (typeof region === "string" && typeof url === "string") throw new Error("Region cannot be used with URL")
        if (typeof region === "string" && typeof id !== "string") throw new Error("Region cannot be used without ID")

        if (url) {
            this.url = url
        } else if (region) {
            this.url = `https://${region}.aws.data.mongodb-api.com/app/${id}/endpoint/data/v1`
        } else {
            this.url = `https://data.mongodb-api.com/app/${id}/endpoint/data/v1`
        }

        this.options = { key, id, url, region, responseType } as APIOptions
    }

    cluster(clusterName: string): Cluster {
        return new Cluster(this, clusterName)
    }
}