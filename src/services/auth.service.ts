import {
  AuthResponse,
  LoginCredentials,
  User,
} from "@/interfaces/auth.interface";
import axiosInstance from "@/plugins/customer-plugins/axios";

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>("auth/login", {
      username: credentials.username,
      password: credentials.password,
    });
    return response.data;
  }

  async getAuthUser(): Promise<User> {
    const response = await axiosInstance.get<User>("auth/me");
    return response.data;
  }
}

export default new AuthService();
