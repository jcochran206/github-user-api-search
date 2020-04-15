function getGithubUser(textInputVal) {
    const url = `https://api.github.com/users/${textInputVal}/repos`;
  
    const head = {
      headers: new Headers({
        'Accept': "application/vnd.github.v3+json",
      }),
    };
  
    console.log(url);

    fetch(url, head)
      .then((response) => response.json())
      .then((responseJson) => displayResults(responseJson))
      .catch((error) => alert("Something went wrong. Try again later."));
  }
  
  function displayResults(responseJson) {
    console.log(responseJson);

    if (responseJson.status == "error") {
      $(".results-img").replaceWith(`<p> dog not found</p>`);
    } else {
      $(".results-img").html(
        `<h1>${responseJson[0].owner[0]}</h1>`
      );
  
      $(".results").removeClass("hidden");
    }
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
