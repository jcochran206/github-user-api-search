function getGithubUser(textInputVal) {
  
    const url = `https://dog.ceo/api/breed/${textInputVal}/images/random/1`;
    console.log(url);
    const head = {
        headers: new Headers({
          "X-Api-Key": apiKey,
        }),
      };
      fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.')
        );
    }
  
    function displayResults(responseJson) {
      console.log(responseJson);
      if(responseJson.status == 'error'){
        $('.results-img').replaceWith(
           `<p> dog not found</p>`
        )
      }else{
        $('.results-img').replaceWith(
          `<img src="${responseJson.message}" class="results-img">`
        )
        
        $('.results').removeClass('hidden');
  
      }
  
    }
  
    function watchForm() {
      $('form').submit(event => {
        event.preventDefault();
        let textInputVal = $('#').val();
        console.log(textInputVal);
        getGithubUser(textInputVal);
      });
    }
    
    $(function() {
      console.log('App loaded! Waiting for submit!');
      watchForm();
    });