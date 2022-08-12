import Database from "./Database.js"
import MongoDataAPI from "./MongoDataAPI.js"

export default class Cluster {
    readonly api: MongoDataAPI
    readonly clusterName: string

    constructor(api: MongoDataAPI, clusterName: string) {
        if (typeof clusterName !== "string") throw new Error("Cluster Name must be a string")

        this.api = api
        this.clusterName = clusterName
    }

    get options() {
        return this.api.options
    }

    database(dbName: string) {
        return new Database(this, dbName)
    }
}
