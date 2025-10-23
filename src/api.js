import axios from "axios";
import { fetchUserAttributes, fetchAuthSession } from "aws-amplify/auth";

const API_BASE = "https://6m9l39r8c1.execute-api.eu-west-2.amazonaws.com/prod";

export const getComments = async (page) => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  const res = await axios.get(`${API_BASE}/comments?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return res.data;
};

export const postComment = async (data) => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  const attributes = await fetchUserAttributes();
  const userName = attributes.name
  const body = { body: JSON.stringify({ text: data.text, userName }) }
  const res = await axios.post(`${API_BASE}/comments`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return res.data;
};
