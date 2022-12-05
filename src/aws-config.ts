const AWSConfiguration = {
  Auth: {
    region: process.env.NEXT_PUBLIC_PROJECT_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOLS_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_WEB_CLIENT_ID,
    identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
  },
}

export default AWSConfiguration
