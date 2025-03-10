import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const BASE_URL = publicRuntimeConfig?.NEXT_PUBLIC_BACKEND_URL;

console.log("Base URL at runtime:", BASE_URL);

export const USER_API_URL = `${BASE_URL}/user`;
export const HOUSE_API_URL = `${BASE_URL}/house`;
export const TENANT_API_URL = `${BASE_URL}/tenant`;
