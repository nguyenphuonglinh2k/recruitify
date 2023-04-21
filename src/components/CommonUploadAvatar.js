import { StyleSheet, TouchableOpacity } from "react-native";
import React, { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import CommonAvatar from "./CommonAvatar";
import LoadingSpinner from "./LoadingSpinner";
import { useToast } from "react-native-toast-notifications";
import { getUploadPhotoFormData } from "services/upload.service";
import { UploadService } from "services";
import { ApiConstant } from "const";
import DocumentPicker from "react-native-document-picker";
import { ImageSource } from "assets";

const CommonUploadAvatar = ({
  value,
  setValue,
  style,
  avatarStyle,
  ...otherProps
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onPickImage = useCallback(async () => {
    setIsLoading(true);

    try {
      const bodyFormData = await getUploadPhotoFormData();

      const uploadRes = await UploadService.postCloudinaryUpload(bodyFormData);

      if (uploadRes.status === ApiConstant.STT_OK) {
        const responseData = uploadRes.data;

        if (setValue) {
          setValue(responseData.secure_url);
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
  }, [setValue, toast]);

  return (
    <>
      <TouchableOpacity activeOpacity={0.7} style={style} onPress={onPickImage}>
        <CommonAvatar
          style={[styles.avatar, avatarStyle]}
          source={value ? { uri: value } : ImageSource.DefaultAvatarImage}
          {...otherProps}
        />
      </TouchableOpacity>
      <LoadingSpinner isVisible={isLoading} />
    </>
  );
};

CommonUploadAvatar.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  avatarStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default memo(CommonUploadAvatar);

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
  },
});
