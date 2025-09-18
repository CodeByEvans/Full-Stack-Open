import type { CoursePart } from "../types";

type ContentProps = {
  courseParts: CoursePart[];
};

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                <em>{part.description}</em>
              </div>
            );
          case "group":
            return (
              <div key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                Group projects: {part.groupProjectCount}
              </div>
            );
          case "background":
            return (
              <div key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                <em>{part.description}</em>
                <br />
                Background:{" "}
                <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
              </div>
            );
          case "special":
            return (
              <div key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                <em>{part.description}</em>
                <br />
                Requirements: {part.requirements.join(", ")}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Content;
