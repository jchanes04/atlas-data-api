import { test } from "uvu"
import * as assert from "uvu/assert"

import Cluster from "../Cluster"
import MongoDataAPI from "../MongoDataAPI"

test("Create cluster", () => {
    const api = new MongoDataAPI({ key: "key", id: "id" })
    assert.throws(
        // @ts-ignore
        () => api.cluster(3),
        /Cluster Name must be a string/
    )

    const cluster = api.cluster("name")
    assert.instance(cluster, Cluster)
})
