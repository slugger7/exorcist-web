/** @import {Job, JobTypeEnum, ScanPathData} from "../types/index" */
import { server } from "../env";
import { fetch } from "./fetch";

/**
 * @param {JobTypeEnum.scanPath} type 
 * @param {ScanPathData} data 
 * @returns {Promise<Job>}
 */
export const create = async (type, data) => {
  const stringData = JSON.stringify(data)
  const res = await fetch(`${server()}/jobs`, {
    method: "POST",
    body: JSON.stringify({
      type,
      data: stringData
    })
  })

  return await res.json()
}