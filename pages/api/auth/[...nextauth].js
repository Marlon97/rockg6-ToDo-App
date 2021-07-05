import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        console.log(profile);
        return {
          id: profile.id,
          name: profile.name || profile.login,
          image: profile.avatar_url,
          email: profile.email,
        };
      },
    }),
    // ...add more providers here
  ],
});
