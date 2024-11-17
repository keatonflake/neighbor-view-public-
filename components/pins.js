import { getPins } from "@/app/actions";

export const Pins = {};

export const CategoryData = {};


export async function loadPinsDataset() {
  const pins = getPins();
  for (let i = 0; i < pins.length; i++) {
    Pins[i] = { key: `pin-${i}`, ...pins[i] };
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(pins), 500);
  });
}

export function getCategories(pins) {
  if (!pins) return [];

  const countByCategory = {};
  for (const p of pins) {
    if (!countByCategory[p.category]) countByCategory[p.category] = 0;
    countByCategory[p.category]++;
  }

  return Object.entries(countByCategory).map(([key, value]) => {
    const label = key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      key: key,
      label,
      count: value,
    };
  });
}
