import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "utils";
import PropTypes from "prop-types";
import { ApiConstant } from "const";
import { UploadService } from "services";
import { getUploadPdfFormData } from "services/upload.service";
import { useToast } from "react-native-toast-notifications";
import DocumentPicker from "react-native-document-picker";
import DetailItemRow from "./DetailItemRow";

const AttachmentUploadBlock = ({
  data,
  setData,
  setIsLoading,
  ...otherProps
}) => {
  const toast = useToast();

  const handleUploadPdf = async () => {
    setIsLoading(true);

    try {
      const bodyFormData = await getUploadPdfFormData();

      const uploadRes = await UploadService.postCloudinaryUpload(bodyFormData);

      if (uploadRes.status === ApiConstant.STT_OK) {
        const responseData = uploadRes.data;

        if (setData) {
          setData({
            url: responseData.secure_url,
            name: `${responseData.original_filename}.pdf`,
          });
        }
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        toast.show("You have cancelled uploading!", {
          type: "warning",
        });
      } else {
        toast.show("Cannot update. Please try again!", { type: "warning" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DetailItemRow
      label="Attachment"
      content={
        <TouchableOpacity style={[styles.root]} onPress={handleUploadPdf}>
          <Text style={styles.content}>
            {data.name ?? "Press to upload pdf file"}
          </Text>
        </TouchableOpacity>
      }
      {...otherProps}
    />
  );
};

export default AttachmentUploadBlock;

AttachmentUploadBlock.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  setData: PropTypes.func,
  setIsLoading: PropTypes.func,
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[300],
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    color: COLORS.black,
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationColor: COLORS.black,
  },
});
