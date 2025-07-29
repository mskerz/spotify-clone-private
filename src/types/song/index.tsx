

type Song = {
    id : number;
    title: string;
    artist: string;
    category: {
        id: number;
        name: string
    };
    coverImage: string;
    releaseDate: string
}

type Playlist = {
    id: number;
    name: string;
    coverImage: string;
    songs: Song[];
}


export   type { Song , Playlist };