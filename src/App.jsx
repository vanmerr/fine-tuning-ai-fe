import { API_URL } from "./api";
import { useState, useEffect } from "react";
import Message from "./Message";
import Response from "./Response";
import Upload from "./Upload";
import axios from "axios";
import { Toaster, toast } from "sonner";

function App() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Hiển thị toast và lưu lại id
    const toastId = toast.loading("Connecting to server...");
    axios.get(`${API_URL}/api/ping`)
      .then(() => {
        toast.success("Connected to server successfully");
        toast.dismiss(toastId); // Ẩn toast khi thành công
      })
      .catch(() => {
        toast.error("Failed to connect to server");
        toast.dismiss(toastId); // Ẩn toast khi lỗi
      });
  }, []);

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
    <div className="fixed inset-0 flex items-center justify-center  md:mr-[250px]">
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          style: {
            maxWidth: "95vw",
            margin: "0 auto",
          },
        }}
      />
      <div
        className="
          w-full max-w-[500px] h-[100vh] bg-gray-100 rounded-none md:rounded-2xl shadow-lg overflow-hidden
          flex flex-col
          sm:w-[95vw] sm:max-w-[500px]
          md:w-[500px] md:h-[90%]
        "
      >
        <header className="p-3 sm:p-4 bg-violet-600 text-white font-semibold text-lg sm:text-xl text-center select-none">
          Fine-tuning Chat (.docx, .pdf, .xlsx)
        </header>
        <div
          className="flex-1 p-1 sm:p-3 overflow-y-auto"
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
        <div className="flex items-center px-1 sm:px-2 pb-2 pt-1 gap-2 bg-gray-100">
          <Upload />
          <Message onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default App;
