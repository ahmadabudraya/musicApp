import axios from "axios";

const HAPPI_KEY: string = 'ff08a37PGT0xj7K6CBr0OWQEpxSDBnCqiAIWCjNINrtG6Y2SVIhZzzNn';
/*
{
  "id_artist": 55095,
  "artist": "Marien Baker",
  "cover": "https://api.happi.dev/v1/music/cover/55095/artist",
  "api_artist": "https://api.happi.dev/v1/music/artists/55095",
  "api_albums": "https://api.happi.dev/v1/music/artists/55095/albums"
},
*/
export const axiosInstance = axios.create({
  baseURL: "https://api.happi.dev/",
});

axiosInstance.interceptors.request.use(config => {
  config.params = {
    apikey: HAPPI_KEY,
    ...config.params,
  };
  return config;
});
