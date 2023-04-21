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
        listings = Listing.all.sort {|a,z| z.created_at - a.created_at }
        
        keywords = params[:keywords]&.downcase
        location = params[:location]&.downcase
        style = params[:style]&.downcase
      

        if keywords.present?
          listings = listings.filter do |listing| 
            listing.title.downcase.include?(keywords) || 
            listing.description.downcase.include?(keywords) ||
            listing.style.include?(keywords)
          end
        end
      
        if style.present?
          listings = listings.filter {|listing| listing.style.first == style }
        end
      
        if location.present?

          (0..location.length).each do |i|
            shorter_location = location[0...i]
            matched_listings = listings.filter do |listing|
              listing.location.downcase.start_with?(shorter_location)
            end
            if matched_listings.length >= 50
              listings = matched_listings
              break
            end
          end
        end
      
        render json: listings
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
        hmac_secret = ENV["MY_SECRET_KEY"]
        token = params[:company_auth_token]
        begin
            decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
            @company = Company.find_by(uuid: decoded_token[0]["data"])
            rescue JWT::ExpiredSignature
                render json: {message: "Session expired"}
        end
       
    end
end
