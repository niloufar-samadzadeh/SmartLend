import axios from "../api/axios";
import type {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  AuthResponse,
} from "../types/auth";

export async function login(
  request: LoginRequest
): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(
    "/Auth/login",
    request
  );

  return response.data;
}

export async function register(
  request: RegisterRequest
): Promise<RegisterResponse> {
  const response = await axios.post<RegisterResponse>(
    "/Auth/register",
    request
  );

  return response.data;
}