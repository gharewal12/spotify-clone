"use client";

import MediaItem from "./MediaItem";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
    const subscribeModal = useSubscribeModal();
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user, subscription } = useUser();

    const onPlay = useOnPlay(songs);

    const AddToLibrary = () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (!subscription) {
            return subscribeModal.onOpen();
        }

        return uploadModal.onOpen();
    }
    return (
        <div className="flex flex-col">
            <div className="
            flex
            items-center
            justify-between
            px-5
            pt-4
            ">
                <div className="
                inline-flex
                items-center
                gap-x-2
                ">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="
                    text-neutral-400
                    font-medium
                    text-md
                    ">Your Library</p>
                </div>
                <AiOutlinePlus
                    className="
                    text-neutral-400
                    cursor-pointer
                    hover:text-white
                    transition
                    "
                    onClick={AddToLibrary}
                    size={20} />
            </div>
            <div className="
                flex
                flex-col
                gap-y-2
                mt-4
                px-3
            ">
                {songs.map((song) => (
                    <MediaItem
                        key={song.id}
                        onClick={(id: string) => onPlay(id)}
                        data={song}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library;