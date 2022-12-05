declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test"
    readonly NEXT_PUBLIC_PROJECT_REGION: string
    readonly NEXT_PUBLIC_USER_POOLS_ID: string
    readonly NEXT_PUBLIC_USER_WEB_CLIENT_ID: string
    readonly NEXT_PUBLIC_IDENTITY_POOL_ID: string
  }
}
