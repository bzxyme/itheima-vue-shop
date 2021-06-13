import { request } from "./request.js";

export function formLogin(username, password) {
  return request({
    method: "post",
    url: "/login",
    data: {
      username,
      password,
    },
  });
}
