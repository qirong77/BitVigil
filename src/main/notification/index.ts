import { Notification } from 'electron'
let _isOpenAlertAll = true
let _openAlertSet = new Set<string>()

export function chaneCoinAlertStatus(coin: string, status: boolean) {
  console.log(coin,status)
  if (status) {
    _openAlertSet.add(coin)
  } else {
    _openAlertSet.delete(coin)
  }
  return true
}
export function notify(title: string, body: string,coin: string) {
  if (!_isOpenAlertAll || !_openAlertSet.has(coin)) {
    return
  }
  const notification = new Notification({
    title,
    body
  })
  notification.show()
}