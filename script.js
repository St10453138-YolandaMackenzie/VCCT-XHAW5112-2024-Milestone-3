let currentSlide = 0;
let autoSwipeInterval;

// Function to show the current slide
function showSlide(index) {
   const slides = document.querySelectorAll('.carousel-item');
   const totalSlides = slides.length;

   // Loop back to the first slide if the index is out of bounds
   if (index >= totalSlides) {
       currentSlide = 0;
   } else if (index < 0) {
       currentSlide = totalSlides - 1;
   } else {
       currentSlide = index;
   }

   const offset = -currentSlide * 100;
   document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

// Function to go to the next slide
function nextSlide() {
   showSlide(currentSlide + 1);
}

// Function to go to the previous slide
function prevSlide() {
   showSlide(currentSlide - 1);
}

// Function to start auto-swiping
function startAutoSwipe() {
   autoSwipeInterval = setInterval(nextSlide, 1000); // Change slides every 1 seconds
}

// Function to stop auto-swiping
function stopAutoSwipe() {
   clearInterval(autoSwipeInterval);
}

document.addEventListener('DOMContentLoaded', () => {
   showSlide(currentSlide);
   startAutoSwipe();

   // Optionally, pause auto-swiping on hover and resume on mouse leave
   const carousel = document.querySelector('.carousel');
   carousel.addEventListener('mouseenter', stopAutoSwipe);
   carousel.addEventListener('mouseleave', startAutoSwipe);
});
// script.js
function toggleLanguageOptions() {
   var select = document.getElementById("language-select");
   select.classList.toggle("active"); // Toggle the active class to show/hide the dropdown
}

document.getElementById('language-select').addEventListener('change', function() {
   this.classList.remove("active"); // Hide the dropdown after an option is selected
});

function toggleMenu() {
   var menu = document.getElementById("menu-list");
   if (menu.style.display === "none" || menu.style.display === "") {
       menu.style.display = "block";
   } else {
       menu.style.display = "none";
   }
}

// Close the menu when clicking outside of it
document.addEventListener('click', function(event) {
   var isClickInsideMenu = document.querySelector('.menu-container').contains(event.target);
   if (!isClickInsideMenu) {
       document.getElementById("menu-list").style.display = 'none';
   }
});

function updateSelection() {
   // Get all checkboxes
   var checkboxes = document.querySelectorAll('input[type="checkbox"]');
   var courseList = document.getElementById('C');
   var priceList = document.getElementById('P');

   // Clear the current lists
   courseList.innerHTML = ''; // Clear the course list
   priceList.innerHTML = '';  // Clear the price list

   // Loop through checkboxes to display selected courses and prices
   checkboxes.forEach(function(checkbox) {
       if (checkbox.checked) {
           // Get the course name and price
           var courseName = checkbox.parentElement.textContent.trim().split('\n')[0]; // Course name
           var priceTag = checkbox.parentElement.querySelector('p').textContent.replace('R', ''); // Remove 'R'

           // Create list items for course and price
           var courseItem = document.createElement('p');
           courseItem.textContent = courseName; // Course name
           courseList.appendChild(courseItem);

           var priceItem = document.createElement('p');
           priceItem.textContent = 'R' + priceTag; // Price
           priceList.appendChild(priceItem);
       }
   });
}

// Add onchange event listener to all checkboxes
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function(checkbox) {
   checkbox.addEventListener('change', updateSelection);
});

