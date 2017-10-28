import axios from "axios";
import {
  KEY,
  SECRET,
  BASE_URL,
  GET_HANDWRITINGS,
  GET_RENDER
} from "../config/constants";

var axiosInstance = axios.create({
  baseURL: "https://api.handwriting.io",
  timeout: 1000,
  auth: {
    username: KEY,
    password: SECRET
  }
});

export async function getWritings() {
  return axiosInstance.get(GET_HANDWRITINGS);
}

export function getRender(
  handwritingId: String,
  text: String,
  handwritingSize: Number,
  handwritingColor: String
) {
  var request = {
    handwriting_id: handwritingId,
    text: text,
    handwriting_size: handwritingSize.toString() + "px",
    handwriting_color: handwritingColor,
    width: "1920px",
    height: "540px",
    min_padding: "100px"
  };
  console.log(request);
  return axiosInstance.get(GET_RENDER, {
    params: request,
    responseType: "arraybuffer"
  });
}
