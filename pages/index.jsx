import Head from "next/head";
import { useState } from "react";
import Parser from "html-react-parser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let isValidLink = false;
let idVideoYoutube = null;

const Home = () => {
  const [embedIframe, setEmbedIframe] = useState("");

  function checkYoutubeLink(link) {
    const regexYoutubeUrl =
      /^(?:http|https):\/\/(?:www|m)\.youtube\.com\/watch\?v\=([a-zA-Z0-9_-]{1,15})/;
    const isValidRegex = link.match(regexYoutubeUrl);
    if (isValidRegex) {
      idVideoYoutube = isValidRegex[1];
      isValidLink = true;
    }
  }

  function checkYoutubeShortlink(link) {
    const regexYoutubeUrl =
      /^(?:http|https):\/\/youtu\.be\/([a-zA-Z0-9_-]{1,15})/;
    const isValidRegex = link.match(regexYoutubeUrl);
    if (isValidRegex) {
      idVideoYoutube = isValidRegex[1];
      isValidLink = true;
    }
  }

  function getIdVideo() {
    isValidLink = false;
    idVideoYoutube = null;
    let idVideo = document.getElementById("url").value;
    if (idVideo != null) {
      let regexFullUrl = /^(?:http|https):\/\/[a-zA-Z0-9=+_./-]+[.]+/;
      if (idVideo.match(regexFullUrl)) {
        checkYoutubeLink(idVideo);
        if (isValidLink) {
          return idVideoYoutube;
        }

        checkYoutubeShortlink(idVideo);
        if (isValidLink) {
          return idVideoYoutube;
        }

        return null;
      }
    }
  }

  function formatEmbed(str) {
    return `<iframe src="https://www.youtube.com/embed/${str}" style="width:100%; aspect-ratio:16/9;" title="Embedded Media"></iframe>`;
  }

  function embedVideo() {
    let idVideo = getIdVideo();
    const div = document.getElementById("text-area");
    if (isValidLink) {
      let startEmbed = formatEmbed(idVideo);
      document.getElementById("hasil").value = startEmbed;
      div.style.display = "block";
      setEmbedIframe(startEmbed);
    } else {
      alert("Incorrect URL address");
      document.getElementById("hasil").value = "";
      div.style.display = "none";
    }
  }

  function copyLinkEmbed() {
    /* Get the text field */
    let copyText = document.getElementById("hasil");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Copy success alert */
    toast.success("Copied the embedded text.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      theme: "light",
    });
  }

  function watchInputChanges() {
    if (!document.getElementById("url").value) {
      const div = document.getElementById("text-area");
      div.style.display = "none";
    }
  }

  return (
    <div>
      <ToastContainer />
      <Head>
        <title>Sopiler</title>
        <meta
          name="description"
          content="Create HTML youtube embedded videos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header
        className="card card-header shadow-lg container mt-3 mb-2"
        style={{ bordeRadius: "12px" }}
      >
        <h1 className="text-danger text-center">
          Create HTML youtube embedded videos
        </h1>
      </header>
      <main
        className="container card card-body shadow w-75"
        style={{ borderRadius: "12px" }}
      >
        <div className="text-center p-2">
          <h4 className="text-muted">Paste in urls such as :</h4>
          <p>
            https://www.youtube.com/watch?v=XXXXXXX <br /> or <br />{" "}
            https://youtu.be/XXXXXXX
          </p>
        </div>
        <div className="mt-5 container w-75">
          <div className="input-group  mb-5 ">
            <input
              type="text"
              className="form-control shadow"
              placeholder="https://www.youtube.com/watch?v="
              id="url"
              onInput={() => watchInputChanges()}
              name="url"
            />
            <button
              className="btn btn-outline-primary shadow"
              type="button"
              id="eksekusi"
              value="submit"
              onClick={() => embedVideo()}
            >
              Submit
            </button>
          </div>
          <div
            className="mb-3 mt-3 p-2 container text-center"
            id="text-area"
            style={{ display: "none" }}
          >
            <div className="content">{Parser(embedIframe)}</div>
            <br />
            <label htmlFor="code" className="form-label mb-3">
              Get your embed code below !
            </label>
            <textarea className="form-control shadow" id="hasil" rows="3" />
            <button
              className="btn btn-outline-dark mt-4 shadow"
              onClick={() => copyLinkEmbed()}
            >
              Copy text
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
