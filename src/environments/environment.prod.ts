import { Environment } from "./interface";
import { ApiKey } from "./apikey";
import { FbDbUrl } from "./apikey";

export const environment: Environment = {
    production: true,
    apiKey: ApiKey,
    fbDbUrl: FbDbUrl
};