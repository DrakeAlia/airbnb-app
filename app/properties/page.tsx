import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import PropertiesClient from "./PropertiesClient";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

// This is a server component
const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
        title="Unauthorized"
        subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
        title="No properties Found"
        subtitle="Looks like you no properties."
        />
      </ClientOnly>
    );
  }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};

export default PropertiesPage;