import prisma from "@/libs/prisma";


type Params = {
  req: Request;
  params: {
    id: string;
  };
};

export async function PUT({ req, params }: Params) {
  try {
    const { id } = params;
    const { email,  firstname, lastname, phoneNumber, age } =   await req.json();
    const user = await prisma.user.update({
      where: {
        id: id,
        role: "ADMIN",
      },
      data: {
        email,
        userInfo: {
          update: {
            firstName: firstname,
            lastName: lastname,
            phoneNumber: phoneNumber,
            age: age,
          },
        }
      },
    });
    return new Response(JSON.stringify(user));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }

}