import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const accessToken = await AsyncStorage.getItem("accessToken");

  const headers = {
    ...options.headers,
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  };

  return fetch(url, { ...options, headers });
};
