/** @import { ResetPasswordDTO } from "../../dto" */
import { server } from "../env";
import { fetch } from "./fetch";

/**
 * 
 * @param {ResetPasswordDTO} updatePasswordDTO 
 */
export const updatePassword = async (updatePasswordDTO) => {
  const res = await fetch(`${server()}/users`, {
    method: "PUT",
    body: JSON.stringify(updatePasswordDTO)
  })

  return await res.json()
}