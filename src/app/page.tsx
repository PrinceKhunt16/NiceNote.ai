import { Button } from "@/components/ui/button";
import { ArrowRight, Fan, Brain, Flame } from "lucide-react";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-catamaran)] min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="flex items-center px-4 py-2">
            <span className="text-6xl md:text-7xl bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent font-bold">
              NiceNote.ai
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Create Smarter Notes, {" "}
            <span className="text-blue-600">Effortless Genius.</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl">
            Transform your note-taking experience with AI-powered NiceNote.ai,
            smart summaries, and intelligent insights.
          </p>

          <div className="flex gap-4">
            <Link href="/dashboard" passHref>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth" passHref>
              <Button size="lg" variant="outline" className=" cursor-pointer">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl border bg-white shadow-sm">
            <Brain className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-600">
              Automatically categorize and organize your notes with advanced AI algorithms.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-white shadow-sm">
            <Flame className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Summaries</h3>
            <p className="text-gray-600">
              Get instant summaries of your notes and key insights with AI assistance.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-white shadow-sm">
            <Fan className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
            <p className="text-gray-600">
              Works with your favorite tools and platforms for a smooth workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
