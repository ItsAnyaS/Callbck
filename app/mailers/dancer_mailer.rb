class DancerMailer < ApplicationMailer

    def application_update_email
        @user = params[:user]
        @status = params[:status]
        mail(to: @user.email, subject: 'Change in application status')
    end

    def application_reject_email
        @user = params[:user]
        mail(to: @user.email, subject: 'Keep looking')
    end

end
