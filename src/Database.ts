import Collection from "./Collection.js"
import Cluster from "./Cluster.js"

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

    collection<D = Document>(collectionName: string) {
        return new Collection<D>(this, collectionName)
    }
}
