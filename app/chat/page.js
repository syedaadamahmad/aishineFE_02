
// gpt

// "use client";
// import ReactMarkdown from "react-markdown";
// import Image from "next/image";
// import { useState, useRef, useEffect } from "react";
// import Header from "../../../components/Header";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Home() {
//   const [messages, setMessages] = useState([
//     {
//       role: "ai",
//       type: "text",
//       content:
//         "👋 Hello! I’m **AI Shine**, your friendly AI assistant. Ask me anything about Artificial Intelligence or Machine Learning!",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);
//   const [listening, setListening] = useState(false);
//   const recognitionRef = useRef(null);

//   // ✅ Speech setup
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         recognitionRef.current = new SpeechRecognition();
//         recognitionRef.current.continuous = false;
//         recognitionRef.current.interimResults = false;
//         recognitionRef.current.lang = "en-IN";

//         recognitionRef.current.onresult = (event) => {
//           const transcript = event.results[0][0].transcript;
//           setInput((prev) => (prev ? prev + " " + transcript : transcript));
//           setListening(false);
//         };
//         recognitionRef.current.onend = () => setListening(false);
//       }
//     }
//   }, []);

//   const toggleListening = () => {
//     if (!recognitionRef.current) {
//       alert("Speech recognition not supported in this browser.");
//       return;
//     }
//     if (listening) recognitionRef.current.stop();
//     else recognitionRef.current.start();
//     setListening(!listening);
//   };

//   // ✅ Auto-scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ✅ Send message
//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const userMessage = { role: "human", type: "text", content: input };
//     const newMessages = [...messages, userMessage];
//     setMessages(newMessages);
//     setInput("");
//     await sendToAI(newMessages);
//   };

//   // ✅ Call backend
// async function sendToAI(newMessages) {
// setLoading(true);
// try {
// const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ chat_history: newMessages }),
// });

//       const data = await res.json();
//       const raw = data.answer || "🤖 I’m here to help!";

//       // === Format handling ===
//       let messageBlock;
//       if (raw.startsWith("❌")) {
//         messageBlock = {
//           role: "ai",
//           type: "decline",
//           content: raw,
//         };
//       } else {
//         const [answerPart, keyPointsPart] = raw.split("**Key Points:**");
//         messageBlock = {
//           role: "ai",
//           type: "structured",
//           answer: extractSection(answerPart, "Answer"),
//           keyPoints: keyPointsPart
//             ? keyPointsPart
//                 .split("\n")
//                 .map((p) => p.replace(/[-*•]\s?/g, "").trim())
//                 .filter(Boolean)
//             : [],
//         };
//       }
//       setMessages((prev) => [...prev, messageBlock]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "ai",
//           type: "error",
//           content: "⚠️ Oops! Couldn’t connect to AI Shine’s server.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function extractSection(text, title) {
//     if (!text) return "";
//     return text.replace(`**${title}:**`, "").trim();
//   }

//   // ✅ Input handling
//   const handleTextareaChange = (e) => {
//     setInput(e.target.value);
//     const maxHeight = 200;
//     e.target.style.height = "auto";
//     e.target.style.height = `${Math.min(e.target.scrollHeight, maxHeight)}px`;
//     e.target.style.overflowY =
//       e.target.scrollHeight > maxHeight ? "auto" : "hidden";
//   };

//   const handleClearChat = () => {
//     setMessages([
//       {
//         role: "ai",
//         type: "text",
//         content: "✨ Hi again! I’m **AI Shine** — ready for a fresh AI chat!",
//       },
//     ]);
//     setInput("");
//   };

//   return (
//     <main className="fixed inset-0 flex flex-col bg-gray-100 overflow-hidden">
//       {/* Header */}
//       <div className="z-20 bg-gradient-to-r from-[#071C39] via-[#0B3266] to-[#134F95] text-white shadow-md flex-shrink-0">
//         <Header onClearChat={handleClearChat} />
//       </div>

