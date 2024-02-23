'use client'
import React, { useState } from "react";
import localFont from "@next/font/local"
const against = localFont({
  src: "../../public/fonts/Against.ttf",
  variable: "--Against",
})
interface BlogCardProps {
  blog: {
    id : number;
    title: string;
    subtitle: string;
    user_id: number;
    created_at: string;
    image: string;
    content: string;
  };
}

interface User {
  ID: number;
  Username: string;
  Email: string;
  Password: string;
}

const getUserById = async (id: number) => {
  const response = await fetch(`https://haalsamachar-users.onrender.com/users/${id}`);
  const data = await response.json();
  return data;
}

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month} ${year}`;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const user = await getUserById(blog.user_id);
      setUser(user);
    };
    fetchData();
  }, [blog.user_id]);

  const formattedDate = formatDate(blog.created_at);
  return (
    <div className="px-4 flex  flex-col items-left text-left mx-auto">
      <h2 className={`${against.className} text-2xl mt-4 text-left text-bt-teal`}>{blog.title}</h2>
      <p className="text-bt-sage mt-2 text-xl">{blog.subtitle}</p>
      <div className="flex items-center mt-4">
        <p className="text-bt-teal mr-2  text-lg " >Written By: {user?.Username} | </p>
        <p className="text-bt-sage text-lg ">{formattedDate}</p>
      </div>
    </div>
  );
};

export default BlogCard;