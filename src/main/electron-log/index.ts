const _logs: {
  id: string
  time: number
  title: string
  content: string
}[] = []
function log(title: string, content = '') {
  const time = new Date().getTime()
  const id = time + title
  _logs.push({
    id,
    time,
    title,
    content
  })
}
function getLogs() {
  return _logs
}

export const electronLog = {
  log,
  getLogs
}
