import { betterAuth } from "better-auth";
import { reactStartCookies } from "better-auth/react-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { magicLink } from "better-auth/plugins";
import { mailService } from "@/features/mail/services/mail.service";
import { session, user, account, verification } from "@/db/schemas/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        console.log("sendMagicLink", email, url);
        const response = await mailService.sendMagicLink(email, url);
        return response;
      },
    }),
    reactStartCookies(),
  ],
});
