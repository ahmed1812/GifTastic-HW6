  // Initial array of topics
  var topics = ['Superman', 'Aquaman', 'Spiderman', 'Batman', 'Wonder Woman', 'Thor', 'Hulk',];

  // displayTopicInfo function re-renders the HTML to display the appropriate content
  function displayTopicInfo() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=z2Pl4usLP4E0JXAHDz40V7EAmIV44HIp&limit=10";

 // Creating an AJAX call for the specific topic button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;
      // Deleting the topics prior to adding new topics
      $("#topics-view").empty();
      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var topicDiv = $("<div class='hero-name'>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var aImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        var animate = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        aImage.attr("src", still );
        aImage.attr("data-still", still);
        aImage.attr("data-animate", animate);
        aImage.attr("data-state", "still");
        aImage.addClass("search")
        // Appending the paragraph and image tag to the topiclDiv
        topicDiv.append(p);
        topicDiv.append(aImage);

        // Prependng the topicDiv to the HTML page in the "#topic-view" div
        $("#topics-view").prepend(topicDiv);
       // alert("hi")
      }
    });

  }
   // click Function to play or still Gif images
  $(document).on("click",".search",function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});

  // Function for displaying topic data
  function renderButtons() {

    // Deleting the topics prior to adding new topics
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each topic in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of topic-btn to our button
      a.addClass("topic-btn btn btn-primary");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a topic button is clicked
  $("#add-hero").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#hero-input").val().trim();

    // Adding topic from the textbox to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our topic array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "topic-btn"
  $(document).on("click", ".topic-btn", displayTopicInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
