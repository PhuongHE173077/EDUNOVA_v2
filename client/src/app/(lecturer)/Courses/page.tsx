import Link from 'next/link'
import React from 'react'

export default function page() {
    const courseId = "67f52cfafe096d6160e9ce30"
    return (
        <div>

            <Link href={`/Courses/Exam?courseId=` + courseId}>Exam</Link>
        </div>
    )
}
