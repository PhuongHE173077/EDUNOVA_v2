import { UserRank } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  user: UserRank;
  rank: number;
  highlight?: boolean;
}

// Badge cấp bậc theo điểm
const getTier = (score: number) => {
  if (score >= 950) return { label: "Diamond", color: "bg-gradient-to-r from-cyan-400 to-blue-600", icon: "💎" };
  if (score >= 850) return { label: "Platinum", color: "bg-gradient-to-r from-indigo-400 to-indigo-600", icon: "🔷" };
  if (score >= 700) return { label: "Gold", color: "bg-yellow-400", icon: "🥇" };
  if (score >= 500) return { label: "Silver", color: "bg-gray-400", icon: "🥈" };
  return { label: "Bronze", color: "bg-amber-600", icon: "🥉" };
};

const badgeIcons: Record<string, string> = {
  "📚 Chuyên cần": "📚",
  "⚡ Tăng tốc": "⚡",
  "🔥 Liên tục": "🔥",
  "👑 Xuất sắc": "👑",
};

export default function ModernRankedCard({ user, rank, highlight = false }: Props) {
  const isTop3 = rank <= 3;
  const tier = getTier(user.score);

  return (
    <div
      className={cn(
        "relative bg-white border rounded-xl shadow-md p-4 transition",
        highlight
          ? "border-blue-400 ring-2 ring-blue-300 bg-blue-50"
          : "border-gray-200 hover:shadow-lg"
      )}
    >
      {highlight && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
          👤 Bạn
        </div>
      )}

      <div className="flex items-center gap-4">
        <div
          className={cn(
            "text-white text-xs font-bold px-3 py-1 rounded-full",
            tier.color
          )}
        >
          #{rank}
        </div>

        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-300"
        />

        <div className="flex-1">
          <div className="font-medium text-gray-800 line-clamp-1">{user.name}</div>

          <div className="flex flex-wrap gap-2 mt-1 text-xs">
            {/* 🏆 Badge cấp bậc */}
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium shadow-sm">
              {tier.icon} {tier.label}
            </span>

            {user.badges?.map((badge) => (
              <span
                key={badge}
                className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium shadow-sm"
              >
                {badgeIcons[badge] || "🏅"} {badge}
              </span>
            ))}
            {user.streak && (
              <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium shadow-sm">
                🔥 {user.streak} ngày liên tục
              </span>
            )}
          </div>
        </div>

        <div className="font-bold text-indigo-600 text-sm">{user.score} điểm</div>
      </div>
    </div>
  );
}
