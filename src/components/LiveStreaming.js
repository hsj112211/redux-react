import React, { useEffect, useState } from 'react';
import ReactLivestream from 'react-livestream';
import styled from 'styled-components';
import Axios from 'axios';

  const StyledIframeWrapper = styled.div`
  position: relative;
  &:before {
    content: '';
    display: block;
    padding-bottom: calc(100% / (16 / 9));
  }
`

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const YOUTUBE_CHANNEL_ID = "UCstDhK81BXv91vceO63r1Cw";
const YOUTUBE_API_KEY = "AIzaSyC4OtuTwTPRCR9TNGgpZj0gRoyW5tDV-qM";

const LiveStreaming = () => {
    const [youtubeVideoId, setYoutubeVideoId] = React.useState(null)

    // 실시간 방송 시작 후 약 2분정도의 대기시간이 필요함
    // 1~2분이 경과하기 이전에는 아직 실시간 방송중이 아닌것으로 나오기 때문에 동영상 재생 에러 발생
    const fetchYoutubeData = () => {
        fetch( 
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`,
            {
            headers: {
                Accept: 'application/json'
            }
        }).then(async res => {
            const response = await res.json()
            if (response.items && response.items.length >= 1) {
              const streamInfo = response.items[0]
              setYoutubeVideoId(streamInfo.id.videoId)
            }
          })
          .catch(err => {
            console.log('Error fetching data from YouTube API: ', err)
          })
    }



    useEffect( async () => {
        fetchYoutubeData();
    },[]);

    return (
        <StyledIframeWrapper>
            <StyledIframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </StyledIframeWrapper>
    )

}

export default LiveStreaming;