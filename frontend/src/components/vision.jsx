import { useState, useCallback } from "react";
import { FormField, Loader } from "../components";
import { convertFileToBase64 } from "../helpers";

const Vision = () => {
  const [maxTokens, setMaxTokens] = useState(50);
  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const [result, setResult] = useState(""); // Stores the analysis result
  const [dragOver, setDragOver] = useState(false); // UI state for drag-and-drop
  const [uploadProgress, setUploadProgress] = useState(0); // Manages the upload progress
  const [statusMessage, setStatusMessage] = useState(""); // Displays status messages to the user
  const [base64Image, setBase64Image] = useState("");
  const [prompt, setPrompt] = useState("");

  // Callback for handling file selection changes
  const handleFileChange = useCallback(async (selectedFile) => {
    // Updating state with the new file and its preview URL
    setFile(selectedFile);
    setPreviewImg(URL.createObjectURL(selectedFile));
    setStatusMessage('Image selected. Click "Analyze Image" to proceed.');
    setUploadProgress(0);

    // Convert the file to a base64 string and store it in the state
    const base64 = await convertFileToBase64(selectedFile);
    setBase64Image(base64);
  }, []);

  // Callbacks for handling drag-and-drop events
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setDragOver(false);
      const files = event.dataTransfer.files;
      if (files.length) {
        handleFileChange(files[0]);
      }
    },
    [handleFileChange]
  );

  const generateAnalysis = async (event) => {
    event.preventDefault();
    if (!file) {
      setStatusMessage("No file selected!");
      return;
    }

    setStatusMessage("Sending request...");
    setUploadProgress(40); // Progress after image conversion

    // Send a POST request to your API endpoint
    const response = await fetch(
      "https://dall-e-webservice.onrender.com/api/v1/vision",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: base64Image,
          prompt: prompt,
          detail: "off",
          max_tokens: maxTokens,
        }),
      }
    );

    setUploadProgress(60); // Progress after sending request

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse = await response.json();
    setUploadProgress(80); // Progress after receiving response

    if (apiResponse.success) {
      setResult(apiResponse.analysis);
      setStatusMessage("Analysis complete.");
      setUploadProgress(100); // Final progress
    } else {
      setStatusMessage(apiResponse.message);
    }
  };
  return (
    <div>
      <FormField
        labelName="Prompt"
        type="text"
        name="prompt"
        placeholder="Prompt or Custom Question"
        value={prompt}
        handleChange={(e) => setPrompt(e.target.value)}
      />
      <label
        htmlFor="token"
        className=" mt-8 block text-sm font-medium text-gray-900"
      >
        Max Token(Token determine how many characters of output needed to be
        generated)
      </label>
      <div className="flex justify-between">
        <input
          type="range"
          name="token"
          value={maxTokens}
          onChange={(e) => setMaxTokens(Number(e.target.value))}
          min="50"
          max="800"
        />
        <p className="text-sm text-gray-600 mb-1">Max tokens: {maxTokens}</p>
      </div>
      <div
        className={`border-2 border-dashed border-gray-400 rounded-lg p-10 cursor-pointer my-5 ${
          dragOver ? "border-blue-300 bg-gray-100" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById("fileUpload")?.click()}
      >
        <input
          id="fileUpload"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFileChange(e.target.files[0]);
            }
          }}
          accept="image/*"
          className="hidden"
        />
        {previewImg ? (
          <img
            src={previewImg}
            alt="Preview"
            className="max-w-full max-h-48 mb-5 mx-auto"
          />
        ) : (
          <p>
            Drag and drop an image here, or click to select an image to upload.
          </p>
        )}
      </div>
      <div className="flex justify-center items-center mb-5">
        {uploadProgress === 0 || uploadProgress === 100 ? (
          <button
            onClick={generateAnalysis}
            className="bg-green-700 text-white py-2 px-5 rounded-lg cursor-pointer text-lg hover:bg-green-800"
          >
            Analyze Image
          </button>
        ) : (
          <Loader />
        )}
      </div>
      {statusMessage && <p className="text-gray-600 mb-5">{statusMessage}</p>}
      {result && (
        <div className="mt-5">
          <strong>Analysis Result:</strong>
          <textarea
            value={result}
            readOnly
            className="w-full h-36 p-2 mt-2 border border-gray-300 rounded-lg resize-y"
          />
        </div>
      )}
    </div>
  );
};

export default Vision;
