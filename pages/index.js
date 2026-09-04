import { useState } from "react";

export default function Home() {
  const [tweet, setTweet] = useState("");

  const generateTweet = async () => {
    const res = await fetch("/api/generate", { method: "POST" });
    const data = await res.json();
    setTweet(data.tweet);
  };

  return (
    <div className="p-6">
      <button onClick={generateTweet} className="bg-blue-500 text-white px-4 py-2 rounded">
        Generate Tweet
      </button>
      <p className="mt-4">{tweet}</p>
    </div>
  );
}
