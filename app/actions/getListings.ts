import prisma from "@component/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId
    }

    const listings = await prisma.listing.findMany({
      where: query,
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
