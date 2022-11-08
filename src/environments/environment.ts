import { Environment } from "./interface";
import { ApiKey } from "./apikey";
import { FbDbUrl } from "./apikey";

export const environment: Environment = {
    production: false,
    apiKey: ApiKey,
    fbDbUrl: FbDbUrl
};