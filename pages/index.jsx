import Head from "next/head";

var linkValid;

const Home = () => {
  function convert_url() {
    linkValid = false;
    var url = document.getElementById("url").value;
    if (url != null) {
      var regxwww = /^(?:http|https):\/\/[a-zA-Z0-9=+_./-]+[.]+/;
      if (url.match(regxwww)) {
        var regx_yutub =
          /^((?:http|https):\/\/(?:www|m)\.youtube\.com)\/watch\?v\=([a-zA-Z0-9]{1,15})/;
        var hasilrgx = url.match(regx_yutub);
        if (hasilrgx) {
          url = hasilrgx[2];
          linkValid = true
        }
        regx_yutub = /^(?:http|https):\/\/youtu\.be\/([a-zA-Z0-9]{1,15})/;
        hasilrgx = url.match(regx_yutub);
        if (hasilrgx) {
          url = hasilrgx[1];
          linkValid = true
        }
        return url;
      }
    }
  }
  function formatEmbed(str) {
    var embed =
      '<iframe src="https://www.youtube.com/embed/' +
      str +
      '" style="width:100%; aspect-ratio:16/9;" title="Embedded Media"></iframe>';
    return embed;
  }
  function embedVideo() {
    var idvideo = convert_url();
    const div = document.getElementById("text-area");
    if (linkValid) {
      var mulaiEmbed = formatEmbed(idvideo);
      document.getElementById("hasil").value = mulaiEmbed;
      div.style.display = "block";
    }
    else {
      alert("Incorrect URL address");
      document.getElementById("hasil").value = '';
      div.style.display = "none";
    }
  }

  function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById("hasil");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }

  function watchInputChanges() {
    if (!document.getElementById("url").value) {
      const div = document.getElementById("text-area");
      div.style.display = "none";
    }
  }

  return (
    <div>
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
            <label htmlFor="code" className="form-label mb-3">
              Get your embed code below !
            </label>
            <textarea className="form-control shadow" id="hasil" rows="3" />
            <button
              className="btn btn-outline-dark mt-4 shadow"
              onClick={() => myFunction()}
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
