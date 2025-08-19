-- CreateTable
CREATE TABLE "public"."projects" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tasks" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "targetDate" TEXT,
    "priority" TEXT,
    "priorityRank" INTEGER,
    "assignedTo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);
