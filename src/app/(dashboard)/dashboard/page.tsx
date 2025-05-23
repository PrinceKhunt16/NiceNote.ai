"use client"

import { toasterMessage } from "@/lib/toaster";
import Link from "next/link";

export default function Dashboard() {
  const useCases = [
    {
      title: "Upload PDF & Summarize",
      description: "Summarize your pdf discussions and get superb notes.",
      icon: "📥",
      color: "bg-blue-100",
      launch: true,
      link: "/pdfsummarize"
    },
    {
      title: "Take Notes from Text",
      description: "Convert your lengthy paragraph text to easy notes.",
      icon: "📄",
      color: "bg-green-100",
      launch: false,
      link: '#'
    },
    {
      title: "YouTube Video Notes",
      description: "Hours or Miniutes long youtube video in just few bullets.",
      icon: "📺",
      color: "bg-purple-100",
      launch: false,
      link: "#"
    },
    {
      title: "Web Article Notes",
      description: "Long long articles, finds you hard to read. No worry click me.",
      icon: "✍️",
      color: "bg-orange-100",
      launch: false,
      link: "#"
    }
  ];

  const checkIsUnderDevelopment = (title: string) => {
    if (title !== "Upload PDF & Summarize") {
      toasterMessage("This feature is under development!", "🚀")
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mt-18 mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Get detailed notes in seconds.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600">
          Instantly distill lengthy content into concise notes with NiceNote.ai
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-12 text-center">
          👋🏻 Hey, What do you want to note down today?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {useCases.map((useCase, index) => (
            <Link href={`${useCase.launch ? useCase.link : "#"}`} passHref key={index} onClick={() => checkIsUnderDevelopment(useCase.title)}>
              <div
                className={`p-6 rounded-2xl ${useCase.color} ${useCase.launch ? 'hover:shadow-lg transition-shadow cursor-pointer' : 'opacity-70'
                  } relative`}
              >
                {/* {!useCase.launch && (
                  <div className="absolute top-2 right-2 text-yellow-600 px-2 py-1 text-xs font-black">
                    Premium
                  </div>
                )} */}
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center min-w-12 min-h-12 rounded-full bg-white">
                    {useCase.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                    <p className="text-gray-600">{useCase.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="text-center text-gray-500 text-md py-4 font-bold">
          Build with 💙 | {' '}
          <a
            href="https://www.linkedin.com/in/prince-khunt-linked-in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
          >
            Prince Khunt
          </a>
          {" "}
          | {" "}
          Feedbacks are welcome. You can DM me on linkedin.
        </footer>
      </div>
    </div>
  );
} 