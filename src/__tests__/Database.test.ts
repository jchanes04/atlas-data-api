import { test } from "uvu"
import * as assert from "uvu/assert"

import Database from "../Database"
import MongoDataAPI from "../MongoDataAPI"

test("Create database", () => {
    const api = new MongoDataAPI({ key: "key", id: "id" })
    const cluster = api.cluster("name")
    assert.throws(
        // @ts-ignore
        () => cluster.database(3),
        /DB Name must be a string/
    )

    const database = cluster.database("name")
    assert.instance(database, Database)

    assert.is(database.api, api)
})
