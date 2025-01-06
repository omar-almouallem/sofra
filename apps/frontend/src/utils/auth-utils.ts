import {jwtDecode} from 'jwt-decode';



export function decodeToken(token: string) {
    try {
      const decoded = jwtDecode<{ id: string; role: string }>(token);
      console.log("Decoded token:", decoded);
      return { id: decoded.id, role: decoded.role };
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new Error("Invalid token");
    }
  }