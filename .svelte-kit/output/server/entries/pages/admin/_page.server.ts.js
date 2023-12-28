import { p as prisma } from "../../../chunks/prisma.js";
const now = new Date(Date.now());
const nowTimestamp = BigInt(now.getTime());
const load = async ({ locals }) => {
  await locals.auth.validate();
  const online = await prisma.session.count({
    where: {
      active_expires: {
        gte: nowTimestamp
      }
    }
  });
  const usersToday = await prisma.user.count({
    where: {
      created_at: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1e3)
      },
      AND: {
        role: {
          not: "ADMIN"
        },
        OR: {
          role: {
            not: "GOD"
          }
        }
      }
    }
  });
  const usersSevenDays = await prisma.user.count({
    where: {
      created_at: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3)
      },
      AND: {
        role: {
          not: "ADMIN"
        },
        OR: {
          role: {
            not: "GOD"
          }
        }
      }
    }
  });
  const historySevenDays = await prisma.descriptionHistory.count({
    where: {
      created_at: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3)
      }
    }
  });
  return { online, usersSevenDays, usersToday, historySevenDays };
};
export {
  load
};
