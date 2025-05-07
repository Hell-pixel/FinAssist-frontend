export function getApiUrl(): string {
  return `${
    import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL
      : window.location.protocol + '//' + window.location.host.replace(/^[^\-]+\-/, '')
  }/api/v1`;
}
