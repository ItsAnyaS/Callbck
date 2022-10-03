class DancersController < ApplicationController
  before_action :set_dancer, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /dancers or /dancers.json
  def index
    @dancers = Dancer.all
  end

  # GET /dancers/1 or /dancers/1.json
  def show
  end

  def dancers_by_token
    dancer =  verify_dancer
    render json: {message: dancer}
  end

  # GET /dancers/new
  def new
    @dancer = Dancer.new
  end

  # GET /dancers/1/edit
  def edit
  end

  # POST /dancers or /dancers.json
  def create
    @dancer = Dancer.new(dancer_params)

      if @dancer.save
            hmac_secret = 'my$ecretK3y'
            payload = { data:  @dancer.email}
            token = JWT.encode payload, hmac_secret, 'HS256'
            render json: {"auth-token": token, first_name: @dancer.first_name, last_name: @dancer.last_name}
        # render json: @dancer
      else
        format.json { render json: @dancer.errors, status: :unprocessable_entity }
    end
  end

  # PATCH/PUT /dancers/1 or /dancers/1.json
  def update
    respond_to do |format|
      if @dancer.update(dancer_params)
        format.html { redirect_to dancer_url(@dancer), notice: "Dancer was successfully updated." }
        format.json { render :show, status: :ok, location: @dancer }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @dancer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /dancers/1 or /dancers/1.json
  def destroy
    @dancer.destroy

    respond_to do |format|
      format.html { redirect_to dancers_url, notice: "Dancer was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def latest
    @dancer = Dancer.last
    render json: {dancer: DancerSerializer.new(@dancer).serializable_hash[:data][:attributes]}
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dancer
      @dancer = Dancer.find(params[:id])
    end

    def verify_dancer
      hmac_secret = 'my$ecretK3y'
      token = params[:token]
      puts token
      decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
      puts decoded_token
      dancer = Dancer.find_by(email: decoded_token[0]["data"])
    end

    # Only allow a list of trusted parameters through.
    def dancer_params
      params.require(:dancer).permit(:first_name, :last_name, :email, :password_digest, :dance_reel, :image, :years_of_experience, :gender, :location, :resume)
    end
end
