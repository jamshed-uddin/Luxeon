import axios from "axios";

export const uploadImage = async (files: File[]) => {
  const formData = new FormData();
  if (files.length > 0) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }

  return await axios.post(
    "http://localhost:4000/api/products/image/uploadImage",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
};

export const deleteImage = async (publicIds: string[]) => {
  //   const encodedPublicId = encodeURIComponent(publicId);
  return await axios.post(
    `http://localhost:4000/api/products/image/deleteImage`,
    { publicIds }
  );
};
