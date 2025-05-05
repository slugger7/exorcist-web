/** @import { Job, JobTypeEnum, JobData } from "../types/index" */
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