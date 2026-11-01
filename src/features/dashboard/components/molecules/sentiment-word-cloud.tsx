"use client";

import { useMemo } from "react";

export type SentimentCloudTone = "negative" | "neutral" | "positive";

export type SentimentCloudWord = {
  word: string;
  count: number;
};

type PlacedWord = SentimentCloudWord & {
  x: number;
  y: number;
  size: number;
};

const WORD_COLORS = {
  negative: ["#b94b3f", "#cc6253", "#d97863", "#ad6556", "#e49779"],
  neutral: ["#a6652e", "#bc793b", "#ce9252", "#8e7763", "#dda96e"],
  positive: ["#34784c", "#46875a", "#5d9869", "#ac6b35", "#7ca77e"],
} as const;

function intersects(a: { x: number; y: number; width: number; height: number }, b: typeof a) {
  return (
    a.x - a.width / 2 < b.x + b.width / 2 &&
    a.x + a.width / 2 > b.x - b.width / 2 &&
    a.y - a.height / 2 < b.y + b.height / 2 &&
    a.y + a.height / 2 > b.y - b.height / 2
  );
}

function arrangeWords(words: SentimentCloudWord[], width: number, height: number): PlacedWord[] {
  if (!words.length) return [];

  const values = words.map(({ count }) => count);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const fontSize = (count: number) => min === max ? 35 : 14 + ((count - min) / (max - min)) * 42;
  const bounds: Array<{ x: number; y: number; width: number; height: number }> = [];
  const placed: PlacedWord[] = [];

  [...words].sort((a, b) => b.count - a.count).forEach((word, index) => {
    const size = fontSize(word.count);
    const measuredWidth = [...word.word].reduce((sum, character) => {
      const glyphWidth = "ilíì!.,'".includes(character) ? 0.3 : "mwMW".includes(character) ? 0.86 : 0.58;
      return sum + glyphWidth * size;
    }, 0);
    const box = { width: measuredWidth + 9, height: size * 1.12 + 5 };
    const startAngle = index * 1.7;
    const maxRadius = Math.max(width, height) * 0.55;
    let position: { x: number; y: number } | null = null;

    for (let step = 0; step < 1800; step += 1) {
      const angle = startAngle + step * 0.19;
      const radius = 1.55 * angle;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.72;
      if (Math.abs(x) + box.width / 2 > width / 2 || Math.abs(y) + box.height / 2 > height / 2) {
        if (radius > maxRadius) break;
        continue;
      }

      const candidate = { x, y, ...box };
      if (!bounds.some((bound) => intersects(candidate, bound))) {
        position = { x, y };
        bounds.push(candidate);
        break;
      }
    }

    if (position) placed.push({ ...word, ...position, size });
  });

  return placed;
}

export function SentimentWordCloud({
  words,
  selectedWord,
  sentiment,
  width,
  height,
  onWordClick,
}: {
  words: SentimentCloudWord[];
  selectedWord: string | null;
  sentiment: SentimentCloudTone;
  width: number;
  height: number;
  onWordClick: (word: string) => void;
}) {
  const placedWords = useMemo(() => arrangeWords(words, width, height), [height, width, words]);
  const colors = WORD_COLORS[sentiment];

  return (
    <svg
      className="sentiment-word-cloud-svg"
      viewBox={`0 0 ${width} ${height}`}
      role="group"
      aria-label="Nuvem de palavras por frequência"
    >
      <g transform={`translate(${width / 2},${height / 2})`}>
        {placedWords.map((placed, index) => {
          const selected = selectedWord === placed.word;
          const color = selected ? colors[0] : colors[index % colors.length];
          return (
            <text
              key={placed.word}
              className="sentiment-cloud-word"
              textAnchor="middle"
              dominantBaseline="central"
              transform={`translate(${placed.x},${placed.y})`}
              style={{ fontSize: placed.size, fill: color, opacity: selectedWord && !selected ? 0.32 : 1 }}
              role="button"
              tabIndex={0}
              aria-label={`${placed.word}, ${placed.count} ${placed.count === 1 ? "menção" : "menções"}`}
              aria-pressed={selected}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onWordClick(placed.word)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onWordClick(placed.word);
                }
              }}
            >
              {placed.word}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
