-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "userId" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ClientBookings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ClientBookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientBookings" ADD CONSTRAINT "ClientBookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
