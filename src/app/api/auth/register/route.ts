
import prisma from "@/libs/prisma";
import { randomAvatar } from "@/utils/map";

export async function POST(req: Request) {
    try {
        const { firebase_uid, email ,firstName, lastName,age,phoneNumnber,birthday } = await req.json();
        
       
        const newUser = await prisma.user.create({
            data:{
                firebaseUid: firebase_uid,
                email: email,
                role:"USER",
                provider:"LOCAL"
            }
        })

        const BirthDateFormat = new Date(birthday);
        await prisma.userInfo.create({
            data: {
                userId: newUser.id,
                age: age,
                firstName: firstName,
                lastName: lastName,
                phoneNumnber: phoneNumnber,
                birthday: BirthDateFormat,
                avatarUrl: randomAvatar()
            }
        })

        return new Response(JSON.stringify({ status: 200, message: "User created successfully" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ status: 500, message: "Error creating user" }), { status: 500 });
    }
}