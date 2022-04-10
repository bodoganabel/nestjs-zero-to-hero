export const isArrayContainsAllTargetElements = (
  array: any[],
  target: any[],
) => {
  if (target.length === 0) {
    return false;
  }
  return target.every((value) => array.includes(value));
};