//       {/* Chat Section */}
//       <div className="flex-grow overflow-y-auto px-5 py-6 space-y-5 scrollbar-hide">
//         <div className="flex justify-center my-2">
//           <div className="bg-white/60 text-gray-700 text-xs font-semibold px-4 py-1 rounded-full shadow-sm backdrop-blur-md">
//             {new Date().toLocaleDateString("en-US")}
//           </div>
//         </div>

//         <AnimatePresence>
//           {messages.map((msg, idx) => {
//             const isUser = msg.role === "human";
//             return (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//                 className={`flex flex-col ${
//                   isUser ? "items-end" : "items-start"
//                 } space-y-1`}
//               >
//                 {/* Avatar Row */}
//                 <div
//                   className={`flex items-center gap-2 mb-1 ${
//                     isUser ? "flex-row-reverse pr-2" : "flex-row pl-2"
//                   }`}
//                 >
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
//                       isUser
//                         ? "bg-gray-500"
//                         : "bg-gradient-to-r from-blue-600 to-green-400"
//                     }`}
//                   >
//                     <span>{isUser ? "👤" : "🤖"}</span>
//                   </div>
//                   <span
//                     className={`text-xs font-semibold ${
//                       isUser ? "text-gray-700" : "text-blue-600"
//                     }`}
//                   >
//                     {isUser ? "You" : "AI Shine"}
//                   </span>
//                 </div>

//                 {/* Message Bubble */}
//                 {msg.type === "decline" ? (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="max-w-[80%] bg-gradient-to-r from-red-100 to-red-200 border-l-4 border-red-500 text-red-800 px-5 py-3 rounded-lg shadow-sm"
//                   >
//                     <div className="font-semibold mb-1">⚠️ System Notice</div>
//                     <p className="text-sm">{msg.content}</p>
//                   </motion.div>
//                 ) : msg.type === "structured" ? (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="max-w-[80%] bg-white text-gray-800 px-5 py-4 rounded-2xl shadow-lg border border-gray-200 transition-transform hover:scale-[1.01]"
//                   >
//                     <h4 className="font-semibold text-blue-700 mb-1">Answer</h4>
//                     <p className="text-sm text-gray-700 mb-3 leading-relaxed">
//                       {msg.answer}
//                     </p>
//                     {msg.keyPoints.length > 0 && (
//                       <>
//                         <h4 className="font-semibold text-green-700 mb-1">
//                           Key Points
//                         </h4>
//                         <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
//                           {msg.keyPoints.map((p, i) => (
//                             <li key={i}>{p}</li>
//                           ))}
//                         </ul>
//                       </>
//                     )}
//                   </motion.div>
//                 ) : (
//                   <div
//                     className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm md:text-base shadow-md ${
//                       isUser
//                         ? "bg-[#334155]/80 text-white rounded-br-none"
//                         : "bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-bl-none"
//                     }`}
//                   >
//                     <ReactMarkdown>{msg.content}</ReactMarkdown>
//                   </div>
//                 )}
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>

//         {loading && (
//           <div className="flex justify-start animate-pulse">
//             <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold shadow-md flex items-center gap-3">
//               <svg
//                 className="w-5 h-5 animate-spin"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                 />
//               </svg>
//               <span>🤔 AI Shine is thinking...</span>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="bg-[#E8EEF6] border-t border-gray-300 p-4 flex gap-3 items-end flex-shrink-0">
//         <textarea
//           className="flex-grow bg-white text-gray-800 placeholder:text-gray-500 px-4 py-3 rounded-2xl resize-none min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[#0B3266] transition-all duration-200"
//           placeholder="Type your AI question or use mic..."
//           rows="1"
//           value={input}
//           onChange={handleTextareaChange}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               sendMessage();
//             }
//           }}
//         />

//         {/* Mic */}
//         <button
//           className={`rounded-full p-3 flex-shrink-0 shadow-md transition-transform ${
//             listening
//               ? "bg-gradient-to-r from-red-500 to-pink-500 scale-110"
//               : "bg-gray-500 hover:scale-105"
//           }`}
//           onClick={toggleListening}
//           title={listening ? "Listening..." : "Tap to Speak"}
//         >
//           <Image src="/icons/mic.svg" width={22} height={22} alt="mic" className="invert" />
//         </button>

