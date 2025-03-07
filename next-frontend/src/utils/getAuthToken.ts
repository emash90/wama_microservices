import { getCookie } from 'cookies-next';


const getAuthToken = (): string | null => {
    const token = getCookie('authToken');
    return typeof token === 'string' ? token : null;
  };


  export default getAuthToken;

