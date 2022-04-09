Rails.application.routes.draw do
  namespace :api do
    resources :restaurants do
      resources :foods, only: %i[index]
    end
    resources :pre_orders, only: %i[index create]
    put 'pre_orders/replace', to: 'pre_orders#replace'
    resources :orders, only: %i[create]
  end
end
