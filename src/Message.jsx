import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";

function Message({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend && onSend(text);
    setText("");
  };

  return (
    <form
      className="flex flex-1 items-center gap-2 p-3 "
      onSubmit={handleSend}
    >
      <input
        type="text"
        className="flex-1 px-4 py-3 rounded-full border border-gray-300 text-base outline-none focus:border-violet-600"
        placeholder="Ask anything in the doc...."
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoComplete="off"
        checked={false}
      />
      <button
        type="submit"
        className="p-2 rounded-full transition hover:bg-violet-100"
        style={{ background: "none" }}
        title="send"
      >
        <SendOutlined style={{ fontSize: 22, color: "#6c5ce7" }} />
      </button>
    </form>
  );
}

export default Message;