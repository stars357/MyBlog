import { AxiosResponse } from "axios";
import request from "./request";

export function getTagAll(){
    return request.get('/api/blog/tag/getall')
}