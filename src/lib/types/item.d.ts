export type Item = {
  id: string
  name: string
}

export type FetchItems = () => Promise<Item[]>

export type RemoveItem = (itemId: string) => Promise

export type AddItem = (itemId: string) => Promise

export type CreateItem = (name: string) => Promise<Item>

