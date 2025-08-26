import Header from './Header/Header.jsx'; // Assuming Header is also a default export
import Content from './Content/Content.jsx'; // Change to default import
import Total from './Total/Total.jsx'

const Course = ({ course }) => {
  return (
    <div>
      {<Header header={course.name} />}
      {<Content parts={course.parts} />}
      {<Total parts={course.parts} />}
    </div>
  )

}
const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </div>
  );
};
export default Courses;
