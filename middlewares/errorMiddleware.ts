const ApiError = require("../errors/ApiErrors");

export default function (err: any, req: any, res: any) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Unexpected error" });
}
