/** @import { Page } from "./page" */
import { describe, expect, it } from 'vitest'
import { generatePages, pageStub, separatorStub } from './pagination'

describe("pagination", () => {
    describe("generatePages", () => {
        const limit = 1

        describe("on first 2 pages", () => {
            const pages = [1,2]
            pages.forEach(page => describe(`on page ${page}`, () => {
                describe("with one page", () => {
                    const total = 1
                    it("should return one page", () => {
                        /** @type {Page[]} */
                        const expected = [pageStub(1)]
                        const actual = generatePages(total, limit, page)

                        expect(expected).toEqual(actual)
                    })
                })

                describe("with two pages", () => {
                    const total = 2
                    it("should return two pages", () => {
                        /** @type {Page[]} */
                        const expected = [pageStub(1), pageStub(2)]
                        const actual = generatePages(total, limit, page)

                        expect(expected).toEqual(actual)
                    })
                })

                describe("with three pages", () => {
                    const total = 3
                    it("should return three pages", () => {
                        /** @type {Page[]} */
                        const expected = [pageStub(1), pageStub(2), pageStub(3)]
                        const actual = generatePages(total, limit, page)

                        expect(expected).toEqual(actual)
                    })
                })

                describe("with four pages", () => {
                    const total = 4
                    it("should return 4 pages", () => {
                        /** @type {Page[]} */
                        const expected = [
                            pageStub(1), 
                            pageStub(2), 
                            pageStub(3),
                            pageStub(4)
                        ]
                        const actual = generatePages(total, limit, page)

                        expect(expected).toEqual(actual)
                    })
                })

                describe("with five pages", () => {
                    const total = 5
                    it("should return pages 1,2,3...5", () => {
                        /** @type {Page[]} */
                        const expected = [
                            pageStub(1), 
                            pageStub(2), 
                            pageStub(3),
                            separatorStub(),
                            pageStub(5)
                        ]
                        const actual = generatePages(total, limit, page)

                        expect(expected).toEqual(actual)
                    })
                })
            }))
        }) 

        describe("on page 3", () => {
            const page = 3
            describe("with 3 pages", () => {
                const total = 3
                it("should return 3 pages", () => {
                    const expected = [pageStub(1), pageStub(2), pageStub(3)]
                    
                    const actual = generatePages(total, limit, page)

                    expect(expected).toEqual(actual)
                })
            })

            describe("with 4 pages", () => {
                const total = 4
                it("should return 4 pages", () => {
                    const expected = [pageStub(1), pageStub(2), pageStub(3), pageStub(4)]
                    
                    const actual = generatePages(total, limit, page)

                    expect(expected).toEqual(actual)
                })
            })

            describe("with 5 pages", () => {
                const total = 5
                it("should return 5 pages", () => {
                    const expected = [pageStub(1), pageStub(2), pageStub(3), pageStub(4), pageStub(5)]
                    
                    const actual = generatePages(total, limit, page)

                    expect(expected).toEqual(actual)
                })
            })

            describe("with 6 pages", () => {
                const total = 6
                it("should return 1,2,3,4,...,6", () => {
                    const expected = [pageStub(1), pageStub(2), pageStub(3), pageStub(4), separatorStub(), pageStub(6)]
                    
                    const actual = generatePages(total, limit, page)

                    expect(expected).toEqual(actual)
                })
            })
        })
    })
})