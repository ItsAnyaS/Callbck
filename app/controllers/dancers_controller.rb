class DancersController < ApplicationController

    def show 
        dancer = Dancer.find_by(id: params[:id])
        render json: dancer
    end
end
