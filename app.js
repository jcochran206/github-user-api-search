function getGithubUser(textInputVal) {
  const url = `https://api.github.com/users/${textInputVal}/repos`;

  const head = {
    headers: new Headers({
      // prettier-ignore
      "Accept": "application/vnd.github.v3+json"
    }),
  };

  console.log(url);

  fetch(url, head)
    .then((response) => response.json())
    .then((responseJson) => displayResults(responseJson))
    .catch((error) => {
      console.log(error);
      displayError(error.message, textInputVal);
    });
}

function displayError(msg, input) {
  let errorMsg = `
    <div class="div__error">
      <h1>User <span>${input}</span> ${msg}</h1>
    </div>`;

  $(".results-img").html(errorMsg);
  $(".results").removeClass("hidden");
}

function displayResults(responseJson) {
  if (!responseJson[0]) {
    throw responseJson;
  }

  console.log(responseJson);
  let items = responseJson.map((item) => {
    return `
        <div>
          <h1>${item.name}</h1>
          <h3>${item.html_url}</h3>
        </div>
      `;
  });

  $(".results-img").html(`${items.join("")}`);
  $(".results").removeClass("hidden");
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    let textInputVal = $("#github-search").val();
    console.log(textInputVal);
    $("#github-search").val(" ");
    getGithubUser(textInputVal);
  });
}

$(function () {
  console.log("App loaded! Waiting for submit!");
  watchForm();
});
