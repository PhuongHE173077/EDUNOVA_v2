'use client';
import { useEffect, useState } from "react";
import ScheduleCalendar from "./ScheduleCalendar";
import { dummyCourses } from "./dummy";
import { fetchSchedule } from "@/apis/schedule.apis";

export default function Page() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchSchedule().then((res) => {
      setSchedules(res.data);
    })
  }, [])
  return (
    <div className="max-h-screen bg-gray-50 p-6">

      <ScheduleCalendar courses={schedules} />
    </div>
  );
}
