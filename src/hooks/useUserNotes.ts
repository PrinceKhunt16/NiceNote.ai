import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

export const useUserNotes = () => {
  return useQuery({
    queryKey: ["Notes"],
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase
        .from("Notes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};