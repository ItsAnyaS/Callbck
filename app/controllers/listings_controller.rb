class ListingsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        listings = Listing.all
        render json: listings
    end


    def show 
        puts params[:id]
        listing = Listing.find_by(id: params[:id])
        render json: listing.to_json(methods: [:company])
    end

    def create
        listing = Listing.new(title: params[:title], description: params[:description], image: params[:image], style: params[:style], dancer_gender: params[:dancer_gender], compensation: params[:compensation], location: params[:location], rehersal_start_date: params[:rehersal_start_date], show_date_start: params[:show_date_start], years_of_expirence: params[:years_of_expirence], company_id: params[:company_id])
        if listing.save
            render json: listing
        else
            render json: listing.errors.full_messages, status: 422
        end
    end

    def search
        #needs refactoring
        if params[:location]
            #think about how to add more general location
                listings = Listing.where(location: params[:location])
                if params[:keywords] && params[:style]
                    #think about how to allow more felxability
                style_and_keyword_filtered_listings = listings.filter{|listing| listing.style.include?(params[:style]) && listing.description.downcase.include?(params[:keywords].downcase)}
                render json: style_and_keyword_filtered_listings
                elsif params[:style]
                    style_filtered_listings = listings.filter{|listing| listing.style.include?(params[:style])}
                    render json: style_filtered_listings
                elsif params[:keywords]
                    keyword_filtered_listings = listings.filter{|listing| listing.description.downcase.include?(params[:keywords].downcase)}
                    render json: keyword_filtered_listings
                else
                    render json: listings
                end
        elsif params[:style]
                listings = Listing.all.filter{|listing| listing.style.include?(params[:style])}
                if params[:keywords]
                    keyword_filtered_listings = listings.filter{|listing| listing.description.downcase.include?(params[:keywords].downcase)}
                    render json: keyword_filtered_listings
                else
                    render json: listings
                end
        else
                listings = Listing.all
                keyword_filtered_listings = listings.filter{|listing| listing.description.downcase.include?(params[:keywords].downcase)}
                render json: keyword_filtered_listings
        end
    end

end
