'use client';
import { useEffect, useState } from "react";
import ScheduleCalendar from "./ScheduleCalendar";
import { fetchSchedule } from "@/apis/schedule.apis";
import { fetchAttend } from "@/apis/attend.apis";

export default function Page() {
  const [schedules, setSchedules] = useState([]);
  const [attends, setAttends] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchSchedule().then((res) => {
      setSchedules(res.data);
    })
    fetchAttend().then((res) => {
      setAttends(res.data);
    })
  }, [])
  return (
    <div className="max-h-screen bg-gray-50 p-6">

      <ScheduleCalendar courses={schedules} attends={attends} />
    </div>
  );
}
