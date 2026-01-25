'use client';

import { fetchCourseBySemesterIdAndSubjectId } from '@/apis/course.apis';
import { fetchCurrentSemester, fetchSemesters } from '@/apis/semester.apis';
import { fetchSubjects } from '@/apis/subject.apis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { FormLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { Course, Semesters, Subject } from '@/types'
import { useRouter } from 'next/navigation';

const courses2 = [
  {
    name: 'Tiếng anh 10',
    code: 'toan10',
    dates: '01/07/2025 - 1/09/2025',
    grades: [
      {
        category: 'Điểm 15p', items: [
          { name: 'Điểm 1', weight: '5.0%', value: '8.9' },
          { name: 'Điểm 2', weight: '5.0%', value: '8.3' },
          { name: 'Điểm 3', weight: '5.0%', value: '8.1' },
        ]
      },
      {
        category: 'Kiểm tra 1 tiết ', items: [
          { name: 'Kiểm tra 1', weight: '7.5%', value: '8.3' },
          { name: 'Kiểm tra 2', weight: '7.5%', value: '9.0' },
        ]
      },
      {
        category: 'Kiểm tra cuối kỳ', items: [
          { name: 'Kiểm tra cuối kỳ', weight: '20.0%', value: '8.5' },
        ]
      },
    ],
    average: '8.5',
    status: 'PASSED'
  },
  {
    name: 'Tiếng Anh 11',
    code: 'Kiểm tra cuối kỳ',
    dates: '01/07/2025 - 1/09/2025',
    grades: [],
    average: '',
    status: ''
  },
];

export default function CourseGradesPage() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [semesters, setSemesters] = useState<Semesters[]>([])
  const [currentSemester, setCurrentSemester] = useState<Semesters>()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCollapse = async (index: any, id: string) => {
    setActiveIndex(prevIndex => prevIndex === index ? null : index);
    if (!currentSemester) return
    await fetchCourseBySemesterIdAndSubjectId(currentSemester._id, id).then((res) => {
      setCourses(res.data)
    })
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [semRes, curSemRes] = await Promise.all([
          fetchSemesters(),
          fetchCurrentSemester(),

        ])
        setSemesters(semRes.data)
        setCurrentSemester(curSemRes.data)
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {

    if (currentSemester) {
      fetchSubjects(currentSemester._id).then((res) => {
        setSubjects(res.data)
      })
    }
    setActiveIndex(null)

  }, [currentSemester])

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-6 pt-2 ">
      <div className="w-40 mb-2">
        <FormLabel className='mb-2 !text-black !font-bold'>Semester: </FormLabel>
        <Select
          value={currentSemester?._id}
          onValueChange={(value) => {
            const selected = semesters.find((sem) => sem._id === value)
            if (selected) setCurrentSemester(selected)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {semesters.slice().reverse().map((semester) => (
              <SelectItem key={semester._id} value={semester._id}>
                {semester.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col md:flex-row min-h-300 gap-6">

        <Card className={cn(
          "w-full transition-all duration-300 shadow-md",
          selectedCourse ? "md:w-1/3" : "md:w-full"
        )}>
          <CardHeader>
            <CardTitle className="text-blue-700">📚 Course List</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-280px)] pr-2">
              <ul className="space-y-2">
                {courses2.map((course: any, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className={cn(
                        'w-full text-left p-3 rounded-md transition hover:bg-blue-100',
                        selectedCourse?.name === course.name && 'bg-blue-200 font-semibold shadow-inner'
                      )}
                    >
                      <div className="text-sm font-medium text-gray-900">{course.name}</div>
                      <div className="text-xs text-gray-500">{course.code} | {course.dates}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        {selectedCourse && (
          <Card className="w-full md:flex-1 mt-6 md:mt-0 shadow-md animate-fade-in">
            <CardHeader>
              <CardTitle className="text-blue-700">📄 {selectedCourse.name}</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              {selectedCourse.grades.length > 0 ? (
                <table className="w-full text-sm border border-gray-200 rounded-md shadow-sm">
                  <thead className="bg-gray-100 text-gray-800">
                    <tr>
                      <th className="p-3 text-left">Grade Category</th>
                      <th className="p-3 text-left">Grade Item</th>
                      <th className="p-3 text-center">Weight</th>
                      <th className="p-3 text-center">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCourse.grades.map((group: any, i: number) =>
                      group.items.map((item: any, j: number) => (
                        <tr key={`${i}-${j}`} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="p-3">{j === 0 ? group.category : ''}</td>
                          <td className="p-3">{item.name}</td>
                          <td className="p-3 text-center">{item.weight}</td>
                          <td className="p-3 text-center">{item.value}</td>
                        </tr>
                      ))
                    )}
                    <tr className="bg-green-50 border-t font-semibold text-green-700">
                      <td colSpan={4} className="p-3 text-right">
                        Điểm trung bình : {selectedCourse.average}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 italic text-sm mt-4">Không cơ sở dữ liệu</p>
              )}
            </CardContent>
          </Card>
        )}
      </div></div>

  );
}
