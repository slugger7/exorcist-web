/** @import { Job, JobTypeEnum, JobData, Page } from "../types/index" */
import { server } from "../env";
import { fetch } from "./fetch";

/**
 * @param {JobTypeEnum} type 
 * @param {JobData} data 
 * @returns {Promise<Job>}
 */
export const create = async (type, data) => {
  const res = await fetch(`${server()}/jobs`, {
    method: "POST",
    body: JSON.stringify({
      type,
      data
    })
  })

  return await res.json()
}


/**
 * 
 * @param {string} parent 
 * @param {string[]} statuses 
 * @returns {Promise<Page<Job>>}
 */
export const getAll = async (parent, statuses) => {
  let query = []
  if (parent) {
    query.push(`parent=${parent}`)
  }

  if (statuses && statuses.length) {
    query = query.concat(statuses.map(status => `status=${status}`))
  }

  const res = await fetch(`${server()}/jobs?${query.join('&')}`)

  return await res.json()
}