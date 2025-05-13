import { VideoRecord } from "@/types";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

interface Props {
  video: VideoRecord;
}

const subjectMap: Record<string, { name: string; color: string }> = {
  C001: { name: "Toán cao cấp", color: "bg-pink-500" },
  C002: { name: "Tiếng Anh", color: "bg-green-500" },
  C003: { name: "Lập trình Web", color: "bg-indigo-500" },
  C004: { name: "Vật lý", color: "bg-sky-500" },
  C005: { name: "Lịch sử", color: "bg-gray-500" },
};

export default function VideoCard({ video }: Props) {
  const subject = subjectMap[video.courseId] || {
    name: "Môn học khác",
    color: "bg-gray-400",
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 group">
      {/* ✅ Badge môn học */}
      <div className="absolute top-3 left-3 z-10">
        <div className={`px-2 py-1 text-[10px] font-medium text-white rounded-md shadow ${subject.color}`}>
          {subject.name}
        </div>
      </div>

      {/* ✅ Video + overlay không chặn click */}
      <div className="relative aspect-video z-0">
        <iframe
          src={video.url}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition pointer-events-none" />
      </div>

      {/* ✅ Nội dung mô tả */}
      <div className="p-4 space-y-2">
        <h2 className="text-base font-semibold text-gray-900 group-hover:underline line-clamp-2">
          {video.title}
        </h2>
        {video.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
        )}
        <div className="flex items-center text-xs text-gray-400 mt-2 gap-1">
          <CalendarDays size={14} className="shrink-0" />
          <span>{format(video.createdAt, "dd/MM/yyyy HH:mm")}</span>
        </div>
      </div>
    </div>
  );
}
