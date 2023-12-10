/* eslint-disable react/prop-types */
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

function Course({ courses }) {
    const initialvalue = 0;
    console.log(courses);
    const total = courses[0].parts.reduce(
        (accumulator, currentvalue) => accumulator + currentvalue.exercises,
        initialvalue
    );
    const courseTotal = courses.map((course) =>
        course.parts.reduce(
            (accumulator, currentvalue) => accumulator + currentvalue.exercises,
            initialvalue
        )
    );
    console.log(total);
    console.log(courseTotal);
    return (
        <>
            {courses.map((course, idx) => (
                <li
                    key={course.id}
                    className="shadow rounded-lg bg-slate-400 p-8 m-8 max-w-md flex flex-col gap-8"
                >
                    <Header course={course.name} />
                    <Content parts={course.parts} />
                    <Total total={courseTotal[idx]} />
                </li>
            ))}           
        </>
    );
}

export default Course;
