import fetch from "node-fetch"
import Database from "./Database"
import { Document, Filter, Projection, Sort, UpdateFilter } from "./MongoDataAPI"

export enum Action {
    FindOne = "findOne",
    Find = "find",
    InsertOne = "insertOne",
    InsertMany = "insertMany",
    UpdateOne = "updateOne",
    UpdateMany = "updateMany",
    ReplaceOne = "replaceOne",
    DeleteOne = "deleteOne",
    DeleteMany = "deleteMany",
    Aggregate = "aggregate",
}

export type FindOneParams<T = Document> = {
    filter?: Filter<T>
    projection?: Projection<T>
}

export type FindParams<T = Document> = {
    filter?: Filter<T>
    projection?: Projection<T>
    sort?: Sort
    limit?: number
    skip?: number
}

export type InsertOneParams<T = Document> = {
    document: T
}

export type InsertOneResponse = {
    insertedId: string
}

export type InsertManyParams<T = Document> = {
    documents: T[]
}

export type InsertManyResponse = {
    insertedIds: string[]
}

type UpdateOneNoUpsertParams<T = Document> = {
    filter: Filter<T>
    update: UpdateFilter<T>
    upsert?: false
}

type UpdateOneUpsertParams<T = Document> = {
    filter: Filter<T>
    update: UpdateFilter<T>
    upsert: true
}

export type UpdateOneParams<T = Document> = UpdateOneNoUpsertParams<T> | UpdateOneUpsertParams<T>

type UpdateOneNoUpsertResponse = {
    matchedCount: number
    modifiedCount: number
}

type UpdateOneUpsertResponse = {
    matchedCount: number
    modifiedCount: number
    upsertedId: string
}

export type UpdateOneResponse = UpdateOneNoUpsertResponse | UpdateOneUpsertResponse

type UpdateManyNoUpsertParams<T = Document> = {
    filter: Filter<T>
    update: UpdateFilter<T>
    upsert?: false
}

type UpdateManyUpsertParams<T = Document> = {
    filter: Filter<T>
    update: UpdateFilter<T>
    upsert: true
}

export type UpdateManyParams<T = Document> = UpdateManyNoUpsertParams<T> | UpdateManyUpsertParams<T>

type UpdateManyNoUpsertResponse = {
    matchedCount: number
    modifiedCount: number
}

type UpdateManyUpsertResponse = {
    matchedCount: number
    modifiedCount: number
    upsertedId: string
}

export type UpdateManyResponse = UpdateManyNoUpsertResponse | UpdateManyUpsertResponse

type ReplaceOneNoUpsertParams<T = Document, U = Document> = {
    filter: Filter<T>
    replacement: U
    upsert?: false
}

type ReplaceOneUpsertParams<T = Document, U = Document> = {
    filter: Filter<T>
    replacement: U
    upsert: true
}

export type ReplaceOneParams<T = Document, U = Document> = ReplaceOneNoUpsertParams<T, U> | ReplaceOneUpsertParams<T, U>

type ReplaceOneNoUpsertResponse = {
    matchedCount: number
    modifiedCount: number
}

type ReplaceOneUpsertResponse = {
    matchedCount: number
    modifiedCount: number
    upsertedId: string
}

export type ReplaceOneResponse = ReplaceOneNoUpsertResponse | ReplaceOneUpsertResponse

export type DeleteOneParams<T = Document> = {
    filter: Filter<T>
}

export type DeleteOneResponse = {
    deletedCount: number
}

export type DeleteManyParams<T = Document> = {
    filter: Filter<T>
}

export type DeleteManyResponse = {
    deletedCount: number
}

// TODO: create aggregation types
export type AggregateParams = {
    pipeline: Document[]
}

export type AggregateResponse = {
    documents: Document[]
}

export default class Collection<D = Document> {
    readonly db: Database
    readonly collectionName: string

    constructor(db: Database, collectionName: string) {
        if (typeof collectionName !== "string") throw new Error("Collection Name must be a string")

        this.db = db
        this.collectionName = collectionName
    }

    get api() {
        return this.db.api
    }

    get options() {
        return this.db.options
    }

    // TODO: fetch options
    public async $action<T = unknown>(name: Action, params: Record<string, any>): Promise<T> {
        const res = await fetch(`${this.db.cluster.api.url}/action/${name}`, {
            headers: {
                "Content-Type": "application/" + this.options.responseType,
                "api-key": this.api.key,
            },
            body: JSON.stringify(params),
        })
        return res.json() as Promise<T>
    }

    public async findOne<T = D>(params: FindOneParams<T>): Promise<T> {
        return this.$action(Action.FindOne, params)
    }

    public async find<T = D>(params: FindParams): Promise<T[]> {
        return this.$action(Action.Find, params)
    }

    public async insertOne<T = D>(params: InsertOneParams<T>): Promise<InsertOneResponse> {
        return this.$action(Action.InsertOne, params)
    }

    public async insertMany<T = D>(params: InsertManyParams<T>): Promise<InsertManyResponse> {
        return this.$action(Action.InsertMany, params)
    }

    public async updateOne<T = D>(params: UpdateOneNoUpsertParams): Promise<UpdateOneNoUpsertResponse>
    public async updateOne<T = D>(params: UpdateOneUpsertParams): Promise<UpdateOneUpsertResponse>
    public async updateOne(params: any): Promise<any> {
        return this.$action(Action.UpdateOne, params)
    }

    public async updateMany<T = D>(params: UpdateManyNoUpsertParams): Promise<UpdateManyNoUpsertResponse>
    public async updateMany<T = D>(params: UpdateManyUpsertParams): Promise<UpdateManyUpsertResponse>
    public async updateMany(params: any): Promise<any> {
        return this.$action(Action.UpdateMany, params)
    }

    public async replaceOne<T = D>(params: ReplaceOneNoUpsertParams): Promise<ReplaceOneNoUpsertResponse>
    public async replaceOne<T = D>(params: ReplaceOneUpsertParams): Promise<ReplaceOneUpsertResponse>
    public async replaceOne(params: any): Promise<any> {
        return this.$action(Action.ReplaceOne, params)
    }

    public async deleteOne<T = D>(params: DeleteOneParams<T>): Promise<DeleteOneResponse> {
        return this.$action(Action.DeleteOne, params)
    }

    public async deleteMany<T = D>(params: DeleteManyParams<T>): Promise<DeleteManyResponse> {
        return this.$action(Action.DeleteMany, params)
    }

    public async aggregate(params: AggregateParams): Promise<AggregateResponse> {
        return this.$action(Action.Aggregate, params)
    }
}
