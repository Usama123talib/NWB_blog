document.addEventListener('DOMContentLoaded', function() {
  const allButton = document.querySelectorAll('.searchBtn');
  const searchBar = document.querySelector('.searchBar');
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('searchClose');
// created new branch
  for (let i = 0; i < allButton.length; i++) {
    allButton[i].addEventListener('click', function() {
        searchBar.style.visibility = 'visible';
        searchBar.classList.add('open');
        this.setAttribute('aria-expanded', true);
        searchInput.focus();

    });
    
  }
  
  searchClose.addEventListener('click', function() {
    searchBar.style.visibility = 'hidden';
    searchBar.classList.remove('open');
    this.setAttribute('aria-expanded', false);

  });
  //Dark mode on and off
//   const changeDarkMode = document.querySelector('.change');
//   const changeMode = document.querySelector('.changeMode');

//   const bodyElement = document.body;
//   var hasDarkClass = bodyElement.classList.contains('dark');

//   changeDarkMode.addEventListener("click", function() {
//     if(!hasDarkClass) {
//       bodyElement.classList.add('dark');
//         // $( "body" ).addClass( "dark" );
//         changeDarkMode.textContent = "ON";
//     } else {
    

//         bodyElement.classList.remove('dark');
//         // $( "body" ).removeClass( "dark" );
//         changeDarkMode.textContent = "OFF";
//     }
// });

function toggleDarkMode() {
  var span = document.querySelector('.change');
  var themeChage = document.getElementById('themeChage');

  span.textContent = span.textContent === 'OFF' ? 'ON' : 'OFF';
  // Add logic to enable or disable dark mode based on the span's current text content
  // For example, you can toggle a CSS class on the body or update other styles.
  // document.body.classList.toggle('dark-mode');
  themeChage.classList.toggle('dark');
}
const changeDarkMode = document.querySelector('.change');

// Add click event listener to the element with the class 'change'
changeDarkMode.addEventListener('click', toggleDarkMode);

});