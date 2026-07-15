import axios from "../api/axios";
import type { LoginRequest, AuthResponse } from "../types/auth";

export async function login(
  request: LoginRequest
): Promise<AuthResponse> {

  const response = await axios.post<AuthResponse>(
    "/Auth/login",
    request
  );

  return response.data;
}