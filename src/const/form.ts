export const FormMode = {
  CREATE: 'create',
  UPDATE: 'update',
} as const;

export type FormModeType = (typeof FormMode)[keyof typeof FormMode];
