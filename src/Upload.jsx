import { useRef, useState } from "react";
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "./api";

function Upload({ onUploaded }) {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      await axios.post(`${API_URL}/api/upload`, formData);
      if (onUploaded) onUploaded();
      toast.success("Added data successfully");
    } catch (err) {
      toast.error("Add data failed " + (err.response?.data?.error || err.message));
    }
    setUploading(false);
    fileRef.current.value = "";
  };

  return (
    <div className='p-4'>
      <input
        id="file"
        type="file"
        name="file"
        className="hidden"
        ref={fileRef}
        onChange={handleChange}
        disabled={uploading}
      />
      <label htmlFor="file" className="cursor-pointer">
        {uploading ? (
          <LoadingOutlined style={{ fontSize: 28, color: '#6c5ce7' }} />
        ) : (
          <UploadOutlined style={{ fontSize: 28, color: '#6c5ce7' }} />
        )}
      </label>
    </div>
  );
}

export default Upload;