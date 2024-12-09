import { supabase } from '.'

function getNodes() {
  return supabase.from('chore').select('*').eq('id', 'notebook')
}
function saveNote(note: string) {
  return supabase
    .from('chore')
    .update({ value: note })
    .eq('id', 'notebook')
    .then((res) => {
      console.log('更新Note', res)
      return res
    })
}
export const tableChore = {
  getNodes,
  saveNote
}
