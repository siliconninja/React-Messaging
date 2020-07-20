import React from "react"
import renderer from "react-test-renderer"
import Header from "../header"

// const $ = require("jquery")

describe("Header", () => {
    it("shows the right text", () => {
        const tree = renderer.create(<Header />).toJSON()
        expect(tree).toContain("Messages of")
    })
})
