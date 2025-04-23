"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Clock,
  Search,
  EllipsisVertical,
} from "lucide-react";
import { Note } from "@/types/notes.types";
import MarkdownRenderer from "@/components/MarkdownRender";
import { Label } from "@/components/ui/label";
import pdfToText from 'react-pdftotext';
import { useCreateSummary } from '@/hooks/useCreateSummary';
import { useEditSummary } from "@/hooks/useEditNote";
import { useUserNotes } from "@/hooks/useUserNotes";
import { useDeleteSummary } from "@/hooks/useDeleteNote";
import { toasterMessage } from "@/lib/toaster";

export default function PDFSummarize() {
  const [selectedSummary, setSelectedSummary] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileText, setFileText] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editFileName, setEditFileName] = useState("");
  const [editTags, setEditTags] = useState("");
  const { data: notes } = useUserNotes();
  const { mutate, isSuccess: isSuccessCreateSummary } = useCreateSummary();
  const { mutate: editSummary, isSuccess: isSuccessEditSummary } = useEditSummary();
  const { mutate: deleteSummary, isSuccess: isSuccessDeleteSummary } = useDeleteSummary();

  const extractText = () => {
    if (!file) return;

    pdfToText(file)
      .then(text => setFileText(text))
      .catch(error => console.error("Failed to extract text from PDF", error));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    extractText();

    if (!fileText || !title || !tags) return;

    mutate({ title, fileText, tags, fileName: file?.name || "filename.pdf" });

    if (isSuccessCreateSummary) {
      setCreateOpen(!createOpen);
      toasterMessage(`${title}, note created.`, "🎊");
    }
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSummary) return;

    editSummary({
      id: Number(selectedSummary.id),
      title: editTitle,
      file_name: editFileName,
      tags: editTags,
    });

    setEditOpen(false);

    if (isSuccessEditSummary) {
      setEditOpen(!editOpen);
      toasterMessage(`${editTitle}, note edited.`, "🎊");
    }
  };

  const handleDelete = (id: number) => {
    deleteSummary(id);

    if (isSuccessDeleteSummary) {
      toasterMessage("Notes deleted", "🎊");
    }
  };

  useEffect(() => {
    if (selectedSummary) {
      setEditTitle(selectedSummary.title);
      setEditFileName(selectedSummary.file_name);
      setEditTags(selectedSummary.tags);
    }
  }, [selectedSummary]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="sticky top-0 z-30 flex justify-between items-center mb-8 px-4 py-4">
        <h1 className="text-3xl font-bold">PDF Summaries</h1>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 font-bold cursor-pointer text-white hover:text-white p-5">
              <span>+</span>
              New Summary
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg font-[family-name:var(--font-catamaran)]">
            <DialogHeader>
              <DialogTitle className="text-3xl">Create New Summary</DialogTitle>
              <DialogDescription className="text-xl">Upload a PDF file to generate a summary.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter summary title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="tag1,tag2,tag3"
                />
              </div>
              <div className="col-span-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors relative">
                <label htmlFor="file" className="flex flex-col items-center cursor-pointer">
                  <p className="text-3xl">📁</p>
                  <span className="text-gray-600">{file ? `${file.name}` : "Upload PDF file"}</span>
                </label>
                <input
                  type="file"
                  id="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="cursor-pointer w-full font-bold text-md">Generate</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-1">
          <div className="relative">
            <Search className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search summaries..."
              className="pl-9 bg-white shadow" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4 mt-4">
            {notes?.map((note) => (
              <Card
                key={note.id}
                className={`cursor-pointer transition-all ${selectedSummary?.id === note.id ? ' ring-2 ring-blue-400' : ''
                  }`}
                onClick={() => setSelectedSummary(note)}
              >
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{note.title}</h3>
                      <p className="text-sm text-gray-500">{note.file_name}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center" suppressHydrationWarning>
                      <Clock className="mr-1 h-4 w-4" />
                      {new Date(note.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {note.tags.split(",").map((t: string) => (
                        <span
                          key={t}
                          className="px-2 py-1 bg-gray-100 text-sm font-bold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="col-span-2 md:col-span-2">
          {selectedSummary ? (
            <Card>
              <CardContent>
                <div className="space-y-4 relative">
                  <div className="absolute right-0 top-0 order-1 z-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" aria-label="Options" className="border-2 w-10 h-10 bg-gray cursor-pointer font-bold rounded-full bg-white">
                          <EllipsisVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <div className="font-[family-name:var(--font-catamaran)]">
                          <DropdownMenuItem
                            onClick={() => setEditOpen(true)}
                            className="cursor-pointer"
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive cursor-pointer"
                            onClick={() => {
                              handleDelete(Number(selectedSummary.id))
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="text-gray-600">
                    <MarkdownRenderer content={selectedSummary.summary} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center">
              <div className="flex items-center justify-center text-center p-8 min-h-[calc(100vh-300px)]">
                <div>
                  <p className="text-4xl">😕</p>
                  <h3 className="text-lg font-semibold mb-2">No Summary Selected</h3>
                  <p className="text-gray-500">
                    Select a summary from the list or create a new one
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg font-[family-name:var(--font-catamaran)]">
          <DialogHeader>
            <DialogTitle className="text-4xl">Edit Summary</DialogTitle>
            <DialogDescription className="text-xl">Update the summary details below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSave} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-bold">
                Name
              </Label>
              <Input
                id="name"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filename" className="text-right font-bold">
                File Name
              </Label>
              <Input
                id="filename"
                value={editFileName}
                onChange={(e) => setEditFileName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right font-bold">
                Tags
              </Label>
              <Input
                id="tags"
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                placeholder="Comma separated"
                className="col-span-3"
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="font-bold cursor-pointer">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
