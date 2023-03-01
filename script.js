/**
 * Wait for the DOM to load before executing code
 */
document.addEventListener('DOMContentLoaded', function() {

  /**
   * Get the input element for selecting the image
   */
  let input_image = document.getElementById('input_image');

  /**
   * Add an event listener to the input element that triggers a function when a file is selected
   */
  input_image.addEventListener('change', handleInputChange);
});

/**
 * Handle changes to the selected file
 * @param {Event} event - The event that triggered the function
 */
function handleInputChange(event) {

  /**
   * Get the input element that triggered the event
   */
  let input = event.target;

  /**
   * Get the selected file
   */
  let file = input.files[0];

  /**
   * Log the file object to the console
   */
  console.log(file);

  /**
   * Validate the selected file type
   */
  if (!validateInput(file)) {

    /**
     * If the file type is invalid, display an error message and return
     */
    alert('Invalid file type. Please select an image file.');
    return;
  }

  /**
   * Get the progress bar element and status message element
   */
  let progress = document.getElementById('progress');
  let status = document.getElementById('progress-status');

  /**
   * Use Tesseract.js to recognize text in the selected image
   */
  Tesseract.recognize(file)
    .progress(function(message) {

      /**
       * Update the progress bar and status message as the text recognition progresses
       */
      progress.value = message.progress * 100;
      status.innerText = `Recognizing text ${Math.round(message.progress * 100)}%...`;

      /**
       * Log the progress message object to the console
       */
      console.log(message);
    })
    .then(function(result) {

      /**
       * Get the content area element and insert the recognized text
       */
      var contentArea = document.getElementById('image-text');
      contentArea.innerHTML = result.text;

      /**
       * Log the result object to the console
       */
      console.log(result);

      /**
       * Set the progress bar to 100% and update the status message
       */
      progress.value = 100;
      status.innerText = 'Text recognition complete!';
    })
    .catch(function(err) {

      /**
       * Log any errors to the console
       */
      console.error(err);
    });
}

/**
 * Validate the selected file type
 * @param {File} file - The selected file object
 * @returns {boolean} - True if the file type is valid, false otherwise
 */
function validateInput(file) {

  /**
   * Define an array of allowed file types
   */
  const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];

  /**
   * Check if the selected file type is allowed
   */
  if (!allowedFormats.includes(file.type)) {
    return false;
  }

  return true;
}

/**
 * Copy the recognized text to the clipboard
 */
function copyText() {

  /**
   * Get the textarea element containing the recognized text and select its contents
   */
  let textarea = document.getElementById("image-text");
  textarea.select();

  /**
   * Execute the "copy" command to copy the selected text to the clipboard
   */
  document.execCommand("copy");

  /**
   * Display an alert message to confirm that the text has been copied
   */
  alert("Text copied to clipboard");
}