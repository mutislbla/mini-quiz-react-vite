const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      full_name: "User 1",
      username: "user1",
      password: "passworduser",
    },
  });

  const question1 = await prisma.questions.upsert({
    where: { question: "Pemain bola apa yang beratnya 3 kg?" },
    update: {},
    create: {
      question: "Pemain bola apa yang beratnya 3 kg?",
      choice: {
        create: [
          {
            isTrue: false,
            choice: "Christiano Ronaldo",
          },
          {
            isTrue: true,
            choice: "Bambang Tabung Gas",
          },
          {
            isTrue: false,
            choice: "Lionel Messi",
          },
          {
            isTrue: false,
            choice: "Neymar",
          },
        ],
      },
    },
  });
  const question2 = await prisma.questions.upsert({
    where: { question: "Penyanyi luar negeri yang suka sepedaan?" },
    update: {},
    create: {
      question: "Penyanyi luar negeri yang suka sepedaan?",
      choice: {
        create: [
          {
            isTrue: false,
            choice: "Justin Bieber",
          },
          {
            isTrue: false,
            choice: "Lady Gaga",
          },
          {
            isTrue: false,
            choice: "Sam Smith",
          },
          {
            isTrue: true,
            choice: "Selena Gowes",
          },
        ],
      },
    },
  });

  const question3 = await prisma.questions.upsert({
    where: { question: "Penyanyi luar negeri yang susah nelen?" },
    update: {},
    create: {
      question: "Penyanyi luar negeri yang susah nelen?",
      choice: {
        create: [
          {
            isTrue: false,
            choice: "Shawn Mendes",
          },
          {
            isTrue: false,
            choice: "Justin Bieber",
          },
          {
            isTrue: true,
            choice: "Ed Sered",
          },
          {
            isTrue: false,
            choice: "Rihanna",
          },
        ],
      },
    },
  });

  const question4 = await prisma.questions.upsert({
    where: { question: "Wakil presiden yang sering nonton streaming?" },
    update: {},
    create: {
      question: "Wakil presiden yang sering nonton streaming?",
      choice: {
        create: [
          {
            isTrue: false,
            choice: "Ma'ruf Amin",
          },
          {
            isTrue: true,
            choice: "Muhammad Youtube Kalla",
          },
          {
            isTrue: false,
            choice: "Prabowo",
          },
          {
            isTrue: false,
            choice: "Anies Baswedan",
          },
        ],
      },
    },
  });

  const question5 = await prisma.questions.upsert({
    where: { question: "Penyanyi yang rambutnya gak lurus?" },
    update: {},
    create: {
      question: "Penyanyi yang rambutnya gak lurus?",
      choice: {
        create: [
          {
            isTrue: false,
            choice: "Vidi Aldiano",
          },
          {
            isTrue: true,
            choice: "Ayu Kriting",
          },
          {
            isTrue: false,
            choice: "Soimah",
          },
          {
            isTrue: false,
            choice: "Inul Daratista",
          },
        ],
      },
    },
  });
  console.log({
    user,
    question1,
    question2,
    question3,
    question4,
    question5,
  });
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