// Function to calculate and display the total price, discount, and final total
function generateTotal() {
   var priceItems = document.querySelectorAll('#P p');
   var total = 0;
   var numCourses = 0; // Keep track of selected courses

   // Loop through all price items and add up their values
   priceItems.forEach(function(priceItem) {
       var priceText = priceItem.textContent.trim().replace('R', ''); // Remove 'R' symbol
       var priceValue = parseFloat(priceText); // Convert to float
       if (!isNaN(priceValue)) {
           total += priceValue;
           numCourses++; // Count the selected courses
       }
   });

   // Calculate discount
   var discountPercent = 0;
   if (numCourses === 2) {
       discountPercent = 5;
   } else if (numCourses === 3) {
       discountPercent = 10;
   } else if (numCourses > 3) {
       discountPercent = 15;
   }

   var discountAmount = (total * discountPercent) / 100;
   var subtotal = total - discountAmount;

   // Calculate VAT (15%)
   var vat = subtotal * 0.15;
   var finalTotal = subtotal + vat;

   // Display subtotal
   var totalDisplay = document.getElementById('total');
   if (totalDisplay) {
       totalDisplay.textContent = 'Subtotal: R' + subtotal.toFixed(2); // Format to 2 decimal places
   } else {
       console.error('Element with ID "total" not found.');
   }

   // Display the discount percentage
   var discountDisplay = document.getElementById('discount');
   if (discountDisplay) {
       discountDisplay.textContent = `Discount Applied: ${discountPercent}% (R${discountAmount.toFixed(2)})`;
   } else {
       console.error('Element with ID "discount" not found.');
   }

   // Display the VAT
   var vatDisplay = document.getElementById('vat-display');
   if (vatDisplay) {
       vatDisplay.textContent = `VAT (15%): R${vat.toFixed(2)}`;
   } else {
       console.error('Element with ID "vat-display" not found.');
   }

   // Display the final total
   var finalTotalDisplay = document.getElementById('finalTotal');
   if (finalTotalDisplay) {
       finalTotalDisplay.textContent = `Total: R${finalTotal.toFixed(2)}`;
   } else {
       console.error('Element with ID "finalTotal" not found.');
   }
}

// Add onclick event listener to the "Generate Total" button
var totalButton = document.getElementById('btn3');
if (totalButton) {
   totalButton.addEventListener('click', generateTotal);
} else {
   console.error('Button with ID "btn3" not found.');
}

// Function to update progress bar
function updateProgressBar(step) {
    if (step === 1) {
        document.getElementById('progress-bar1').style.width = '150px';
    } else if (step === 2) {
        document.getElementById('progress-bar2').style.width = '150px';
    } else if (step === 3) {
        document.getElementById('progress-bar3').style.width = '150px';
    }
}

// Example: calling the function when a step is completed
// You can call this when users fill out the form or select an option
document.getElementById('btn3').addEventListener('click', function() {
    // Assuming user finishes step 1
    updateProgressBar(1);

    // Then move to step 2 and so on
    updateProgressBar(2);
    updateProgressBar(3);
});

// Example: Triggering progress bar update on checkbox selection
document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        // Update progress when a course is selected
        updateProgressBar(1); // For the "Selection" step
    });
});

// Example: Trigger progress when personal details are filled in
document.getElementById('Name').addEventListener('input', function() {
    updateProgressBar(2); // For the "Personal Details" step
});

// Example: Trigger when the user checks the data
document.getElementById('btn3').addEventListener('button', function() {
    updateProgressBar(3); // For the "Check Data" step
});

document.getElementById("btn3").addEventListener("click", function() {
    // Get the input fields
    const name = document.getElementById("Name").value;
    const surname = document.getElementById("Surname").value;
    const email = document.getElementById("Email").value;
    const phone = document.getElementById("Phone").value;

// Check if the fields are empty
if (name === "" || email === "" || surname === "" || phone === "") {
    Toastify({
      text: "Please fill all the required information!",
      duration: 3000, // duration in milliseconds
      gravity: "top", // 'top' or 'bottom'
      position: "right", // 'left', 'center', or 'right'
      backgroundColor: "#4CAF50"
    }).showToast();
  } else {
    // Handle the case where form is valid (e.g., form submission)
    alert("Form submitted successfully!");
  }
});

function toggleAnswer(questionElement) {

    const answerElement = questionElement.nextElementSibling;

    const chevron = questionElement.querySelector('.chevron i');



    // Toggle answer visibility

    if (answerElement.style.display === 'none') {

        answerElement.style.display = 'block';

        chevron.style.transform = 'rotate(180deg)'; // Rotate the arrow

    } else {

        answerElement.style.display = 'none';

        chevron.style.transform = 'rotate(0deg)'; // Reset the arrow

    }

}

// Registration process
document.getElementById('register-btn').addEventListener('click', function() {
    const name = document.getElementById('Name').value.trim();
    const surname = document.getElementById('Surname').value.trim();
    const email = document.getElementById('Email').value.trim();
    const phone = document.getElementById('Phone').value.trim();

    // Check if any field is empty
    if (!name || !surname || !email || !phone) {
        registerMessage.textContent = "Please fill out all fields.";
        registerMessage.style.color = "red";
        registerMessage.style.display = "block";
        return; // Exit the function
    }

    // Show success message
    registerMessage.textContent = "Successfully registered";
    registerMessage.style.color = "green";
    registerMessage.style.display = "block";
});



