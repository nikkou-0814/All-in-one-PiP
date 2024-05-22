document.getElementById('pipButton').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: findVideoAndRequestPictureInPicture
      });
    }
  });
  
  function findVideoAndRequestPictureInPicture() {
    const videos = document.querySelectorAll('video');
    if (videos.length > 0) {
      videos.forEach(video => {
        if (typeof video.requestPictureInPicture === 'function') {
          video.requestPictureInPicture();
          console.log(`Picture-in-Picture requested for video element:`, video);
        } else {
          console.log(`Picture-in-Picture is not supported for this video element:`, video);
        }
      });
    } else {
      console.log('No video elements found on the page.');
    }
  }
  
