import { test } from "uvu"
import * as assert from "uvu/assert"

import Collection from "../Collection"
import MongoDataAPI from "../MongoDataAPI"

test("Create collection", () => {
    const api = new MongoDataAPI({ key: "key", id: "id" })
    const cluster = api.cluster("name")
    const database = cluster.database("name")
    assert.throws(
        // @ts-ignore
        () => database.collection(3),
        /Collection Name must be a string/
    )

    const collection = database.collection("name")
    assert.instance(collection, Collection)

    assert.is(collection.api, api)
    assert.is(collection.db, database)
})
