import { useRedux } from "@/hooks/redux";
import { playlistActions } from "@/providers/redux/slice/action";
import { useCallback, useEffect } from "react";

function usePlaylist() {
  const { dispatch, useSelector } = useRedux();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const {
    filteredPlaylistUsers: playlists,
    selectedPlaylist,
    loading,
    error,
  } = useSelector((state) => state.playlist);

  const status = { loading, error };

  const fetchPlaylists = useCallback(() => {
    if (!isLoggedIn) return;
    dispatch(playlistActions.getPlaylist());
  }, [dispatch, isLoggedIn]);

  const fetchPlaylistDetail = useCallback(
    (id: string) => {
      if (!isLoggedIn) return;
      dispatch(playlistActions.getPlaylistById(Number(id)));
    },
    [dispatch, isLoggedIn],
  );

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return {
    playlists,
    selectedPlaylist,
    fetchPlaylists,
    fetchPlaylistDetail,
    status,
  };
}

export default usePlaylist;
