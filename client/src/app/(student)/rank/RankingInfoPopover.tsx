"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function RankingInfoPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="text-sm text-gray-600 hover:text-indigo-600 gap-2">
          <Info className="w-4 h-4" />
          Hướng dẫn tích điểm
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 text-sm leading-6 text-gray-700">
        <p className="font-medium mb-2">🎯 Cách tính điểm học tập:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>+10 điểm: Xem xong video bài học</li>
          <li>+5 điểm: Xem `%gt` 80% thời lượng video</li>
          <li>+20 điểm: Làm bài tập đúng</li>
          <li>+50 điểm: Đạt điểm cao kỳ thi</li>
          <li>+5 điểm/ngày: Duy trì streak học</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
