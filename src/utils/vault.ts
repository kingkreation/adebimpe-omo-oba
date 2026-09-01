import { vaultItems, type VaultItem } from '../data/vault'
export const unlockedVaultItems = (items: readonly VaultItem[] = vaultItems) => items.filter((item) => item.status === 'unlocked')
export const vaultMessage = (item: VaultItem) => item.status === 'locked' ? (item.unlockCondition ?? 'Not yet, Omo Oba.') : item.description