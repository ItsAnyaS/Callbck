class ApplicationsController <  ApplicationController
    skip_before_action :verify_authenticity_token
    after_action :allow_iframe, only: :applicaitons_by_listings

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
        response.headers.except! 'X-Frame-Options'
        applications = Application.where(listing_id: params[:id])
        dancers = applications.map { |app| Dancer.find_by(id: app.dancer_id)}
        dancers = dancers.map { |dancer| {first_name: dancer.first_name, last_name: dancer.last_name, gender: dancer.gender, years_of_experience: dancer.years_of_experience, email: dancer.email, headshot: dancer.image_url, resume: dancer.resume_url}}
        # puts dancers
         apps = applications.map.with_index {|app, index| {id: app.id, listing_id: app.listing_id, company_id: app.company_id, status: app.status, dancer: dancers[index] }}
         puts apps
        render json: apps
    end

    def destroy 
        puts params[:id]
        application = Application.find_by(id: params[:id])
        application.destroy
        render json: application
    end

    private


  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end

end
