// user related enums
export enum RoleEnum {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  STAFF = 'staff',
  GUEST = 'guest',
}

export enum UserStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
}

export enum AuthProviderEnum {
  EMAIL = 'email',
  GOOGLE = 'google',
}
