-- CreateIndex
CREATE INDEX "Word_word_en_idx" ON "Word"("word_en");

-- CreateIndex
CREATE INDEX "Word_language_idx" ON "Word"("language");

-- CreateIndex
CREATE INDEX "Word_createdAt_idx" ON "Word"("createdAt");
