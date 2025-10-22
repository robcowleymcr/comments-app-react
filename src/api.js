import axios from "axios";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";

const API_BASE = "https://6m9l39r8c1.execute-api.eu-west-2.amazonaws.com/prod";

export const getComments = async (page) => {
  const res = await axios.get(`${API_BASE}/comments?page=${page}`);

  return res.data;
};

export const postComment = async (data) => {
  const attributes = await fetchUserAttributes();
  const userName = attributes.name
  const body = { body: JSON.stringify({ text: data.text, userName }) }
  const res = await axios.post(`${API_BASE}/comments`, body);

  return res.data;
};
