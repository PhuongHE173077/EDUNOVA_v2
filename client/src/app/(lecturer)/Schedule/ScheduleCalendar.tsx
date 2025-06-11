"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Course } from "@/types";
import { formatISO } from "date-fns";
import dayGridPlugin from "@fullcalendar/daygrid";
import { subjectGradients } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { BookOpenIcon, BuildingIcon, CheckCircleIcon, ClockIcon, VideoIcon } from "lucide-react";
interface Props {
  courses: Course[];
}

const getGradient = (subjectId: string, isActive: boolean) => {
  // if (!isActive) return "bg-gray-500";
  return `bg-gradient-to-br from-indigo-500 to-pink-500 "}`;
};

export default function ScheduleCalendar({ courses }: Props) {
  const events = courses.map((course: any) => ({
    id: course._id,
    title: `${course.course.subject.name}`,
    start: course.start,
    end: course.end,
    extendedProps: {
      room: course?.room || "N/A",
      status: course?.status,
      subjectId: course.course.subject?.id,
      lecturer: course?.course?.lecturer?.displayName,
    },
  }));

  const router = useRouter();
  return (
    <div className="p-4 flex-1 overflow-auto ">
      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
          initialView="timeGridWeek"
          slotMinTime="07:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          nowIndicator
          height="80vh"
          locale="vi"
          eventBorderColor="transparent"
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "Hôm nay",
            timeGridWeek: "Tuần",
            timeGridDay: "Ngày",
            dayGridMonth: "Tháng",

          }}
          events={events}

          eventContent={(arg) => {
            const { status, room, subjectId, lecturer } = arg.event.extendedProps;
            const start = new Date(arg.event.start!);
            const end = new Date(arg.event.end!);
            const isActive = status === "active";
            const gradient = getGradient(subjectId, isActive);
            const viewType = arg.view.type;
            if (viewType === "dayGridMonth") {
              return (
                <div
                  className={`rounded-lg px-2 w-full py-1 text-white text-xs ${gradient} hover:brightness-110`}
                  title={`${arg.event.title} - ${lecturer} - Phòng ${room}`}
                >
                  <div className="font-semibold text-[12px] truncate">{arg.event.title}</div>
                </div>
              );
            }

            return (
              <div
                className="rounded-xl border border-green-400 bg-white px-3 py-2 shadow-md transition-all hover:scale-[1.01] hover:brightness-105 cursor-pointer"
                onClick={() =>
                  router.push(`/Attendance?id=${arg.event.id}&courseId=${arg.event.id}`)
                }
                title={`${arg.event.title} - ${lecturer} - Phòng ${room}`}
              >
                {/* Dòng đầu: Mã môn học + icon */}
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-semibold text-sm">{arg.event.title}</span>
                  <div className="flex items-center space-x-1">
                    {/* <VideoIcon className="w-4 h-4 text-green-500" />
                  <CheckCircleIcon className="w-4 h-4 text-green-500" /> */}
                  </div>
                </div>

                {/* Dòng thời gian */}
                <div className="flex items-center text-gray-500 text-xs mt-1">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {start.getHours().toString().padStart(2, '0')}:
                  {start.getMinutes().toString().padStart(2, '0')} -
                  {end.getHours().toString().padStart(2, '0')}:
                  {end.getMinutes().toString().padStart(2, '0')}
                </div>

                {/* Dòng phòng học */}
                <div className="flex items-center text-gray-400 text-xs mt-0.5">
                  <BuildingIcon className="w-4 h-4 mr-1" />
                  {room}
                </div>

                {/* Icon mở rộng (như hình có cuốn sách) */}
                <div className="flex justify-end mt-1">
                  <BookOpenIcon className="w-4 h-4 text-blue-400" />
                </div>
              </div>

            );
          }}
        /></div>
    </div>
  );
}