//         {/* Send */}
//         <button
//           className="bg-gradient-to-r from-[#0B3266] to-[#134F95] rounded-full p-3 flex-shrink-0 shadow-md hover:scale-105 transition-transform"
//           onClick={sendMessage}
//         >
//           <Image src="/icons/submit.svg" width={22} height={22} alt="send" className="invert-0" />
//         </button>
//       </div>
//     </main>
//   );
// }





// claude
"use client";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      type: "greeting",
      content:
        "👋 Hello! I'm **AI Shine**, your friendly AI assistant. Ask me anything about Artificial Intelligence or Machine Learning!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // Speech recognition setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-IN";

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput((prev) => (prev ? prev + " " + transcript : transcript));
          setListening(false);
        };
        recognitionRef.current.onend = () => setListening(false);
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    if (listening) recognitionRef.current.stop();
    else recognitionRef.current.start();
    setListening(!listening);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "human", type: "text", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    await sendToAI(newMessages);
  };

  // Call backend API
  async function sendToAI(newMessages) {
    setLoading(true);
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/chat";

      // Format messages for backend
      const formattedMessages = newMessages.map((msg) => ({
        role: msg.role,
        content:
          typeof msg.content === "string"
            ? msg.content
            : msg.content.answer || JSON.stringify(msg.content),
        type: msg.type || "text",
      }));

      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_history: formattedMessages }),
      });

      if (!res.ok) {
        throw new Error(`Backend returned ${res.status}`);
      }

      const data = await res.json();
      const rawAnswer = data.answer || "🤖 I'm here to help!";
      const responseType = data.type || "text";

      // Build message block based on type
      let messageBlock;

      if (responseType === "greeting") {
        messageBlock = {
          role: "ai",
          type: "greeting",
          content: rawAnswer,
        };
      } else if (responseType === "decline") {
        messageBlock = {
          role: "ai",
          type: "decline",
          content: rawAnswer,
        };
      } else if (responseType === "structured") {
        // Parse structured response
        const parsed = parseStructuredAnswer(rawAnswer);
        messageBlock = {
          role: "ai",
          type: "structured",
          content: parsed,
        };
      } else {
        // Plain text
        messageBlock = {
          role: "ai",
          type: "text",
          content: rawAnswer,
        };
      }

      setMessages((prev) => [...prev, messageBlock]);
    } catch (error) {
      console.error("[ERROR]", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          type: "error",
          content: "⚠️ Oops! Couldn't connect to AI Shine's server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Parse structured answer from backend
  function parseStructuredAnswer(rawAnswer) {
    const parts = rawAnswer.split("**Key Points:**");

    if (parts.length === 2) {
      const answerPart = parts[0].replace("**Answer:**", "").trim();
      const keyPointsPart = parts[1].trim();

      const keyPoints = keyPointsPart
        .split("\n")
        .map((line) => line.replace(/^[•\-\*]\s*/, "").trim())
        .filter(Boolean);

      return {
        answer: answerPart,
        keyPoints: keyPoints,
      };
    }

    // No structure detected
    return {
      answer: rawAnswer,
      keyPoints: [],
    };
  }

  // Textarea auto-resize
  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    const maxHeight = 200;
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, maxHeight)}px`;
    e.target.style.overflowY =
      e.target.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  // Clear chat
  const handleClearChat = () => {
    setMessages([
      {
        role: "ai",
        type: "greeting",
        content: "✨ Hi again! I'm **AI Shine** — ready for a fresh AI chat!",
      },
    ]);
    setInput("");
  };

  return (
    <main className="fixed inset-0 flex flex-col bg-gray-100 overflow-hidden">
      {/* Header */}
      <div className="z-20 bg-gradient-to-r from-[#071C39] via-[#0B3266] to-[#134F95] text-white shadow-md flex-shrink-0">
        <Header onClearChat={handleClearChat} />
      </div>

      {/* Chat Section */}
      <div className="flex-grow overflow-y-auto px-5 py-6 space-y-5 scrollbar-hide">
        <div className="flex justify-center my-2">
          <div className="bg-white/60 text-gray-700 text-xs font-semibold px-4 py-1 rounded-full shadow-sm backdrop-blur-md">
            {new Date().toLocaleDateString("en-US")}
          </div>
        </div>

        <AnimatePresence>
          {messages.map((msg, idx) => {
            const isUser = msg.role === "human";
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col ${
                  isUser ? "items-end" : "items-start"
                } space-y-1`}
              >
                {/* Avatar Row */}
                <div
                  className={`flex items-center gap-2 mb-1 ${
                    isUser ? "flex-row-reverse pr-2" : "flex-row pl-2"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                      isUser
                        ? "bg-gray-500"
                        : "bg-gradient-to-r from-blue-600 to-green-400"
                    }`}
                  >
                    <span>{isUser ? "👤" : "🤖"}</span>
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      isUser ? "text-gray-700" : "text-blue-600"
                    }`}
                  >
                    {isUser ? "You" : "AI Shine"}
                  </span>
                </div>

                {/* Message Bubble */}
                {msg.type === "decline" || msg.type === "error" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-[80%] bg-gradient-to-r from-red-100 to-red-200 border-l-4 border-red-500 text-red-800 px-5 py-3 rounded-lg shadow-sm"
                  >
                    <div className="font-semibold mb-1">⚠️ System Notice</div>
                    <ReactMarkdown className="text-sm">{msg.content}</ReactMarkdown>
                  </motion.div>
                ) : msg.type === "structured" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-[80%] bg-white text-gray-800 px-5 py-4 rounded-2xl shadow-lg border border-gray-200 transition-transform hover:scale-[1.01]"
                  >
                    <h4 className="font-semibold text-blue-700 mb-2">Answer</h4>
                    <div className="text-sm text-gray-700 mb-3 leading-relaxed whitespace-pre-wrap">
                      <ReactMarkdown>{msg.content.answer}</ReactMarkdown>
                    </div>
                    {msg.content.keyPoints && msg.content.keyPoints.length > 0 && (
                      <>
                        <h4 className="font-semibold text-green-700 mb-2">
                          Key Points
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {msg.content.keyPoints.map((kp, i) => (
                            <li key={i}>{kp}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <div
                    className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm md:text-base shadow-md ${
                      isUser
                        ? "bg-[#334155]/80 text-white rounded-br-none"
                        : "bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-bl-none"
                    }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold shadow-md flex items-center gap-3">
              <svg
                className="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>🤔 AI Shine is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#E8EEF6] border-t border-gray-300 p-4 flex gap-3 items-end flex-shrink-0">
        <textarea
          className="flex-grow bg-white text-gray-800 placeholder:text-gray-500 px-4 py-3 rounded-2xl resize-none min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[#0B3266] transition-all duration-200"
          placeholder="Type your AI question or use mic..."
          rows="1"
          value={input}
          onChange={handleTextareaChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        {/* Mic Button */}
        <button
          className={`rounded-full p-3 flex-shrink-0 shadow-md transition-transform ${
            listening
              ? "bg-gradient-to-r from-red-500 to-pink-500 scale-110"
              : "bg-gray-500 hover:scale-105"
          }`}
          onClick={toggleListening}
          title={listening ? "Listening..." : "Tap to Speak"}
        >
          <Image
            src="/icons/mic.svg"
            width={22}
            height={22}
            alt="mic"
            className="invert"
          />
        </button>

        {/* Send Button */}
        <button
          className="bg-gradient-to-r from-[#0B3266] to-[#134F95] rounded-full p-3 flex-shrink-0 shadow-md hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          <Image
            src="/icons/submit.svg"
            width={22}
            height={22}
            alt="send"
            className="invert-0"
          />
        </button>
      </div>
    </main>
  );
}