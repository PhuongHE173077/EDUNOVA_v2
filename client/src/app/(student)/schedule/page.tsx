import ScheduleCalendar from "./ScheduleCalendar";
import { dummyCourses } from "./dummy";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Lịch học theo tuần</h1>
      <ScheduleCalendar courses={dummyCourses} />
    </div>
  );
}
