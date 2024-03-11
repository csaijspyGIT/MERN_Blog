import { TextInput, Button, Alert, Modal } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  deleteFailure,
  updateFailure,
  updateStart,
  updateSuccess,
  deleteStart,
  deleteSuccess,
} from "../redux/user/user.slice.js";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageUploading, setImageUploading] = useState(false);
  const [userUpdateSuccess, setUserUpdateSucess] = useState(null);
  const [userUpdateError, setUserUpdateError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  const uploadImage = async () => {
    setImageUploadError(null);
    setImageUploading(true);
    const storage = getStorage(app);
    const fileName = Date.now() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError("File must be less than 2MB");
        setImageUploadProgress(null);
        setImage(null);
        setImageURL(null);
        setImageUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageUploading(false);
        });
      }
    );
  };

  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setUserUpdateSucess(null);
    setUserUpdateError(null);
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }

    if (imageUploading) {
      setUserUpdateError("Please wait for image to upload");
      return;
    }

    try {
      dispatch(updateStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success === false) {
        dispatch(updateFailure(data.errMessage));
        setUserUpdateError(data.errMessage);
      } else {
        dispatch(updateSuccess(data));
        setUserUpdateSucess("Successfully updated");
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      setUserUpdateError(err.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);

    try {
      dispatch(deleteStart());
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success === false) {
        dispatch(deleteFailure(errMessage));
      } else {
        dispatch(deleteSuccess(data));
      }
    } catch (err) {
      dispatch(deleteFailure(err.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center text-3xl my-7 font-semibold">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          ref={filePickerRef}
          onChange={handleImageChange}
          hidden
        />
        <div
          onClick={() => filePickerRef.current.click()}
          className="relative w-32 h-32 self-center shadow-md rounded-full overflow-hidden"
        >
          {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageURL || currentUser.profilePicture}
            alt="ProfilePicture"
            className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover  ${
              imageUploadProgress && imageUploadProgress < 100 && "opacity-60"
            }`}
          />
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          className=""
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-slate-500 via-indigo-500 to-violet-500"
          outline
        >
          Update
        </Button>

        <div className="flex justify-between items-center text-red-600 font-semibold cursor-pointer">
          <span onClick={() => setShowModal(true)}>Delete Account</span>
          <span>Sign Out</span>
        </div>
      </form>
      {userUpdateSuccess && <Alert color="success">{userUpdateSuccess}</Alert>}
      {userUpdateError && <Alert color="failure">{userUpdateError}</Alert>}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 font-semibold dark:text-gray-100">
              Are you sure you want to delete your acount?
            </h3>
            <div className="flex justify-around">
              <Button color="failure" onClick={handleDeleteUser}>
                Yeah, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
