class ApplicationsController <  ApplicationController
    skip_before_action :verify_authenticity_token

    def show 
        application = Application.find_by(id: params[:id])
        render json: application
    end

    def applications_by_dancer
        hmac_secret = 'my$ecretK3y'
        token = params[:auth_token]
        decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
        dancer = Dancer.find_by(email: decoded_token[0]["data"])
        puts dancer.id
        applicaions = Application.where(dancer_id: dancer.id)
        puts applicaions
        render json: applicaions.to_json(methods: [:listing])
    end

    def update
        applicaion = Application.find_by(id: params[:id])
        applicaion.update(status: params[:status])
        render json: applicaion
    end

    def create
        hmac_secret = 'my$ecretK3y'
        token = params[:auth_token]
        decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
        dancer = Dancer.find_by(email: decoded_token[0]["data"])
        puts dancer
        check_app = Application.find_by(dancer_id: dancer.id, listing_id: params[:listing_id])
        puts check_app
        if check_app
            render json: {message: "You have already apllied to this listing"}
        else
            application = Application.new(listing_id: params[:listing_id], dancer_id: dancer.id, company_id: params[:company_id], status: "0", role: params[:role])
            if application.save
                render json: {message: 'Successfully applied'}
            else
                render json: application.errors.full_messages, status: 422
            end

        end
       
    end

    def applicaitons_by_listings
        applicaions = Application.where(listing_id: params[:id])
        render json: applicaions.to_json(methods: [:dancer, :company]) 
    end

    def destroy 
        puts params[:id]
        application = Application.find_by(id: params[:id])
        application.destroy
        render json: application
    end

end
