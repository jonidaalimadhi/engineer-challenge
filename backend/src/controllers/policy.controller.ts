import { PrismaClient, Prisma, PolicyStatus } from "@prisma/client";
const prisma = new PrismaClient();

exports.getPolicies = async function (req: any, res: any) {
  try {
    const { search = "" } = req.query;
    const textSearch: string = (search as string).split(" ").join("|");
    const or: Prisma.PolicyWhereInput = search
      ? {
          OR: [
            {
              customer: {
                firstName: { search: textSearch },
              },
            },
            {
              customer: {
                firstName: { contains: textSearch, mode: "insensitive" },
              },
            },
            {
              customer: {
                lastName: { search: textSearch },
              },
            },
            {
              customer: {
                lastName: { contains: textSearch, mode: "insensitive" },
              },
            },
            {
              members: {
                some: {
                  firstName: {
                    search: textSearch,
                  },
                },
              },
            },
            {
              members: {
                some: {
                  firstName: {
                    contains: textSearch,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              members: {
                some: {
                  lastName: {
                    search: textSearch,
                  },
                },
              },
            },
            {
              members: {
                some: {
                  lastName: {
                    contains: textSearch,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        }
      : {};

    const inStatusQuery: PolicyStatus[] = ["ACTIVE", "PENDING"];
    const statusFilter: Prisma.PolicyWhereInput = {
      AND: [{ status: { in: inStatusQuery } }],
    };

    const policies = await prisma.policy.findMany({
      where: {
        ...or,
        ...statusFilter,
      },
      select: {
        id: true,
        provider: true,
        insuranceType: true,
        status: true,
        startDate: true,
        endDate: true,
        members: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
          },
        },
      },
    });
    res.status(200).json({
      policies,
      message: "Error in invocation of API: /policies",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in invocation of API: /policies" });
  }
};
