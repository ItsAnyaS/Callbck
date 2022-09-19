class Company < ApplicationRecord
    has_many :listings
    has_many :applications
end
