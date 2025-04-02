const baseUrl = process.env.VITE_BASE_URL;
if (!baseUrl) throw Error("環境変数`VITE_ORIGIN`を設定してください。");
export const BASE_URL = baseUrl;
