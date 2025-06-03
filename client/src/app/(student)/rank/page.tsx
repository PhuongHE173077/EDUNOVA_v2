"use client";

import { useState } from "react";
import { UserRank } from "@/types";
import ModernRankedCard from "./ModernRankedCard";
import RankingInfoPopover from "./RankingInfoPopover";

// Dummy dữ liệu có subject để lọc
const dummyRankings: UserRank[] = [
  { _id: "u1", name: "Nguyễn Văn A", avatar: "https://i.pravatar.cc/150?u=1", score: 920, subject: "Toán cao cấp" },
  { _id: "u2", name: "Trần Thị B", avatar: "https://i.pravatar.cc/150?u=2", score: 870, subject: "Lập trình Web" },
  { _id: "u3", name: "Lê Văn C", avatar: "https://i.pravatar.cc/150?u=3", score: 850, subject: "Tiếng Anh chuyên ngành" },
  { _id: "u4", name: "Đỗ Đăng Phương", avatar: "https://res.cloudinary.com/dl3ucqngx/image/upload/v1741961877/hot-soup_rx8dt3.png", score: 820, subject: "Toán cao cấp" },
  { _id: "u5", name: "Vũ Hữu E", avatar: "https://i.pravatar.cc/150?u=5", score: 790, subject: "Lập trình Web" },
];

export default function RankedPage() {
  const currentUserId = "u4";
  const [subjectFilter, setSubjectFilter] = useState("Tất cả môn");

  const subjects = ["Tất cả môn", ...new Set(dummyRankings.map((u) => u.subject))];

  const filtered = dummyRankings.filter((u) =>
    subjectFilter === "Tất cả môn" ? true : u.subject === subjectFilter
  );

  const sorted = [...filtered].sort((a, b) => b.score - a.score);
  const myData = sorted.find((u) => u._id === currentUserId);
  const myRank = sorted.findIndex((u) => u._id === currentUserId) + 1;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">🔥 Bảng xếp hạng học tập</h1>
        <RankingInfoPopover />
      </div>

      <div className="flex justify-end mb-6">
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 text-sm rounded-md text-gray-700"
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {sorted.map((user, i) => (
          <ModernRankedCard
            key={user._id}
            user={user}
            rank={i + 1}
            highlight={user._id === currentUserId}
          />
        ))}
      </div>
    </div>
  );
}
