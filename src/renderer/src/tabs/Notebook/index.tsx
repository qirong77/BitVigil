// import TextArea from 'antd/es/input/TextArea'
// import { useEffect, useState } from 'react'


// const saveNote = debounce((note: string) => {
//   supabase
//     .from('binance_note')
//     .update({ note })
//     .eq('id', 1)
//     .then((res) => {
//       console.log('更新Note', res)
//     })
// }, 2000)
// export function NoteBook() {
//   const [note, setNote] = useState('')

//   useEffect(() => {
//     supabase
//       .from('binance_note')
//       .select('*')
//       .eq('id', 1)
//       .then((res) => {
//         setNote(res.data?.[0].note || '')
//       })
//   }, [])
//   return (
//     <>
//       <TextArea
//         style={{ height: '600px' }}
//         value={note}
//         onChange={(e) => {
//           setNote(e.target.value)
//           saveNote(e.target.value)
//         }}
//       />
//     </>
//   )
// }
