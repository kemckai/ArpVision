export type UrlState = {
  root?: string;
  type?: string;
  scale?: string;
  mode?: string;
  pent?: string;
  caged?: string;
  cagedQuality?: string;
  cagedMode?: string;
  diad?: string;
  lick?: string;
  inversion?: string;
  tab?: string;
};

export function parseUrlState(search: string): UrlState {
  const params = new URLSearchParams(search);
  const state: UrlState = {};
  for (const key of ["root", "type", "scale", "mode", "pent", "caged", "cagedQuality", "cagedMode", "diad", "lick", "inversion", "tab"] as const) {
    const v = params.get(key);
    if (v) state[key] = v;
  }
  return state;
}

export function buildUrlState(state: UrlState): string {
  const params = new URLSearchParams();
  Object.entries(state).forEach(([k, v]) => {
    if (v) params.set(k, v);
  });
  const s = params.toString();
  return s ? `?${s}` : "";
}

export function syncUrl(state: UrlState): void {
  const next = buildUrlState(state);
  const current = window.location.search;
  if (next !== current) {
    window.history.replaceState(null, "", next || window.location.pathname);
  }
}

export function copyShareUrl(state: UrlState): string {
  return `${window.location.origin}${window.location.pathname}${buildUrlState(state)}`;
}
