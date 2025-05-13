"use client";

import AchievementCard from "./AchievementCard";

const achievements = [
  {
    id: "lesson100",
    title: "📚 Hoàn tất 100 bài học",
    description: "Bạn đã hoàn thành 100 bài học trong hệ thống.",
    unlocked: true,
  },
  {
    id: "streak7",
    title: "🔥 Học 7 ngày liên tiếp",
    description: "Bạn duy trì streak 7 ngày học không nghỉ.",
    unlocked: false,
  },
  {
    id: "quiz100",
    title: "💯 Quiz Master",
    description: "Đạt 100% điểm trong một bài kiểm tra.",
    unlocked: true,
  },
  {
    id: "video10",
    title: "🎥 Xem đủ 10 video",
    description: "Xem đủ 10 video bài giảng bất kỳ.",
    unlocked: true,
  },
  {
    id: "top1week",
    title: "🥇 Top 1 trong tuần",
    description: "Đứng đầu bảng xếp hạng tuần.",
    unlocked: false,
  },
  {
    id: "badge50",
    title: "🏅 Sưu tập 5 huy hiệu",
    description: "Tích lũy được 5 badge thành tích khác nhau.",
    unlocked: false,
  },
];

export default function AchievementsPage() {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">🏆 Thành tựu học tập</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {achievements.map((a) => (
          <AchievementCard
            key={a.id}
            title={a.title}
            icon={a.title.slice(0, 2)}
            description={a.description}
            unlocked={a.unlocked}
          />
        ))}
      </div>
    </div>
  );
}
