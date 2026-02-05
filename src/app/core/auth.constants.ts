export const AUTH_STORAGE_KEYS = {
  TOKEN: 'auth_token',
  ADMIN: 'is_admin'
} as const;

export const AUTH_STORAGE_VALUES = {
  AUTHENTICATED: 'authenticated',
  NOT_AUTHENTICATED: 'not-authenticated'
} as const;
