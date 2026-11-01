import type { SentimentLabel } from "@server/application/read-models";

export type { SentimentLabel };

export type SentimentReview = {
  comment: string;
  sentiment: SentimentLabel;
};

const stopWords = new Set([
  "a", "o", "e", "de", "do", "da", "dos", "das", "em", "no", "na", "nos", "nas",
  "um", "uma", "uns", "umas", "com", "por", "para", "que", "se", "nao", "mais",
  "muito", "mas", "foi", "ser", "esta", "sao", "como", "eu", "ele", "ela", "nos",
  "eles", "elas", "voce", "tem", "ter", "seu", "sua", "seus", "suas", "meu", "minha",
  "ja", "so", "bem", "tambem", "quando", "isso", "esse", "essa", "este", "ao", "pela",
  "pelo", "era", "vai", "ver", "ate", "aqui", "ali", "sem", "nem", "ainda", "pra",
  "pro", "todo", "toda", "dia", "vez", "quase",
]);

export function tokenizeReview(value: string) {
  return value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));
}

export function getSentimentKeywords(reviews: SentimentReview[], sentiment: SentimentLabel) {
  const frequencies = new Map<string, number>();
  for (const review of reviews) {
    if (review.sentiment !== sentiment) continue;
    for (const word of tokenizeReview(review.comment)) {
      frequencies.set(word, (frequencies.get(word) ?? 0) + 1);
    }
  }

  return [...frequencies.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "pt-BR"))
    .slice(0, 80)
    .map(([word, count]) => ({ word, count }));
}

export function getReviewsForSentimentKeyword<T extends SentimentReview>(
  reviews: T[],
  sentiment: SentimentLabel,
  word: string,
): T[] {
  return reviews.filter(
    (review) => review.sentiment === sentiment && tokenizeReview(review.comment).includes(word),
  );
}
