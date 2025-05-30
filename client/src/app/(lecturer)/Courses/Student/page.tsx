'use client'

import { fetchCoursesById } from '@/apis/course.apis';
import { Loading } from '@/components/ui/loading';
import { Course } from '@/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Avatar,
    AvatarImage
} from '@/components/ui/avatar';
import {
    Card,
    CardHeader,
    CardContent,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function StudentListPage() {
    const [course, setCourse] = useState<Course>();
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            if (!courseId) return;
            try {
                const res = await fetchCoursesById(courseId);
                setCourse(res.data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [courseId]);

    if (loading) return <Loading />;

    return (
        <div className=" mx-auto p-4 space-y-4">
            <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
            >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
            </button>

            <h1 className="text-2xl font-bold mt-2">Danh sách học sinh</h1>

            {course?.student?.length === 0 && (
                <p className="text-gray-500 italic">Chưa có học sinh nào được thêm vào lớp.</p>
            )}

            {course?.student?.map((user: any, index: number) => (
                <Card key={index} className="flex items-center gap-4 p-4 shadow-sm border border-gray-200">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={user.avatar} alt={user.displayName || 'Avatar'} />
                    </Avatar>
                    <CardContent className="p-0">
                        <p className="text-lg font-medium text-gray-900">{user.displayName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
