import axios from "axios";
import { format } from "date-fns";
import md5 from "md5";

const timeStamp = format(new Date(), "yyyyMMdd");
const md5Hash = md5(`Valantis_${timeStamp}`);

export const httpClient = axios.create({
  baseURL: "http://api.valantis.store:40000/",
  timeout: 600000,
  headers: { "Access-Control-Allow-Origin": "*", "X-Auth": md5Hash },
});