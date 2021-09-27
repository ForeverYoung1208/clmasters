export interface IMasterAttr {
  id: number
  cityId: number,
  rating: number,
  hourRate: number,
  name: string
  comment: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}