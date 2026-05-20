export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')        // remplace les espaces par des tirets
    .replace(/[^\w\-]+/g, '')      // enlève les caractères spéciaux
    .replace(/\-\-+/g, '-');       // évite les doubles tirets
}