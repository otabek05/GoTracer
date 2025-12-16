import axios from "axios";



export function handleError(e:any): string {
    if (axios.isAxiosError(e)) {
        return e.response?.data?.message
    }

    return "unknown error"
}