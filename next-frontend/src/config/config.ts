export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
console.log("base url ==>", BASE_URL)
export const USER_API_URL = `${BASE_URL}/user`;
export const HOUSE_API_URL = `${BASE_URL}/house`;
export const TENANT_API_URL = `${BASE_URL}/tenant`;