import { server } from "../env.js";
import { fetch } from "./fetch.js";

export const getLibraries = async () => {
  const res = await fetch(`${server()}/libraries`);

  if (res.status != 200) {
    console.log("could not get routes");
  }

  return await res.json()
};
