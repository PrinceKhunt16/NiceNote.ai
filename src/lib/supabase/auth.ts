import { supabase } from "./client";

export async function signUpAuth(
  name: string,
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
}

export const signInAuth = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error?.message === "Email not confirmed") {
    return {
      data: null,
      error: {
        message: "Please verify your email address first",
        code: "unverified_email",
        email: email,
      },
    };
  }

  return { data, error };
};

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function signInWithProvider(provider: "google") {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });
  return { data, error };
}

export function getSession() {
  return supabase.auth.getSession();
}

export function getUser() {
  return supabase.auth.getUser();
}

export function onAuthStateChange(callback: any) {
  return supabase.auth.onAuthStateChange(callback);
}
