'use client'
import { fetchCurrentSemester, fetchSemesters } from '@/apis/semester.apis'
import { Loading } from '@/components/ui/loading'
import { Course, Semesters } from '@/types'
import { useEffect, useState } from 'react'
import { HeaderCourse } from './components/Header'
import { CourseContent } from './components/Content'
import { fetchCourses } from '@/apis/course.apis'

export default function page() {
  const [semesters, setSemesters] = useState<Semesters[]>([])
  const [currentSemester, setCurrentSemester] = useState<Semesters>()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [semRes, curSemRes, courseRes] = await Promise.all([
          fetchSemesters(),
          fetchCurrentSemester(),
          fetchCourses()
        ])
        setSemesters(semRes.data)
        setCurrentSemester(curSemRes.data)
        setCourses(courseRes.data)
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="m-4">
      <div className="">


        {/* <HeaderCourse /> */}
      </div>


      <div className="mt-4">
        {currentSemester && <CourseContent
          courses={courses}
          semester={semesters}
          currentSemester={currentSemester}
        />}
      </div>

    </div>
  )
}
