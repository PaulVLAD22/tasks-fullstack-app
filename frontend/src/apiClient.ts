import axios from 'axios';
import { configuration } from './config';

const apiClient = axios.create({
  baseURL: configuration.gateway_url, // URL of the API Gateway
});

export default apiClient;
