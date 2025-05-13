"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Course } from "@/types";
import { formatISO } from "date-fns";

interface Props {
  courses: Course[];
}

const subjectGradients: Record<string, string> = {
  MATH101: "from-fuchsia-600 to-rose-500",
  ENG201: "from-emerald-600 to-lime-500",
  IT301: "from-indigo-600 to-purple-500",
  PHY111: "from-sky-600 to-blue-500",
  HIS101: "from-neutral-600 to-stone-500",
};

const getGradient = (subjectId: string, isActive: boolean) => {
  if (!isActive) return "bg-gray-500";
  return `bg-gradient-to-br ${subjectGradients[subjectId] || "from-blue-600 to-cyan-500"}`;
};

export default function ScheduleCalendar({ courses }: Props) {
  const events = courses.map((course) => {
    const start = new Date(course.startDate);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // cộng 2 tiếng
  
    return {
      id: course._id,
      title: `${course.subject.name}`,
      start: formatISO(start),
      end: formatISO(end),
      extendedProps: {
        room: course.room || "N/A",
        status: course.status,
        subjectId: course.subject.id,
        lecturer: course.lecturer.displayName,
      },
    };
  });
  

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        slotMinTime="07:00:00"
        slotMaxTime="19:00:00"
        allDaySlot={false}
        nowIndicator
        height="auto"
        locale="vi"
        eventBorderColor="transparent"
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "timeGridWeek,timeGridDay",
        }}
        buttonText={{
          today: "Hôm nay",
          timeGridWeek: "Tuần",
          timeGridDay: "Ngày",
        }}
        events={events}
        eventContent={(arg) => {
          const { status, room, subjectId, lecturer } = arg.event.extendedProps;
          const isActive = status === "active";
          const gradient = getGradient(subjectId, isActive);

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
