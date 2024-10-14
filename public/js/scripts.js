// Display functions for each table
const displayShows = function(shdata) {
  const template = '<tr><td>{name}</td><td>{director}</td><td>{comments}</td><td>{rating}</td></tr>'; // Fixed closing tag
  const row = template.replace("{name}", shdata.showName)
                      .replace("{director}", shdata.directorName)
                      .replace("{comments}", shdata.comments)
                      .replace("{rating}", shdata.rating);
  const tbody = document.querySelector("#all-shows");
  tbody.innerHTML += row;
};

const displayGoodShows = function(shdata) {
  const template = '<tr><td>{name}</td><td>{director}</td><td>{comments}</td><td>{rating}</td></tr>'; // Fixed closing tag
  const row = template.replace("{name}", shdata.showName)
                      .replace("{director}", shdata.directorName)
                      .replace("{comments}", shdata.comments)
                      .replace("{rating}", shdata.rating);
  const tbody = document.querySelector("#good-shows");
  tbody.innerHTML += row;
};

const displayBadShows = function(shdata) {
  const template = '<tr><td>{name}</td><td>{director}</td><td>{comments}</td><td>{rating}</td></tr>'; // Fixed closing tag
  const row = template.replace("{name}", shdata.showName)
                      .replace("{director}", shdata.directorName)
                      .replace("{comments}", shdata.comments)
                      .replace("{rating}", shdata.rating);
  const tbody = document.querySelector("#bad-shows");
  tbody.innerHTML += row;
};

// Display data for the three different tables
const displayData = function(data) {
  document.querySelector("#all-shows").innerHTML = "";
  document.querySelector("#good-shows").innerHTML = "";
  document.querySelector("#bad-shows").innerHTML = "";

  for (let i = 0; i < data.length; i++) {
      const shdata = data[i];
      displayShows(shdata);
      if (shdata.rating === "1" || shdata.rating === "2") {
          displayBadShows(shdata);
      }
      if (shdata.rating === "3" || shdata.rating === "4" || shdata.rating === "5") {
          displayGoodShows(shdata);
      }
  }
};

// Fetch the appdata and then call the display functions
const loadData = function() {
  fetch('/shows')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(displayData)
      .catch(error => console.error('Fetch error:', error)); // Error handling
};

// Add Show function
const addShow = function(e) {
  e.preventDefault(); // Prevent default form submission

  const newShow = {
      showName: document.getElementById('showName').value,
      directorName: document.getElementById('directorName').value,
      comments: document.getElementById('comments').value,
      rating: document.getElementById('rating').value,
      status: 'none'
  };

  newShow.status = (newShow.rating === "1" || newShow.rating === "2") ? 'bad' : 'good';

  fetch('/addShow', {
      method: 'POST',
      body: JSON.stringify(newShow),
      headers: {
          'Content-Type': 'application/json' // Specify the content type
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      resetOrderForm();
      loadData();
  })
  .catch(error => console.error('Fetch error:', error)); // Error handling
};

// Delete show based on name
const delShow = function(e) {
  e.preventDefault(); // Prevent default form submission

  const body = JSON.stringify({ showName: document.getElementById('delShowName').value }); // Send showName in JSON
  fetch('/delShow', {
      method: 'POST',
      body: body,
      headers: {
          'Content-Type': 'application/json' // Specify the content type
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      resetOrderForm();
      loadData();
  })
  .catch(error => console.error('Fetch error:', error)); // Error handling
};

// Edit show based on name and new rating
const editShow = function(e) {
  e.preventDefault(); // Prevent default form submission

  const newShow2 = {
      showName: document.getElementById('editShowName').value,
      rating: document.getElementById('editShowRating').value,
  };

  fetch('/editShow', {
      method: 'POST',
      body: JSON.stringify(newShow2),
      headers: {
          'Content-Type': 'application/json' // Specify the content type
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      resetOrderForm();
      loadData();
  })
  .catch(error => console.error('Fetch error:', error)); // Error handling
};

// Reset order form after adding show
const resetOrderForm = () => {
  document.getElementById('showName').value = '';
  document.getElementById('directorName').value = '';
  document.getElementById('comments').value = '';
  document.getElementById('rating').value = '';
  document.getElementById('delShowName').value = '';
  document.getElementById('editShowName').value = '';
  document.getElementById('editShowRating').value = '';
};

// Window onload function
window.onload = function() {
  document.getElementById('submit-btn').addEventListener('click', addShow); // Use addEventListener
  document.getElementById('del-btn').addEventListener('click', delShow); // Use addEventListener
  document.getElementById('edit-btn').addEventListener('click', editShow); // Use addEventListener
  
  loadData();
};
