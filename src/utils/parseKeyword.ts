const blacklistedCharacters = /[^a-z\s]+/gi;
export const parseKeyword = (hash: string): string => {
  return decodeURIComponent(hash).replace(blacklistedCharacters, ' ').trim();
};
