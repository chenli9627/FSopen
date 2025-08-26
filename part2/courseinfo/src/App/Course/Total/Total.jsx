const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, current) => accumulator + current.exercises, 0)
  return <strong>total of {sum} exercises</strong>
  // let sum = 0
  // for (let part of parts) {
  //   // console.log(part.exercises)
  //   sum += part.exercises
  // }
  // return (
  //   <p>total of {sum} exercises</p>
  // )
}

export default Total
