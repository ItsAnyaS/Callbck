class ApplicationsController <  ApplicationController
    skip_before_action :verify_authenticity_token
    after_action :allow_iframe, only: :applicaitons_by_listings
    before_action :set_dancer, only: %i[ create applications_by_dancer]
    before_action :set_application, only: %i[show, update destroy]

    def show 
        render json: @application
    end

    def applications_by_dancer
        applicaions = Application.where(dancer_id: @dancer.id)
        applicaions = applicaion.filter {|app| app.status !== '4'}
        render json: applicaions.to_json(methods: [:listing])
    end

    def update
      if  @application.update(status: params[:status])
        dancer = Dancer.find_by(id: @application.dancer_id)
        company = Company.find_by(id: @application.company_id)
        status =  handle_status_convesion(params[:status])
        if status == 'rejected'
          DancerMailer.with(user: dancer, company: company).application_reject_email.deliver_later
     
      else
        DancerMailer.with(user: dancer, status: status, company: company).application_update_email.deliver_later
        render json: @applicaion
      end
      else 
        render json: {message: "something went wrong"}
      end
    end

    def create
        check_app = Application.find_by(dancer_id: @dancer.id, listing_id: params[:listing_id])
        if check_app
            render json: {message: "You have already apllied to this listing"}
        else
            application = Application.new(listing_id: params[:listing_id], dancer_id: @dancer.id, company_id: params[:company_id], status: "0", role: params[:role])
            if application.save
                render json: {message: 'Successfully applied'}
            else
                render json: application.errors.full_messages, status: 422
            end

        end
       
    end

    def applications_by_listings
        response.headers.except! 'X-Frame-Options'
        applications = Application.where(listing_id: params[:id])
        if applications
        dancers = applications.map { |app| Dancer.find_by(id: app.dancer_id)}
        dancers = dancers.map { |dancer| {first_name: dancer.first_name, last_name: dancer.last_name, gender: dancer.gender, years_of_experience: dancer.years_of_experience, email: dancer.email, headshot: dancer.image_url, resume: dancer.resume_url, dance_reel: dancer.dance_reel}}
        apps = applications.map.with_index {|app, index| {id: app.id, listing_id: app.listing_id, company_id: app.company_id, status: app.status, dancer: dancers[index] }}
        render json: apps
        else 
            render json: {message: 'no applications'}, status: 404
        end
    end

    def destroy 
        dancer = Dancer.find_by(id: @application.dancer_id)
        company = Company.find_by(id: @application.company_id)
        @application.destroy
        DancerMailer.with(user: dancer, company: company).application_reject_email.deliver_later
        render json: @application
    end

    private


  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end

  def set_application
    @application = Application.find(params[:id])
  end

  def handle_status_convesion(status)
    if status == '1'
        "First"
    elsif status == '2'
        "Second"
    elsif status == '3'
        "Final Callback"
    else
      "rejected"
    end
  end

  def set_dancer
    hmac_secret = ENV["MY_SECRET_KEY"]
    token = params[:auth_token]
    begin
      decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
      @dancer = Dancer.find_by(uuid: decoded_token[0]["data"])
      rescue JWT::ExpiredSignature
          render json: {message: "Session expired"}
  end
  end

end
