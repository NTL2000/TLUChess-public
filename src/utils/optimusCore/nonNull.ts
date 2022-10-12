type ErrorMessage =
  'nonNull() accepts only an union type including either null or undefined, or null/undefined itself';

export type NullishValue<T> = Extract<T, null | undefined> extends never
  ? ErrorMessage
  : T;

/**
 * Gets non-nullish value. Throws error if value is nullish.
 * To pass value with template parameter type, you can use looseNonNull.
 * @param value value to check. type must contains `undefined` or `null` in its union.
 * @param message error message. Default is "value is null"
 */
export default function nonNull<T>(
  value: NullishValue<T>,
  message?: string,
): NonNullable<T> {
  if (value == null) {
    throw new Error(message ?? 'value is null');
  }
  return value as unknown as NonNullable<T>;
}

/**
 * Gets non-nullish value. Throws error if value is nullish.
 * Use `nonNull` generally, but use this if you want to pass value with template parameter type.
 * This function can pass non-nulish value, so you CAN NOT detect unnecessary call of this function.
 * @param value value to check.
 * @param message error message. Default is "value is null"
 */
export function looseNonNull<T>(
  value: T | undefined | null,
  message?: string,
): T {
  if (value == null) {
    throw new Error(message ?? 'value is null');
  }
  return value;
}
