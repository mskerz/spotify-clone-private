export const avartar = [
  "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1632669672493-82abfc46da6b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1532335923596-39b06ab0d3c7?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1615087240969-eeff2fa558f2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1626334738368-51ee00a71f26?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];


export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class AUTH_API {
  public static BASE_URL = "/auth";

  // 🔁 /auth/sync
  public static SYNC = `${AUTH_API.BASE_URL}/sync`;

  // 📝 /auth/register
  public static REGISTER = `${AUTH_API.BASE_URL}/register`;

  // 📁 /auth/playlist
  public static PLAYLIST_BASE_URL = `${AUTH_API.BASE_URL}/playlist`;

  // 🔗 /auth/playlist/[id]
  public static PLAYLIST_BY_ID = (id: string) => `${AUTH_API.PLAYLIST_BASE_URL}/${id}`;

  // 🎵 /auth/playlist/song
  public static PLAYLIST_SONG = `${AUTH_API.PLAYLIST_BASE_URL}/song`;

  // ➕ /auth/playlist/song/add
  public static ADD_SONG_TO_PLAYLIST = `${AUTH_API.PLAYLIST_SONG}/add`;

  // ➖ /auth/playlist/song/remove
  public static REMOVE_SONG_FROM_PLAYLIST = `${AUTH_API.PLAYLIST_SONG}/remove`;
}



export class ADMIN_API {
  public static BASE_URL = "/admin";

  //   /admin/songs
  public static SONGS = `${ADMIN_API.BASE_URL}/songs`;  // GET , POST

  //   /admin/songs/[id] 
  public static SONG_BY_ID = (id: string) => `${ADMIN_API.SONGS}/${id}`;     // PUT , DELETE

  //   /admin/super/create
  public static SUPER_CREATE = `${ADMIN_API.BASE_URL}/super/create`; // POST
}
