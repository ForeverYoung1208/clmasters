import { myHttp } from "../myHttp"

export const apiGetVocabluaries = async () => {
  const [cities, clocks, masters] = await Promise.all([
    myHttp('/api/cities', 'GET').then(x => x.json()),
    myHttp('/api/clocks', 'GET').then(x => x.json()),
    myHttp('/api/masters', 'GET').then(x => x.json())
  ])
  return { vocabluaries:{cities, clocks, masters }}
}
