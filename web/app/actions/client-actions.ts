"use server";

import { prisma } from "@/db/prisma";

export async function getClients(business: string | null | undefined) {
  try {
    if (!business) {
      // Handle the case where the business is not found
      return [];
    }
    // This is a temporary solution , change the SCHEMA TO RELATE CUSTOMERS TO BUSINESS EMAILS
    const business_emails = await prisma.business.findFirst({
      where: {
        email: business,
      },
      select: {
        email: true,
        phoneNumber: true, // Include phoneNumber in the select
      },
    });

    if(!business_emails?.phoneNumber){
      return [];
    }

    const customers = await prisma.customer.findMany({
      where: {
        businessPhone: String(business_emails.phoneNumber),
      },
      include: {
        business: true,
      },
    });

    const clientData = customers.map((customer) => ({
      id: customer.id,
      name: customer.name || "Unknown User",
      phoneNumber: customer.phoneNumber,
      businessName: customer.business?.name || "Business Not Found",
      businessEmail: customer.business?.email || "N/A",
      businessImage: customer.business?.image || null,
    }));

    return clientData;
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return [{ id: "error", name: "Some shit happened FUCK", phoneNumber: "N/A" }];
  }
}