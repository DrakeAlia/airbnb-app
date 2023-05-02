import prisma from "@component/app/libs/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeLisitngs = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeLisitngs;
  } catch (error: any) {
    throw new Error(error);
  }
}
