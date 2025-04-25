export const generateSummaryWithGroq = async (pdfText: string): Promise<string> => {
    const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
  
    if (!GROQ_API_KEY) throw new Error("Groq API key not configured");
  
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes documents in Markdown format. Your summaries should include a clear title, bullet points highlighting key insights, and use bold text to emphasize important points. Keep the summary concise and well-structured, with a maximum length of 300 words. Return only the Markdown content without any additional explanation.",
          },
          {
            role: "user",
            content: `Summarize the following content in Markdown format with a clear title, Avoid using the words 'summary' or 'notes' in the title, bullet points, and bold key points (max 300 words):\n\n${pdfText.substring(0, 10000)}`
          }
        ],
        temperature: 0.5
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Groq API request failed");
    }
  
    const data = await response.json();
    return data.choices[0]?.message?.content || "No summary generated";
  };
  