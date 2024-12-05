export function getShowDate(date: number) {
  return new Date(date).toLocaleString('zh-CN', {
    hour12: false
  })
}
