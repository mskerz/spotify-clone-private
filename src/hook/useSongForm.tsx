import { useState } from "react";


export const useAddSong = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [releaseDate, setReleaseDate] = useState('');
    const [coverImage, setCoverImage] = useState('');

    const reset = () => {
        setTitle('');
        setArtist('');
        setCategoryId(1);
        setReleaseDate('');
        setCoverImage('');
    }

    return {
        title,
        setTitle,
        artist,
        setArtist,
        categoryId,
        setCategoryId,
        releaseDate,
        setReleaseDate,
        coverImage,
        setCoverImage,
        reset
    }
}

const useEditSong = () => {
    
};

export default useEditSong;