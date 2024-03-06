import { httpClient } from ".";

export const getIdItem = (offsetNumber) => {
  return httpClient.post("", offsetNumber);
};
export const getItem = (idArr) => {
  return httpClient.post("", {
    action: "get_items",
    params: { ids: idArr },
  });
};
