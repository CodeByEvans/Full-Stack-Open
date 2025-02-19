import Header from './Header';
import Content from './Content';
import Total from './Total';
  
const Course = ({courses}) => {
    return (
        <div>
            {courses.map((course) => {
                return (
                    <>
                      <Header courses={course}/>
                      <Content courses={course}/>
                      <Total courses={course}/>
                    </>
                )
            })}
        </div>
    )
}

export default Course;