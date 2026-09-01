export const addDiscovery = (discoveries: readonly string[], id: string) => discoveries.includes(id) ? [...discoveries] : [...discoveries, id]
export const hasDiscovery = (discoveries: readonly string[], id: string) => discoveries.includes(id)
export const discoveryCount = (discoveries: readonly string[]) => new Set(discoveries).size