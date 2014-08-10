Rails.application.routes.draw do

  root 'home#index'

  resources :blogs do
  	resources :entries
  end

end
