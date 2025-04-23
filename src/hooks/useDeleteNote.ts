import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

export const useDeleteSummary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Not authenticated");
      }

      const { error } = await supabase
        .from("Notes")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw new Error(error.message);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};