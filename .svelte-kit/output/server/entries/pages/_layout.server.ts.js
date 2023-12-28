const load = async ({ locals, url }) => {
  const session = await locals.auth.validate();
  if (!session) {
    return {
      userId: null
    };
  }
  return {
    userId: session.user.userId,
    name: session.name,
    email: session.email,
    role: session.role
  };
};
export {
  load
};
