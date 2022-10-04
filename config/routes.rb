Rails.application.routes.draw do
#Dancers
resources :dancers
get '/latest', to: 'dancers#latest'
post '/dancers_by_token', to: 'dancers#dancers_by_token'
#Companies
get '/companies/:id', to: 'companies#show'
post '/companies', to: 'companies#create'
post '/companies_by_token', to: 'companies#companies_by_token'
delete '/companies/:id', to: 'companies#destroy'
patch '/companies/:id', to: 'companies#update'
#Applications
get '/applications/:id', to: 'applications#show'
post '/applications_by_dancer', to: 'applications#applications_by_dancer'
patch '/applications/:id', to: 'applications#update'
post '/applications', to: 'applications#create'
get '/applicaitons_by_listings/:id', to: 'applications#applicaitons_by_listings'
delete '/applications/:id', to: 'applications#destroy'

#Listings
get '/listings/:id', to: 'listings#show'
post '/listings', to: 'listings#create'
get '/listings', to: 'listings#index'
delete '/listings/:id', to: 'listings#destroy'
post '/listings_by_company', to: 'listings#listings_by_company'
#Listing search
post '/listings_search', to: 'listings#search'

#Auth

post '/auth/login', to: 'auths#login'
post '/auth/signup', to: 'auths#register'
post 'auth/valid_dancer_session', to: 'auths#is_valid_dancer_session'

post '/auth/company/login', to: 'auths#company_login'
post '/auth/company/signup', to: 'auths#company_signup'
post 'auth/company/valid_company_session', to: 'auths#is_valid_company_session'

end
