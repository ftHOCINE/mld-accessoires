export const FALLBACK_IMAGE = 'mld.jfif';

export function onImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  if (img.src.endsWith(FALLBACK_IMAGE)) {
    return;
  }
  img.src = FALLBACK_IMAGE;
}
