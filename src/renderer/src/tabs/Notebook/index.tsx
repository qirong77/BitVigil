import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { tableChore } from '../../../../common/supabase/tableChore'
import debounce from 'debounce'

const saveNote = debounce((note: string) => {
  tableChore.saveNote(note)
}, 1000)
export function NoteBook({isActiveTab}) {
  const [note, setNote] = useState('')
  useEffect(() => {
    isActiveTab && tableChore.getNodes().then((res) => {
      const value = res.data?.[0]?.value
      setNote(value || '未找到笔记！！')
    })
  }, [isActiveTab])
  return (
    <>
      <TextArea
        style={{ height: '600px' }}
        value={note}
        onChange={(e) => {
          setNote(e.target.value)
          saveNote(e.target.value)
        }}
      />
    </>
  )
}
