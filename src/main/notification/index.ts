import { Notification } from 'electron'
let _openAlertSet = new Set<string>()

export function chaneCoinAlertStatus(coin: string, status: boolean) {
  if (status) {
    _openAlertSet.add(coin)
  } else {
    _openAlertSet.delete(coin)
  }
  return true
}
export function notifyCoin(title: string, body: string,coin: string) {
  if (!_openAlertSet.has(coin)) {
    return
  }
  const notification = new Notification({
    title,
    body
  })
  notification.show()
}

export function notifyCommon(title: string, body: string) {
  const notification = new Notification({
    title,
    body
  })
  notification.show()
}
