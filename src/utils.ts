export const hasMatchingBrackets = (str: string): boolean => {
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '[') {
      depth++;
      if (depth > 1) return false;
    } else if (str[i] === ']') {
      depth--;
      if (depth < 0) return false;
    }
  }
  return depth === 0;
};

export const displayDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
