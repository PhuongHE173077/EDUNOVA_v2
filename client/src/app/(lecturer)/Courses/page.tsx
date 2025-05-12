'use client'
import { fetchCourseBySemesterIdAndSubjectId } from '@/apis/course.apis'
import { fetchCurrentSemester, fetchSemesters } from '@/apis/semester.apis'
import { fetchSubjects } from '@/apis/subject.apis'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loading } from '@/components/ui/loading'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Course, Semesters, Subject } from '@/types'
import { FormLabel } from '@mui/material'
import { ArrowDown, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form'

export default function page() {
    const courseId = "67f52cfafe096d6160e9ce30"
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

    if (loading) return <Loading />
    return (
        <div className='p-7'>
            <div className="w-40">
                <FormLabel className='mb-2 !text-black'>Semester: </FormLabel>
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
            <div className="flex flex-col gap-5 mt-10 ">
                {subjects.map((subject, index) => (
                    <Card
                        className=" mt-2 
                        p-[15px] 
                        rounded-[12px] 
                        bg-[linear-gradient(135deg,_#f9f9f9,_#ffffff)] 
                        shadow-[0_4px_12px_rgba(0,0,0,0.1)] 
                        transition 
                        duration-300 
                        hover:scale-[1.01] 
                        hover:shadow-[0_10px_20px_rgba(202,30,182,0.2)]
                        "
                        key={index}
                        style={{
                            borderColor: activeIndex === index ? '#be2edd' : '',
                        }}
                        onClick={() => toggleCollapse(index, subject._id)}
                    >
                        <CardHeader className='border-b-2'>
                            <CardTitle>{subject.name}</CardTitle>
                            <CardDescription className='flex justify-between'>
                                <div>{subject.description}</div>
                                <div>
                                    <ChevronDown />
                                </div>
                            </CardDescription>
                        </CardHeader>
                        {activeIndex === index && (
                            <>
                                <CardContent className='mt-2'>
                                    <p>List of Class:</p>
                                    <ul className='flex flex-col flex-wrap '>
                                        {courses?.map((course, index) => (
                                            <Link href={`/Courses/` + course._id} key={index}>
                                                <li className='mt-2 list-disc '>{course.id}</li></Link>
                                        ))}
                                    </ul>
                                </CardContent>

                            </>

                        )}

                    </Card>
                ))}



            </div>

            {/* <Link href={`/Courses/Exam?courseId=` + courseId}>Exam</Link> */}
        </div >
    )
}
