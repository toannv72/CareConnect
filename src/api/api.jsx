import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const api = axios.create({
  baseURL: "http://homenursingcatone.xyz:5000/api/",
});

api.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken"); // Lấy token từ AsyncStorage
      if (accessToken) {
        const token = accessToken.replace(/"/g, "");
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      // Xử lý lỗi nếu có khi lấy token từ AsyncStorage
      console.error("Error getting access token:", error);
      return config; // Trả về config để yêu cầu vẫn được gửi đi, có thể xử lý ở interceptor khác
    }
  },
  (error) => Promise.reject(error)
);
export const getData = async (endpoint, params = {}, headers = {}) => {
  try {
    const response = await api.get(endpoint, { params, headers });
    return response; // Trả về toàn bộ phản hồi từ API
  } catch (error) {
    throw error;
  }
};

export const postData = async (endpoint, data, headers = {}) => {
  try {

    const response = await api.post(endpoint, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putData = async (endpoint, id, data, headers = {}) => {
  try {
    const response = await api.put( id ? `${endpoint}/${id}` : `${endpoint}`, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (endpoint, id, headers = {}) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchData = async (endpoint, id, data, headers = {}) => {
  try {
    const response = await api.patch(`${endpoint}/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
