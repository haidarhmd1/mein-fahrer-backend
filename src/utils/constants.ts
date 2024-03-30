export const apiPrefix = (VERSION: number) => {
  return { url_prefix: 'api/v' + VERSION };
};

// store in .env file later
export const jwtConstants = {
  secret: '4d9cba9970415aef2d212bffb1da9171862a513f7cb3f94e23b67812503992f8',
};
