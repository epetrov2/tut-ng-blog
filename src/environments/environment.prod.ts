import { Environment } from "./interface";
import { ApiKey } from "./apikey";

export const environment: Environment = {
    production: true,
    apiKey: ApiKey,
    fbDbUrl: 'https://ng-blog-dd28a-default-rtdb.europe-west1.firebasedatabase.app/'
};