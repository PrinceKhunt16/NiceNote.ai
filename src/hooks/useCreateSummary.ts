import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { generateSummaryWithGroq } from "@/lib/groq";
import { Note } from "@/types/notes.types";

export type CreateSummaryInput = {
  title: string;
  fileText: string;
  tags: string;
  fileName: string;
};

export type CreateSummaryOutput = Note[];

export const useCreateSummary = (
  options?: UseMutationOptions<CreateSummaryOutput, Error, CreateSummaryInput>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, fileText, tags, fileName }: CreateSummaryInput) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const summary = await generateSummaryWithGroq(fileText);

      const { data, error } = await supabase
        .from("Notes")
        .insert([
          {
            title,
            file_name: fileName,
            summary,
            tags,
            user_id: user.id,
          },
        ])
        .select();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    ...options,
  });
};
