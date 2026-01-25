// app/(student)/video-recorder/page.tsx

"use client";

import { useState } from "react";
import { VideoRecord } from "@/types";
import VideoCard from "./VideoCard";

const dummyVideos: VideoRecord[] = [

  {
    _id: "v5",
    courseId: "C002",
    title: "Buổi 3 - Tiếng Anh chuyên ngành: Writing",
    description: "Cách viết báo cáo kỹ thuật và luận văn khoa học.",
    url: "https://www.youtube.com/embed/ScMzIvxBSi4",
    createdAt: new Date("2025-05-14T10:30:00"),
    type: "youtube",
  }
];

const subjectMap: Record<string, string> = {
  C001: "Toán cao cấp",
  C002: "Tiếng Anh chuyên ngành",
  C003: "Lập trình Web",
  C004: "Vật lý đại cương",
  C005: "Lịch sử văn minh",
};

export default function VideoRecorderPage() {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchText, setSearchText] = useState("");

  const filteredVideos = dummyVideos.filter((v) => {
    const matchSubject =
      selectedSubject === "all" || v.courseId === selectedSubject;
    const matchText = v.title
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());
    return matchSubject && matchText;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">📹 Video các buổi học</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 ring-indigo-400"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="all">Tất cả môn học</option>
          {Object.entries(subjectMap).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="🔍 Tìm kiếm tiêu đề video..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 ring-indigo-400"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {filteredVideos.length === 0 ? (
        <p className="text-sm text-gray-500 italic">Không có video phù hợp.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
