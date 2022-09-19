class ApplicationsController <  ActionController::Base
    def show 
        applications = Application.find_by(id: params[:id])
        render json: applications
    end
end
