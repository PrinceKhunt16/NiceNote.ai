import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client"; 
import { generateSummaryWithGroq } from "@/lib/groq";

type SummaryData = {
  title: string;
  fileText: string;
  tags: string;
  fileName: string;
};

export const useCreateSummary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, fileText, tags, fileName }: SummaryData) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const summary = await generateSummaryWithGroq(fileText);

      const { data, error } = await supabase
        .from('Notes')
        .insert([{
          title,
          file_name: fileName,
          summary,
          tags,
          user_id: user.id
        }])
        .select()

      if (error) throw new Error(error.message);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
