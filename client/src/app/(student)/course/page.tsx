'use client'
import { fetchSemesters } from '@/apis/semester.apis'
import { getAllUsers } from '@/apis/user.apis'
import { Loading } from '@/components/ui/loading'
import { Semesters } from '@/types'
import { useEffect, useState } from 'react'

export default function page() {
  const [semesters, setSemesters] = useState<Semesters[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllUsers().then(res => {
      console.log(res.data);
    })

  }, [])

  if (loading) return <Loading />

  return (
    <div>
      {/* {semesters.map((semester, index) => (
        <div key={index}>{semester.name}</div>
      ))} */}
    </div>
  )
}
