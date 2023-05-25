import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

async function main() {
  const response = await Promise.all([
    await prisma.todo.create({
      data: {
        uuid: uuidv4(),
        task: "Send a gift",
        isCompleted: false,
      },
    }),
    await prisma.todo.create({
      data: {
        uuid: uuidv4(),
        task: "Stop obsessing over the past",
        isCompleted: false,
      },
    }),
    await prisma.todo.create({
      data: {
        uuid: uuidv4(),
        task: "Accept fate",
        isCompleted: false,
      },
    }),
    await prisma.todo.create({
      data: {
        uuid: uuidv4(),
        task: "Be grateful and kind",
        isCompleted: false,
      },
    }),
  ]);
  console.log(response);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
