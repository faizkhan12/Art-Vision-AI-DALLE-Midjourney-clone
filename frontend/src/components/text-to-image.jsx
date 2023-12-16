import { useState } from "react";
import { preview } from "../assets";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../helpers";
import { FormField, Loader } from "../components";

const TextToImage = ({ name }) => {
  const [form, setForm] = useState({
    name: name,
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo && form.name) {
      setLoading(true);

      try {
        const response = await fetch(
          "https://dall-e-webservice.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        await response.json();
        navigate("/");
      } catch (error) {
        alert(err);
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter your name and prompt and generate an Image");
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://dall-e-webservice.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
        console.log(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <FormField
        labelName="Prompt"
        type="text"
        name="prompt"
        placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
        value={form.prompt}
        handleChange={handleChange}
        isSurpriseMe
        handleSurpriseMe={handleSurpriseMe}
      />
      <div
        className="relative flex justify-center items-center bg-gray-50 border border-gray-300 text-gray-900
focus:ring-[#4649ff] focus:border-[#4649ff] text-sm rounded-lg w-64 p-3
h-64 mt-10
"
      >
        {form.photo ? (
          <img
            src={form.photo}
            alt={form.prompt}
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src={preview}
            alt="preview"
            className="w-9/12 object-contain opacity-40"
          />
        )}
        {generatingImg && (
          <div
            className="absolute inset-0 z-0 flex justify-center items-center
   bg-[rgba(0,0,0,0.5)] rounded-lg "
          >
            <Loader />
          </div>
        )}
      </div>
      <div className="mt-5 flex gap-5">
        {generatingImg ? (
          <Loader />
        ) : (
          <button
            className="text-white bg-green-700 font-medium rounded-md text-sm
w-full sm:w-auto px-5 py-2.5 text-center
"
            type="button"
            onClick={generateImage}
          >
            Generate
          </button>
        )}
      </div>

      <div className="mt-10">
        <p className="mt-2 text-[#666e75] text-[14px]">
          Share the image that you have generated with others in the community
        </p>
        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={handleSubmit}
            type="button"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md
text-sm w-full sm:w-auto px-5 py-2.5 text-center
"
          >
            Share with the community
          </button>
        )}
      </div>
    </div>
  );
};

export default TextToImage;
