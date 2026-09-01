import { expect, it } from 'vitest'
import { vaultItems } from '../data/vault'
import { unlockedVaultItems, vaultMessage } from './vault'
it('returns only entries that can be opened', () => expect(unlockedVaultItems().every((item) => item.status === 'unlocked')).toBe(true))
it('gives locked entries a playful future-facing message', () => { const locked = vaultItems.find((item) => item.status === 'locked'); expect(locked && vaultMessage(locked)).toMatch(/not yet|waiting/i) })