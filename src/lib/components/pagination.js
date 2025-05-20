/** 
 * @import { Page } from "./page"
 * @param {number} total
 * @param {number} limit
 * @param {number} page
 * @returns {Page[]}
 */
export const generatePages = (total, limit, page) => {
    const pages = Math.ceil(total / limit)
    const ret = []

    ret.push(pageStub(1))

    if (page <= 3 && pages >= 2) {
        ret.push(pageStub(2))
    }

    if (page <= 3 && pages >= 3) {
        ret.push(pageStub(3))
    }

    if (page <= 2 && pages > 3) {
        ret.push(pageStub(4))
    }

    if (page > 3 && pages > 5) {
        ret.push(separatorStub())

        if (pages - page >= 3) {
            ret.push(pageStub(page - 1))
        }
    }

    if (pages > 5 && page > 3 && pages - page >= 3) {
        ret.push(pageStub(page))
    }

    if (pages - page >= 3 && pages > 5) {
        if (page > 3) {
            ret.push(pageStub(page + 1))
        }
        ret.push(separatorStub())
    }

    if (pages - page < 3 && pages > 5) {
        ret.push(pageStub(pages - 3))
        ret.push(pageStub(pages - 2))
        ret.push(pageStub(pages - 1))
    }

    if (pages > 4) {
        ret.push(pageStub(pages))
    }

    return ret
}

/**
 * @param {number} num
 * @returns {Page}
 */
export const pageStub = (num) => ({type: "page", number: num})

/** @returns {Page} */
export const separatorStub = () => ({type: "separator"})