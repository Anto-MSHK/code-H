import axios from "axios";

const instance = axios.create({
  //   headers: { "API-KEY": "c6caeb8a-704b-4474-b747-3243cd9e421f" },
  baseURL: ``,
  //   withCredentials: true,
});

export const tasksApi = {
  getTasks: async () => {
    return await axios
      .get(`http://192.168.235.107:5000/task`, {})
      .then((response) => {
        return response.data.result;
      })
      .catch((err) => console.log(err));
  },
};
