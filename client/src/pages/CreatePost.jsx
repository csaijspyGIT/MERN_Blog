import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {

  const handleSubmit = (e) => {
    
  }
  return (

    <div className="min-h-screen p-3 max-w-3xl mx-auto">

      <h1 className="text-center text-3xl font-semibold my-7">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput 
            placeholder="Title"
            id="title"
            className="flex-1"
          />
        <Select>
          <option value="uncategorized">Select Category</option>
          <option value="javascript">javascript</option>
          <option value="react">react</option>
          <option value="nodejs">nodejs</option>
        </Select>
        </div>
      <div className="flex gap-4 items-center justify-between border-4 border-slate-400 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
          />
          <Button type="button" gradientDuoTone="purpleToPink" size="sm" outline>
            Upload Image
          </Button>
        </div>
        <ReactQuill 
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />
         <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
      </form>
    </div>
  )
};

export default CreatePost;
