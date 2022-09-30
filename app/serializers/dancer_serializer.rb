class DancerSerializer
  include JSONAPI::Serializer
   attributes :id, :first_name, :last_name, :image, :email, :image_url, :resume_url
end
