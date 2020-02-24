import React from "react";
// custom tools
// import Latest from "../components/Latest";
// import CardArtist from "../components/card/CardArtist";
// import CardAlbum from "../components/card/CardAlbum";
// images
import crowd from "../assets/img/festival-crowd-1.jpg";
import vynils from "../assets/img/vynils2.jpg";
import stage from "../assets/img/stage-1.jpg";
// styles
import "../styles/image.css";
import "../styles/latest.css";

export default function Home() {
  return (
    <div className="page home">
      <h1 className="title">A Home...</h1>

      <p className="parag">
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Debitis et reiciendis ullam amet in recusandae.
        Numquam accusantium itaque illum. Voluptatibus.
      </p>

      <h2 className="title medium">For Music lovers</h2>

      <img className="home-cover" src={vynils} alt="vynils" />

      <h3 className="title">Learn, Share, Discuss</h3>

      <p className="parag">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, tenetur.
        Quaerat, numquam? Perspiciatis cum nemo, exercitationem minus, soluta
        quos asperiores vitae est porro repudiandae doloremque maxime ex
        voluptatibus voluptatem laudantium recusandae placeat eligendi sit? Non,
        quos itaque! Mollitia quaerat quam aut quidem ex corrupti cupiditate,
        repellendus molestias fugiat! Perferendis corporis provident iusto
        quaerat, autem deleniti illo quis maiores ea laboriosam dicta
        dignissimos odio at facere optio esse in dolor placeat cupiditate fugiat
        veniam et qui. Veritatis cum aperiam voluptates reiciendis.
      </p>

      <img className="home-cover" src={crowd} alt="crowd in a music festival" />

      <h1 className="title diy">D.I.Y</h1>
      <p className="parag">
        Code a complete client/server cycle to fetch the 2 latests artists
        AND albums.<br /> Why don't you try CSS grid to organise the results display ?
      </p>
      <hr />
      <h2 className="title medium">Latest artists</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, cum.
        Dolor adipisci placeat dolorum ipsa facere eius perferendis! Quaerat
        molestias iusto modi aspernatur, similique quae esse assumenda
        laboriosam tempore recusandae.
      </p>
      <h2 className="title medium">Latest albums</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, cum.
        Dolor adipisci placeat dolorum ipsa facere eius perferendis! Quaerat
        molestias iusto modi aspernatur, similique quae esse assumenda
        laboriosam tempore recusandae.
      </p>
      {/* <div className="latests">
        <h2 className="title medium">Latest artists</h2>
        <Latest endpoint="artists" limit="2" Component={CardArtist} />

        <h2 className="title medium">Latest albums</h2>
        <Latest endpoint="albums" limit="2" Component={CardAlbum} />
      </div> */}

      <img className="home-cover" src={stage} alt="stage in a music festival" />
      
      <h1 className="title diy">D.I.Y (Latest Artists / Latest Albums)</h1>
      <p className="parag">
        Code a complete client/server cycle to fetch the 4 best rated artists
        AND albums
      </p>
      <hr />
      <h2 className="title medium">Best rated artists</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, cum.
        Dolor adipisci placeat dolorum ipsa facere eius perferendis! Quaerat
        molestias iusto modi aspernatur, similique quae esse assumenda
        laboriosam tempore recusandae.
      </p>
      <h2 className="title medium">Best rated albums</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, cum.
        Dolor adipisci placeat dolorum ipsa facere eius perferendis! Quaerat
        molestias iusto modi aspernatur, similique quae esse assumenda
        laboriosam tempore recusandae.
      </p>

   
    </div>
  );
}
