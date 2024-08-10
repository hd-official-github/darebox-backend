-- DropForeignKey
ALTER TABLE `Choice` DROP FOREIGN KEY `Choice_quizQuestionId_fkey`;

-- DropForeignKey
ALTER TABLE `QuizQuestion` DROP FOREIGN KEY `QuizQuestion_quizModelId_fkey`;

-- AddForeignKey
ALTER TABLE `QuizQuestion` ADD CONSTRAINT `QuizQuestion_quizModelId_fkey` FOREIGN KEY (`quizModelId`) REFERENCES `QuizModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Choice` ADD CONSTRAINT `Choice_quizQuestionId_fkey` FOREIGN KEY (`quizQuestionId`) REFERENCES `QuizQuestion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
