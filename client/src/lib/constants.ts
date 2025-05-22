export const CarouselData = [

  {
    _id: 2,
    image:
      "https://img-c.udemycdn.com/notices/featured_carousel_slide/image/34c63aef-8d1f-483e-b0ea-0ead94879e56.jpg",
    title: "Prep for your IT certificate",
    description:
      "Explore a future in IT. Start learning toward AWS certification, CompTIA A+ certification, and more.",
  },
  {
    _id: 3,
    image:
      "https://img-c.udemycdn.com/notices/featured_carousel_slide/image/487fb3b7-4b6e-4c2f-a3fe-67eb51016502.jpg",
    title: "Prep for your IT certificate",
    description:
      "Explore a future in IT. Start learning toward AWS certification, CompTIA A+ certification, and more.",
  },
];

export const USER_ROLE = {
  STUDENT: "student",
  LECTURER: "lecturer",
  ADMIN: "admin",
}

export const TYPE_QUESTION = {
  QUESTION: 'question',
  ASSIGNMENT: 'assignment'
}

export const DEFAULT_ITEMS_PER_PAGE = 10

export const TYPE_QUESTION_EXAM = {
  MULTIPLE: 'multiple',
  SINGLE: 'single'
}

export const STATUS_EXAM = {
  PENDING: 'pending',
  START: 'start',
  FINISHED: 'finished',
  DOING: 'doing'
}

export const subjectGradients: Record<string, string> = {
  math12: "from-fuchsia-600 to-rose-500",
  english12: "from-emerald-600 to-lime-500",
  english11: "from-indigo-600 to-purple-500",
  PHY111: "from-sky-600 to-blue-500",
  HIS101: "from-neutral-600 to-stone-500",
};