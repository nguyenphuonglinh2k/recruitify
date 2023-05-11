import Api from "./api";
import { ApiConstant } from "const";
import StringFormat from "string-format";

export const getTags = () => Api.get(ApiConstant.GET_TAGS);

export const postTags = data => Api.post(ApiConstant.POST_TAGS, data);

export const putTag = (tagId, data) =>
  Api.put(StringFormat(ApiConstant.PUT_TAG, { tagId }), data);

export const deleteTag = tagId =>
  Api.delete(StringFormat(ApiConstant.DELETE_TAG, { tagId }));
