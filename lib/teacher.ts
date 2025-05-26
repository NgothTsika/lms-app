export const isTeacher = (currentUser?: string | null) => {
  return currentUser === process.env.NEXT_PUBLIC_TEACHER_ID;
};
