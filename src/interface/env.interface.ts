export interface EnviromentVariables {
    PORT: number;
    JWT_SERECT: string;
    ACCESS_TOKEN_EXPIRATION_MINUTES: number
    REFRESH_TOKEN_EXPIRATION_DAYS: number
    VERIFY_EMAIL_TOKEN_EXPIRATION_DAYS: number
    AWS_SECRET_KEY: string
    AWS_ACCESS_KEY: string
    S3_BUCKET: string
}