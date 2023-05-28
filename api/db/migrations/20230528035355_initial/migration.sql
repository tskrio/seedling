-- CreateTable
CREATE TABLE "Property" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'string',
    "value" TEXT,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "SideBarItem" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "iconFamily" TEXT,
    "link" TEXT,
    "order" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "type" TEXT NOT NULL DEFAULT 'link',

    CONSTRAINT "SideBarItem_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "Message" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "language" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "User" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "name" TEXT NOT NULL DEFAULT '',
    "username" TEXT NOT NULL DEFAULT '',
    "verifiedAt" TIMESTAMP(3),
    "email" TEXT DEFAULT '',
    "hashedPassword" TEXT DEFAULT '',
    "salt" TEXT DEFAULT '',
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "Preference" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "entity" TEXT NOT NULL,
    "value" TEXT,
    "userCuid" TEXT NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "Group" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "GroupMember" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "userCuid" TEXT NOT NULL,
    "groupCuid" TEXT NOT NULL,

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "GroupRole" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "role" TEXT NOT NULL,
    "groupCuid" TEXT NOT NULL,

    CONSTRAINT "GroupRole_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "Log" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "context" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "Page" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("cuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_name_key" ON "Property"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Message_entity_language_key" ON "Message"("entity", "language");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "Preference_userCuid_idx" ON "Preference"("userCuid");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_entity_userCuid_key" ON "Preference"("entity", "userCuid");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE INDEX "GroupMember_groupCuid_idx" ON "GroupMember"("groupCuid");

-- CreateIndex
CREATE INDEX "GroupMember_userCuid_idx" ON "GroupMember"("userCuid");

-- CreateIndex
CREATE UNIQUE INDEX "GroupMember_userCuid_groupCuid_key" ON "GroupMember"("userCuid", "groupCuid");

-- CreateIndex
CREATE INDEX "GroupRole_groupCuid_idx" ON "GroupRole"("groupCuid");

-- CreateIndex
CREATE UNIQUE INDEX "GroupRole_groupCuid_role_key" ON "GroupRole"("groupCuid", "role");

-- CreateIndex
CREATE INDEX "Page_slug_idx" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "Page_title_idx" ON "Page"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userCuid_fkey" FOREIGN KEY ("userCuid") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupCuid_fkey" FOREIGN KEY ("groupCuid") REFERENCES "Group"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_userCuid_fkey" FOREIGN KEY ("userCuid") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRole" ADD CONSTRAINT "GroupRole_groupCuid_fkey" FOREIGN KEY ("groupCuid") REFERENCES "Group"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;
