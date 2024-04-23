import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const bearerToken = import.meta.env.VITE_BEARER_TOKEN;

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${bearerToken}`,
  },
});

export const fetchData = async (pageId) => {
  try {
    const { data } = await api.get(`users/6860791/posts?page=${pageId}`);
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error("Unable to fetch data");
  }
};
export const fetchPostData = async (id) => {
  // console.log(id);
  try {
    const { data } = await api.get(`posts/${id}`);
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error("Unable to fetch data");
  }
};

export const addNewPost = async ({ title, body }) => {
  try {
    const data = await api.post(`users/6860791/posts`, { title, body });
    return data;
  } catch (error) {
    if (error.response) {
      throw Error(error.response.statusText);
    } else {
      throw Error("An unexpected error occurred.");
    }
  }
};

export const updatePost = async ({ title, body, id }) => {
  try {
    const data = await api.patch(`posts/${id}`, { title, body });
    return data;
  } catch (error) {
    if (error.response) {
      throw Error(error.response.statusText);
    } else {
      throw Error("An unexpected error occurred.");
    }
  }
};
