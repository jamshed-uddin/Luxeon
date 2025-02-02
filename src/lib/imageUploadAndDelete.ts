import { PhotoUrlObj } from "./definition";
import { requestClient } from "./requestClient";

export const uploadImage = async (files: File[]) => {
  const formData = new FormData();
  if (files.length > 0) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }

  return await requestClient<PhotoUrlObj[]>("/products/image/uploadImage", {
    method: "post",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteImage = async (publicIds: string[]) => {
  //   const encodedPublicId = encodeURIComponent(publicId);
  return await requestClient(`/products/image/deleteImage`, {
    method: "post",
    data: { publicIds },
  });
};
