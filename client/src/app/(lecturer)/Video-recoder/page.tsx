"use client";

import { useState, useEffect } from "react";
import { VideoRecord, Course } from "@/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const mockSchedule: Course[] = [
    {
      _id: "c1",
      id: "MATH12",
      student: [
        {
          _id: "u1",
          email: "hs1@gmail.com",
          displayName: "Nguyễn Văn A",
          avatar: "",
          role: "student",
          isActive: true,
        }
      ],
      lecturer: {
        _id: "u2",
        email: "gv1@gmail.com",
        displayName: "Thầy Nam",
        avatar: "",
        role: "lecturer",
        isActive: true,
      },
      semester: {
        _id: "sem1",
        name: "HK2 2024-2025",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-06-01")
      },
      subject: {
        _id: "s1",
        id: "MATH12",
        name: "Toán 12",
        description: "Môn toán lớp 12",
        timeAllocation: "90",
        curriculums: [],
        documents: [],
        _destroy: false
      },
      startDate: "2025-05-14T08:00:00",
      endDate: "2025-05-14T10:00:00",
      status: "ongoing",
      room: "BE-201"
    },
    {
      _id: "c2",
      id: "EN12",
      student: [
        {
          _id: "u3",
          email: "hs2@gmail.com",
          displayName: "Trần Thị B",
          avatar: "",
          role: "student",
          isActive: true,
        }
      ],
      lecturer: {
        _id: "u4",
        email: "gv2@gmail.com",
        displayName: "Cô Hoa",
        avatar: "",
        role: "lecturer",
        isActive: true,
      },
      semester: {
        _id: "sem1",
        name: "HK2 2024-2025",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-06-01")
      },
      subject: {
        _id: "s2",
        id: "EN12",
        name: "English 12",
        description: "Môn tiếng Anh lớp 12",
        timeAllocation: "90",
        curriculums: [],
        documents: [],
        _destroy: false
      },
      startDate: "2025-05-15T09:00:00",
      endDate: "2025-05-15T11:00:00",
      status: "ongoing",
      room: "BE-202"
    }
  ];
  

export default function VideoRecorderPage() {
  // Lưu vào localStorage
  const [videos, setVideos] = useState<VideoRecord[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("videos");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  const [uploading, setUploading] = useState<null | string>(null);
  const [editing, setEditing] = useState<VideoRecord | null>(null);
  const [viewing, setViewing] = useState<VideoRecord | null>(null);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("videos", JSON.stringify(videos));
    }
  }, [videos]);

  const handleUpload = (courseId: string) => {
    setVideos(prev => [
      ...prev,
      {
        _id: Date.now().toString(),
        courseId,
        title: "Video buổi học",
        url: newUrl,
        createdAt: new Date(),
        type: newUrl.includes("youtube") ? "youtube" : "drive",
      },
    ]);
    setUploading(null);
    setNewUrl("");
  };

  const handleEdit = () => {
    if (!editing) return;
    setVideos(prev =>
      prev.map(v =>
        v._id === editing._id
          ? { ...v, url: newUrl, type: newUrl.includes("youtube") ? "youtube" : "drive" }
          : v
      )
    );
    setEditing(null);
    setNewUrl("");
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com")) {
      const match = url.match(/v=([^&]+)/);
      return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    }
    if (url.includes("youtu.be")) {
      const id = url.split("/").pop();
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("drive.google.com")) {
      const match = url.match(/\/d\/([^/]+)/);
      return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
    }
    return url;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📹 Quản lý video buổi học</h1>

      <div className="overflow-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left font-semibold">
            <tr>
              <th className="p-3">Ngày</th>
              <th className="p-3">Thời gian</th>
              <th className="p-3">Môn học</th>
              <th className="p-3">Phòng</th>
              <th className="p-3">Video</th>
            </tr>
          </thead>
          <tbody>
            {mockSchedule.map((s) => {
              const matched = videos.find(v => v.courseId === s._id);
              return (
                <tr key={s._id} className="border-t">
                  <td className="p-3">{new Date(s.startDate).toLocaleDateString()}</td>
                  <td className="p-3">
                    {new Date(s.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(s.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="p-3">{s.subject.name}</td>
                  <td className="p-3">{s.room}</td>
                  <td className="p-3 flex gap-2">
                    {matched ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewing(matched)}
                        >
                          ▶️ Xem
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditing(matched);
                            setNewUrl(matched.url);
                          }}
                        >
                          ✏️ Sửa
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => setUploading(s._id)}>Upload</Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Upload video dialog */}
      <Dialog open={!!uploading} onOpenChange={() => setUploading(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🆙 Upload video</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Dán link video (YouTube/Drive...)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setUploading(null)}>Hủy</Button>
              <Button onClick={() => handleUpload(uploading!)}>Lưu</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit video dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>✏️ Sửa link video</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nhập link video mới"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditing(null)}>Hủy</Button>
              <Button onClick={handleEdit}>Lưu</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Xem video modal */}
      <Dialog open={!!viewing} onOpenChange={() => setViewing(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>🎬 Xem video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {viewing && (
              <iframe
                src={getEmbedUrl(viewing.url)}
                title="Video"
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
