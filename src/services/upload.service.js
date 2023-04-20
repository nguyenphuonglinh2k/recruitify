import { ApiConstant } from "const";
import DocumentPicker from "react-native-document-picker";
import Api from "./api";
import axios from "axios";

const getBodyFormData = file => {
  const bodyFormData = new FormData();

  bodyFormData.append("file", file);
  bodyFormData.append("upload_preset", "recruitify_preset");
  bodyFormData.append("cloud_name", "coders.tokyo");
  bodyFormData.append("folder", "recruitify");

  return bodyFormData;
};

export const getUploadPhotoFormData = async () => {
  const response = await DocumentPicker.pick({
    type: [DocumentPicker.types.images],
  });
  const photo = {
    uri: response[0].uri,
    type: response[0].type,
    name: response[0].name,
  };
  const bodyFormData = getBodyFormData(photo);

  return bodyFormData;
};

export const getUploadPdfFormData = async () => {
  const response = await DocumentPicker.pick({
    type: [DocumentPicker.types.pdf],
  });
  const pdf = {
    uri: response[0].uri,
    type: response[0].type,
    name: response[0].name,
  };

  const bodyFormData = getBodyFormData(pdf);

  return bodyFormData;
};

export const postCloudinaryUpload = async data => {
  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/coders-tokyo/auto/upload",
    data,
    {
      headers: ApiConstant.HEADER_FORM_DATA_DEFAULT,
    },
  );

  return response;
};
