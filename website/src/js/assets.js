export function resolveAsset(registry, path) {
  return path.split('.').reduce((node, key) => node && node[key], registry);
}
