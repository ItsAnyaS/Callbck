class CompaniesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def show 
        company = Company.find_by(id: params[:id])
        render json: company
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
    render json: {message: 'workin'}
  end
end
