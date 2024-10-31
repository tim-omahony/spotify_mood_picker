class Api::V1::PlaylistsController < ApplicationController
  def show
    mood = params[:mood]
    spotify_service = SpotifyService.new
    playlist = spotify_service.fetch_playlist_by_mood(mood)

    render json: playlist
  end
end
