import { Playlist } from "../song";

type ChildrenProps = {
    children: React.ReactNode;
};

type PlaylistItemProps = {
    item : Playlist
}

export type { ChildrenProps, PlaylistItemProps };