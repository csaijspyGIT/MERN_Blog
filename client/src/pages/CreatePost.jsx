import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPostError, createPostStart, createPostSuccess } from "../redux/user/post.slice.js";
import { CircularProgressbar } from "react-circular-progressbar";

const CreatePost = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const navigate = useNavigate();
  const { error, loading } = useSelector(state => state.post);
  const dispatch = useDispatch();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image')
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = Date.now() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({...formData, image: downloadURL });
          });
        }
      );
    } catch (err) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(createPostStart());
      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success === false) {
        dispatch(createPostError(data.errMessage));
        console.log(data, "Data");
      } 
      if (response.ok) {
        dispatch(createPostSuccess(data));
        navigate(`/post/${data.slug}`);
      }
    } catch (err) {
      dispatch(createPostError(err.message))
    }
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
            onChange={(e)=> setFormData({...formData, title:e.target.value})}
          />
          <Select
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
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
            onChange={(e)=>setFile(e.target.files[0])}
          />
          <Button type="button" gradientDuoTone="purpleToPink" size="sm" outline onClick={handleUploadImage}  disabled={imageUploadProgress}>
          {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <ReactQuill 
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value)=>setFormData({...formData, content: value})}
        />
         <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {error && (
          <Alert className='mt-5' color='failure'>
            {error}
          </Alert>
        )}
      </form>
    </div>
  )
};

export default CreatePost;
