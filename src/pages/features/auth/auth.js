import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://internship-recruitment-platform.onrender.com";

export const refreshToken = async () => {
  const refresh = Cookies.get("refresh_token");
  console.log("Refreshing token with refresh_token:", refresh);
  if (!refresh) return null;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh/`,
      { refresh },
      { withCredentials: true }
    );
    console.log("Token refresh response:", response.data);
    Cookies.set("access_token", response.data.access, {
      secure: false,
      sameSite: "Lax",
      path: "/",
      // Remove domain or use:
      domain: window.location.hostname
    });
    
    Cookies.set("refresh_token", response.data.refresh, {
      secure: false,
      sameSite: "Lax",
      path: "/",
      // Remove domain or use:
      domain: window.location.hostname
    });
    return response.data.access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    return null;
  }
};

export const apiRequest = async (method, url, data = null, requiresAuth = true) => {
  const token = Cookies.get("access_token");
  console.log('All cookies:', Cookies.get());
  console.log('Retrieved access_token:', token);
  const fullUrl = url.startsWith("/") ? `${API_BASE_URL}${url}` : url;
  console.log(`API request: ${method} ${fullUrl}, requiresAuth: ${requiresAuth}, token: ${token}`);

  if (requiresAuth && !token) {
    console.log("No token available for protected endpoint");
    throw new Error("No token available");
  }

  try {
    const config = {
      method,
      url: fullUrl,
      data,
      withCredentials: true,  // Keep this
      headers: {
        // Add common headers
        'Content-Type': 'application/json',
        // Add authorization if token exists
        ...(token && !isPublic && { Authorization: `Bearer ${token}` })
      }
    };
    if (token && !isPublic) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    const response = await axios(config);
    console.log(`API response from ${fullUrl}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`API error for ${fullUrl}:`, error.response?.data || error.message);
    if (error.response?.status === 401 && requiresAuth && !isPublic) {
      const newToken = await refreshToken();
      if (newToken) {
        console.log("Retrying with new token:", newToken);
        return await axios({
          method,
          url: fullUrl,
          data,
          headers: { Authorization: `Bearer ${newToken}` },
          withCredentials: true,
        }).then((res) => res.data);
      }
      throw new Error("Authentication failed after token refresh");
    }
    throw error;
  }
};

export const logout = async () => {
  console.log("Logging out...");
  try {
    await apiRequest("post", "/auth/logout/", {}, false);
  } catch (error) {
    console.error("Logout failed:", error);
  }
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  window.location.href = "/login";
};

export const checkAuth = async () => {
  console.log("Checking auth status...");
  try {
    const response = await apiRequest("get", "/auth/user/");
    console.log("checkAuth response:", response);
    return { isAuthenticated: true, role: response.role, user: response };
  } catch (error) {
    console.error("checkAuth failed:", error);
    return { isAuthenticated: false, role: null, user: null };
  }
};