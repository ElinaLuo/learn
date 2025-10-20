export function createDep(cleanup, key) {
  const dep = new Map()
  dep.cleanup = cleanup
  dep.name = key
  return dep
}