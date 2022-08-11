import { test } from "uvu"
import * as assert from "uvu/assert"

import MongoDataAPI, { Region } from "../MongoDataAPI"

test("API Key", () => {
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: 3 }),
        /API Key must be a string/
    )
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: {} }),
        /API Key must be a string/
    )
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: null }),
        /API Key must be a string/
    )
    assert.not.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key" }),
        /API Key must be a string/
    )
})

test("ID", () => {
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", id: 3 }),
        /ID must be a string/
    )
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", id: {} }),
        /ID must be a string/
    )
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", id: null }),
        /ID must be a string/
    )
    assert.not.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", id: "id" }),
        /ID must be a string/
    )
})

test("Invalid URL", () => {
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", url: 3 }),
        /URL must be a string/
    )
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", url: {} }),
        /URL must be a string/
    )
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", url: null }),
        /URL must be a string/
    )
    assert.not.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", url: "url" }),
        /URL must be a string/
    )
})

test("Region", () => {
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", region: 3 }),
        /Region must be one of the following: /
    )
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", region: {} }),
        /Region must be one of the following: /
    )
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", region: null }),
        /Region must be one of the following: /
    )
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", region: "string" }),
        /Region must be one of the following: /
    )
    assert.not.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", region: Region.Ireland }),
        /Region must be one of the following: /
    )
})

test("ID or URL", () => {
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", region: Region.Ireland }),
        /Either ID or URL is required/
    )
    assert.not.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", id: "id" }),
        /Either ID or URL is required/
    )
    assert.not.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", url: "url" }),
        /Either ID or URL is required/
    )
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", url: "url", id: "id" }),
        /ID cannot be used with URL/
    )
})

test("Region compatibility", () => {
    assert.throws(
        // @ts-ignore
        () => new MongoDataAPI({ key: "key", region: Region.Ireland, url: "url" }),
        /Region cannot be used with URL/
    )
    assert.not.throws(() => new MongoDataAPI({ key: "key", region: "eu-west-1", id: "id" }))
})

test.run()
