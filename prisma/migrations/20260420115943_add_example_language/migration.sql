-- CreateEnum
CREATE TYPE "Language" AS ENUM ('KUMAONI', 'GARHWALI', 'JAUNSARI');

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "example" TEXT,
ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'GARHWALI';
