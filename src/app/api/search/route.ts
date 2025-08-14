import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prisma";
import redis from "@/libs/redis";
import { getSessionId } from "@/libs/session";
import { mapSongs } from "@/utils/map/song";

export async function GET(req: NextRequest) {
 
}
