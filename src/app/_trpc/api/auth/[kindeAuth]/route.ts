import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

// Handle GET requests with authentication
export const GET = handleAuth();
