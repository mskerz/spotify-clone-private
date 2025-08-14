import { createClient } from 'redis';
import { REDIS_CLOUD_HOST, REDIS_CLOUD_PASSWORD, REDIS_CLOUD_PORT, REDIS_CLOUD_USERNAME } from '@/constant/cache';


const redis = createClient({
    username: REDIS_CLOUD_USERNAME,
    password: REDIS_CLOUD_PASSWORD,
    socket: {
        host: REDIS_CLOUD_HOST,
        port: REDIS_CLOUD_PORT,
    },
})



if(!redis.isOpen){
    await redis.connect();
}

export default redis