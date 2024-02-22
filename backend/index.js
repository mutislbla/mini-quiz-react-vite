const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = user.userId;
  next();
}

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    optionsSuccessStatus: 200,
  })
);

//register
app.post("/register", async (req, res) => {
  const { full_name, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        full_name,
        username,
        email,
        password: hashedPassword,
      },
    });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid credentials" });
  }
});

//get user info
app.get("/user", authenticateTokenMiddleware, async (req, res) => {
  const user = await prisma.user.findFirst({
    where: { id: req.userId },
    select: {
      username: true,
      full_name: true,
    },
  });
  res.json({ user });
});

//get all question
app.get("/question", async (req, res) => {
  const question = await prisma.questions.findMany({
    include: {
      choice: true,
    },
  });
  res.json({ question });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
