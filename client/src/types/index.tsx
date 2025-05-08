export interface Semesters {
    _id: String,
    name: String,
    startDate: Date,
    endDate: Date
}

export interface Course {
    _id: string;
    students: [User];
    lecturer: User;
    semester: Semesters;
    subject: Subject;
    startDate: string;
    endDate: string;
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
    curriculums: [
        {
            _id: string;
            title: string;
            content: string;
        },
    ];
    documents: [string];
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