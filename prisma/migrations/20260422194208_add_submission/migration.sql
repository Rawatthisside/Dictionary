-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "word_en" TEXT,
    "meaning" TEXT NOT NULL,
    "example" TEXT,
    "language" "Language" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);
