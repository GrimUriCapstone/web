export const parseNumber = (num: string | undefined): number => {
  if (num === undefined) {
    return -1;
  }
  try {
    return Number.parseInt(num);
  } catch {
    return -1;
  }
};
