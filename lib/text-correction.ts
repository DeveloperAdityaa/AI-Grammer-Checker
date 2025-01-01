export function generateSuggestions(text: string): string[] {
  return [
    text.charAt(0).toUpperCase() + text.slice(1),
    text.replace(/\s+/g, " ").trim(),
    text.replace(/[.,!?]$/, "") + ".",
  ];
}