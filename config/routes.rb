Rails.application.routes.draw do
#Dancers
get '/dancers/:id', to: 'dancers#show'
post '/dancers', to: 'dancers#create'
get '/dancers_by_email/:email', to: 'dancers#dancer_by_email'
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
post '/listings', to: 'listings#create'
get '/listings', to: 'listings#index'
delete '/listings/:id', to: 'listings#destroy'
get '/listings_by_company/:id', to: 'listings#listings_by_company'
#Listing search
post '/listings_search', to: 'listings#search'

#Auth

post '/auth/login', to: 'auths#login'
post '/auth/signup', to: 'auths#register'
end
