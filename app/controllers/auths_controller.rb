class AuthsController < ApplicationController
    skip_before_action :verify_authenticity_token


    def login
    dancer = Dancer.find_by(email: params[:email])
    exp = Time.now.to_i + (5 * 60 * 60)
        if !dancer
            render json: {error: "no account"}, status: 404
        else
        if dancer.password_digest == params[:password]
            hmac_secret = ENV["MY_SECRET_KEY"]
            payload = { data:  dancer.uuid, exp: exp}
            token = JWT.encode payload, hmac_secret, 'HS256'
            render json: {"auth-token": token, first_name: dancer.first_name, last_name: dancer.last_name }
        else
        render json: {error: "Incorrect email or password"}, status: 404        
        end
        end
    end

    def is_valid_dancer_session
        hmac_secret = ENV["MY_SECRET_KEY"]
        token = params[:auth_token]
        if token
        begin
            decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
            dancer = Dancer.find_by(uuid: decoded_token[0]["data"])
            render json: {first_name: dancer.first_name, last_name: dancer.last_name}
            rescue JWT::ExpiredSignature
                render json: {message: "Session expired"}
        end
        else
            render json: {error: 'Not logged in'}, status: 422
        end
    end

    def is_valid_company_session 
        hmac_secret = ENV["MY_SECRET_KEY"]
        token = params[:company_auth_token]
        if token
            begin
                decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
                company = Company.find_by(email: decoded_token[0]["data"])
                render json: {name: company.name}
                rescue JWT::ExpiredSignature
                    render json: {message: "Session expired"}
            end
        else
            render json: {error: 'Not logged in'}, status: 422
        end
    end

  

    def company_login
        company = Company.find_by(email: params[:email])
        if !company
            render json: {error: "no account"}, status: 404
        else
            if company.password_digest == params[:password]
            exp = Time.now.to_i + (5 * 60 * 60)
            hmac_secret = ENV["MY_SECRET_KEY"]
            payload = { data:  company.email, exp: exp}
            token = JWT.encode payload, hmac_secret, 'HS256'
            render json: {"company-auth-token": token, name: company.name}
        else 
            render json: {error: "Incorrect email or password"}, status: 404
        end
    end
    end

    def company_signup
        company = Company.new(company_type: params[:company_type], number_of_employees: params[:number_of_employees], name: params[:name],email: params[:email], bio: params[:bio], location: params[:location], logo: params[:logo], password_digest: params[:password])
        if company.save
            exp = Time.now.to_i + (5 * 60 * 60)
            hmac_secret = ENV["MY_SECRET_KEY"]
            payload = { data:  company.email, exp: exp}
            token = JWT.encode payload, hmac_secret, 'HS256'
            render json: {"company-auth-token": token, name: company.name}
        else
            render json: company.errors.full_messages, statis: 422
        end
    end

end
