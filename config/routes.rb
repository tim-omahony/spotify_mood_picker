Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'playlists/:mood', to: 'playlists#show'
    end
  end
end
