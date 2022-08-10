import Collection from "./Collection"
import Cluster from "./Cluster"

export default class Database {
    readonly cluster: Cluster
    readonly dbName: string

    constructor(cluster: Cluster, dbName: string) {
        if (typeof dbName !== "string") throw new Error("DB Name must be a string")

        this.cluster = cluster
        this.dbName = dbName
    }

    get api() {
        return this.cluster.api
    }

    get options() {
        return this.cluster.options
    }

    collection(collectionName: string) {
        return new Collection(this, collectionName)
    }
}