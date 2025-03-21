-- Create ClientBookings table
CREATE TABLE "ClientBookings" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(255) NOT NULL
);