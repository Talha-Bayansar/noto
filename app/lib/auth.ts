import { betterAuth } from "better-auth";
import { reactStartCookies } from "better-auth/react-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { magicLink, organization } from "better-auth/plugins";
import { mailService } from "@/features/mail/services/mail.service";
import {
  sessionTable,
  userTable,
  accountTable,
  verificationTable,
  organizationTable,
  invitationTable,
  memberTable,
} from "@/db/schemas/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: userTable,
      session: sessionTable,
      account: accountTable,
      verification: verificationTable,
      organization: organizationTable,
      member: memberTable,
      invitation: invitationTable,
    },
  }),
  plugins: [
    organization(),
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
