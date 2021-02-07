import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiGetClocks,
} from '../../shared/js/api/clocks'

export const fetchClocks = createAsyncThunk('clocks/fetch', async () => {
  const clocks = await apiGetClocks()
  return clocks
})

