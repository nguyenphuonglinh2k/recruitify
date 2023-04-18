import Api from "./api";
import { ApiConstant } from "const";

export const getTags = () => Api.get(ApiConstant.GET_TAGS);
