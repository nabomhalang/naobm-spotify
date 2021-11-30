import {
    ChartBarIcon,
    ClockIcon,
    DotsHorizontalIcon,
    HomeIcon,
  } from "@heroicons/react/solid";
import Image from "next/image";
import SpotifyImage from "../images/spotify.png";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiCompassFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistsIdState } from "../atoms/playerAtom";
import Test from "./Test";

function Sidebar({ spotifyApi }) {
    const { data: session } = useSession();
    const { accessToken } = session;
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistsIdState);

    // console.log(playlistId);

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);
    
    useEffect(() => {
        if(spotifyApi.getAccessToken()) {
        spotifyApi.getUserPlaylists().then((data) => {
            setPlaylists(data.body.items);
        });
        }
    }, [session, spotifyApi]);

    // console.log(playlists);

    return (
        <sections className="fixed top-0 z-40 flex flex-col p-4 items-center bg-black w-[7rem] h-screen space-y-8 overflow-y-scroll scrollbar-hide text-white display">
            <a href="http://nabomhalang.shop:3000"><Image src={SpotifyImage} width={56} height={56} objectFit="contain" /></a>

            <div className="flex flex-col space-y-8">
                <HomeIcon className="sidebarIcon text-white opacity-[0.85] hover:text-white animate-pulse" />
                <RiCompassFill className="sidebarIcon text-2xl hover:text-white" />
                <FaMicrophoneAlt className="sidebarIcon ml-1 hover:text-white" />
                <ChartBarIcon className="sidebarIcon hover:text-white" />
                <ClockIcon className="sidebarIcon hover:text-white" />
                <DotsHorizontalIcon className="sidebarIcon hover:text-white" />
            </div>

            <div className="flex flex-col p-4 items-center space-y-8">
                {playlists.map((playlist) => (
                <p key={playlist.id} className="sidebarIcon hover:text-white cursor-pointer">
                    {playlist.name}
                </p>
                ))}
            </div>

        </sections>
    )
}

export default Sidebar
