import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function User() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/sign-in');
  };

  return (
    session && (
      <div className="flex items-center gap-4">
        Hey, {session.user.email}!
        <form action={signOut}>
          <button className="text-sm font-semibold leading-6 text-black-200 rounded-md border border-indigo-500 py-2 px-6 hover:border-indigo-300">
            Logout
          </button>
        </form>
      </div>
    )
  );
}
