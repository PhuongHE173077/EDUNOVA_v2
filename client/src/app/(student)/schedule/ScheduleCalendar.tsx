"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Course } from "@/types";
import { formatISO } from "date-fns";
import dayGridPlugin from "@fullcalendar/daygrid";
interface Props {
  courses: Course[];
}

const subjectGradients: Record<string, string> = {
  math12: "from-fuchsia-600 to-rose-500",
  english12: "from-emerald-600 to-lime-500",
  english11: "from-indigo-600 to-purple-500",
  PHY111: "from-sky-600 to-blue-500",
  HIS101: "from-neutral-600 to-stone-500",
};

const getGradient = (subjectId: string, isActive: boolean) => {
  // if (!isActive) return "bg-gray-500";
  return `bg-gradient-to-br ${subjectGradients[subjectId] || "from-blue-600 to-cyan-500"}`;
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
      lecturer: course?.lecturer?.displayName,
    },
  }));

  return (
    <div className="p-4 flex-1 overflow-auto ">
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
              className={`
                rounded-xl px-3 py-2 text-white text-xs shadow-xl
                h-full w-full overflow-hidden transition-all duration-200
                ${gradient} hover:scale-[1.01] hover:brightness-110
              `}

              title={`${arg.event.title} - ${lecturer} - Phòng ${room}`}
            >
              <div className="font-bold text-sm leading-snug text-white">
                {arg.event.title}
              </div>
              <div className="text-[10px] "> ({start.getHours().toString().padStart(2, '0')}:{start.getMinutes().toString().padStart(2, '0')}-
                {end.getHours().toString().padStart(2, '0')}:{end.getMinutes().toString().padStart(2, '0')})</div>

              <div className="text-[11px] text-white/90">{lecturer}</div>
              <div className="text-[11px] text-white/80">Phòng: {room}</div>
              <div className="text-[10px] italic text-white/70">
                {isActive ? "Đang học" : "Đã kết thúc"}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
