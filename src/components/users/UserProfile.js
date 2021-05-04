import React, { useEffect } from "react";

const UserProfile = ({ match, getUser, loading, user }) => {
  useEffect(() => {
    getUser(match.params.login);
  }, [getUser, match.params.login]);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  return <div>{name}</div>;
};

export default UserProfile;
