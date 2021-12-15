/* 
https://www.youtube.com/watch?v=SHgyxbbUNCI
https://www.youtube.com/watch?v=Sm9UR3dt1mQ
https://i.ytimg.com/vi/Sm9UR3dt1mQ/maxresdefault.jpg
*/

$(".search-yt").on('keyup', async function(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    let data = await YTGet($(this).val())
    YTInfo(data)
  }
});

function YTInfo(data) {
  let titulo = $(data).find('meta')[0].getAttribute('content')
  let canal = $(data).find('link')[2].getAttribute('content')
  let image = $(data).find('link')[3].getAttribute('href')

  $('.YT-Container div').remove()

  $('.YT-Container').append(`
    <div>
      <div style="font-weight:bold; text-align:center; font-size:20px;">${canal}</div>
      <div style="padding:10px; width:auto; font-size:11px; text-align:center;">${titulo}</div>
      <img src="${image}" style="width:24em;">
    </div>
  `)
}

function YTGet(url) {
  return new Promise(resolve => {
    $.get(`https://api.allorigins.win/get?url=${url}`, function(data) {
      resolve(data.contents)
    });
  });
}


/*
https://dev.twitch.tv/docs/v5/reference/streams#get-stream-by-user
https://dev.twitch.tv/docs/v5/reference/channels#get-channel-videos
https://dev.twitch.tv/docs/embed/video-and-clips
*/

$(".search-ttv").on('keyup', async function(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    let data = await TTVGetUser($(this).val())
    let id = await TTVGetStream(data._id)

    $('.TTV-Container div').remove()

    $('.TTV-Container').append(`
      <div>
        <div style="font-weight:bold; text-align:center; font-size:20px; padding:10px">${id}</div>
        <iframe 
          src="https://player.twitch.tv/?video=${id}&parent=n0itx.github.io&autoplay=false&preload=none" 
          frameborder="0" 
          allowfullscreen="true" 
          scrolling="no" 
          height="450" 
          width="950" style="padding:20px 0px">
        </iframe>
      </div>
    `)
  }
});

$(".search-ttv-id").on('keyup', async function(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {

    $('.TTV-Container div').remove()

    $('.TTV-Container').append(`
      <div>
        <iframe
          src="https://player.twitch.tv/?video=${$(this).val()}&parent=n0itx.github.io&autoplay=false&preload=none" 
          frameborder="0" 
          allowfullscreen="true" 
          scrolling="no" 
          height="450" 
          width="950" style="padding:20px 0px">
        </iframe>
      </div>
    `)
  }
});

function TTVGetUser(user) {
  return new Promise(resolve => {
    $.ajax({
      url: `https://api.twitch.tv/kraken/users?login=${user}`,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'njdjdkepu3gygen6rwc9lxwaio4082'
      },
      success: function(data) {
        resolve(data.users[0])
      }
    });
  });
}

function TTVGetStream(id) {
  return new Promise(resolve => {
    $.ajax({
      url: `https://api.twitch.tv/kraken/channels/${id}/videos`,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'njdjdkepu3gygen6rwc9lxwaio4082'
      },
      success: function(data) {
        resolve(data.videos[0]._id.replace('v', ''))
      }
    });
  });
}