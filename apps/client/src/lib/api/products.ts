import axios from "axios";
import baseUrl from "../baseUrl";

export default async function getProductTypes() {
  const response = await axios.get(`${baseUrl}/`);
  return response.data;
}