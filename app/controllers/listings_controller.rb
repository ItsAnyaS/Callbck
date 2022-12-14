class ListingsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_listing, only: %i[ show destroy]
    before_action :find_company, only: %i[ listings_by_company create]
    def index
        listings = Listing.all.sort {|a,z|  z.created_at - a.created_at}
        render json: listings.to_json(methods: [:company])
    end


    def show 
        render json: @listing.to_json(methods: [:company])
    end

    def create 
        listing = Listing.new(title: params[:title], description: params[:description], image: params[:image], style: params[:style], dancer_gender: params[:dancer_gender], compensation: params[:compensation], location: params[:location], rehersal_start_date: params[:rehersal_start_date], show_date_start: params[:show_date_start], years_of_expirence: params[:years_of_expirence], company_id: @company.id)
        if listing.save
            render json: listing
        else
            render json: listing.errors.full_messages, status: 422
        end
    end

    def search
        if params[:location] && params[:location] != ""
                listings = Listing.where(location: params[:location]).sort {|a,z|  z.created_at - a.created_at}
                if params[:keywords] && params[:keywords] !="" && params[:style] && params[:style] != ""
                style_and_keyword_filtered_listings = listings.filter{|listing| listing.style.include?(params[:style]) && listing.title.downcase.include?(params[:keywords].downcase)}
                render json: style_and_keyword_filtered_listings
                elsif params[:style] && params[:style] != ""
                    style_filtered_listings = listings.filter{|listing| listing.style.include?(params[:style])}
                    render json: style_filtered_listings
                elsif params[:keywords] && params[:keywords] != ""
                    keyword_filtered_listings = listings.filter{|listing| listing.title.downcase.include?(params[:keywords].downcase)}
                    render json: keyword_filtered_listings
                else
                    render json: listings
                end
        elsif params[:style] && params[:style] != ""
                listings = Listing.all.filter{|listing| listing.style.include?(params[:style])}.sort {|a,z|  z.created_at - a.created_at}
                if params[:keywords] && params[:keywords] != ""
                    keyword_filtered_listings = listings.filter{|listing| listing.title.downcase.include?(params[:keywords].downcase)}
                    render json: keyword_filtered_listings
                else
                    render json: listings
                end
        else
            listings = Listing.all.sort {|a,z|  z.created_at - a.created_at}
            if !params[:keywords] || params[:keywords] == ''
            render json: listings
            else
                keyword_filtered_listings = listings.filter{|listing| listing.title.downcase.include?(params[:keywords].downcase)}
                render json: keyword_filtered_listings
            end
        end
    end

    def listings_by_company
        listings = Listing.where(company_id: @company.id)
        render json: listings
    end

    def destroy 
        applications = Application.where(listing_id: @listing.id)
        if applications
        applications.destroy_all
        end
        @listing.destroy
        render json: {message: 'successfully deleted'}
    end
private

    def set_listing
        @listing = Listing.find(params[:id])
    end

    def find_company
        hmac_secret = 'my$ecredsfgihdghdfghdfkghndfkhdfkdhgiudtK3y'
        token = params[:company_auth_token]
        decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
        @company = Company.find_by(email: decoded_token[0]["data"])
    end
end
