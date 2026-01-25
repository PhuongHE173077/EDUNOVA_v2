"use client";

import { useState } from "react";
import { UserRank } from "@/types";
import ModernRankedCard from "./ModernRankedCard";
import RankingInfoPopover from "./RankingInfoPopover";
import { useSelector } from "react-redux";
import { selectedCurrentUser } from "@/lib/redux/user/user.slide";

// Dummy dữ liệu có subject để lọc


export default function RankedPage() {
  const currentUserId = "u4";
  const [subjectFilter, setSubjectFilter] = useState("Tất cả môn");

  const currentUser = useSelector(selectedCurrentUser)

  const dummyRankings: UserRank[] = [
    { _id: "u1", name: "Lưu Diệu Anh", avatar: "/images/user_image.png", score: 9.5, subject: "Toán 11" },
    { _id: "u2", name: "TNguyễn Tuấn Anh", avatar: "/images/user_image.png", score: 9.0, subject: "Toán 10" },
    { _id: "u3", name: "Lê Văn C", avatar: "/images/user_image.png", score: 8.6, subject: "Tiếng Anh 11" },
    { _id: "u4", name: currentUser.displayName, avatar: currentUser.avatar || "/images/user_image.png", score: 8.5, subject: "Toán 12" },
    { _id: "u5", name: "Mai Thế Bảo", avatar: "/images/user_image.png", score: 8.3, subject: "Toán 11" },
  ];
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
