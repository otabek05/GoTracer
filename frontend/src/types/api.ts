
export class ApiResponse<T = any> {
    private constructor(
        public status: "success" | "error",
        public message: string,
        public data: T | null
    ) { }

    static success<T>(data: T, message = "OK") {
        return new ApiResponse<T>("success", message, data);
    }

    static error(message: string, data: null = null) {
        return new ApiResponse<null>("error", message, data);
    }

    isSuccess(): this is ApiResponse<T> & { data: T } {
        return this.status === "success";
    }
}