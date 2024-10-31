require 'httparty'

class SpotifyService
  SPOTIFY_AUTH_URL = "https://accounts.spotify.com/api/token"
  SPOTIFY_RECOMMENDATIONS_URL = "https://api.spotify.com/v1/recommendations"

  def initialize
    @client_id = ENV['SPOTIFY_CLIENT_ID']
    @client_secret = ENV['SPOTIFY_CLIENT_SECRET']
  end

  def get_access_token
    auth = Base64.strict_encode64("#{@client_id}:#{@client_secret}")
    response = HTTParty.post(
      SPOTIFY_AUTH_URL,
      headers: { "Authorization" => "Basic #{auth}" },
      body: { grant_type: "client_credentials" }
    )
    JSON.parse(response.body)["access_token"]
  end

  def fetch_playlist_by_mood(mood)
    token = get_access_token
    genres = case mood.downcase
             when "happy" then "pop,party"
             when "sad" then "acoustic,ambient"
             when "relaxed" then "chill,jazz"
             when "energetic" then "work-out,dance"
             when "hacking" then "electronic"
             else "pop"
             end

    response = HTTParty.get(
      SPOTIFY_RECOMMENDATIONS_URL,
      headers: { "Authorization" => "Bearer #{token}" },
      query: {
        seed_genres: genres,
        limit: 10
      }
    )

    response["tracks"].map do |track|
      {
        name: track["name"],
        artist: track["artists"].first["name"],
        url: track["external_urls"]["spotify"],
        cover: track["album"]["images"].first["url"]
      }
    end
  end
end
