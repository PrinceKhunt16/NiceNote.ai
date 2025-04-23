import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

type UpdateSummaryInput = {
    id: number;
    title: string;
    file_name: string;
    tags: string;
};

export const useEditSummary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, file_name, tags }: UpdateSummaryInput) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Not authenticated");
      }

      const { error } = await supabase
        .from("Notes")
        .update({ title, file_name, tags })
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) {
        throw new Error(error.message);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
