class ListingsController < ApplicationController
    def show 
        listing = Listing.find_by(id: params[:id])
        render json: listing
    end
end
