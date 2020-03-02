import React from 'react'
import CardAlbum from "./card/CardAlbum";

export default function Discography({ albums }) {
    return (
        <div className="discography">
            {
                albums.map((a, i) => (
                    <CardAlbum key={i} data={a} />
                ))
            }
        </div>
    )
}
