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
  databaseHooks: {
    user: {
      create: {
        async after(user) {
          const organizationSlug = `my-organization-${user.email}`;
          await auth.api.createOrganization({
            body: {
              name: "My Organization",
              slug: organizationSlug,
              userId: user.id,
            },
          });
        },
      },
    },
  },
  plugins: [
    organization(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const response = await mailService.sendMagicLink(email, url);
        return response;
      },
    }),
    reactStartCookies(),
  ],
});
