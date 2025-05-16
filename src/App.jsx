import { API_URL } from "./api";
import { useState } from "react";
import Message from "./Message";
import Response from "./Response";
import Upload from "./Upload";
import axios from "axios";
import { Toaster } from "sonner";

function App() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý gửi câu hỏi
  const handleSend = async (text) => {
    setLoading(true);
    setAnswer("");
    try {
      const res = await axios.post(`${API_URL}/api/chat`, { question: text });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Error: " + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ml-0 md:mr-[250px]">
      <Toaster richColors position="top-center"/>
      <div
        className="
          w-full max-w-[500px] h-[90vh] bg-gray-100 rounded-2xl shadow-lg overflow-hidden
          flex flex-col
          sm:w-[90vw] sm:max-w-[500px]
          md:w-[500px] md:h-[90%]
        "
      >
        <header className="p-4 bg-violet-600 text-white font-semibold text-xl text-center select-none">
          Fine-tuning Chat (.docx, .pdf, .xlsx)
        </header>
        <div
          className="flex-1 p-2 sm:p-3 overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div className="hide-scrollbar">
            <Response loading={loading} text={answer} />
          </div>
        </div>
        <div className="flex items-center px-2 pb-2 pt-1 gap-2 bg-gray-100">
          <Upload />
          <Message onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default App;
