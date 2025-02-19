const Content = ({courses}) => {
    return (
      <div>
        {courses.parts.map((part, index) => (
          <p key={index}>
            {part.name} {part.exercises}
          </p>
        ))}
      </div>
    )
  }

export default Content;