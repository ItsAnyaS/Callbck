class ApplicationSerializer
  include JSONAPI::Serializer
  attributes :id, :listing_id, :dancer_id, :status, :company_id
end
