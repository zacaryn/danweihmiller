import { supabase } from '../lib/supabase';

const TABLE = 'contact_messages';

function assertClient() {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
}

export async function fetchContactMessages() {
  assertClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function markMessageRead(id) {
  assertClient();
  const { data, error } = await supabase
    .from(TABLE)
    .update({ is_read: true })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMessage(id) {
  assertClient();
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
