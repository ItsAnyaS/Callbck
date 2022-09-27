class DancersController < ApplicationController
    skip_before_action :verify_authenticity_token
    def show 
        dancer = Dancer.find_by(id: params[:id])
        render json: dancer
    end

    def create
        dancer = Dancer.new(first_name: params[:first_name], last_name: params[:last_name], gender: params[:gender], dance_style: params[:dance_style], email: params[:email], location: params[:location])
        if dancer.save
            render json: dancer
        else
            render json: dancer.errors.full_messages, statis: 422
        end
    end

    def dancer_by_email
        dancer = Dancer.find_by(email: params[:email])
       render json: dancer
    end
end
