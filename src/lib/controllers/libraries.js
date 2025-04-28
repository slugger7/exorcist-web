import { server } from "../env.js";
import { fetch } from "./fetch.js";

export const getLibraries = async () => {
  const res = await fetch(`${server()}/api/libraries`);

  if (res.status != 200) {
    console.log("could not get routes");
  }
};
