export type TModelResponceAll<I> =
  | {
      totalCount: number
      currentPage: number
      data: Array<Omit<I, 'password'>>
    }
  | { errors: Array<{ param: string; msg: string }> }
