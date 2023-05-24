const json = {
  data: [
    {
      id: 1,
      uuid: "123asdf",
      task: "title1",
      isCompleted: 1,
      lastUpdatedAt: "2023-05-23 16:56:26",
    },
    {
      id: 2,
      uuid: "23fasd",
      task: "title2",
      isCompleted: 0,
      lastUpdatedAt: "2023-05-23",
    },
  ],
};

// for (let i of json) {
//   console.log(i);
// }

const scores = [22, 54, 76, 92, 43, 33];

for (let i in scores) {
//   console.log(typeof i);
  console.log(i);
}
