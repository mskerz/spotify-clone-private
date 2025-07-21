
    export const joinCategory = {
      select: {
        id: true,
        name: true,
      },
    };

    export const joinSong = {
      select: {
        id: true,
        title: true,
        artist: true,
        coverImage: true,
        category: joinCategory, // นำ category ไปเชื่อมตรงนี้
      },
    };