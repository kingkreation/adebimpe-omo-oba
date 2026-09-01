import { expect, it } from 'vitest'
import { addDiscovery, discoveryCount, hasDiscovery } from './discoveries'
it('adds a new discovery once', () => expect(addDiscovery([], 'crown-keeper')).toEqual(['crown-keeper']))
it('does not duplicate discoveries', () => expect(addDiscovery(['crown-keeper'], 'crown-keeper')).toEqual(['crown-keeper']))
it('reports persisted discovery state correctly', () => { const saved = addDiscovery(['de-king-signature'], 'crown-keeper'); expect(hasDiscovery(saved, 'de-king-signature')).toBe(true); expect(discoveryCount(saved)).toBe(2) })