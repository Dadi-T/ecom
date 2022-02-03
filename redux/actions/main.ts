import * as t from "../types";
export const setInfo = (name: string) => ({
  type: t.SET_NAME,
  payload: name,
});
