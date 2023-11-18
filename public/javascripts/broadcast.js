// Create an Instance of the AmazonIVSBroadcastClient​
const client = IVSBroadcastClient.create({
  // Enter the desired stream configuration
  streamConfig: IVSBroadcastClient.BASIC_LANDSCAPE,
  // Enter the ingest endpoint from the AWS console or CreateChannel API
  ingestEndpoint:
    "rtmps://f3a548d10fbe.global-contribute.live-video.net:443/app/",
});

// Request Permissions
async function handlePermissions() {
  let permissions = {
    audio: false,
    video: false,
  };
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    for (const track of stream.getTracks()) {
      track.stop();
    }
    permissions = { video: true, audio: true };
  } catch (err) {
    permissions = { video: false, audio: false };
    console.error(err.message);
  }
  // If we still don't have permissions after requesting them display the error message
  if (!permissions.video) {
    console.error("Failed to get video permissions.");
  } else if (!permissions.audio) {
    console.error("Failed to get audio permissions.");
  }
}

// Set Up a Stream Preview
// where #preview is an existing <canvas> DOM element on your page
const previewEl = document.getElementById("preview");
client.attachPreview(previewEl);

console.log("I'm working");
