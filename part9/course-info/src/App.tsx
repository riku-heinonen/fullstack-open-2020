import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: 'State handling';
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

interface HeaderProps {
  courseName: string;
}

interface PartProps {
  coursePart: CoursePart;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  exerciseCount: number;
}

const Header: React.FC<HeaderProps> = ({ courseName }) => <h1>{courseName}</h1>;

const Part: React.FC<PartProps> = ({ coursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (coursePart.name) {
    case 'Fundamentals':
      return (
        <p>
          Name: {coursePart.name} | Exercises: {coursePart.exerciseCount}{' '}
          | Description: {coursePart.description}
        </p>
      );
    case 'Using props to pass data':
      return (
        <p>
          Name: {coursePart.name} | Exercises: {coursePart.exerciseCount} |
          Group projects: {coursePart.groupProjectCount}
        </p>
      );
    case 'Deeper type usage':
      return (
        <p>
          Name: {coursePart.name} | Exercises: {coursePart.exerciseCount}{' '}
          | Description: {coursePart.description}
          | Exercise submissions: {coursePart.exerciseSubmissionLink}
        </p>
      );
    case 'State handling':
      return (
        <p>
          Name: {coursePart.name} | Exercises: {coursePart.exerciseCount}{' '}
          | Description: {coursePart.description}
        </p>
      );
    default:
      return assertNever(coursePart);
  }
};

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <Part coursePart={coursePart}></Part>
      ))}
    </div>
  );
};

const Total: React.FC<TotalProps> = ({ exerciseCount }) => (
  <p>Number of exercises {exerciseCount}</p>
);

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
    {
      name: 'State handling',
      exerciseCount: 20,
      description: 'A description',
    },
  ];
  const exerciseCount: number = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header courseName={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <Total exerciseCount={exerciseCount}></Total>
    </div>
  );
};

export default App;
