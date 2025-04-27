import { server } from "../env.js";

/**
 * @param {string} username
 * @param {string} password
 */
export const login = async (username, password) => {
  const res = await fetch(`${server()}/api/login`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (res.status != 201) {
    throw new Error(`could not log in ${username} with given password`);
  }

  if (res.status == 201) {
    const data = await res.json();

    localStorage.setItem("userId", data.userId);
    return data.userId;
  }
};

export const logout = async () => {
  const res = await fetch(`${server()}/api/logout`, { credentials: "include" });

  if (res.status != 200) {
    throw new Error("could not log out");
  }
};
