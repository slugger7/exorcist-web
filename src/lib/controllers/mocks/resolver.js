import mocks from "./responses";

/**
 * @param {string} resource 
 * @returns {?Response}
 */
export const resolveResource = (resource) => {
  const res = mocks[resource];
  if (res) {
    return {
      status: res.status,
      json: async () => res.response,
      headers: new Headers(),
      ok: true,
      redirected: false,
      statusText: "Ok",
      type: "basic",
      url: resource,
      clone: () => new Response(),
      body: null,
      bodyUsed: true,
      text: async () => "",
      arrayBuffer: null,
      blob: null,
      bytes: null,
      formData: null,
    };
  }
};
