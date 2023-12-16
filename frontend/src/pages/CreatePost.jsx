import { useState } from "react";
import { FormField } from "../components";
import * as Tabs from "@radix-ui/react-tabs";
import TextToImage from "../components/text-to-image";
import Vision from "../components/vision";

const CreatePost = () => {
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Start with a detailed description
        </p>
      </div>
      <form className="mt-16 ">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <Tabs.Root className="flex flex-col w-[100%]" defaultValue="tab1">
            <Tabs.List
              className="shrink-0 flex border-b border-mauve6"
              aria-label="Choose your AI generation"
            >
              <Tabs.Trigger
                className="bg-gray-50 border border-gray-300  h-[45px] flex-1 flex items-center justify-center 
                text-[12px] sm:text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md
                 hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]
                  data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px]
                   data-[state=active]:focus:shadow-black outline-none cursor-default"
                value="tab1"
              >
                Text-To-Image-Generation
              </Tabs.Trigger>
              <Tabs.Trigger
                className="bg-gray-50 border border-gray-300   h-[45px] flex-1 flex items-center justify-center text-[12px] sm:text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                value="tab2"
              >
                Try our new Image Analysis(Vision API)
                <div className="relative top-[-20%] text-red-500 border border-gray-700 rounded-lg p-1">
                  New
                </div>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
              value="tab1"
            >
              <TextToImage name={form.name} />
            </Tabs.Content>
            <Tabs.Content
              className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
              value="tab2"
            >
              <Vision />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
