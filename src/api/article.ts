import { AxiosResponse } from "axios";
import request from "./request";

export function getArticlePage(up: number, end: number): Promise<AxiosResponse<any, any>> {
    let reqData = {
        params: {
            page: up,
            number: end
        }
    }
    return request.get('/api/blog/article/getpage', reqData)
}