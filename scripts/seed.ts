const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.Category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Filming" },
        { name: "Math" },
        { name: "Physique" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the  database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
