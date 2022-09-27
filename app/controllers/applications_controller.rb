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
        check_app = Application.find_by(dancer_id: params[:dancer_id], listing_id: params[:listing_id])
        if check_app
            render json: {error: "You can only apply to each listing once"}
        else
            application = Application.new(listing_id: params[:listing_id], dancer_id: params[:dancer_id], company_id: params[:company_id], status: "0", role: params[:role])
            if application.save
                render json: application
            else
                render json: application.errors.full_messages, status: 422
            end

        end
       
    end

end
