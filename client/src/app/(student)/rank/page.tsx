"use client";

import { useState } from "react";
import { UserRank } from "@/types";
import ModernRankedCard from "./ModernRankedCard";
import RankingInfoPopover from "./RankingInfoPopover";

const dummyRankings: UserRank[] = [
  { _id: "u1", name: "Nguyễn Văn A", avatar: "https://i.pravatar.cc/150?u=1", score: 920, subject: "Toán cao cấp" },
  { _id: "u2", name: "Trần Thị B", avatar: "https://i.pravatar.cc/150?u=2", score: 870, subject: "Lập trình Web" },
  { _id: "u3", name: "Lê Văn C", avatar: "https://i.pravatar.cc/150?u=3", score: 850, subject: "Tiếng Anh chuyên ngành" },
  { _id: "u4", name: "Phạm Thị D", avatar: "https://i.pravatar.cc/150?u=4", score: 820, subject: "Toán cao cấp" },
  { _id: "u5", name: "Vũ Hữu E", avatar: "https://i.pravatar.cc/150?u=5", score: 790, subject: "Lập trình Web" },
];

export default function RankedPage() {
  const [filter, setFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("Tất cả môn");

  const subjects = ["Tất cả môn", ...new Set(dummyRankings.map((u) => u.subject))];
  const filtered = subjectFilter === "Tất cả môn"
    ? dummyRankings
    : dummyRankings.filter((u) => u.subject === subjectFilter);

  const sorted = [...filtered].sort((a, b) => b.score - a.score);
  const currentUserId = "u4";
  const myData = sorted.find((u) => u._id === currentUserId);
  const myRank = sorted.findIndex((u) => u._id === currentUserId) + 1;
  const rest = sorted.filter((u) => u._id !== currentUserId);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">🔥 Bảng xếp hạng học tập</h1>
        <RankingInfoPopover />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {["All time", "Tháng này", "Tuần này"].map((label, i) => {
          const value = i === 0 ? "all" : i === 1 ? "month" : "week";
          return (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-1.5 text-sm rounded-lg border font-medium transition ${filter === value
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {label}
            </button>
          );
        })}

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="ml-auto px-3 py-1.5 border border-gray-300 text-sm rounded-md text-gray-700"
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3 mt-6">
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
