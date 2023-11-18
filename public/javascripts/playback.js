if (IVSPlayer.isPlayerSupported) {
  const player = IVSPlayer.create();
  player.attachHTMLVideoElement(document.getElementById("video-player"));
  player.load(
    "https://f3a548d10fbe.us-east-1.playback.live-video.net/api/video/v1/us-east-1.117906616901.channel.HGnhmOBxnLCW.m3u8"
  );
  player.play();
}
