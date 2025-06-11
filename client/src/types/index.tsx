export interface Semesters {
    _id: String,
    name: String,
    startDate: Date,
    endDate: Date
}

export interface Course {
    _id: string;
    id: string;
    student: User[];
    lecturer: User;
    semester: Semesters;
    subject: Subject;
    startDate: string;
    endDate: string;
    status: string;
    room?: string;
}
export interface CourseFormData {
    subjectId: string;
    lecturerId: string;
    semesterId: string;
    startDate: string;
    endDate?: string; // Thêm dấu ? để không bắt buộc
    status: string;
  }
  

export interface User {
    _id: string;
    email: string;
    displayName: string;
    avatar: string;
    role: string;
    specialize?: string[];
    isActive: boolean;
}

export interface Subject {
    _id: string;
    id: string;
    name: string;
    description: string;
    timeAllocation: string;
    curriculums: {
        _id: string;
        title: string;
        content: string;
    }[];
    documents: string[];
    _destroy: boolean;
}

export interface questionLesson {
    _id: string;
    lessonId: string;
    title: string;
    description: string;
    urlFile: string;
    timeStart: Date;
    timeEnd: Date;
    status: string;
}

export interface lesson {
    _id: string;
    courseId: string;
    title: string;
    questions: [questionLesson];
    status: boolean
}

export interface answerLesson {
    _id: string;
    questionId: string;
    answer: string;
    urlFile: string;
    star: number;
    user: any;
    type: string;
    answerAt: Date;
}

export interface exam {
    _id: string;
    title: string;
    image: string;
    time: string;
    date: string;
    timeEnd: string;
    viewAnswer: Date;
    status: string;
}
export interface VideoRecord {
    _id: string;
    courseId: string;               // Gắn với môn học cụ thể
    title: string;                  // Tên video hoặc buổi học
    description?: string;           // Tóm tắt nội dung buổi học
    url: string;                    // Link nhúng YouTube, Google Meet, Drive...
    createdAt: Date;                // Thời gian ghi hình
    type: "youtube" | "drive" | "mp4";
}
export interface UserRank {
    _id: string;
    name: string;
    avatar: string;
    score: number;
    subject: string;
    badges?: string[];
    streak?: number;
}

