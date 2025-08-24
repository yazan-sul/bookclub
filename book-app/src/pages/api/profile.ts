import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = {
    id: 1,
    name: "Yazan Sulaiman",
    email: "yazan@example.com",
    avatar: "https://i.pravatar.cc/150?img=3", 
  };
  res.status(200).json(user);
}
