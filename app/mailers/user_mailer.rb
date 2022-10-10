class UserMailer < ApplicationMailer
    default from: 'support@callbck.com'
    
    def welcome_email
        @user = params[:user]
        mail(to: @user.email, subject: 'Welcome to Callbck')
      end
end
