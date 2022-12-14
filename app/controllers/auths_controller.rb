class AuthsController < ApplicationController
    skip_before_action :verify_authenticity_token


    def login
    dancer = Dancer.find_by(email: params[:email])
    if !dancer
        render json: {error: "no account"}, status: 404
    else
    if dancer.password_digest == params[:password]
        hmac_secret = 'my$ecredsfgihdghdfghdfkghndfkhdfkdhgiudtK3y'
        payload = { data:  dancer.email}
        token = JWT.encode payload, hmac_secret, 'HS256'
        puts token
        render json: {"auth-token": token, first_name: dancer.first_name, last_name: dancer.last_name }
    else
    render json: {error: "incorrect email or password"}, status: 404        
    end
    end
    end

    def is_valid_dancer_session
        hmac_secret = 'my$ecredsfgihdghdfghdfkghndfkhdfkdhgiudtK3y'
        token = params[:auth_token]
        puts token
        if token
        decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
        dancer = Dancer.find_by(email: decoded_token[0]["data"])
        render json: {first_name: dancer.first_name, last_name: dancer.last_name}
        else
            render json: {error: 'Not logged in'}, status: 422
        end
    end

    def is_valid_company_session 
        hmac_secret = 'my$ecredsfgihdghdfghdfkghndfkhdfkdhgiudtK3y'
        token = params[:company_auth_token]
        puts token
        if token
        decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
        company = Company.find_by(email: decoded_token[0]["data"])
        render json: {name: company.name}
        else
            render json: {error: 'Not logged in'}, status: 422
        end
    end

    # def register
    #     dancer = Dancer.new(first_name: params[:first_name], last_name: params[:last_name], gender: params[:gender], dance_style: params[:dance_style], email: params[:email], location: params[:location], password_digest: params[:password_digest])
    #     if dancer.save
    #         hmac_secret = 'my$ecretK3y'
    #         payload = { data:  dancer.email}
    #         token = JWT.encode payload, hmac_secret, 'HS256'
    #         render json: {"auth-token": token}
    #     else
    #         render json: dancer.errors.full_messages, status: 422
    #     end
    # end

    def company_login
        company = Company.find_by(email: params[:email])
        if !company
            render json: {error: "no account"}, status: 404
        else
        if company.password_digest == params[:password]
            hmac_secret = 'my$ecredsfgihdghdfghdfkghndfkhdfkdhgiudtK3y'
            payload = { data:  company.email}
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
            hmac_secret = 'my$ecredsfgihdghdfghdfkghndfkhdfkdhgiudtK3y'
            payload = { data:  company.email}
            token = JWT.encode payload, hmac_secret, 'HS256'
            render json: {"company-auth-token": token, name: company.name}
        else
            render json: company.errors.full_messages, statis: 422
        end
    end

end
