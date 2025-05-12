// app/(student)/video-recorder/page.tsx

"use client";

import { useState } from "react";
import { VideoRecord } from "@/types";
import VideoCard from "./VideoCard";

const dummyVideos: VideoRecord[] = [
  {
    _id: "v1",
    courseId: "C001",
    title: "Buổi 1 - Giới thiệu môn Toán cao cấp",
    description: "Tổng quan môn học, phương pháp học và bài tập.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: new Date("2025-05-10T10:00:00"),
    type: "youtube",
  },
  {
    _id: "v2",
    courseId: "C003",
    title: "Buổi 2 - Lập trình với React",
    description: "Giới thiệu component, props, state trong React.",
    url: "https://www.youtube.com/embed/Ke90Tje7VS0",
    createdAt: new Date("2025-05-11T13:30:00"),
    type: "youtube",
  },
  {
    _id: "v3",
    courseId: "C004",
    title: "Buổi 1 - Vật lý đại cương: Cơ học cơ bản",
    description: "Định luật Newton, chuyển động thẳng, gia tốc.",
    url: "https://www.youtube.com/embed/1AxTCZKaAjY",
    createdAt: new Date("2025-05-12T09:00:00"),
    type: "youtube",
  },
  {
    _id: "v4",
    courseId: "C005",
    title: "Buổi 1 - Lịch sử văn minh thế giới: Ai Cập cổ đại",
    description: "Nền văn minh sông Nile và những điều huyền bí.",
    url: "https://www.youtube.com/embed/lrYx7HaUlMY",
    createdAt: new Date("2025-05-13T14:00:00"),
    type: "youtube",
  },
  {
    _id: "v5",
    courseId: "C002",
    title: "Buổi 3 - Tiếng Anh chuyên ngành: Writing",
    description: "Cách viết báo cáo kỹ thuật và luận văn khoa học.",
    url: "https://www.youtube.com/embed/ScMzIvxBSi4",
    createdAt: new Date("2025-05-14T10:30:00"),
    type: "youtube",
  },
  {
    _id: "v6",
    courseId: "C003",
    title: "Buổi 4 - Lập trình với React: Hooks cơ bản",
    description: "useState, useEffect và cách quản lý dữ liệu.",
    url: "https://www.youtube.com/embed/f687hBjwFcM",
    createdAt: new Date("2025-05-15T08:15:00"),
    type: "youtube",
  },
  {
    _id: "v7",
    courseId: "C001",
    title: "Buổi 2 - Toán cao cấp: Giải tích 1 chiều",
    description: "Đạo hàm, tích phân và ứng dụng.",
    url: "https://www.youtube.com/embed/zOjov-2OZ0E",
    createdAt: new Date("2025-05-16T13:00:00"),
    type: "youtube",
  },
  {
    _id: "v8",
    courseId: "C005",
    title: "Buổi 2 - Văn minh phương Tây: Hy Lạp cổ đại",
    description: "Thành bang, thần thoại, nền dân chủ đầu tiên.",
    url: "https://www.youtube.com/embed/PYyAXYRIymY",
    createdAt: new Date("2025-05-17T15:45:00"),
    type: "youtube",
  },
  {
    _id: "v9",
    courseId: "C004",
    title: "Buổi 2 - Vật lý: Động lực học và ma sát",
    description: "Ma sát trượt, thế năng, bảo toàn cơ năng.",
    url: "https://www.youtube.com/embed/Iwpi1Lm6dFo",
    createdAt: new Date("2025-05-18T09:30:00"),
    type: "youtube",
  },
  {
    _id: "v10",
    courseId: "C002",
    title: "Buổi 4 - Speaking Practice: Business English",
    description: "Thực hành hội thoại trong môi trường công sở.",
    url: "https://www.youtube.com/embed/E7wJTI-1dvQ",
    createdAt: new Date("2025-05-19T11:00:00"),
    type: "youtube",
  },
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
