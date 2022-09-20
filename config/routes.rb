Rails.application.routes.draw do
#Dancers
get '/dancers/:id', to: 'dancers#show'
post '/dancers', to: 'dancers#create'
#Companies
get '/companies/:id', to: 'companies#show'
post '/companies', to: 'companies#create'
#Applications
get '/applications/:id', to: 'applications#show'
get '/applications_by_dancer/:dancer_id', to: 'applications#applications_by_dancer'
patch '/applications/:id', to: 'applications#update'
post '/applications', to: 'applications#create'

#Listings
get '/listings/:id', to: 'listings#show'
post '/listing', to: 'listings#create'
get '/listings', to: 'listings#index'

#Listing search

post '/listings_search', to: 'listings#search'
end
