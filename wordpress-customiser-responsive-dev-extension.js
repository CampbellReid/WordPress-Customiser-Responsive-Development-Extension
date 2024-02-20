// ==UserScript==
// @name        WordPress Customizer Responsive Development Extension
// @namespace   Campbell Reid
// @match        *://*/wp-admin/customize.php*
// @grant       none
// @version     1.0
// @author      Campbell Reid
// @description Enables easier rapid development by letting you change the iframe screen width in an easy dialog for WordPress customiser
// ==/UserScript==

(function() {
    let popupHTML = `
      <div id="customWidthPopup" style="position:fixed;top:10px;right:10px;z-index:99999999999999999;background-color:white;border:1px solid black;padding:10px;">
        <label for="iframeWidth">Iframe Width:</label>
        <input type="number" id="iframeWidth" name="iframeWidth">
        <button id="setIframeWidth">Go</button>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);
  
    let popup = document.getElementById('customWidthPopup');
    popup.addEventListener('mousedown', function(e) {
      let offsetX = e.clientX - popup.getBoundingClientRect().left;
      let offsetY = e.clientY - popup.getBoundingClientRect().top;
  
      function mouseMoveHandler(e) {
        popup.style.top = e.clientY - offsetY + 'px';
        popup.style.left = e.clientX - offsetX + 'px';
        popup.style.right = ''; // This line removes the right property once left has been set.
      }
  
      function mouseUpHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      }
  
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
  
    document.getElementById('setIframeWidth').addEventListener('click', function() {
      let newWidth = document.getElementById('iframeWidth').value + 'px';
      let iframe = document.querySelector('#customize-preview > iframe'); // Updated to target the WordPress Customizer iframe specifically
      if (iframe) {
        iframe.style.width = newWidth;
      } else {
        alert('Target iframe not found.');
      }
    });
  })();