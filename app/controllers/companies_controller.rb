class CompaniesController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_company, only: %i[ show update destroy ]


    def show 
        render json: @company
    end

    def create
        company = Company.new(company_type: params[:company_type], number_of_employees: params[:number_of_employees], name: params[:name],email: params[:email], bio: params[:bio], location: params[:location], logo: params[:logo])
        if company.save
            render json: company
        else
            render josn: company.errors.full_messages
        end
    end


  def companies_by_token
    company =  verify_company
    render json: company
  end

  def update
    @company.update(company_params)
    render json: @company
  end

  def destroy 
    listings = Listing.where(company_id: @company.id)
    puts listings
    applications = Application.where(company_id: @company.id)
    puts applications
    listings.each { |listing| listing.destroy }
    applications.each { |application| application.destroy }
    @company.destroy
    render json: {message: 'successfully deleted'}
  end



private

def set_company
  @company = Company.find(params[:id])
end

def verify_company
  hmac_secret = ENV["MY_SECRET_KEY"]
  token = params[:token]
  begin
    decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
    company = Company.find_by(uuid: decoded_token[0]["data"])
    rescue JWT::ExpiredSignature
        render json: {message: "Session expired"}
end

end

def company_params
  params.require(:company).permit(:name, :location, :email, :password_digest, :bio, :logo, :number_of_employees, :company_type,)
end




end
