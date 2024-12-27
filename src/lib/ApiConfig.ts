import { dev } from '$app/environment';

const API_ADDRESS_DEV = 'http://localhost:8080'
const API_ADDRESS_PROD = 'http://trans-back.kr-1-ts.esukmean.com'

const API_ADDRESS = dev ? API_ADDRESS_DEV : API_ADDRESS_PROD
export { API_ADDRESS }