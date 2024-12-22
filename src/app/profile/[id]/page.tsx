import React from "react";

const UserProfile = async ({ params }: { params: { id: string } }) => {
  return <div>UserProfile {await params.id}</div>;
};

export default UserProfile;
