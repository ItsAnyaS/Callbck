Rails.application.routes.draw do
#Dancers
get '/dancers/:id', to: 'dancers#show'
#Companies
get '/companies/:id', to: 'companies#show'
#Applications
get '/applications/:id', to: 'applications#show'

#Listings
get '/listings/:id', to: 'listings#show'
end
