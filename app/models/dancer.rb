class Dancer < ApplicationRecord
    has_one_attached :image
    has_one_attached :resume
  has_many :applications
    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
      end

    def resume_url
        Rails.application.routes.url_helpers.url_for(resume) if resume.attached?
      end
end
